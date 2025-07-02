import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility,
  AttachMoney,
  Assignment,
  TrendingUp,
  Search,
  Refresh
} from '@mui/icons-material';
import { Case, Policy } from '../../types';

interface UnifiedDashboardProps {
  cases: Case[];
  policies: Policy[];
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ cases, policies }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setStatusFilter('');
    setProductFilter('');
  };

  const filteredCases = useMemo(() => {
    return cases.filter(case_ => {
      const matchesSearch = searchTerm === '' || 
        case_.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === '' || case_.status === statusFilter;
      const matchesProduct = productFilter === '' || case_.productType === productFilter;
      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [cases, searchTerm, statusFilter, productFilter]);

  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const matchesSearch = searchTerm === '' || 
        policy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === '' || policy.status === statusFilter;
      const matchesProduct = productFilter === '' || policy.productType === productFilter;
      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [policies, searchTerm, statusFilter, productFilter]);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' } = {
      'Submitted': 'info',
      'Under Review': 'warning',
      'Additional Requirements': 'warning',
      'Approved': 'success',
      'Declined': 'error',
      'Withdrawn': 'default',
      'Active': 'success',
      'Lapsed': 'error',
      'Surrendered': 'default',
      'Paid Up': 'info'
    };
    return statusColors[status] || 'default';
  };

  const getDashboardStats = () => {
    const activeCases = cases.filter(c => ['Submitted', 'Under Review', 'Additional Requirements', 'Approved'].includes(c.status));
    const activePolicies = policies.filter(p => p.status === 'Active');
    const totalCoverage = activePolicies.reduce((sum, p) => sum + p.coverageAmount, 0);
    const totalPremium = activePolicies.reduce((sum, p) => sum + p.annualPremium, 0);
    
    return {
      activeCases: activeCases.length,
      activePolicies: activePolicies.length,
      totalCoverage,
      totalPremium
    };
  };

  const stats = getDashboardStats();

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#003f7f' }}>
        Dashboard
      </Typography>

      {/* Key Metrics */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Assignment sx={{ fontSize: 40, color: '#003f7f', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#003f7f', fontWeight: 600 }}>
              {stats.activeCases}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Cases
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <AttachMoney sx={{ fontSize: 40, color: '#0066cc', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#0066cc', fontWeight: 600 }}>
              {stats.activePolicies}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Policies
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <TrendingUp sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#10b981', fontWeight: 600 }}>
              ${(stats.totalCoverage / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Coverage
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <AttachMoney sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#f59e0b', fontWeight: 600 }}>
              ${(stats.totalPremium / 1000).toFixed(0)}K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Annual Premium
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Cases</span>
                    <Chip label={stats.activeCases} color="primary" size="small" />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Policies</span>
                    <Chip label={stats.activePolicies} color="primary" size="small" />
                  </Box>
                } 
              />
            </Tabs>
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
              }}
              size="small"
              sx={{ minWidth: 250 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                {activeTab === 0 ? (
                  <>
                    <MenuItem value="Submitted">Submitted</MenuItem>
                    <MenuItem value="Under Review">Under Review</MenuItem>
                    <MenuItem value="Additional Requirements">Additional Requirements</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Declined">Declined</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Lapsed">Lapsed</MenuItem>
                    <MenuItem value="Surrendered">Surrendered</MenuItem>
                    <MenuItem value="Paid Up">Paid Up</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Product Type</InputLabel>
              <Select
                value={productFilter}
                label="Product Type"
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <MenuItem value="">All Products</MenuItem>
                <MenuItem value="Term Life">Term Life</MenuItem>
                <MenuItem value="Whole Life">Whole Life</MenuItem>
                <MenuItem value="Universal Life">Universal Life</MenuItem>
                <MenuItem value="Variable Universal Life">Variable Universal Life</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setProductFilter('');
              }}
              size="small"
            >
              Clear
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Cases Table */}
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600 }}>Case Number</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Product Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Coverage</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Premium</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id} hover>
                  <TableCell>{case_.caseNumber}</TableCell>
                  <TableCell>{case_.clientName}</TableCell>
                  <TableCell>{case_.productType}</TableCell>
                  <TableCell>${case_.coverageAmount.toLocaleString()}</TableCell>
                  <TableCell>${case_.annualPremium.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={case_.status} 
                      color={getStatusColor(case_.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(case_.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Policies Table */}
      {activeTab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600 }}>Policy Number</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Product Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Coverage</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Premium</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Renewal Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPolicies.map((policy) => (
                <TableRow key={policy.id} hover>
                  <TableCell>{policy.policyNumber}</TableCell>
                  <TableCell>{policy.clientName}</TableCell>
                  <TableCell>{policy.productType}</TableCell>
                  <TableCell>${policy.coverageAmount.toLocaleString()}</TableCell>
                  <TableCell>${policy.annualPremium.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={policy.status} 
                      color={getStatusColor(policy.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(policy.renewalDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};