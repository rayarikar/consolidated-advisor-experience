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
  Refresh,
  ArrowUpward,
  ArrowDownward,
  FilterList
} from '@mui/icons-material';
import { Case, Policy } from '../../types';

interface UnifiedDashboardProps {
  cases: Case[];
  policies: Policy[];
}

type SortDirection = 'asc' | 'desc' | null;
type SortField = string;

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ cases, policies }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setSortField('');
    setSortDirection(null);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField('');
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredCases = useMemo(() => {
    let filtered = cases.filter(case_ => {
      const matchesSearch = searchTerm === '' || 
        case_.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.underwriter.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = filtered.sort((a, b) => {
        let aVal: any = a[sortField as keyof Case];
        let bVal: any = b[sortField as keyof Case];

        // Handle special cases for sorting
        if (sortField === 'coverageAmount' || sortField === 'annualPremium') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else if (sortField === 'lastUpdated' || sortField === 'submissionDate') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [cases, searchTerm, sortField, sortDirection]);

  const filteredPolicies = useMemo(() => {
    let filtered = policies.filter(policy => {
      const matchesSearch = searchTerm === '' || 
        policy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.premiumMode.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = filtered.sort((a, b) => {
        let aVal: any = a[sortField as keyof Policy];
        let bVal: any = b[sortField as keyof Policy];

        // Handle special cases for sorting
        if (sortField === 'coverageAmount' || sortField === 'annualPremium') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else if (sortField === 'issueDate' || sortField === 'renewalDate') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [policies, searchTerm, sortField, sortDirection]);

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

  const SortableTableCell = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableCell 
      sx={{ 
        fontWeight: 600, 
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': { backgroundColor: '#f5f5f5' },
        position: 'relative',
        paddingRight: 4
      }}
      onClick={() => handleSort(field)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {children}
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
          {sortField === field ? (
            sortDirection === 'asc' ? (
              <ArrowUpward sx={{ fontSize: 16, color: '#003f7f' }} />
            ) : (
              <ArrowDownward sx={{ fontSize: 16, color: '#003f7f' }} />
            )
          ) : (
            <FilterList sx={{ fontSize: 16, color: 'action.disabled' }} />
          )}
        </Box>
      </Box>
    </TableCell>
  );

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

          {/* Unified Search Bar */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder={`Search ${activeTab === 0 ? 'cases' : 'policies'} by client name, ${activeTab === 0 ? 'case number' : 'policy number'}, product type, ${activeTab === 0 ? 'underwriter' : 'premium mode'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchTerm('');
                }
              }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                endAdornment: searchTerm && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm('')}
                    sx={{ mr: 1 }}
                  >
                    <Typography variant="body2" sx={{ color: 'action.active' }}>✕</Typography>
                  </IconButton>
                ),
              }}
              size="medium"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                  }
                }
              }}
            />
            {searchTerm && (
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Found {activeTab === 0 ? filteredCases.length : filteredPolicies.length} {activeTab === 0 ? 'case(s)' : 'policy(ies)'} matching "{searchTerm}"
              </Typography>
            )}
          </Box>

          {/* Clear/Reset Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {sortField && sortDirection && (
                <Chip 
                  label={`Sorted by ${sortField} (${sortDirection === 'asc' ? 'A→Z' : 'Z→A'})`}
                  color="primary"
                  variant="outlined"
                  size="small"
                  onDelete={() => {
                    setSortField('');
                    setSortDirection(null);
                  }}
                />
              )}
              <Typography variant="body2" color="text.secondary">
                Click column headers to sort • Click again to reverse • Click third time to clear
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                setSearchTerm('');
                setSortField('');
                setSortDirection(null);
              }}
              size="small"
            >
              Clear All
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
                <SortableTableCell field="caseNumber">Case Number</SortableTableCell>
                <SortableTableCell field="clientName">Client Name</SortableTableCell>
                <SortableTableCell field="productType">Product Type</SortableTableCell>
                <SortableTableCell field="coverageAmount">Coverage</SortableTableCell>
                <SortableTableCell field="annualPremium">Premium</SortableTableCell>
                <SortableTableCell field="status">Status</SortableTableCell>
                <SortableTableCell field="lastUpdated">Last Updated</SortableTableCell>
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
                <SortableTableCell field="policyNumber">Policy Number</SortableTableCell>
                <SortableTableCell field="clientName">Client Name</SortableTableCell>
                <SortableTableCell field="productType">Product Type</SortableTableCell>
                <SortableTableCell field="coverageAmount">Coverage</SortableTableCell>
                <SortableTableCell field="annualPremium">Premium</SortableTableCell>
                <SortableTableCell field="status">Status</SortableTableCell>
                <SortableTableCell field="renewalDate">Renewal Date</SortableTableCell>
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