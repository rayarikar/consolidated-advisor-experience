import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
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
  Search,
  Refresh,
  ArrowUpward,
  ArrowDownward,
  FilterList,
  Folder,
  Policy as PolicyIcon,
  AccountBalance,
  Payments
} from '@mui/icons-material';
import { Case, Policy } from '../../types';

interface UnifiedDashboardProps {
  cases: Case[];
  policies: Policy[];
}

type SortDirection = 'asc' | 'desc' | null;
type SortField = string;

type ViewFilter = 'all' | 'cases' | 'policies';

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ cases, policies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');

  const handleViewFilterChange = (filter: ViewFilter) => {
    setViewFilter(filter);
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

  // Create unified data structure
  const unifiedData = useMemo(() => {
    const casesData = cases.map(case_ => ({
      ...case_,
      type: 'case' as const,
      number: case_.caseNumber,
      date: case_.lastUpdated,
      secondaryInfo: case_.underwriter
    }));

    const policiesData = policies.map(policy => ({
      ...policy,
      type: 'policy' as const,
      number: policy.policyNumber,
      date: policy.renewalDate,
      secondaryInfo: policy.premiumMode
    }));

    return [...casesData, ...policiesData];
  }, [cases, policies]);

  const filteredData = useMemo(() => {
    let filtered = unifiedData.filter(item => {
      // Apply view filter
      if (viewFilter === 'cases' && item.type !== 'case') return false;
      if (viewFilter === 'policies' && item.type !== 'policy') return false;

      // Apply search filter - search all table fields
      const matchesSearch = searchTerm === '' || 
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.secondaryInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.coverageAmount.toString().includes(searchTerm.toLowerCase()) ||
        item.annualPremium.toString().includes(searchTerm.toLowerCase()) ||
        new Date(item.date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.type === 'case' ? 'case' : 'policy').includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = filtered.sort((a, b) => {
        let aVal: any = a[sortField as keyof typeof a];
        let bVal: any = b[sortField as keyof typeof b];

        // Handle special cases for sorting
        if (sortField === 'coverageAmount' || sortField === 'annualPremium') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else if (sortField === 'date' || sortField === 'lastUpdated' || sortField === 'renewalDate') {
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
  }, [unifiedData, viewFilter, searchTerm, sortField, sortDirection]);

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
    const totalCoverage = [...activeCases, ...activePolicies].reduce((sum, item) => sum + item.coverageAmount, 0);
    const totalPremium = [...activeCases, ...activePolicies].reduce((sum, item) => sum + item.annualPremium, 0);
    
    return {
      activeCases: activeCases.length,
      activePolicies: activePolicies.length,
      totalItems: activeCases.length + activePolicies.length,
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
          <CardContent sx={{ py: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'center' }}>
              <Folder sx={{ fontSize: 24, color: '#003f7f', mr: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Active Cases
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: '#003f7f', fontWeight: 600 }}>
              {stats.activeCases}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ py: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'center' }}>
              <PolicyIcon sx={{ fontSize: 24, color: '#0066cc', mr: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Active Policies
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: '#0066cc', fontWeight: 600 }}>
              {stats.activePolicies}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ py: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'center' }}>
              <AccountBalance sx={{ fontSize: 24, color: '#10b981', mr: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Total Coverage
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: '#10b981', fontWeight: 600 }}>
              ${(stats.totalCoverage / 1000000).toFixed(1)}M
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ py: 2, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'center' }}>
              <Payments sx={{ fontSize: 24, color: '#f59e0b', mr: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Annual Premium
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: '#f59e0b', fontWeight: 600 }}>
              ${(stats.totalPremium / 1000).toFixed(0)}K
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Bubble Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#003f7f', mb: 2 }}>
              View Filter
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant={viewFilter === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleViewFilterChange('all')}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
                startIcon={<Assignment />}
              >
                All ({stats.totalItems})
              </Button>
              <Button
                variant={viewFilter === 'cases' ? 'contained' : 'outlined'}
                onClick={() => handleViewFilterChange('cases')}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
                startIcon={<Assignment />}
              >
                Cases ({stats.activeCases})
              </Button>
              <Button
                variant={viewFilter === 'policies' ? 'contained' : 'outlined'}
                onClick={() => handleViewFilterChange('policies')}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
                startIcon={<AttachMoney />}
              >
                Policies ({stats.activePolicies})
              </Button>
            </Box>
          </Box>

          {/* Unified Search Bar */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder={`Search ${viewFilter === 'all' ? 'cases and policies' : viewFilter} by any field (name, number, type, status, amount, date)...`}
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
                Found {filteredData.length} item(s) matching "{searchTerm}"
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

      {/* Unified Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <SortableTableCell field="type">Type</SortableTableCell>
              <SortableTableCell field="number">Number</SortableTableCell>
              <SortableTableCell field="clientName">Client Name</SortableTableCell>
              <SortableTableCell field="productType">Product Type</SortableTableCell>
              <SortableTableCell field="coverageAmount">Coverage</SortableTableCell>
              <SortableTableCell field="annualPremium">Premium</SortableTableCell>
              <SortableTableCell field="status">Status</SortableTableCell>
              <SortableTableCell field="date">Date</SortableTableCell>
              <SortableTableCell field="secondaryInfo">Details</SortableTableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={`${item.type}-${item.id}`} hover>
                  <TableCell>
                    <Chip 
                      label={item.type === 'case' ? 'Case' : 'Policy'} 
                      color={item.type === 'case' ? 'info' : 'success'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{item.number}</TableCell>
                  <TableCell>{item.clientName}</TableCell>
                  <TableCell>{item.productType}</TableCell>
                  <TableCell>${item.coverageAmount.toLocaleString()}</TableCell>
                  <TableCell>${item.annualPremium.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={item.status} 
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>{item.secondaryInfo}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No {viewFilter === 'all' ? 'cases or policies' : viewFilter} found
                    {searchTerm && ` matching "${searchTerm}"`}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};