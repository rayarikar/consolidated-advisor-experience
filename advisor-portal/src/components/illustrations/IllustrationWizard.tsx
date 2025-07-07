import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Switch,
  InputAdornment,
  Alert,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { IllustrationResult, IllustrationRequest, ClientInfo } from '../../types';
import { availableProducts, defaultAssumptions, usStates, calculateIllustration, calculateSummary } from '../../data/illustrationData';

interface IllustrationWizardProps {
  illustration?: IllustrationResult | null;
  onSave: (illustration: IllustrationResult) => void;
  onCancel: () => void;
}

const steps = ['Client Information', 'Product Selection', 'Coverage & Premium', 'Illustration Options'];

export const IllustrationWizard: React.FC<IllustrationWizardProps> = ({
  illustration,
  onSave,
  onCancel,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    age: 35,
    gender: 'Male',
    smokerStatus: 'Non-Smoker',
    healthClass: 'Preferred',
    state: 'NY',
  });

  const [productInfo, setProductInfo] = useState<{
    productId: string;
    productName: string;
    productType: 'Term Life' | 'Whole Life' | 'Universal Life' | 'Variable Universal Life' | 'Indexed Universal Life';
  }>({
    productId: '',
    productName: '',
    productType: 'Term Life',
  });

  const [coverageInfo, setCoverageInfo] = useState<{
    coverageAmount: number;
    premiumType: 'Target Premium' | 'Minimum Premium' | 'Maximum Premium' | 'Custom Amount';
    premiumAmount: number;
    premiumMode: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
    paymentDuration: 'Life' | 'To Age 65' | 'To Age 100' | '10 Years' | '15 Years' | '20 Years' | 'Single Pay';
  }>({
    coverageAmount: 500000,
    premiumType: 'Target Premium',
    premiumAmount: 0,
    premiumMode: 'Annual',
    paymentDuration: 'Life',
  });

  const [illustrationOptions, setIllustrationOptions] = useState({
    illustrationEndAge: 100,
    assumptions: { ...defaultAssumptions },
    options: {
      showGuaranteed: true,
      showCurrent: true,
      includeDividends: false,
      includeLoans: false,
    },
  });

  // Load existing illustration data if editing
  useEffect(() => {
    if (illustration) {
      const req = illustration.request;
      setClientInfo(req.clientInfo);
      setProductInfo({
        productId: req.productId,
        productName: req.productName,
        productType: req.productType,
      });
      setCoverageInfo({
        coverageAmount: req.coverageAmount,
        premiumType: req.premiumType,
        premiumAmount: req.premiumAmount || 0,
        premiumMode: req.premiumMode,
        paymentDuration: req.paymentDuration,
      });
      setIllustrationOptions({
        illustrationEndAge: req.illustrationEndAge,
        assumptions: req.assumptions,
        options: req.options,
      });
    }
  }, [illustration]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Client Information
        if (!clientInfo.name.trim()) newErrors.name = 'Client name is required';
        if (clientInfo.age < 18 || clientInfo.age > 85) newErrors.age = 'Age must be between 18 and 85';
        break;
      case 1: // Product Selection
        if (!productInfo.productId) newErrors.productId = 'Please select a product';
        break;
      case 2: // Coverage & Premium
        if (coverageInfo.coverageAmount < 25000) newErrors.coverageAmount = 'Minimum coverage is $25,000';
        if (coverageInfo.premiumAmount <= 0) newErrors.premiumAmount = 'Premium amount must be greater than 0';
        break;
      case 3: // Illustration Options
        if (illustrationOptions.illustrationEndAge < clientInfo.age + 10) {
          newErrors.illustrationEndAge = 'Illustration end age must be at least 10 years from current age';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleProductChange = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
      setProductInfo({
        productId: product.id,
        productName: product.name,
        productType: product.type as any,
      });

      // Update default assumptions based on product type
      const newAssumptions = { ...defaultAssumptions };
      if (product.type === 'Term Life') {
        newAssumptions.currentInterestRate = 0;
        newAssumptions.guaranteedInterestRate = 0;
        newAssumptions.dividendScale = 'Zero';
      } else if (product.type === 'Whole Life') {
        newAssumptions.dividendScale = 'Current';
      }

      setIllustrationOptions(prev => ({
        ...prev,
        assumptions: newAssumptions,
        options: {
          ...prev.options,
          includeDividends: product.type === 'Whole Life',
        },
      }));
    }
  };

  const handleSave = () => {
    if (!validateStep(activeStep)) return;

    const request: IllustrationRequest = {
      id: illustration?.id || `req-${Date.now()}`,
      clientInfo,
      productId: productInfo.productId,
      productName: productInfo.productName,
      productType: productInfo.productType,
      coverageAmount: coverageInfo.coverageAmount,
      premiumType: coverageInfo.premiumType,
      premiumAmount: coverageInfo.premiumAmount,
      premiumMode: coverageInfo.premiumMode,
      paymentDuration: coverageInfo.paymentDuration,
      illustrationEndAge: illustrationOptions.illustrationEndAge,
      assumptions: illustrationOptions.assumptions,
      options: illustrationOptions.options,
    };

    const projections = calculateIllustration(request);
    const summary = calculateSummary(projections, request);

    const result: IllustrationResult = {
      id: illustration?.id || `ill-${Date.now()}`,
      request,
      projections,
      summary,
      createdDate: illustration?.createdDate || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      createdBy: 'jadams',
      status: 'Draft',
      complianceDisclosures: [
        'This illustration is based on current assumptions and is not guaranteed.',
        'Actual results may vary based on company experience.',
        productInfo.productType !== 'Term Life' ? 'Policy values are subject to interest rate and expense variations.' : 'This is a term policy with no cash value.',
      ].filter(Boolean),
    };

    onSave(result);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Client Information
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Client Name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={clientInfo.age}
                onChange={(e) => setClientInfo(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                error={!!errors.age}
                helperText={errors.age}
                inputProps={{ min: 18, max: 85 }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={clientInfo.gender}
                  label="Gender"
                  onChange={(e) => setClientInfo(prev => ({ ...prev, gender: e.target.value as any }))}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Smoker Status</InputLabel>
                <Select
                  value={clientInfo.smokerStatus}
                  label="Smoker Status"
                  onChange={(e) => setClientInfo(prev => ({ ...prev, smokerStatus: e.target.value as any }))}
                >
                  <MenuItem value="Non-Smoker">Non-Smoker</MenuItem>
                  <MenuItem value="Smoker">Smoker</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Health Class</InputLabel>
                <Select
                  value={clientInfo.healthClass}
                  label="Health Class"
                  onChange={(e) => setClientInfo(prev => ({ ...prev, healthClass: e.target.value as any }))}
                >
                  <MenuItem value="Super Preferred">Super Preferred</MenuItem>
                  <MenuItem value="Preferred Plus">Preferred Plus</MenuItem>
                  <MenuItem value="Preferred">Preferred</MenuItem>
                  <MenuItem value="Standard Plus">Standard Plus</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Table Rated">Table Rated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  value={clientInfo.state}
                  label="State"
                  onChange={(e) => setClientInfo(prev => ({ ...prev, state: e.target.value }))}
                >
                  {usStates.map(state => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1: // Product Selection
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors.productId}>
                <InputLabel>Select Product</InputLabel>
                <Select
                  value={productInfo.productId}
                  label="Select Product"
                  onChange={(e) => handleProductChange(e.target.value)}
                >
                  {availableProducts.map(product => (
                    <MenuItem key={product.id} value={product.id}>
                      <Box>
                        <Typography variant="subtitle1">{product.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.productId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.productId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {productInfo.productId && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="info">
                  <Typography variant="subtitle2">Product Details:</Typography>
                  <Typography variant="body2">
                    {availableProducts.find(p => p.id === productInfo.productId)?.description}
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        );

      case 2: // Coverage & Premium
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Coverage Amount"
                type="number"
                value={coverageInfo.coverageAmount}
                onChange={(e) => setCoverageInfo(prev => ({ ...prev, coverageAmount: parseInt(e.target.value) || 0 }))}
                error={!!errors.coverageAmount}
                helperText={errors.coverageAmount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Premium Mode</InputLabel>
                <Select
                  value={coverageInfo.premiumMode}
                  label="Premium Mode"
                  onChange={(e) => setCoverageInfo(prev => ({ ...prev, premiumMode: e.target.value as any }))}
                >
                  <MenuItem value="Annual">Annual</MenuItem>
                  <MenuItem value="Semi-Annual">Semi-Annual</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Premium Amount"
                type="number"
                value={coverageInfo.premiumAmount}
                onChange={(e) => setCoverageInfo(prev => ({ ...prev, premiumAmount: parseInt(e.target.value) || 0 }))}
                error={!!errors.premiumAmount}
                helperText={errors.premiumAmount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Payment Duration</InputLabel>
                <Select
                  value={coverageInfo.paymentDuration}
                  label="Payment Duration"
                  onChange={(e) => setCoverageInfo(prev => ({ ...prev, paymentDuration: e.target.value as any }))}
                >
                  <MenuItem value="Life">Life</MenuItem>
                  <MenuItem value="To Age 65">To Age 65</MenuItem>
                  <MenuItem value="To Age 100">To Age 100</MenuItem>
                  <MenuItem value="10 Years">10 Years</MenuItem>
                  <MenuItem value="15 Years">15 Years</MenuItem>
                  <MenuItem value="20 Years">20 Years</MenuItem>
                  <MenuItem value="Single Pay">Single Pay</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 3: // Illustration Options
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Illustration End Age"
                type="number"
                value={illustrationOptions.illustrationEndAge}
                onChange={(e) => setIllustrationOptions(prev => ({ ...prev, illustrationEndAge: parseInt(e.target.value) || 100 }))}
                error={!!errors.illustrationEndAge}
                helperText={errors.illustrationEndAge}
                inputProps={{ min: clientInfo.age + 10, max: 100 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Current Interest Rate (%)"
                type="number"
                value={illustrationOptions.assumptions.currentInterestRate}
                onChange={(e) => setIllustrationOptions(prev => ({
                  ...prev,
                  assumptions: { ...prev.assumptions, currentInterestRate: parseFloat(e.target.value) || 0 }
                }))}
                inputProps={{ min: 0, max: 15, step: 0.1 }}
                disabled={productInfo.productType === 'Term Life'}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Guaranteed Rate (%)"
                type="number"
                value={illustrationOptions.assumptions.guaranteedInterestRate}
                onChange={(e) => setIllustrationOptions(prev => ({
                  ...prev,
                  assumptions: { ...prev.assumptions, guaranteedInterestRate: parseFloat(e.target.value) || 0 }
                }))}
                inputProps={{ min: 0, max: 10, step: 0.1 }}
                disabled={productInfo.productType === 'Term Life'}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Dividend Scale</InputLabel>
                <Select
                  value={illustrationOptions.assumptions.dividendScale}
                  label="Dividend Scale"
                  onChange={(e) => setIllustrationOptions(prev => ({
                    ...prev,
                    assumptions: { ...prev.assumptions, dividendScale: e.target.value as any }
                  }))}
                  disabled={productInfo.productType !== 'Whole Life'}
                >
                  <MenuItem value="Current">Current</MenuItem>
                  <MenuItem value="Zero">Zero</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>Display Options</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={illustrationOptions.options.showGuaranteed}
                    onChange={(e) => setIllustrationOptions(prev => ({
                      ...prev,
                      options: { ...prev.options, showGuaranteed: e.target.checked }
                    }))}
                  />
                }
                label="Show Guaranteed Values"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={illustrationOptions.options.showCurrent}
                    onChange={(e) => setIllustrationOptions(prev => ({
                      ...prev,
                      options: { ...prev.options, showCurrent: e.target.checked }
                    }))}
                    disabled={productInfo.productType === 'Term Life'}
                  />
                }
                label="Show Current Values"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={illustrationOptions.options.includeDividends}
                    onChange={(e) => setIllustrationOptions(prev => ({
                      ...prev,
                      options: { ...prev.options, includeDividends: e.target.checked }
                    }))}
                    disabled={productInfo.productType !== 'Whole Life'}
                  />
                }
                label="Include Dividends"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={illustrationOptions.options.includeLoans}
                    onChange={(e) => setIllustrationOptions(prev => ({
                      ...prev,
                      options: { ...prev.options, includeLoans: e.target.checked }
                    }))}
                    disabled={productInfo.productType === 'Term Life'}
                  />
                }
                label="Include Loan Options"
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          {illustration ? 'Edit Illustration' : 'Create New Illustration'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Complete the form below to generate a professional insurance illustration
        </Typography>
      </Box>

      {/* Stepper */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ mt: 4 }}>
            {renderStepContent(activeStep)}
          </Box>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={activeStep === 0 ? onCancel : handleBack}
          variant="outlined"
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Illustration
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};