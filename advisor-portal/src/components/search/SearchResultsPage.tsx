import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Grid,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Policy as PolicyIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  Notifications as NotificationsIcon,
  Folder as FolderIcon,
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { searchResults, SearchResult } from '../../data/searchData';

interface SearchResultsPageProps {
  searchQuery: string;
  onBack: () => void;
  onNewSearch: (query: string) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchQuery,
  onBack,
  onNewSearch,
}) => {
  const [newSearchQuery, setNewSearchQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('relevance');

  const results = useMemo(() => {
    return searchResults(searchQuery);
  }, [searchQuery]);

  const filteredResults = useMemo(() => {
    let filtered = results;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(result => result.category === selectedCategory);
    }

    // Sort results
    if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
      );
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'relevance' is already sorted by default

    return filtered;
  }, [results, selectedCategory, sortBy]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    results.forEach(result => {
      stats[result.category] = (stats[result.category] || 0) + 1;
    });
    return stats;
  }, [results]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Client': return <PersonIcon />;
      case 'Policy': return <PolicyIcon />;
      case 'Case': return <AssignmentIcon />;
      case 'Product': return <BusinessIcon />;
      case 'Form': return <DescriptionIcon />;
      case 'Commission': return <AttachMoneyIcon />;
      case 'Notification': return <NotificationsIcon />;
      case 'Documentation': return <FolderIcon />;
      default: return <DescriptionIcon />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Client': return 'primary';
      case 'Policy': return 'success';
      case 'Case': return 'warning';
      case 'Product': return 'info';
      case 'Form': return 'secondary';
      case 'Commission': return 'error';
      case 'Notification': return 'primary';
      case 'Documentation': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'default';
    switch (status.toLowerCase()) {
      case 'active': case 'approved': case 'paid': case 'completed': return 'success';
      case 'pending': case 'under review': return 'warning';
      case 'declined': case 'cancelled': case 'failed': return 'error';
      case 'read': return 'default';
      case 'unread': return 'primary';
      default: return 'info';
    }
  };

  const handleNewSearch = () => {
    if (newSearchQuery.trim() && newSearchQuery !== searchQuery) {
      onNewSearch(newSearchQuery.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleNewSearch();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={onBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Search Results
          </Typography>
        </Box>

        {/* New Search Bar */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ pb: '16px !important' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search Advisor Portal"
              value={newSearchQuery}
              onChange={(e) => setNewSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={handleNewSearch}
                      disabled={!newSearchQuery.trim() || newSearchQuery === searchQuery}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* Results Summary */}
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {results.length} results found for "{searchQuery}"
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FilterListIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Filters</Typography>
              </Box>

              {/* Category Filter */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="All">All ({results.length})</MenuItem>
                  {Object.entries(categoryStats).map(([category, count]) => (
                    <MenuItem key={category} value={category}>
                      {category} ({count})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sort By */}
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="title">Title</MenuItem>
                </Select>
              </FormControl>

              <Divider sx={{ my: 2 }} />

              {/* Category Quick Filters */}
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Quick Filters
              </Typography>
              <Stack spacing={1}>
                {Object.entries(categoryStats).map(([category, count]) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'contained' : 'outlined'}
                    size="small"
                    startIcon={getCategoryIcon(category)}
                    onClick={() => setSelectedCategory(category)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    {category} ({count})
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Results */}
        <Grid size={{ xs: 12, md: 9 }}>
          {filteredResults.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No results found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms or filters
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={2}>
              {filteredResults.map((result) => (
                <Card
                  key={result.id}
                  sx={{
                    '&:hover': {
                      boxShadow: 4,
                      cursor: 'pointer',
                    },
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {/* Icon */}
                      <Avatar
                        sx={{
                          bgcolor: `${getCategoryColor(result.category)}.light`,
                          color: `${getCategoryColor(result.category)}.main`,
                          mt: 0.5,
                        }}
                      >
                        {getCategoryIcon(result.category)}
                      </Avatar>

                      {/* Content */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {result.title}
                          </Typography>
                          <Chip
                            label={result.category}
                            size="small"
                            color={getCategoryColor(result.category) as any}
                            variant="outlined"
                          />
                          {result.status && (
                            <Chip
                              label={result.status}
                              size="small"
                              color={getStatusColor(result.status) as any}
                              variant="filled"
                            />
                          )}
                        </Box>

                        {result.subtitle && (
                          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            {result.subtitle}
                          </Typography>
                        )}

                        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5 }}>
                          {result.description}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Typography variant="caption" color="text.secondary">
                            {result.type}
                          </Typography>
                          {result.date && (
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(result.date)}
                            </Typography>
                          )}
                          {result.relevanceScore && result.relevanceScore > 0 && (
                            <Chip
                              label={`${result.relevanceScore}% match`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};