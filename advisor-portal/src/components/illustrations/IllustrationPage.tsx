import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { IllustrationResult } from '../../types';
import { IllustrationWizard } from './IllustrationWizard';
import { IllustrationResults } from './IllustrationResults';
import { mockSavedIllustrations } from '../../data/illustrationData';

export const IllustrationPage: React.FC = () => {
  const [savedIllustrations, setSavedIllustrations] = useState<IllustrationResult[]>(mockSavedIllustrations);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedIllustration, setSelectedIllustration] = useState<IllustrationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Load saved illustrations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedIllustrations');
    if (stored) {
      setSavedIllustrations(JSON.parse(stored));
    }
  }, []);

  // Save illustrations to localStorage
  useEffect(() => {
    localStorage.setItem('savedIllustrations', JSON.stringify(savedIllustrations));
  }, [savedIllustrations]);

  const handleCreateNew = () => {
    setSelectedIllustration(null);
    setShowWizard(true);
  };

  const handleEditIllustration = (illustration: IllustrationResult) => {
    setSelectedIllustration(illustration);
    setShowWizard(true);
  };

  const handleViewIllustration = (illustration: IllustrationResult) => {
    setSelectedIllustration(illustration);
    setShowResults(true);
  };

  const handleDeleteIllustration = (id: string) => {
    setSavedIllustrations(prev => prev.filter(ill => ill.id !== id));
  };

  const handleSaveIllustration = (illustration: IllustrationResult) => {
    setSavedIllustrations(prev => {
      const existing = prev.find(ill => ill.id === illustration.id);
      if (existing) {
        return prev.map(ill => ill.id === illustration.id ? illustration : ill);
      } else {
        return [...prev, illustration];
      }
    });
    setShowWizard(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'default';
      case 'Finalized': return 'primary';
      case 'Presented': return 'success';
      case 'Archived': return 'secondary';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (showWizard) {
    return (
      <IllustrationWizard
        illustration={selectedIllustration}
        onSave={handleSaveIllustration}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  if (showResults && selectedIllustration) {
    return (
      <IllustrationResults
        illustration={selectedIllustration}
        onBack={() => setShowResults(false)}
        onEdit={() => {
          setShowResults(false);
          setShowWizard(true);
        }}
      />
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
            Insurance Illustrations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage product illustrations for your clients
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          size="large"
          sx={{ px: 3, py: 1.5 }}
        >
          Create New Illustration
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                  <AssessmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {savedIllustrations.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Illustrations
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                  <ViewIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {savedIllustrations.filter(ill => ill.status === 'Presented').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Presented to Clients
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main' }}>
                  <EditIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {savedIllustrations.filter(ill => ill.status === 'Draft').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Draft Illustrations
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'info.light', color: 'info.main' }}>
                  <PdfIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {savedIllustrations.filter(ill => ill.status === 'Finalized').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Finalized
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Saved Illustrations */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Saved Illustrations
          </Typography>
          
          {savedIllustrations.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <AssessmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No illustrations created yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first illustration to get started
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNew}
              >
                Create New Illustration
              </Button>
            </Box>
          ) : (
            <List>
              {savedIllustrations.map((illustration, index) => (
                <React.Fragment key={illustration.id}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                        cursor: 'pointer',
                      },
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {illustration.request.clientInfo.name}
                          </Typography>
                          <Chip
                            label={illustration.status}
                            size="small"
                            color={getStatusColor(illustration.status) as any}
                            variant="filled"
                          />
                          <Chip
                            label={illustration.request.productType}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Coverage: {formatCurrency(illustration.request.coverageAmount)} • 
                            Premium: {formatCurrency(illustration.request.premiumAmount || 0)} {illustration.request.premiumMode}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Created: {formatDate(illustration.createdDate)} • 
                            Last Modified: {formatDate(illustration.lastModified)}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewIllustration(illustration)}
                          title="View Illustration"
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditIllustration(illustration)}
                          title="Edit Illustration"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          title="Export PDF"
                        >
                          <PdfIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          title="Share"
                        >
                          <ShareIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteIllustration(illustration.id)}
                          title="Delete"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < savedIllustrations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Floating Action Button for quick access */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={handleCreateNew}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};