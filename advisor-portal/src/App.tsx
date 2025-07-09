import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prudentialTheme } from './theme/prudentialTheme';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { AppLayout } from './components/layout/AppLayout';
import { UnifiedDashboard } from './components/dashboard/UnifiedDashboard';
import { ProfileManagement } from './components/profile/ProfileManagement';
import NotificationPage from './components/notifications/NotificationPage';
import SelfServicePage from './components/self-service/SelfServicePage';
import CommissionDashboard from './components/commissions/CommissionDashboard';
import MarketingPage from './components/marketing/MarketingPage';
import { IllustrationPage } from './components/illustrations/IllustrationPage';
import { CopilotPanel } from './components/copilot/CopilotPanel';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { SearchResultsPage } from './components/search/SearchResultsPage';
import { 
  mockUser, 
  mockPreferences, 
  mockCases, 
  mockPolicies, 
  mockCommissions, 
  mockSelfServiceRequests,
  mockNotifications
} from './data/mockData';
import { User, Preferences, SelfServiceRequest } from './types';

const AppContent = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [userPreferences, setUserPreferences] = useState<Preferences>(mockPreferences);
  const [selfServiceRequests, setSelfServiceRequests] = useState(mockSelfServiceRequests);
  const [authError, setAuthError] = useState('');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCopilotMinimized, setIsCopilotMinimized] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleToggleCopilot = () => {
    if (isCopilotMinimized) {
      setIsCopilotMinimized(false);
      setIsCopilotOpen(true);
    } else {
      setIsCopilotOpen(!isCopilotOpen);
    }
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchModalOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/search-results');
  };

  const handleBackFromSearch = () => {
    setSearchQuery('');
    navigate('/dashboard');
  };

  const handleCloseCopilot = () => {
    setIsCopilotOpen(false);
    setIsCopilotMinimized(false);
  };

  const handleMinimizeCopilot = () => {
    setIsCopilotOpen(false);
    setIsCopilotMinimized(true);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };


  return (
    <>
      <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            !isAuthenticated ? (
              showRegister ? (
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
              )
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <Navigate to="/dashboard" replace />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <UnifiedDashboard 
                  cases={mockCases} 
                  policies={mockPolicies} 
                  notifications={mockNotifications}
                  onNavigateToNotifications={() => window.location.href = '/notifications'}
                />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <NotificationPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <ProfileManagement user={currentUser} onUpdateProfile={handleUpdateProfile} />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/self-service" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <SelfServicePage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/commissions" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <CommissionDashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/marketing" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <MarketingPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/illustrations" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <IllustrationPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/search-results" element={
            <ProtectedRoute>
              <AppLayout
                user={currentUser}
                onLogout={handleLogout}
                onToggleCopilot={handleToggleCopilot}
                onOpenSearch={handleOpenSearch}
              >
                <SearchResultsPage 
                  searchQuery={searchQuery}
                  onBack={handleBackFromSearch}
                  onNewSearch={handleSearch}
                />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
        
        <GlobalSearchModal
          open={searchModalOpen}
          onClose={handleCloseSearch}
          onSearch={handleSearch}
        />
        
        <CopilotPanel
          isOpen={isCopilotOpen}
          onClose={handleCloseCopilot}
          onMinimize={handleMinimizeCopilot}
        />
      </>
  );
};

function App() {
  return (
    <ThemeProvider theme={prudentialTheme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
