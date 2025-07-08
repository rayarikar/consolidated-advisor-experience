import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Alert,
  Stack
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { User } from '../../types';
import { CommunicationPreferences } from './CommunicationPreferences';
import { mockAgentPreferences } from '../../data/preferencesData';

interface ProfileManagementProps {
  user: User;
  onUpdateProfile: (updatedUser: User) => void;
}

export const ProfileManagement: React.FC<ProfileManagementProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    onUpdateProfile(editedUser);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#003f7f' }}>
        Profile Management
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Profile Overview */}
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: '#003f7f',
                fontSize: '2rem'
              }}
            >
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Agency Code: {user.agencyCode}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Licensed States
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                {user.licenseStates.map((state) => (
                  <Chip
                    key={state}
                    label={state}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#003f7f' }}>
                Profile Details
              </Typography>
              {!isEditing ? (
                <Button
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  variant="outlined"
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<Save />}
                    onClick={handleSave}
                    variant="contained"
                    size="small"
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    variant="outlined"
                    size="small"
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={isEditing ? editedUser.firstName : user.firstName}
                  onChange={handleChange('firstName')}
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={isEditing ? editedUser.lastName : user.lastName}
                  onChange={handleChange('lastName')}
                  disabled={!isEditing}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  value={isEditing ? editedUser.email : user.email}
                  onChange={handleChange('email')}
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={isEditing ? editedUser.phone : user.phone}
                  onChange={handleChange('phone')}
                  disabled={!isEditing}
                />
              </Box>
              
              <TextField
                fullWidth
                label="Title"
                value={isEditing ? editedUser.title : user.title}
                onChange={handleChange('title')}
                disabled={!isEditing}
              />
              
              <TextField
                fullWidth
                label="License Number"
                value={isEditing ? editedUser.licenseNumber : user.licenseNumber}
                onChange={handleChange('licenseNumber')}
                disabled={!isEditing}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Communication Preferences Section */}
      <Box sx={{ mt: 3 }}>
        <CommunicationPreferences preferences={mockAgentPreferences} />
      </Box>
    </Box>
  );
};