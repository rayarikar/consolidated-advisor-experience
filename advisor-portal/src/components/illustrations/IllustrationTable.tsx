import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
  TablePagination,
} from '@mui/material';
import { YearlyProjection, IllustrationRequest } from '../../types';

interface IllustrationTableProps {
  projections: YearlyProjection[];
  request: IllustrationRequest;
}

export const IllustrationTable: React.FC<IllustrationTableProps> = ({
  projections,
  request,
}) => {
  const [showDetailed, setShowDetailed] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isTermLife = request.productType === 'Term Life';
  const showGuaranteed = request.options.showGuaranteed;
  const showCurrent = request.options.showCurrent && !isTermLife;

  // Filter projections for display
  const displayProjections = showDetailed 
    ? projections 
    : projections.filter((p, index) => 
        index === 0 || // First year
        p.policyYear % 5 === 0 || // Every 5 years
        p.age === 65 || p.age === 70 || p.age === 75 || // Key ages
        index === projections.length - 1 // Last year
      );

  const paginatedProjections = displayProjections.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {/* Controls */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Performance Projection Table
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={showDetailed}
              onChange={(e) => setShowDetailed(e.target.checked)}
            />
          }
          label="Show All Years"
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'primary.light' }}>
                Policy Year
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'primary.light' }}>
                Age
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'primary.light' }} align="right">
                Annual Premium
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'primary.light' }} align="right">
                Cumulative Premiums
              </TableCell>
              <TableCell sx={{ fontWeight: 600, bgcolor: 'primary.light' }} align="right">
                Death Benefit
              </TableCell>
              {!isTermLife && showGuaranteed && (
                <TableCell sx={{ fontWeight: 600, bgcolor: 'warning.light' }} align="right">
                  Cash Value (Guaranteed)
                </TableCell>
              )}
              {!isTermLife && showCurrent && (
                <TableCell sx={{ fontWeight: 600, bgcolor: 'success.light' }} align="right">
                  Cash Value (Current)
                </TableCell>
              )}
              {!isTermLife && showCurrent && (
                <TableCell sx={{ fontWeight: 600, bgcolor: 'info.light' }} align="right">
                  Surrender Value
                </TableCell>
              )}
              {!isTermLife && (
                <TableCell sx={{ fontWeight: 600, bgcolor: 'secondary.light' }} align="right">
                  Net Amount at Risk
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProjections.map((projection, index) => {
              const isKeyAge = projection.age === 65 || projection.age === 70 || projection.age === 75;
              const rowBgColor = isKeyAge ? 'action.hover' : 'transparent';
              
              return (
                <TableRow 
                  key={projection.policyYear}
                  sx={{ bgcolor: rowBgColor }}
                >
                  <TableCell sx={{ fontWeight: isKeyAge ? 600 : 400 }}>
                    {projection.policyYear}
                  </TableCell>
                  <TableCell sx={{ fontWeight: isKeyAge ? 600 : 400 }}>
                    {projection.age}
                  </TableCell>
                  <TableCell align="right">
                    {projection.premiumPaid > 0 ? formatCurrency(projection.premiumPaid) : '-'}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(projection.cumulativePremiums)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {formatCurrency(projection.deathBenefit)}
                  </TableCell>
                  {!isTermLife && showGuaranteed && (
                    <TableCell align="right">
                      {formatCurrency(projection.cashValue.guaranteed)}
                    </TableCell>
                  )}
                  {!isTermLife && showCurrent && (
                    <TableCell align="right" sx={{ fontWeight: 500 }}>
                      {formatCurrency(projection.cashValue.current)}
                    </TableCell>
                  )}
                  {!isTermLife && showCurrent && (
                    <TableCell align="right">
                      {formatCurrency(projection.endOfYearValues.surrenderValue)}
                    </TableCell>
                  )}
                  {!isTermLife && (
                    <TableCell align="right">
                      {formatCurrency(projection.netAmount)}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={displayProjections.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />

      {/* Legend */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Table Notes:
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          • Highlighted rows indicate key ages (65, 70, 75)
          <br />
          • All values shown are as of the end of the policy year
          <br />
          {!isTermLife && '• Cash values reflect any applicable surrender charges'}
          <br />
          {!isTermLife && '• Net Amount at Risk = Death Benefit - Cash Value'}
          <br />
          • Premium payments may vary based on payment duration selected
        </Typography>
      </Box>

      {/* Performance Summary */}
      {!isTermLife && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Performance Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cash Value at Age 65:
              </Typography>
              <Typography variant="h6" color="success.main">
                {formatCurrency(projections.find(p => p.age === 65)?.cashValue.current || 0)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cash Value at Age 100:
              </Typography>
              <Typography variant="h6" color="success.main">
                {formatCurrency(projections[projections.length - 1]?.cashValue.current || 0)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Premiums Paid:
              </Typography>
              <Typography variant="h6" color="primary.main">
                {formatCurrency(projections.reduce((sum, p) => sum + p.premiumPaid, 0))}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Death Benefit at Age 65:
              </Typography>
              <Typography variant="h6" color="info.main">
                {formatCurrency(projections.find(p => p.age === 65)?.deathBenefit || 0)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};