import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prudentialTheme } from './theme/prudentialTheme';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { AppLayout } from './components/layout/AppLayout';
import { UnifiedDashboard } from './components/dashboard/UnifiedDashboard';
import { ProfileManagement } from './components/profile/ProfileManagement';
import NotificationPage from './components/notifications/NotificationPage';
import { 
  mockUser, 
  mockPreferences, 
  mockCases, 
  mockPolicies, 
  mockCommissions, 
  mockSelfServiceRequests 
} from './data/mockData';
import { User, Preferences, SelfServiceRequest } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [userPreferences, setUserPreferences] = useState<Preferences>(mockPreferences);
  const [selfServiceRequests, setSelfServiceRequests] = useState(mockSelfServiceRequests);
  const [authError, setAuthError] = useState('');

  // Load from localStorage on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    const storedPreferences = localStorage.getItem('userPreferences');
    const storedRequests = localStorage.getItem('selfServiceRequests');

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
    if (storedRequests) {
      setSelfServiceRequests(JSON.parse(storedRequests));
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Simple mock authentication - in real app, this would call an API
    if (username === 'jadams' && password === 'password') {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleRegister = (userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    licenseNumber: string;
  }) => {
    // Create new user object
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      title: 'Insurance Advisor',
      licenseStates: ['NY'],
      agencyCode: 'NYC001',
    };
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setAuthError('');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const handleUpdatePreferences = (updatedPreferences: Preferences) => {
    setUserPreferences(updatedPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
  };

  const handleSubmitRequest = (request: Omit<SelfServiceRequest, 'id'>) => {
    const newRequest: SelfServiceRequest = {
      ...request,
      id: Date.now().toString(),
    };
    const updatedRequests = [...selfServiceRequests, newRequest];
    setSelfServiceRequests(updatedRequests);
    localStorage.setItem('selfServiceRequests', JSON.stringify(updatedRequests));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <UnifiedDashboard cases={mockCases} policies={mockPolicies} />;
      case 'profile':
        return <ProfileManagement user={currentUser} onUpdateProfile={handleUpdateProfile} />;
      case 'preferences':
        return <NotificationPage />;
      case 'self-service':
        return <div style={{ padding: 20 }}>Self-service page coming soon...</div>;
      case 'commissions':
        return <div style={{ padding: 20 }}>Commission dashboard coming soon...</div>;
      default:
        return <UnifiedDashboard cases={mockCases} policies={mockPolicies} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={prudentialTheme}>
        <CssBaseline />
        {showRegister ? (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setShowRegister(false)}
            error={authError}
          />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setShowRegister(true)}
            error={authError}
          />
        )}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={prudentialTheme}>
      <CssBaseline />
      <AppLayout
        user={currentUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      >
        {renderCurrentPage()}
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
