import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Notifications as NotificationsIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Policy as PolicyIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { Notification } from '../../types';

interface CriticalNotificationsProps {
  notifications: Notification[];
  onViewAllNotifications: () => void;
  onViewNotificationDetails: (notificationId: string) => void;
}

export const CriticalNotifications: React.FC<CriticalNotificationsProps> = ({
  notifications,
  onViewAllNotifications,
  onViewNotificationDetails
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Filter and sort critical notifications
  const criticalNotifications = notifications
    .filter(notification => 
      (notification.priority === 'Critical' || notification.priority === 'High') &&
      notification.isActionable &&
      !notification.isRead
    )
    .sort((a, b) => {
      // Sort by priority first (Critical > High)
      if (a.priority === 'Critical' && b.priority !== 'Critical') return -1;
      if (b.priority === 'Critical' && a.priority !== 'Critical') return 1;
      
      // Then by urgency
      const urgencyOrder = { 'Immediate': 0, 'This Week': 1, 'This Month': 2, 'Future': 3 };
      const aUrgency = urgencyOrder[a.urgencyLevel || 'Future'];
      const bUrgency = urgencyOrder[b.urgencyLevel || 'Future'];
      if (aUrgency !== bUrgency) return aUrgency - bUrgency;
      
      // Finally by creation date (newest first)
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    })
    .slice(0, 6); // Show top 6 most critical

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return '#dc2626'; // red
      case 'High': return '#ea580c'; // orange
      default: return '#6b7280'; // gray
    }
  };

  const getUrgencyIcon = (urgencyLevel?: string) => {
    switch (urgencyLevel) {
      case 'Immediate': return <ErrorIcon fontSize="small" />;
      case 'This Week': return <WarningIcon fontSize="small" />;
      case 'This Month': return <ScheduleIcon fontSize="small" />;
      default: return <NotificationsIcon fontSize="small" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'New Business': return <AssignmentIcon fontSize="small" />;
      case 'Inforce': return <PolicyIcon fontSize="small" />;
      case 'Client Management': return <PersonIcon fontSize="small" />;
      default: return <NotificationsIcon fontSize="small" />;
    }
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card 
      sx={{ 
        minWidth: isMobile ? '280px' : '320px',
        maxWidth: isMobile ? '280px' : '320px',
        borderLeft: `4px solid ${getPriorityColor(notification.priority)}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      }}
      onClick={() => onViewNotificationDetails(notification.id)}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            {getUrgencyIcon(notification.urgencyLevel)}
            <Chip 
              label={notification.priority}
              size="small"
              sx={{ 
                backgroundColor: getPriorityColor(notification.priority),
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {getCategoryIcon(notification.category)}
            <Typography variant="caption" color="text.secondary">
              {notification.urgencyLevel || 'Standard'}
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            fontSize: '1rem',
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {notification.title}
        </Typography>

        {/* Message */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {notification.message}
        </Typography>

        {/* Context Information */}
        {(notification.clientName || notification.relatedNumber) && (
          <Box sx={{ mb: 2 }}>
            {notification.clientName && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Client: {notification.clientName}
              </Typography>
            )}
            {notification.relatedNumber && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {notification.relatedNumber.startsWith('POL') ? 'Policy' : 'Case'}: {notification.relatedNumber}
              </Typography>
            )}
          </Box>
        )}

        {/* Action Required */}
        {notification.actionRequired && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: getPriorityColor(notification.priority), fontWeight: 600 }}>
              Action Required: {notification.actionRequired}
            </Typography>
          </Box>
        )}

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.createdDate).toLocaleDateString()}
            {notification.dueDate && (
              <span style={{ color: getPriorityColor(notification.priority) }}>
                {' • Due: '}{new Date(notification.dueDate).toLocaleDateString()}
              </span>
            )}
          </Typography>
          <ArrowForwardIcon 
            fontSize="small" 
            sx={{ color: 'action.active' }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  if (criticalNotifications.length === 0) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: 4, textAlign: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1, color: 'success.main' }}>
            All Caught Up!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No critical notifications requiring immediate attention.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={onViewAllNotifications}
            startIcon={<NotificationsIcon />}
          >
            View All Notifications
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ErrorIcon sx={{ color: 'error.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#003f7f' }}>
            Critical Notifications
          </Typography>
          <Chip 
            label={criticalNotifications.length}
            size="small"
            color="error"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Button 
          variant="outlined"
          onClick={onViewAllNotifications}
          endIcon={<ArrowForwardIcon />}
          size="small"
        >
          View All ({notifications.filter(n => !n.isRead).length})
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        High-priority notifications requiring immediate advisor attention
      </Typography>

      {/* Scrollable Notifications */}
      <Box 
        sx={{ 
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a1a1a1',
          },
        }}
      >
        {criticalNotifications.map((notification) => (
          <NotificationCard 
            key={notification.id} 
            notification={notification} 
          />
        ))}
      </Box>

      {/* Mobile: Stack vertically */}
      {isMobile && (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Stack spacing={2}>
            {criticalNotifications.map((notification) => (
              <NotificationCard 
                key={`mobile-${notification.id}`} 
                notification={notification} 
              />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};