import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  Stack
} from '@mui/material';
import {
  Notifications,
  Search,
  MarkAsUnread,
  CheckCircle,
  Warning,
  Error,
  Info,
  Schedule,
  Person,
  Business,
  Security,
  TrendingUp,
  Assignment,
  Update
} from '@mui/icons-material';
import { mockNotifications } from '../../data/mockData';
import { Notification } from '../../types';

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical': return <Error />;
      case 'High': return <Warning />;
      case 'Medium': return <Info />;
      case 'Low': return <CheckCircle />;
      default: return <Info />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'New Business': return <Assignment />;
      case 'Inforce': return <Security />;
      case 'Claims': return <Update />;
      case 'Client Management': return <Person />;
      case 'Compliance': return <Security />;
      case 'Sales Pipeline': return <TrendingUp />;
      case 'Business Management': return <Business />;
      case 'Risk Management': return <Warning />;
      case 'Market Intelligence': return <Info />;
      default: return <Notifications />;
    }
  };

  const getUrgencyColor = (urgencyLevel?: string) => {
    switch (urgencyLevel) {
      case 'Immediate': return '#d32f2f';
      case 'This Week': return '#f57c00';
      case 'This Month': return '#1976d2';
      case 'Future': return '#388e3c';
      default: return undefined;
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const categoryMatch = filterCategory === 'All' || notification.category === filterCategory;
      const priorityMatch = filterPriority === 'All' || notification.priority === filterPriority;
      const statusMatch = filterStatus === 'All' || 
        (filterStatus === 'Unread' && !notification.isRead) ||
        (filterStatus === 'Read' && notification.isRead) ||
        (filterStatus === 'Actionable' && notification.isActionable);
      const searchMatch = searchTerm === '' || 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return categoryMatch && priorityMatch && statusMatch && searchMatch;
    });
  }, [notifications, filterCategory, filterPriority, filterStatus, searchTerm]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAsUnread = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: false } : n)
    );
  };

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setDetailDialogOpen(true);
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const actionableCount = notifications.filter(n => n.isActionable && !n.isRead).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge badgeContent={unreadCount} color="error">
            <Notifications />
          </Badge>
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {unreadCount} unread notifications • {actionableCount} require action
        </Typography>
      </Box>

      {/* Critical Alerts Banner */}
      {filteredNotifications.some(n => n.priority === 'Critical' && !n.isRead) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">Critical Alerts Require Immediate Attention</Typography>
          {filteredNotifications.filter(n => n.priority === 'Critical' && !n.isRead).length} critical notifications need your immediate response.
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  label="Category"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  <MenuItem value="New Business">New Business</MenuItem>
                  <MenuItem value="Inforce">Inforce</MenuItem>
                  <MenuItem value="Claims">Claims</MenuItem>
                  <MenuItem value="Client Management">Client Management</MenuItem>
                  <MenuItem value="Compliance">Compliance</MenuItem>
                  <MenuItem value="Sales Pipeline">Sales Pipeline</MenuItem>
                  <MenuItem value="Business Management">Business Management</MenuItem>
                  <MenuItem value="Risk Management">Risk Management</MenuItem>
                  <MenuItem value="Market Intelligence">Market Intelligence</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filterPriority}
                  label="Priority"
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <MenuItem value="All">All Priorities</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Unread">Unread</MenuItem>
                  <MenuItem value="Read">Read</MenuItem>
                  <MenuItem value="Actionable">Actionable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredNotifications.length} of {notifications.length} notifications
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Stack spacing={2}>
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id}
            sx={{ 
              opacity: notification.isRead ? 0.7 : 1,
              borderLeft: notification.urgencyLevel ? `4px solid ${getUrgencyColor(notification.urgencyLevel)}` : 'none',
              '&:hover': { 
                boxShadow: 4,
                cursor: 'pointer' 
              }
            }}
            onClick={() => handleViewDetails(notification)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {getCategoryIcon(notification.category)}
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
                      {notification.title}
                    </Typography>
                    {!notification.isRead && (
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {notification.message}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={getPriorityIcon(notification.priority)}
                      label={notification.priority}
                      color={getPriorityColor(notification.priority) as any}
                      size="small"
                    />
                    <Chip
                      label={notification.category}
                      variant="outlined"
                      size="small"
                    />
                    {notification.isActionable && (
                      <Chip
                        label="Action Required"
                        color="warning"
                        size="small"
                      />
                    )}
                    {notification.clientName && (
                      <Chip
                        icon={<Person />}
                        label={notification.clientName}
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {notification.dueDate && (
                      <Chip
                        icon={<Schedule />}
                        label={`Due: ${new Date(notification.dueDate).toLocaleDateString()}`}
                        color="error"
                        size="small"
                      />
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notification.createdDate).toLocaleDateString()}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      notification.isRead ? handleMarkAsUnread(notification.id) : handleMarkAsRead(notification.id);
                    }}
                  >
                    <MarkAsUnread />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Notifications sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No notifications match your current filters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Detail Dialog */}
      <Dialog 
        open={detailDialogOpen} 
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedNotification && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {getCategoryIcon(selectedNotification.category)}
              {selectedNotification.title}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedNotification.message}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip
                      icon={getPriorityIcon(selectedNotification.priority)}
                      label={selectedNotification.priority}
                      color={getPriorityColor(selectedNotification.priority) as any}
                    />
                    <Chip label={selectedNotification.category} variant="outlined" />
                    <Chip label={selectedNotification.type} variant="outlined" />
                  </Box>
                </Box>

                {selectedNotification.isActionable && (
                  <Alert severity="warning">
                    <Typography variant="h6">Action Required</Typography>
                    <Typography>{selectedNotification.actionRequired}</Typography>
                  </Alert>
                )}

                <Divider />

                <Grid container spacing={2}>
                  {selectedNotification.clientName && (
                    <Grid xs={12} sm={6}>
                      <Typography variant="subtitle2">Client</Typography>
                      <Typography>{selectedNotification.clientName}</Typography>
                    </Grid>
                  )}
                  {selectedNotification.relatedNumber && (
                    <Grid xs={12} sm={6}>
                      <Typography variant="subtitle2">Related Policy/Case</Typography>
                      <Typography>{selectedNotification.relatedNumber}</Typography>
                    </Grid>
                  )}
                  <Grid xs={12} sm={6}>
                    <Typography variant="subtitle2">Created</Typography>
                    <Typography>{new Date(selectedNotification.createdDate).toLocaleString()}</Typography>
                  </Grid>
                  {selectedNotification.dueDate && (
                    <Grid xs={12} sm={6}>
                      <Typography variant="subtitle2">Due Date</Typography>
                      <Typography color="error">{new Date(selectedNotification.dueDate).toLocaleString()}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Stack>
            </DialogContent>
            <DialogActions>
              {selectedNotification.isActionable && (
                <Button variant="contained" color="primary">
                  Take Action
                </Button>
              )}
              <Button onClick={() => setDetailDialogOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default NotificationPage;