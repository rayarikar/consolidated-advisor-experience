import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Tab,
  Tabs,
  Alert,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  Inbox,
  Assignment,
  Schedule,
  CheckCircle,
  Warning,
  Error,
  Person,
  AttachFile,
  MonetizationOn,
  Gavel,
  Visibility,
  ThumbUp,
  ThumbDown,
  History,
  PendingActions
} from '@mui/icons-material';
import { mockSelfServiceRequests } from '../../data/mockData';
import { SelfServiceRequest } from '../../types';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const SelfServicePage: React.FC = () => {
  const [requests, setRequests] = useState<SelfServiceRequest[]>(mockSelfServiceRequests);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<SelfServiceRequest | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Client Submitted': return 'error';
      case 'Advisor Review': return 'warning';
      case 'Advisor Approved': return 'info';
      case 'Home Office Review': return 'info';
      case 'Completed': return 'success';
      case 'Advisor Rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'error';
      case 'Standard': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getRequestTypeIcon = (requestType: string) => {
    switch (requestType) {
      case 'Beneficiary Change': return <Person />;
      case 'Policy Loan': return <MonetizationOn />;
      case 'Address Change': return <Assignment />;
      case 'Surrender Request': return <Gavel />;
      case 'Premium Adjustment': return <Schedule />;
      default: return <Assignment />;
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'Passed': return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'Failed': return <Error sx={{ color: 'error.main' }} />;
      case 'Pending': return <Warning sx={{ color: 'warning.main' }} />;
      default: return <Warning sx={{ color: 'warning.main' }} />;
    }
  };

  // Filter requests by tab
  const filteredRequests = useMemo(() => {
    switch (selectedTab) {
      case 0: // Client Inbox - Client submitted requests awaiting advisor review
        return requests.filter(r => r.status === 'Client Submitted');
      case 1: // In Review - Requests currently being reviewed by advisor
        return requests.filter(r => r.status === 'Advisor Review');
      case 2: // Pending - Requests sent to home office
        return requests.filter(r => ['Home Office Review', 'Advisor Approved'].includes(r.status));
      case 3: // Completed - All finished requests
        return requests.filter(r => ['Completed', 'Advisor Rejected'].includes(r.status));
      default:
        return requests;
    }
  }, [requests, selectedTab]);

  const handleApprove = () => {
    if (!selectedRequest) return;
    
    setRequests(prev => prev.map(r => 
      r.id === selectedRequest.id 
        ? {
            ...r,
            status: 'Advisor Approved' as any,
            advisorApproval: {
              approver: 'John Adams',
              approverRole: 'Advisor' as any,
              status: 'Approved' as any,
              date: new Date().toISOString(),
              comments: approvalComment || 'Approved by advisor'
            },
            lastUpdated: new Date().toISOString()
          }
        : r
    ));
    
    setDetailDialogOpen(false);
    setApprovalComment('');
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    
    setRequests(prev => prev.map(r => 
      r.id === selectedRequest.id 
        ? {
            ...r,
            status: 'Advisor Rejected' as any,
            advisorApproval: {
              approver: 'John Adams',
              approverRole: 'Advisor' as any,
              status: 'Rejected' as any,
              date: new Date().toISOString(),
              comments: approvalComment || 'Rejected by advisor'
            },
            lastUpdated: new Date().toISOString()
          }
        : r
    ));
    
    setDetailDialogOpen(false);
    setApprovalComment('');
  };

  const handleRequestDocuments = () => {
    if (!selectedRequest) return;
    
    setRequests(prev => prev.map(r => 
      r.id === selectedRequest.id 
        ? {
            ...r,
            status: 'Documentation Needed' as any,
            lastUpdated: new Date().toISOString()
          }
        : r
    ));
    
    setDetailDialogOpen(false);
  };

  const urgentCount = requests.filter(r => r.status === 'Client Submitted' && r.priority === 'Urgent').length;
  const clientInboxCount = requests.filter(r => r.status === 'Client Submitted').length;
  const inReviewCount = requests.filter(r => r.status === 'Advisor Review').length;
  const pendingCount = requests.filter(r => ['Home Office Review', 'Advisor Approved'].includes(r.status)).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assignment />
          Self-Service Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and approve client requests • Manage service transactions
        </Typography>
      </Box>

      {/* Urgent Alerts */}
      {urgentCount > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">🔴 {urgentCount} Urgent Request{urgentCount > 1 ? 's' : ''} Require Immediate Attention</Typography>
          Critical client requests awaiting your review and approval.
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#fff3e0', borderLeft: '4px solid #f57c00' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                    {clientInboxCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Client Inbox
                  </Typography>
                </Box>
                <Badge badgeContent={urgentCount} color="error">
                  <Inbox sx={{ fontSize: 40, color: '#f57c00' }} />
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#e3f2fd', borderLeft: '4px solid #1976d2' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {inReviewCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Review
                  </Typography>
                </Box>
                <PendingActions sx={{ fontSize: 40, color: '#1976d2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#f3e5f5', borderLeft: '4px solid #7b1fa2' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                    {pendingCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Home Office
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, color: '#7b1fa2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#e8f5e8', borderLeft: '4px solid #388e3c' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                    {requests.filter(r => r.status === 'Completed').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: '#388e3c' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="fullWidth"
          >
            <Tab 
              icon={<Badge badgeContent={clientInboxCount} color="error"><Inbox /></Badge>} 
              label="Client Inbox" 
            />
            <Tab 
              icon={<Badge badgeContent={inReviewCount} color="warning"><PendingActions /></Badge>} 
              label="In Review" 
            />
            <Tab 
              icon={<Badge badgeContent={pendingCount} color="info"><Schedule /></Badge>} 
              label="Home Office" 
            />
            <Tab 
              icon={<History />} 
              label="History" 
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <TabPanel value={selectedTab} index={0}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Client Requests Awaiting Your Review ({clientInboxCount})
            </Typography>
            <Stack spacing={2}>
              {filteredRequests.map((request) => (
                <Card 
                  key={request.id} 
                  variant="outlined" 
                  sx={{ 
                    '&:hover': { boxShadow: 2, cursor: 'pointer' },
                    borderLeft: request.priority === 'Urgent' ? '4px solid #d32f2f' : 'none'
                  }}
                  onClick={() => {
                    setSelectedRequest(request);
                    setDetailDialogOpen(true);
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {getRequestTypeIcon(request.requestType)}
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6">
                            {request.requestType}
                          </Typography>
                          {request.priority === 'Urgent' && (
                            <Chip label="URGENT" color="error" size="small" />
                          )}
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Client: {request.clientName} • Policy: {request.policyNumber}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={request.status}
                            color={getStatusColor(request.status) as any}
                            size="small"
                          />
                          <Chip
                            label={request.priority}
                            color={getPriorityColor(request.priority) as any}
                            variant="outlined"
                            size="small"
                          />
                          <Chip
                            icon={<Schedule />}
                            label={`Due: ${new Date(request.estimatedCompletion || '').toLocaleDateString()}`}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRequest(request);
                            setDetailDialogOpen(true);
                          }}
                        >
                          Review
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Requests Under Advisor Review ({inReviewCount})
            </Typography>
            <Stack spacing={2}>
              {filteredRequests.map((request) => (
                <Card key={request.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{request.requestType}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {request.clientName} • {request.policyNumber}
                    </Typography>
                    <LinearProgress sx={{ my: 1 }} variant="determinate" value={50} />
                    <Typography variant="caption">In Progress...</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Pending Home Office Approval ({pendingCount})
            </Typography>
            <Stack spacing={2}>
              {filteredRequests.map((request) => (
                <Card key={request.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{request.requestType}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {request.clientName} • {request.policyNumber}
                    </Typography>
                    <Chip label={request.status} color="info" size="small" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Request History
            </Typography>
            <Stack spacing={2}>
              {filteredRequests.map((request) => (
                <Card key={request.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{request.requestType}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {request.clientName} • {request.policyNumber}
                    </Typography>
                    <Chip 
                      label={request.status} 
                      color={getStatusColor(request.status) as any} 
                      size="small" 
                      sx={{ mt: 1 }} 
                    />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </TabPanel>
      </Card>

      {/* Request Detail Dialog */}
      <Dialog 
        open={detailDialogOpen} 
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        {selectedRequest && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {getRequestTypeIcon(selectedRequest.requestType)}
              {selectedRequest.requestType} - {selectedRequest.clientName}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Request Details */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Request Details</Typography>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2">Policy Number</Typography>
                      <Typography>{selectedRequest.policyNumber}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2">Priority</Typography>
                      <Chip 
                        label={selectedRequest.priority} 
                        color={getPriorityColor(selectedRequest.priority) as any}
                        size="small"
                      />
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2">Initiated By</Typography>
                      <Typography>{selectedRequest.initiatedBy}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2">Request Date</Typography>
                      <Typography>{new Date(selectedRequest.requestDate).toLocaleString()}</Typography>
                    </Box>
                    
                    {selectedRequest.estimatedCompletion && (
                      <Box>
                        <Typography variant="subtitle2">Estimated Completion</Typography>
                        <Typography>{new Date(selectedRequest.estimatedCompletion).toLocaleString()}</Typography>
                      </Box>
                    )}

                    {selectedRequest.commissionImpact && (
                      <Alert severity="info">
                        <Typography variant="subtitle2">Commission Impact</Typography>
                        <Typography>
                          ${selectedRequest.commissionImpact.impactAmount} 
                          ({selectedRequest.commissionImpact.impactPercentage}%)
                        </Typography>
                      </Alert>
                    )}
                  </Stack>
                </Grid>

                {/* Compliance Checks */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Compliance Status</Typography>
                  
                  <List>
                    {selectedRequest.complianceChecks.map((check) => (
                      <ListItem key={check.id}>
                        <ListItemIcon>
                          {getComplianceIcon(check.status)}
                        </ListItemIcon>
                        <ListItemText
                          primary={check.name}
                          secondary={check.description}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* Documents */}
                  {selectedRequest.documentsRequired.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>Required Documents</Typography>
                      <List>
                        {selectedRequest.documentsRequired.map((doc) => (
                          <ListItem key={doc.id}>
                            <ListItemIcon>
                              <AttachFile color={doc.uploaded ? 'success' : 'error'} />
                            </ListItemIcon>
                            <ListItemText
                              primary={doc.name}
                              secondary={doc.description}
                            />
                            <Chip 
                              label={doc.uploaded ? 'Uploaded' : 'Missing'} 
                              color={doc.uploaded ? 'success' : 'error'}
                              size="small"
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Grid>

                {/* Messages */}
                {selectedRequest.messages.length > 0 && (
                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>Client Messages</Typography>
                    {selectedRequest.messages.map((message) => (
                      <Card key={message.id} variant="outlined" sx={{ mb: 1 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Person />
                            <Typography variant="subtitle2">{message.sender}</Typography>
                            <Chip label={message.senderRole} size="small" variant="outlined" />
                            <Typography variant="caption" color="text.secondary">
                              {new Date(message.timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                          <Typography>{message.message}</Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Grid>
                )}

                {/* Approval Comments */}
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>Advisor Comments</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add comments for approval/rejection..."
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {selectedRequest.status === 'Client Submitted' && (
                <>
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<AttachFile />}
                    onClick={handleRequestDocuments}
                  >
                    Request Documents
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ThumbDown />}
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<ThumbUp />}
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                </>
              )}
              <Button onClick={() => setDetailDialogOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SelfServicePage;