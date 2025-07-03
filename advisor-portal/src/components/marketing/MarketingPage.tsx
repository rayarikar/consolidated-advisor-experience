import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Search as SearchIcon,
  Launch as LaunchIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { mockProducts, mockRiders, mockForms } from '../../data/marketingData';
import { InsuranceProduct, Rider, InsuranceForm } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`marketing-tabpanel-${index}`}
      aria-labelledby={`marketing-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function MarketingPage() {
  const [tabValue, setTabValue] = useState(0);
  const [productSearch, setProductSearch] = useState('');
  const [formSearch, setFormSearch] = useState('');
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [selectedFormCategory, setSelectedFormCategory] = useState<string>('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                           product.description.toLowerCase().includes(productSearch.toLowerCase()) ||
                           product.keyFeatures.some(feature => feature.toLowerCase().includes(productSearch.toLowerCase()));
      const matchesType = !selectedProductType || product.productType === selectedProductType;
      return matchesSearch && matchesType;
    });
  }, [productSearch, selectedProductType]);

  const filteredForms = useMemo(() => {
    return mockForms.filter(form => {
      const matchesSearch = form.name.toLowerCase().includes(formSearch.toLowerCase()) ||
                           form.description.toLowerCase().includes(formSearch.toLowerCase()) ||
                           form.formNumber.toLowerCase().includes(formSearch.toLowerCase());
      const matchesCategory = !selectedFormCategory || form.category === selectedFormCategory;
      return matchesSearch && matchesCategory;
    });
  }, [formSearch, selectedFormCategory]);

  const ProductCard = ({ product }: { product: InsuranceProduct }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {product.name}
          </Typography>
          <Chip 
            label={product.productType} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Key Features:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {product.keyFeatures.slice(0, 3).map((feature, index) => (
              <Chip key={index} label={feature} size="small" variant="outlined" />
            ))}
            {product.keyFeatures.length > 3 && (
              <Chip label={`+${product.keyFeatures.length - 3} more`} size="small" />
            )}
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Coverage:</strong> ${(product.coverageAmounts.min / 1000).toLocaleString()}K - ${(product.coverageAmounts.max / 1000000).toLocaleString()}M
          </Typography>
          <Typography variant="body2">
            <strong>Ages:</strong> {product.ageRanges.min} - {product.ageRanges.max}
          </Typography>
          <Typography variant="body2">
            <strong>Underwriting:</strong> {product.underwritingClass}
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Stack direction="row" spacing={1}>
            {product.illustration && (
              <Button
                size="small"
                startIcon={<DescriptionIcon />}
                href={product.illustration}
                target="_blank"
              >
                Illustration
              </Button>
            )}
            {product.rateBook && (
              <Button
                size="small"
                startIcon={<DownloadIcon />}
                href={product.rateBook}
                target="_blank"
              >
                Rates
              </Button>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );

  const FormCard = ({ form }: { form: InsuranceForm }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
              {form.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Form #{form.formNumber} • {form.category}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip 
              label={form.submissionMethod} 
              size="small" 
              color={form.submissionMethod === 'Electronic' ? 'success' : 'default'}
            />
            {form.externalUrl && (
              <IconButton 
                size="small" 
                href={form.externalUrl}
                target="_blank"
                color="primary"
              >
                <LaunchIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          {form.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Processing Time:</strong> {form.processingTime}
          </Typography>
          <Typography variant="body2">
            <strong>Last Updated:</strong> {form.lastUpdated} (v{form.version})
          </Typography>
        </Box>

        {form.requirements.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Requirements:
            </Typography>
            <List dense sx={{ py: 0 }}>
              {form.requirements.slice(0, 2).map((req, index) => (
                <ListItem key={index} sx={{ py: 0, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={req} 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
              {form.requirements.length > 2 && (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                  +{form.requirements.length - 2} more requirements
                </Typography>
              )}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Marketing Resources
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Product information, forms, and sales materials for life insurance advisors
      </Typography>

      <Paper elevation={1}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label="Product Information" 
            icon={<BusinessIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Forms Library" 
            icon={<AssignmentIcon />}
            iconPosition="start"
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search products, features, or benefits..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Product Type"
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="">All Types</option>
                  <option value="Term Life">Term Life</option>
                  <option value="Whole Life">Whole Life</option>
                  <option value="Universal Life">Universal Life</option>
                  <option value="Variable Universal Life">Variable Universal Life</option>
                  <option value="Indexed Universal Life">Indexed Universal Life</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Products ({filteredProducts.length})
          </Typography>
          
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} md={6} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Available Riders
          </Typography>
          
          <Grid container spacing={2}>
            {mockRiders.map((rider) => (
              <Grid item key={rider.id} xs={12} md={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <StarIcon color="primary" sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {rider.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rider.type} • {rider.cost}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {rider.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Key Benefits:
                    </Typography>
                    <List dense>
                      {rider.keyBenefits.map((benefit, index) => (
                        <ListItem key={index} sx={{ py: 0, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CheckCircleIcon fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search forms by name, number, or purpose..."
                  value={formSearch}
                  onChange={(e) => setFormSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={selectedFormCategory}
                  onChange={(e) => setSelectedFormCategory(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="">All Categories</option>
                  <option value="New Business">New Business</option>
                  <option value="Policy Service">Policy Service</option>
                  <option value="Claims">Claims</option>
                  <option value="Compliance">Compliance</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Forms Library ({filteredForms.length})
          </Typography>
          
          <Grid container spacing={3}>
            {filteredForms.map((form) => (
              <Grid item key={form.id} xs={12} md={6}>
                <FormCard form={form} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}