import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
  IconButton,
  Collapse,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  PictureAsPdf as PdfIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { IllustrationResult } from '../../types';
import { IllustrationTable } from './IllustrationTable';
import { IllustrationCharts } from './IllustrationCharts';

interface IllustrationResultsProps {
  illustration: IllustrationResult;
  onBack: () => void;
  onEdit: () => void;
}

export const IllustrationResults: React.FC<IllustrationResultsProps> = ({
  illustration,
  onBack,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const { request, projections, summary } = illustration;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'default';
      case 'Finalized': return 'primary';
      case 'Presented': return 'success';
      case 'Archived': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onBack} size="large">
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Insurance Illustration
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Typography variant="subtitle1" color="text.secondary">
                {request.clientInfo.name} • {request.productName}
              </Typography>
              <Chip
                label={illustration.status}
                size="small"
                color={getStatusColor(illustration.status) as any}
                variant="filled"
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          <Button
            variant="contained"
            startIcon={<PdfIcon />}
          >
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Client & Product Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Client Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Name:</Typography>
                  <Typography variant="body2">{request.clientInfo.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Age:</Typography>
                  <Typography variant="body2">{request.clientInfo.age}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Gender:</Typography>
                  <Typography variant="body2">{request.clientInfo.gender}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Smoker Status:</Typography>
                  <Typography variant="body2">{request.clientInfo.smokerStatus}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Health Class:</Typography>
                  <Typography variant="body2">{request.clientInfo.healthClass}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">State:</Typography>
                  <Typography variant="body2">{request.clientInfo.state}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Product Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Product:</Typography>
                  <Typography variant="body2">{request.productName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Type:</Typography>
                  <Typography variant="body2">{request.productType}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Coverage Amount:</Typography>
                  <Typography variant="body2">{formatCurrency(request.coverageAmount)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Premium:</Typography>
                  <Typography variant="body2">
                    {formatCurrency(request.premiumAmount || 0)} {request.premiumMode}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Payment Duration:</Typography>
                  <Typography variant="body2">{request.paymentDuration}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Illustration End Age:</Typography>
                  <Typography variant="body2">{request.illustrationEndAge}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Key Metrics Summary */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Key Illustration Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {formatCurrency(summary.totalPremiumsPaid)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Premiums Paid
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {formatCurrency(summary.cashValueAt65)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Cash Value at Age 65
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'info.main' }}>
                  {formatCurrency(summary.deathBenefitAt65)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Death Benefit at Age 65
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  {formatPercentage(summary.internalRateOfReturn)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Internal Rate of Return
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  {summary.breakEvenYear || 'N/A'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Break-Even Year
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Illustration Assumptions */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setShowAssumptions(!showAssumptions)}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Illustration Assumptions
            </Typography>
            {showAssumptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          <Collapse in={showAssumptions}>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" color="text.secondary">Current Interest Rate:</Typography>
                <Typography variant="body2">{formatPercentage(request.assumptions.currentInterestRate)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" color="text.secondary">Guaranteed Rate:</Typography>
                <Typography variant="body2">{formatPercentage(request.assumptions.guaranteedInterestRate)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" color="text.secondary">Dividend Scale:</Typography>
                <Typography variant="body2">{request.assumptions.dividendScale}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" color="text.secondary">Expense Charges:</Typography>
                <Typography variant="body2">{formatPercentage(request.assumptions.expenseCharges)}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" color="text.secondary">Mortality Table:</Typography>
                <Typography variant="body2">{request.assumptions.mortalityTable}</Typography>
              </Grid>
            </Grid>
          </Collapse>
        </CardContent>
      </Card>

      {/* Illustration Data Tabs */}
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Performance Table" />
              <Tab label="Charts & Graphs" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <IllustrationTable
              projections={projections}
              request={request}
            />
          )}

          {activeTab === 1 && (
            <IllustrationCharts
              projections={projections}
              request={request}
              summary={summary}
            />
          )}
        </CardContent>
      </Card>

      {/* Compliance Disclosures */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <InfoIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Important Disclosures
            </Typography>
          </Box>
          {illustration.complianceDisclosures.map((disclosure, index) => (
            <Alert key={index} severity="info" sx={{ mb: 1 }}>
              <Typography variant="body2">{disclosure}</Typography>
            </Alert>
          ))}
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary">
              Illustration created: {formatDate(illustration.createdDate)} • 
              Last modified: {formatDate(illustration.lastModified)} • 
              Created by: {illustration.createdBy}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};