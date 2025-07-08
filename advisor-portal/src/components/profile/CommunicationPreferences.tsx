import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Sms as SmsIcon,
  Phone as PhoneIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { AgentPreferences } from '../../types';

interface CommunicationPreferencesProps {
  preferences: AgentPreferences;
}

export const CommunicationPreferences: React.FC<CommunicationPreferencesProps> = ({
  preferences,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatChannels = (channels: string[]) => {
    return channels.map(channel => capitalizeFirst(channel)).join(', ');
  };

  const formatTimeSlots = (timeSlots: any[]) => {
    return timeSlots.map(slot => 
      `${capitalizeFirst(slot.dayOfWeek)}: ${slot.startTime} - ${slot.endTime}`
    ).join(', ');
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Communication Preferences
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Agent ID: {preferences.agentId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Updated: {formatDate(preferences.lastUpdated)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Communication Channels */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Communication Channels
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Email
              </Typography>
              <Chip 
                label={preferences.communicationChannels.email.enabled ? 'Enabled' : 'Disabled'} 
                color={preferences.communicationChannels.email.enabled ? 'success' : 'default'}
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Address: {preferences.communicationChannels.email.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Frequency: {capitalizeFirst(preferences.communicationChannels.email.frequency)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SmsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                SMS
              </Typography>
              <Chip 
                label={preferences.communicationChannels.sms.enabled ? 'Enabled' : 'Disabled'} 
                color={preferences.communicationChannels.sms.enabled ? 'success' : 'default'}
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Phone: {preferences.communicationChannels.sms.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Frequency: {capitalizeFirst(preferences.communicationChannels.sms.frequency)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Phone
              </Typography>
              <Chip 
                label={preferences.communicationChannels.phone.enabled ? 'Enabled' : 'Disabled'} 
                color={preferences.communicationChannels.phone.enabled ? 'success' : 'default'}
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Phone: {preferences.communicationChannels.phone.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available: {formatTimeSlots(preferences.communicationChannels.phone.timeSlots)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Push Notifications
              </Typography>
              <Chip 
                label={preferences.communicationChannels.pushNotification.enabled ? 'Enabled' : 'Disabled'} 
                color={preferences.communicationChannels.pushNotification.enabled ? 'success' : 'default'}
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Devices: {preferences.communicationChannels.pushNotification.deviceTokens.length} registered
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MailIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Mail
              </Typography>
              <Chip 
                label={preferences.communicationChannels.mail.enabled ? 'Enabled' : 'Disabled'} 
                color={preferences.communicationChannels.mail.enabled ? 'success' : 'default'}
                size="small" 
                sx={{ ml: 1 }} 
              />
            </Box>
            {preferences.communicationChannels.mail.address && (
              <Typography variant="body2" color="text.secondary">
                Address: {preferences.communicationChannels.mail.address.street}, {preferences.communicationChannels.mail.address.city}, {preferences.communicationChannels.mail.address.state} {preferences.communicationChannels.mail.address.zipCode}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Communication Types */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Notification Types
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Lead Assignments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.leadAssignments.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Priority: {capitalizeFirst(preferences.communicationTypes.leadAssignments.priority)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Policy Renewals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.policyRenewals.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Advance Notice: {preferences.communicationTypes.policyRenewals.advanceNotice} days
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Claims
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.claims.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Urgent Only: {preferences.communicationTypes.claims.urgentOnly ? 'Yes' : 'No'}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Compliance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.compliance.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mandatory: {preferences.communicationTypes.compliance.mandatory ? 'Yes' : 'No'}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Marketing
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.marketing.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Opt-in: {preferences.communicationTypes.marketing.optIn ? 'Yes' : 'No'}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Training
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.training.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reminders: {preferences.communicationTypes.training.reminders ? 'Yes' : 'No'}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Commissions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Channels: {formatChannels(preferences.communicationTypes.commissions.channels)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Statements: {preferences.communicationTypes.commissions.statements ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Business Hours */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Business Hours
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Timezone: {preferences.businessHours.timezone}
        </Typography>

        <Grid container spacing={1}>
          {Object.entries(preferences.businessHours.schedule).map(([day, schedule]) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={day}>
              <Box sx={{ p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {capitalizeFirst(day)}
                </Typography>
                {schedule.isWorkingDay ? (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {schedule.startTime} - {schedule.endTime}
                    </Typography>
                    {schedule.breakTimes && schedule.breakTimes.length > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        Breaks: {schedule.breakTimes.map((b: any) => `${b.startTime}-${b.endTime}`).join(', ')}
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Off
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};