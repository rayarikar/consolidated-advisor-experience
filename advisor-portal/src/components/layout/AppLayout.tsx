import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Person,
  AttachMoney,
  SupportAgent,
  Notifications,
  AccountCircle,
  ExitToApp,
  Business,
  SmartToy,
  Search,
  ChevronLeft,
  ChevronRight,
  Assessment
} from '@mui/icons-material';
import { User } from '../../types';
import { mockNotifications } from '../../data/mockData';

const drawerWidth = 240;
const collapsedDrawerWidth = 72;

interface AppLayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  onToggleCopilot?: () => void;
  onOpenSearch?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  user,
  onLogout,
  onToggleCopilot,
  onOpenSearch
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;

  // Load collapse state from localStorage
  useEffect(() => {
    const savedCollapseState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapseState !== null) {
      setIsCollapsed(JSON.parse(savedCollapseState));
    }
  }, []);

  // Save collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { id: 'self-service', label: 'Self Service', icon: <SupportAgent />, path: '/self-service' },
    { id: 'illustrations', label: 'Illustrations', icon: <Assessment />, path: '/illustrations' },
    { id: 'marketing', label: 'Marketing', icon: <Business />, path: '/marketing' },
    { id: 'commissions', label: 'Commissions', icon: <AttachMoney />, path: '/commissions' },
    { id: 'profile', label: 'Profile', icon: <Person />, path: '/profile' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: isCollapsed ? 'center' : 'space-between' }}>
          {!isCollapsed && (
            <Typography variant="h6" sx={{ color: '#003f7f', fontWeight: 600 }}>
              Advisor Portal
            </Typography>
          )}
          <IconButton
            onClick={handleSidebarToggle}
            size="small"
            sx={{
              color: '#003f7f',
              ml: isCollapsed ? 0 : 'auto',
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Tooltip title={isCollapsed ? item.label : ''} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2.5,
                  textDecoration: 'none',
                  color: 'inherit',
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    borderRight: '3px solid #003f7f',
                    '& .MuiListItemIcon-root': {
                      color: '#003f7f',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#003f7f',
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 3,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isCollapsed ? collapsedDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${isCollapsed ? collapsedDrawerWidth : drawerWidth}px` },
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'white', fontWeight: 600 }}>
            {isCollapsed ? 'Advisor Portal' : (menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard')}
          </Typography>
          
          <IconButton 
            color="inherit" 
            sx={{ mr: 1 }}
            onClick={onOpenSearch}
            title="Search Advisor Portal"
          >
            <Search />
          </IconButton>

          <IconButton 
            color="inherit" 
            sx={{ mr: 1 }}
            component={Link}
            to="/notifications"
          >
            <Badge badgeContent={unreadNotifications} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton 
            color="inherit" 
            sx={{ mr: 2 }}
            onClick={onToggleCopilot}
            title="Prudential Copilot"
          >
            <SmartToy />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#0066cc' }}>
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleProfileMenuClose(); onLogout(); }}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { sm: isCollapsed ? collapsedDrawerWidth : drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isCollapsed ? collapsedDrawerWidth : drawerWidth}px)` },
          mt: 8,
          backgroundColor: '#f8f9fa',
          minHeight: 'calc(100vh - 64px)',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};