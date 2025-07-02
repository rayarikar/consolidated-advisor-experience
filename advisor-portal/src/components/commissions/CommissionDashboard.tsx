import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
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
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  CalendarToday,
  Assessment,
  Receipt,
  AccountBalance,
  Warning,
  CheckCircle,
  Schedule,
  Print
} from '@mui/icons-material';
import { mockCommissions } from '../../data/mockData';
import { Commission } from '../../types';

const CommissionDashboard: React.FC = () => {
  const [commissions] = useState<Commission[]>(mockCommissions);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterYear, setFilterYear] = useState<string>('2024');
  const [filterQuarter, setFilterQuarter] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterProduct] = useState<string>('All');
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  // Calculate key metrics
  const currentYear = 2024;
  const currentMonth = 7; // July

  const metrics = useMemo(() => {
    const ytdCommissions = commissions.filter(c => c.year === currentYear && c.paymentStatus !== 'Adjusted');
    const currentMonthCommissions = commissions.filter(c => 
      c.year === currentYear && 
      new Date(c.paymentDate).getMonth() === currentMonth - 1 &&
      c.paymentStatus !== 'Adjusted'
    );
    const pendingCommissions = commissions.filter(c => c.paymentStatus === 'Pending');
    const lastYearCommissions = commissions.filter(c => c.year === currentYear - 1 && c.paymentStatus !== 'Adjusted');

    const ytdTotal = ytdCommissions.reduce((sum, c) => sum + c.amount, 0);
    const currentMonthTotal = currentMonthCommissions.reduce((sum, c) => sum + c.amount, 0);
    const pendingTotal = pendingCommissions.reduce((sum, c) => sum + c.amount, 0);
    const lastYearTotal = lastYearCommissions.reduce((sum, c) => sum + c.amount, 0);

    const ytdGrowth = lastYearTotal > 0 ? ((ytdTotal - lastYearTotal) / lastYearTotal) * 100 : 0;
    const avgMonthly = ytdTotal / currentMonth;

    // Commission type breakdown
    const firstYearTotal = ytdCommissions.filter(c => c.commissionType === 'First Year').reduce((sum, c) => sum + c.amount, 0);
    const renewalTotal = ytdCommissions.filter(c => c.commissionType === 'Renewal').reduce((sum, c) => sum + c.amount, 0);
    const trailTotal = ytdCommissions.filter(c => c.commissionType === 'Trail').reduce((sum, c) => sum + c.amount, 0);
    const bonusTotal = ytdCommissions.filter(c => c.commissionType === 'Bonus').reduce((sum, c) => sum + c.amount, 0);

    // Product breakdown
    const productBreakdown = ytdCommissions.reduce((acc, c) => {
      if (c.productType !== 'Bonus') {
        acc[c.productType] = (acc[c.productType] || 0) + c.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    const topProduct = Object.entries(productBreakdown).sort(([,a], [,b]) => b - a)[0];

    return {
      ytdTotal,
      currentMonthTotal,
      pendingTotal,
      avgMonthly,
      ytdGrowth,
      firstYearTotal,
      renewalTotal,
      trailTotal,
      bonusTotal,
      productBreakdown,
      topProduct: topProduct ? { name: topProduct[0], percentage: (topProduct[1] / ytdTotal) * 100 } : null,
      renewalRate: renewalTotal > 0 ? (renewalTotal / (firstYearTotal + renewalTotal)) * 100 : 0
    };
  }, [commissions, currentYear, currentMonth]);

  // Filter commissions
  const filteredCommissions = useMemo(() => {
    return commissions.filter(commission => {
      const yearMatch = filterYear === 'All' || commission.year.toString() === filterYear;
      const quarterMatch = filterQuarter === 'All' || commission.quarter.toString() === filterQuarter;
      const typeMatch = filterType === 'All' || commission.commissionType === filterType;
      const statusMatch = filterStatus === 'All' || commission.paymentStatus === filterStatus;
      const productMatch = filterProduct === 'All' || commission.productType === filterProduct;
      const searchMatch = searchTerm === '' || 
        commission.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      return yearMatch && quarterMatch && typeMatch && statusMatch && productMatch && searchMatch;
    });
  }, [commissions, filterYear, filterQuarter, filterType, filterStatus, filterProduct, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Adjusted': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle />;
      case 'Pending': return <Schedule />;
      case 'Adjusted': return <Warning />;
      default: return <CheckCircle />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const handleDownload = (type: 'monthly' | 'quarterly' | 'annual' | 'ytd', format: 'pdf' | 'excel' | 'csv') => {
    // Mock download functionality
    const filename = `commission_statement_${type}_${filterYear}.${format}`;
    console.log(`Downloading ${filename}`);
    setDownloadDialogOpen(false);
    
    // In a real application, this would trigger actual file generation and download
    alert(`Commission statement (${type}) downloaded as ${format.toUpperCase()}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AttachMoney />
          Commission Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your earnings • Download statements • Analyze performance
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e8', borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    {formatCurrency(metrics.ytdTotal)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    YTD Earnings
                  </Typography>
                  <Typography variant="caption" sx={{ color: metrics.ytdGrowth >= 0 ? '#2e7d32' : '#d32f2f' }}>
                    {formatPercentage(metrics.ytdGrowth)} vs last year
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {metrics.ytdGrowth >= 0 ? 
                    <TrendingUp sx={{ fontSize: 40, color: '#4caf50' }} /> :
                    <TrendingDown sx={{ fontSize: 40, color: '#f44336' }} />
                  }
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {formatCurrency(metrics.currentMonthTotal)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This Month
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    July 2024
                  </Typography>
                </Box>
                <CalendarToday sx={{ fontSize: 40, color: '#2196f3' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                    {formatCurrency(metrics.pendingTotal)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {commissions.filter(c => c.paymentStatus === 'Pending').length} payments
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, color: '#ff9800' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5', borderLeft: '4px solid #9c27b0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                    {formatCurrency(metrics.avgMonthly)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Monthly
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Based on YTD
                  </Typography>
                </Box>
                <Assessment sx={{ fontSize: 40, color: '#9c27b0' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => setDownloadDialogOpen(true)}
            >
              Download Statements
            </Button>
            <Button
              variant="outlined"
              startIcon={<Receipt />}
              onClick={() => handleDownload('monthly', 'pdf')}
            >
              Current Month
            </Button>
            <Button
              variant="outlined"
              startIcon={<Assessment />}
              onClick={() => handleDownload('ytd', 'excel')}
            >
              YTD Summary
            </Button>
            <Button
              variant="outlined"
              startIcon={<AccountBalance />}
              onClick={() => handleDownload('annual', 'pdf')}
            >
              Tax Statement
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Commission Breakdown */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Commission Breakdown (YTD)</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e8', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ color: '#2e7d32' }}>
                      {formatCurrency(metrics.firstYearTotal)}
                    </Typography>
                    <Typography variant="body2">First Year</Typography>
                    <Typography variant="caption">
                      {((metrics.firstYearTotal / metrics.ytdTotal) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ color: '#1976d2' }}>
                      {formatCurrency(metrics.renewalTotal)}
                    </Typography>
                    <Typography variant="body2">Renewal</Typography>
                    <Typography variant="caption">
                      {((metrics.renewalTotal / metrics.ytdTotal) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ color: '#f57c00' }}>
                      {formatCurrency(metrics.trailTotal)}
                    </Typography>
                    <Typography variant="body2">Trail</Typography>
                    <Typography variant="caption">
                      {((metrics.trailTotal / metrics.ytdTotal) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f3e5f5', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ color: '#7b1fa2' }}>
                      {formatCurrency(metrics.bonusTotal)}
                    </Typography>
                    <Typography variant="body2">Bonus</Typography>
                    <Typography variant="caption">
                      {((metrics.bonusTotal / metrics.ytdTotal) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Performance Metrics</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Top Product</Typography>
                  <Typography variant="h6">
                    {metrics.topProduct?.name}
                  </Typography>
                  <Typography variant="caption">
                    {metrics.topProduct?.percentage.toFixed(1)}% of earnings
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="body2" color="text.secondary">Renewal Rate</Typography>
                  <Typography variant="h6">
                    {metrics.renewalRate.toFixed(1)}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(metrics.renewalRate, 100)} 
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Divider />
                <Box>
                  <Typography variant="body2" color="text.secondary">Total Transactions</Typography>
                  <Typography variant="h6">
                    {commissions.filter(c => c.year === currentYear).length}
                  </Typography>
                  <Typography variant="caption">This year</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Filter & Search</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search client, policy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Year</InputLabel>
                <Select
                  value={filterYear}
                  label="Year"
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <MenuItem value="All">All Years</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Quarter</InputLabel>
                <Select
                  value={filterQuarter}
                  label="Quarter"
                  onChange={(e) => setFilterQuarter(e.target.value)}
                >
                  <MenuItem value="All">All Quarters</MenuItem>
                  <MenuItem value="1">Q1</MenuItem>
                  <MenuItem value="2">Q2</MenuItem>
                  <MenuItem value="3">Q3</MenuItem>
                  <MenuItem value="4">Q4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  label="Type"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="All">All Types</MenuItem>
                  <MenuItem value="First Year">First Year</MenuItem>
                  <MenuItem value="Renewal">Renewal</MenuItem>
                  <MenuItem value="Trail">Trail</MenuItem>
                  <MenuItem value="Bonus">Bonus</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Adjusted">Adjusted</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <Typography variant="body2" color="text.secondary">
                {filteredCommissions.length} records
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Commission Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Commission Details</Typography>
            <Box>
              <Tooltip title="Print Table">
                <IconButton>
                  <Print />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export to Excel">
                <IconButton onClick={() => handleDownload('ytd', 'excel')}>
                  <Download />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell>Payment Date</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Policy #</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Rate %</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCommissions
                  .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
                  .map((commission) => (
                  <TableRow key={commission.id} hover>
                    <TableCell>
                      {new Date(commission.paymentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{commission.clientName}</TableCell>
                    <TableCell>{commission.policyNumber}</TableCell>
                    <TableCell>{commission.productType}</TableCell>
                    <TableCell>
                      <Chip 
                        label={commission.commissionType} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {commission.percentage > 0 ? `${commission.percentage}%` : '—'}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(commission.amount)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(commission.paymentStatus)}
                        label={commission.paymentStatus}
                        color={getStatusColor(commission.paymentStatus) as any}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Download Dialog */}
      <Dialog open={downloadDialogOpen} onClose={() => setDownloadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Download Commission Statements</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select the time period and format for your commission statement.
          </Typography>
          
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Time Period:</Typography>
          <List>
            <ListItem button onClick={() => handleDownload('monthly', 'pdf')}>
              <ListItemText 
                primary="Current Month (July 2024)" 
                secondary="Detailed monthly breakdown with all transactions"
              />
            </ListItem>
            <ListItem button onClick={() => handleDownload('quarterly', 'pdf')}>
              <ListItemText 
                primary="Current Quarter (Q3 2024)" 
                secondary="Quarterly summary with month-by-month totals"
              />
            </ListItem>
            <ListItem button onClick={() => handleDownload('ytd', 'excel')}>
              <ListItemText 
                primary="Year-to-Date (2024)" 
                secondary="Complete YTD analysis with trends and breakdowns"
              />
            </ListItem>
            <ListItem button onClick={() => handleDownload('annual', 'pdf')}>
              <ListItemText 
                primary="Annual Tax Statement (2023)" 
                secondary="IRS-compliant 1099 format for tax filing"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDownloadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommissionDashboard;