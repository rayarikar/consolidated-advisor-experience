import { createTheme } from '@mui/material/styles';

export const prudentialTheme = createTheme({
  palette: {
    primary: {
      main: '#003f7f', // Prudential Blue
      light: '#0066cc', // Light Blue
      dark: '#002952', // Dark Blue
    },
    secondary: {
      main: '#6b7280', // Gray
      light: '#f3f4f6', // Light Gray
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Prudential Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#003f7f',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#003f7f',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#003f7f',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#003f7f',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: '#003f7f',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#003f7f',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#003f7f',
          '&:hover': {
            backgroundColor: '#002952',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003f7f',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #e5e7eb',
        },
      },
    },
  },
});