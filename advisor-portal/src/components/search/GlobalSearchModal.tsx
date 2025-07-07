import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  IconButton,
  Typography,
  Fade,
  Backdrop,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';

interface GlobalSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  open,
  onClose,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (open) {
      setSearchQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      onClose();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: { 
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
            maxWidth: 700,
            outline: 'none',
          }}
          onClick={handleBackdropClick}
        >
          {/* Modern Search Container */}
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'hidden',
            }}
          >
            {/* Header with Close Button */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                pt: 3,
                pb: 1,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  fontSize: '1.1rem',
                }}
              >
                Search Advisor Portal
              </Typography>
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'text.secondary',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: '12px',
                  width: 36,
                  height: 36,
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Modern Search Input */}
            <Box sx={{ px: 3, pb: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    backgroundColor: 'rgba(59, 130, 246, 0.02)',
                  },
                  '&:focus-within': {
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    backgroundColor: 'white',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <SearchIcon 
                    sx={{ 
                      color: 'text.secondary', 
                      fontSize: '1.25rem',
                      mr: 1.5,
                    }} 
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Search across clients, policies, products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    sx={{
                      '& .MuiInput-underline:before': { display: 'none' },
                      '& .MuiInput-underline:after': { display: 'none' },
                      '& .MuiInputBase-input': {
                        fontSize: '1.1rem',
                        fontWeight: 400,
                        color: 'text.primary',
                        '&::placeholder': {
                          color: 'text.secondary',
                          opacity: 0.7,
                        },
                      },
                    }}
                  />
                  {searchQuery && (
                    <IconButton
                      onClick={handleSearch}
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        width: 32,
                        height: 32,
                        borderRadius: '10px',
                        ml: 1,
                        '&:hover': { 
                          backgroundColor: 'primary.dark',
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                      size="small"
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Search Categories - Single Line */}
            <Box sx={{ px: 3, pb: 2 }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 1.5, fontSize: '0.9rem', fontWeight: 500 }}
              >
                Search across:
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  maxHeight: '40px',
                  overflow: 'hidden',
                }}
              >
                {[
                  'Clients',
                  'Policies', 
                  'Cases',
                  'Products',
                  'Forms',
                  'Commissions',
                  'Notifications',
                  'Documentation',
                ].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: 'primary.main',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      height: '28px',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Quick Tips - Compact */}
            <Box 
              sx={{ 
                mx: 3, 
                mb: 3, 
                p: 2, 
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbIcon 
                  sx={{ 
                    fontSize: '1rem', 
                    color: 'text.secondary', 
                    mr: 1,
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.primary',
                    fontSize: '0.85rem',
                  }}
                >
                  Quick Tips
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  fontSize: '0.8rem',
                  lineHeight: 1.4,
                }}
              >
                Try searching for client names, policy numbers, product types like "term life", 
                or rider names. Press Enter to search or Escape to close.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};