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
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { mockProducts, mockRiders, mockForms } from '../../data/marketingData';
import { InsuranceProduct, InsuranceForm } from '../../types';

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
  const [selectedProductType, setSelectedProductType] = useState<string>('All Types');
  const [selectedFormCategory, setSelectedFormCategory] = useState<string>('All Categories');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                           product.description.toLowerCase().includes(productSearch.toLowerCase()) ||
                           product.keyFeatures.some(feature => feature.toLowerCase().includes(productSearch.toLowerCase()));
      const matchesType = selectedProductType === 'All Types' || product.productType === selectedProductType;
      
      // If searching for riders, show products that have those riders
      const riderKeywords = ['waiver', 'accidental', 'long-term', 'chronic', 'child', 'conversion', 'paid-up', 'family', 'disability', 'return', 'spouse', 'no-lapse', 'enhanced', 'investment', 'index'];
      const hasRiderSearch = riderKeywords.some(keyword => 
        productSearch.toLowerCase().includes(keyword)
      );
      if (hasRiderSearch) {
        const matchingRiders = mockRiders.filter(rider => 
          rider.name.toLowerCase().includes(productSearch.toLowerCase()) ||
          rider.description.toLowerCase().includes(productSearch.toLowerCase())
        );
        const hasMatchingRider = matchingRiders.some(rider => 
          rider.compatibleProducts.includes(product.id)
        );
        return hasMatchingRider && matchesType;
      }
      
      return matchesSearch && matchesType;
    });
  }, [productSearch, selectedProductType]);

  const filteredForms = useMemo(() => {
    return mockForms.filter(form => {
      const matchesSearch = form.name.toLowerCase().includes(formSearch.toLowerCase()) ||
                           form.description.toLowerCase().includes(formSearch.toLowerCase()) ||
                           form.formNumber.toLowerCase().includes(formSearch.toLowerCase());
      const matchesCategory = selectedFormCategory === 'All Categories' || form.category === selectedFormCategory;
      return matchesSearch && matchesCategory;
    });
  }, [formSearch, selectedFormCategory]);

  const filteredRiders = useMemo(() => {
    return mockRiders.filter(rider => {
      const matchesSearch = rider.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                           rider.description.toLowerCase().includes(productSearch.toLowerCase()) ||
                           rider.type.toLowerCase().includes(productSearch.toLowerCase());
      return matchesSearch;
    });
  }, [productSearch]);

  const getProductRiders = (productId: string) => {
    return mockRiders.filter(rider => rider.compatibleProducts.includes(productId));
  };

  const getRiderProducts = (riderId: string) => {
    const rider = mockRiders.find(r => r.id === riderId);
    if (!rider) return [];
    return mockProducts.filter(product => rider.compatibleProducts.includes(product.id));
  };

  const ProductCard = ({ product }: { product: InsuranceProduct }) => {
    const productRiders = getProductRiders(product.id);
    
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 500 }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              {product.name}
            </Typography>
            <Chip 
              label={product.productType} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4 }}>
            {product.description}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>
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
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              <strong>Coverage:</strong> ${(product.coverageAmounts.min / 1000).toLocaleString()}K - ${(product.coverageAmounts.max / 1000000).toLocaleString()}M
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              <strong>Ages:</strong> {product.ageRanges.min} - {product.ageRanges.max}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              <strong>Underwriting:</strong> {product.underwritingClass}
            </Typography>
          </Box>

          {productRiders.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>
                Available Riders:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {productRiders.slice(0, 4).map((rider) => (
                  <Chip 
                    key={rider.id} 
                    label={rider.name} 
                    size="small" 
                    color="secondary"
                    variant="outlined"
                  />
                ))}
                {productRiders.length > 4 && (
                  <Chip label={`+${productRiders.length - 4} more`} size="small" color="secondary" />
                )}
              </Stack>
            </Box>
          )}

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {product.illustration && (
                <Button
                  size="small"
                  startIcon={<DescriptionIcon />}
                  href={product.illustration}
                  target="_blank"
                  variant="outlined"
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
                  variant="outlined"
                >
                  Rates
                </Button>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const FormCard = ({ form }: { form: InsuranceForm }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 500 }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              {form.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              Form #{form.formNumber} • {form.category}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
        
        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.4, flexGrow: 1 }}>
          {form.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            <strong>Processing Time:</strong> {form.processingTime}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            <strong>Last Updated:</strong> {form.lastUpdated} (v{form.version})
          </Typography>
        </Box>

        {form.requirements.length > 0 && (
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, fontSize: '0.9rem' }}>
              Requirements:
            </Typography>
            <List dense sx={{ py: 0 }}>
              {form.requirements.slice(0, 3).map((req, index) => (
                <ListItem key={index} sx={{ py: 0.25, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={req} 
                    primaryTypographyProps={{ variant: 'body2', fontSize: '0.85rem' }}
                  />
                </ListItem>
              ))}
              {form.requirements.length > 3 && (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 3, fontSize: '0.8rem' }}>
                  +{form.requirements.length - 3} more requirements
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
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search products, riders, features, or benefits..."
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
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Product Type"
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="All Types">All Types</option>
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
              <Grid key={product.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {/* Show riders section only if search might match riders or if no specific product search */}
          {(filteredRiders.length > 0 || productSearch === '') && (
            <>
              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {productSearch && filteredRiders.length > 0 ? 
                  `Matching Riders (${filteredRiders.length})` : 
                  'Available Riders'
                }
              </Typography>
              
              <Grid container spacing={2}>
                {(productSearch && filteredRiders.length > 0 ? filteredRiders : mockRiders).map((rider) => {
                  const compatibleProducts = getRiderProducts(rider.id);
                  return (
                    <Grid key={rider.id} size={{ xs: 12, md: 6 }}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <StarIcon color="primary" sx={{ mr: 1 }} />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {rider.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {rider.type} • {rider.cost}
                              </Typography>
                              {compatibleProducts.length > 0 && (
                                <Typography variant="caption" color="primary">
                                  Compatible with {compatibleProducts.length} products
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {rider.description}
                          </Typography>
                          
                          {compatibleProducts.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                Compatible Products:
                              </Typography>
                              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {compatibleProducts.slice(0, 3).map((product) => (
                                  <Chip 
                                    key={product.id} 
                                    label={product.name} 
                                    size="small" 
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))}
                                {compatibleProducts.length > 3 && (
                                  <Chip label={`+${compatibleProducts.length - 3} more`} size="small" color="primary" />
                                )}
                              </Stack>
                            </Box>
                          )}
                          
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
                  );
                })}
              </Grid>
            </>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
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
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={selectedFormCategory}
                  onChange={(e) => setSelectedFormCategory(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="All Categories">All Categories</option>
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
              <Grid key={form.id} size={{ xs: 12, md: 6 }}>
                <FormCard form={form} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}