import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { YearlyProjection, IllustrationRequest, IllustrationSummary } from '../../types';

interface IllustrationChartsProps {
  projections: YearlyProjection[];
  request: IllustrationRequest;
  summary: IllustrationSummary;
}

export const IllustrationCharts: React.FC<IllustrationChartsProps> = ({
  projections,
  request,
  summary,
}) => {
  const isTermLife = request.productType === 'Term Life';
  
  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for charts (sample every 5 years for readability)
  const chartData = projections.filter((p, index) => 
    index === 0 || p.policyYear % 5 === 0 || index === projections.length - 1
  ).map(projection => ({
    age: projection.age,
    year: projection.policyYear,
    premiumPaid: projection.premiumPaid,
    cumulativePremiums: projection.cumulativePremiums,
    deathBenefit: projection.deathBenefit,
    cashValueGuaranteed: projection.cashValue.guaranteed,
    cashValueCurrent: projection.cashValue.current,
    surrenderValue: projection.endOfYearValues.surrenderValue,
    netAmount: projection.netAmount,
  }));

  // Pie chart data for premium allocation (example)
  const premiumAllocationData = [
    { name: 'Cost of Insurance', value: 35, color: '#ff6b6b' },
    { name: 'Cash Value', value: 45, color: '#4ecdc4' },
    { name: 'Expenses', value: 15, color: '#45b7d1' },
    { name: 'Profit Margin', value: 5, color: '#96ceb4' },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Age {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Visual Performance Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Cash Value Growth Chart */}
        {!isTermLife && (
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Cash Value Growth Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="age" 
                      label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {request.options.showGuaranteed && (
                      <Area
                        type="monotone"
                        dataKey="cashValueGuaranteed"
                        stackId="1"
                        stroke="#ff9800"
                        fill="#ffcc80"
                        name="Cash Value (Guaranteed)"
                      />
                    )}
                    {request.options.showCurrent && (
                      <Area
                        type="monotone"
                        dataKey="cashValueCurrent"
                        stackId="2"
                        stroke="#4caf50"
                        fill="#81c784"
                        name="Cash Value (Current)"
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Death Benefit vs Premium Chart */}
        <Grid size={{ xs: 12, lg: isTermLife ? 12 : 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Death Benefit vs. Cumulative Premiums
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="age" 
                    label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="deathBenefit"
                    stroke="#2196f3"
                    strokeWidth={3}
                    name="Death Benefit"
                    dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativePremiums"
                    stroke="#f44336"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Cumulative Premiums"
                    dot={{ fill: '#f44336', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Premium Payment Schedule */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Annual Premium Payments
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.filter(d => d.premiumPaid > 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="age" 
                    label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    label={{ value: 'Premium ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="premiumPaid"
                    fill="#9c27b0"
                    name="Annual Premium"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Premium Allocation (if not term life) */}
        {!isTermLife && (
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Premium Allocation (Illustrative)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={premiumAllocationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {premiumAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Policy Performance Metrics */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Key Performance Milestones
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {summary.breakEvenYear || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Break-Even Year
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      When cash value exceeds total premiums paid
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                      {summary.internalRateOfReturn.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Internal Rate of Return
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Based on cash value at age 65
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'info.main' }}>
                      {formatCurrency(summary.maximumOutlay)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Maximum Outlay
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total premiums to be paid
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                      {((summary.cashValueAt65 / summary.totalPremiumsPaid - 1) * 100).toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cash Value Return
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Cash value growth vs. premiums at 65
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Notes */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Chart Notes:
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          • All projections are based on current assumptions and are not guaranteed
          <br />
          • Charts show data points at 5-year intervals for clarity
          <br />
          • Premium allocation percentages are illustrative and may vary by product and policy year
          <br />
          {!isTermLife && '• Cash value charts reflect surrender charges and policy expenses'}
          <br />
          • Actual results may differ based on company experience and market conditions
        </Typography>
      </Box>
    </Box>
  );
};