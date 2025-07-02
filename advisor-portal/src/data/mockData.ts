import { User, Preferences, Case, Policy, Commission, SelfServiceRequest, Beneficiary, Notification } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'jadams',
  email: 'john.adams@prudential.com',
  firstName: 'John',
  lastName: 'Adams',
  title: 'Senior Life Insurance Advisor',
  phone: '(555) 123-4567',
  licenseNumber: 'LIC12345678',
  licenseStates: ['NY', 'NJ', 'CT', 'PA'],
  agencyCode: 'NYC001',
  profilePicture: 'https://via.placeholder.com/150'
};

export const mockPreferences: Preferences = {
  emailNotifications: true,
  smsAlerts: false,
  autoSaveDrafts: true,
  autoDownloadMaterials: false,
  communicationMethod: 'email',
  defaultCaseCategory: 'Individual Life',
  dashboardLayout: 'grid',
  territory: 'Northeast'
};

export const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'C2024001',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.johnson@email.com',
    clientPhone: '(555) 234-5678',
    productType: 'Term Life',
    coverageAmount: 500000,
    annualPremium: 2400,
    status: 'Under Review',
    submissionDate: '2024-06-15',
    lastUpdated: '2024-06-28',
    underwriter: 'Michael Chen',
    notes: 'Medical exam completed. Awaiting lab results.',
    documentsRequired: ['Medical Exam', 'Financial Statements'],
    nextAction: 'Follow up on lab results'
  },
  {
    id: '2',
    caseNumber: 'C2024002',
    clientName: 'Robert Smith',
    clientEmail: 'robert.smith@email.com',
    clientPhone: '(555) 345-6789',
    productType: 'Whole Life',
    coverageAmount: 1000000,
    annualPremium: 15000,
    status: 'Additional Requirements',
    submissionDate: '2024-06-01',
    lastUpdated: '2024-06-25',
    underwriter: 'Lisa Park',
    notes: 'Need additional financial documentation for large coverage amount.',
    documentsRequired: ['Tax Returns', 'Business Financial Statements', 'Net Worth Statement'],
    nextAction: 'Contact client for additional documents'
  },
  {
    id: '3',
    caseNumber: 'C2024003',
    clientName: 'Emily Davis',
    clientEmail: 'emily.davis@email.com',
    clientPhone: '(555) 456-7890',
    productType: 'Universal Life',
    coverageAmount: 750000,
    annualPremium: 8500,
    status: 'Approved',
    submissionDate: '2024-05-20',
    lastUpdated: '2024-06-20',
    underwriter: 'David Wong',
    notes: 'Standard approval. Policy ready for issue.',
    documentsRequired: [],
    nextAction: 'Schedule policy delivery'
  },
  {
    id: '4',
    caseNumber: 'C2024004',
    clientName: 'Michael Brown',
    clientEmail: 'michael.brown@email.com',
    clientPhone: '(555) 567-8901',
    productType: 'Variable Universal Life',
    coverageAmount: 2000000,
    annualPremium: 25000,
    status: 'Submitted',
    submissionDate: '2024-06-30',
    lastUpdated: '2024-06-30',
    underwriter: 'Jennifer Lee',
    notes: 'Initial submission received. Starting underwriting process.',
    documentsRequired: ['Application', 'Medical Exam'],
    nextAction: 'Schedule medical exam'
  },
  {
    id: '5',
    caseNumber: 'C2024005',
    clientName: 'Amanda Wilson',
    clientEmail: 'amanda.wilson@email.com',
    clientPhone: '(555) 678-9012',
    productType: 'Term Life',
    coverageAmount: 300000,
    annualPremium: 1800,
    status: 'Declined',
    submissionDate: '2024-05-10',
    lastUpdated: '2024-06-01',
    underwriter: 'Robert Kim',
    notes: 'Declined due to health conditions.',
    documentsRequired: [],
    nextAction: 'Discuss alternative options with client'
  }
];

export const mockBeneficiaries: Beneficiary[] = [
  { id: '1', name: 'Jane Johnson', relationship: 'Spouse', percentage: 60, type: 'Primary' },
  { id: '2', name: 'Tom Johnson', relationship: 'Child', percentage: 40, type: 'Primary' },
  { id: '3', name: 'Mary Johnson', relationship: 'Mother', percentage: 100, type: 'Contingent' }
];

export const mockPolicies: Policy[] = [
  {
    id: '1',
    policyNumber: 'POL2023001',
    clientName: 'James Wilson',
    productType: 'Whole Life',
    coverageAmount: 500000,
    annualPremium: 8500,
    status: 'Active',
    issueDate: '2023-03-15',
    renewalDate: '2025-03-15',
    beneficiaries: mockBeneficiaries,
    cashValue: 15000,
    premiumMode: 'Annual'
  },
  {
    id: '2',
    policyNumber: 'POL2023002',
    clientName: 'Lisa Thompson',
    productType: 'Term Life',
    coverageAmount: 750000,
    annualPremium: 3600,
    status: 'Active',
    issueDate: '2023-07-20',
    renewalDate: '2024-07-20',
    beneficiaries: [
      { id: '4', name: 'Mark Thompson', relationship: 'Spouse', percentage: 100, type: 'Primary' }
    ],
    premiumMode: 'Monthly'
  },
  {
    id: '3',
    policyNumber: 'POL2022001',
    clientName: 'David Garcia',
    productType: 'Universal Life',
    coverageAmount: 1000000,
    annualPremium: 12000,
    status: 'Active',
    issueDate: '2022-11-10',
    renewalDate: '2024-11-10',
    beneficiaries: [
      { id: '5', name: 'Maria Garcia', relationship: 'Spouse', percentage: 70, type: 'Primary' },
      { id: '6', name: 'Carlos Garcia', relationship: 'Child', percentage: 30, type: 'Primary' }
    ],
    cashValue: 8500,
    premiumMode: 'Quarterly'
  },
  {
    id: '4',
    policyNumber: 'POL2021001',
    clientName: 'Jennifer Martinez',
    productType: 'Variable Universal Life',
    coverageAmount: 1500000,
    annualPremium: 18000,
    status: 'Lapsed',
    issueDate: '2021-05-05',
    renewalDate: '2024-05-05',
    beneficiaries: [
      { id: '7', name: 'Roberto Martinez', relationship: 'Spouse', percentage: 100, type: 'Primary' }
    ],
    cashValue: 25000,
    premiumMode: 'Semi-Annual'
  }
];

export const mockCommissions: Commission[] = [
  {
    id: '1',
    policyNumber: 'POL2023001',
    clientName: 'James Wilson',
    productType: 'Whole Life',
    commissionType: 'First Year',
    amount: 4250,
    percentage: 50,
    paymentDate: '2023-04-15',
    paymentStatus: 'Paid',
    year: 2023,
    quarter: 2
  },
  {
    id: '2',
    policyNumber: 'POL2023002',
    clientName: 'Lisa Thompson',
    productType: 'Term Life',
    commissionType: 'First Year',
    amount: 1800,
    percentage: 50,
    paymentDate: '2023-08-20',
    paymentStatus: 'Paid',
    year: 2023,
    quarter: 3
  },
  {
    id: '3',
    policyNumber: 'POL2023001',
    clientName: 'James Wilson',
    productType: 'Whole Life',
    commissionType: 'Renewal',
    amount: 425,
    percentage: 5,
    paymentDate: '2024-04-15',
    paymentStatus: 'Paid',
    year: 2024,
    quarter: 2
  },
  {
    id: '4',
    policyNumber: 'POL2022001',
    clientName: 'David Garcia',
    productType: 'Universal Life',
    commissionType: 'Renewal',
    amount: 600,
    percentage: 5,
    paymentDate: '2024-01-10',
    paymentStatus: 'Paid',
    year: 2024,
    quarter: 1
  },
  {
    id: '5',
    policyNumber: 'POL2024001',
    clientName: 'New Client',
    productType: 'Term Life',
    commissionType: 'First Year',
    amount: 2250,
    percentage: 50,
    paymentDate: '2024-07-15',
    paymentStatus: 'Pending',
    year: 2024,
    quarter: 3
  }
];

export const mockSelfServiceRequests: SelfServiceRequest[] = [
  {
    id: '1',
    policyNumber: 'POL2023001',
    requestType: 'Address Change',
    status: 'Approved',
    requestDate: '2024-06-15',
    processedDate: '2024-06-16',
    details: {
      oldAddress: '123 Main St, New York, NY 10001',
      newAddress: '456 Oak Ave, Brooklyn, NY 11201'
    }
  },
  {
    id: '2',
    policyNumber: 'POL2023002',
    requestType: 'Beneficiary Change',
    status: 'Pending',
    requestDate: '2024-06-28',
    details: {
      action: 'Add',
      beneficiary: {
        name: 'Sarah Thompson',
        relationship: 'Daughter',
        percentage: 25,
        type: 'Primary'
      }
    }
  }
];

export const mockNotifications: Notification[] = [
  // High Priority - New Business
  {
    id: '1',
    title: 'Medical Exam Required',
    message: 'Michael Brown case requires medical exam scheduling within 7 days to prevent application expiration.',
    category: 'New Business',
    type: 'Document Required',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule medical exam',
    relatedId: '4',
    relatedNumber: 'C2024004',
    clientName: 'Michael Brown',
    createdDate: '2024-07-01',
    dueDate: '2024-07-08'
  },
  {
    id: '2',
    title: 'Status Change: Approved',
    message: 'Emily Davis case has been approved by underwriter David Wong. Policy ready for issue.',
    category: 'New Business',
    type: 'Status Change',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule policy delivery',
    relatedId: '3',
    relatedNumber: 'C2024003',
    clientName: 'Emily Davis',
    createdDate: '2024-06-30'
  },
  
  // High Priority - Inforce
  {
    id: '3',
    title: 'Premium Payment Overdue',
    message: 'Jennifer Martinez policy premium is 30 days overdue. Policy at risk of lapse.',
    category: 'Inforce',
    type: 'Premium Due',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Contact client immediately',
    relatedId: '4',
    relatedNumber: 'POL2021001',
    clientName: 'Jennifer Martinez',
    createdDate: '2024-06-05',
    dueDate: '2024-07-05'
  },
  {
    id: '4',
    title: 'Policy Anniversary - Action Required',
    message: 'James Wilson whole life policy anniversary approaching. Review performance and conduct annual review.',
    category: 'Inforce',
    type: 'Anniversary',
    priority: 'High',
    isRead: true,
    isActionable: true,
    actionRequired: 'Schedule annual review',
    relatedId: '1',
    relatedNumber: 'POL2023001',
    clientName: 'James Wilson',
    createdDate: '2024-06-15',
    dueDate: '2024-08-15'
  },
  
  // Medium Priority - New Business
  {
    id: '5',
    title: 'Additional Documents Required',
    message: 'Robert Smith case needs tax returns and business financial statements for underwriting.',
    category: 'New Business',
    type: 'Document Required',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Contact client for documents',
    relatedId: '2',
    relatedNumber: 'C2024002',
    clientName: 'Robert Smith',
    createdDate: '2024-06-25',
    dueDate: '2024-07-10'
  },
  {
    id: '6',
    title: 'Underwriting Decision Pending',
    message: 'Sarah Johnson case under review by Michael Chen. Lab results received, decision expected within 3 business days.',
    category: 'New Business',
    type: 'Underwriting',
    priority: 'Medium',
    isRead: true,
    isActionable: false,
    relatedId: '1',
    relatedNumber: 'C2024001',
    clientName: 'Sarah Johnson',
    createdDate: '2024-07-01'
  },
  
  // Medium Priority - Inforce
  {
    id: '7',
    title: 'Term Policy Renewal Due',
    message: 'Lisa Thompson term life policy renews in 60 days. Contact client to discuss renewal options.',
    category: 'Inforce',
    type: 'Anniversary',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Contact client about renewal',
    relatedId: '2',
    relatedNumber: 'POL2023002',
    clientName: 'Lisa Thompson',
    createdDate: '2024-05-20',
    dueDate: '2024-09-20'
  },
  {
    id: '8',
    title: 'Cash Value Performance Alert',
    message: 'David Garcia universal life policy cash value has dropped below minimum threshold. Review required.',
    category: 'Inforce',
    type: 'System Alert',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Review policy performance',
    relatedId: '3',
    relatedNumber: 'POL2022001',
    clientName: 'David Garcia',
    createdDate: '2024-06-28',
    dueDate: '2024-07-15'
  },
  
  // Low Priority - Commission & Administrative
  {
    id: '9',
    title: 'Commission Payment Processed',
    message: 'First year commission for New Client policy has been processed and will be deposited within 2 business days.',
    category: 'New Business',
    type: 'Commission',
    priority: 'Low',
    isRead: true,
    isActionable: false,
    relatedNumber: 'POL2024001',
    clientName: 'New Client',
    createdDate: '2024-07-15'
  },
  {
    id: '10',
    title: 'Self-Service Request Approved',
    message: 'Address change request for James Wilson policy has been approved and processed.',
    category: 'Inforce',
    type: 'Status Change',
    priority: 'Low',
    isRead: false,
    isActionable: false,
    relatedId: '1',
    relatedNumber: 'POL2023001',
    clientName: 'James Wilson',
    createdDate: '2024-06-16'
  },
  
  // Claims Examples
  {
    id: '11',
    title: 'Death Claim Filed',
    message: 'Death claim submitted for policy holder Maria Rodriguez. Claim number DC2024001 assigned.',
    category: 'Claims',
    type: 'Claim Update',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Assist beneficiary with documentation',
    relatedNumber: 'POL2020005',
    clientName: 'Maria Rodriguez Estate',
    createdDate: '2024-07-01',
    dueDate: '2024-07-08'
  },
  {
    id: '12',
    title: 'Claim Documentation Required',
    message: 'Additional documentation needed for disability claim processing. Contact client to provide medical records.',
    category: 'Claims',
    type: 'Document Required',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Request medical records',
    relatedNumber: 'POL2022003',
    clientName: 'Thomas Anderson',
    createdDate: '2024-06-30',
    dueDate: '2024-07-14'
  },

  // Client Management - Critical Priority
  {
    id: '13',
    title: 'Policy Lapse Risk - Immediate Action Required',
    message: 'Patricia Johnson showing 90-day payment pattern decline. Policy POL2023010 at critical lapse risk.',
    category: 'Client Management',
    type: 'Policy Lapse Risk',
    priority: 'Critical',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule urgent client meeting',
    relatedNumber: 'POL2023010',
    clientName: 'Patricia Johnson',
    createdDate: '2024-07-02',
    dueDate: '2024-07-05',
    urgencyLevel: 'Immediate'
  },
  {
    id: '14',
    title: 'Cross-sell Opportunity: New Baby',
    message: 'Client Mark Stevens just had a baby. Excellent opportunity for additional coverage discussion.',
    category: 'Client Management',
    type: 'Cross-sell Opportunity',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule needs analysis meeting',
    relatedNumber: 'POL2022008',
    clientName: 'Mark Stevens',
    createdDate: '2024-07-01',
    dueDate: '2024-07-15',
    urgencyLevel: 'This Week'
  },
  {
    id: '15',
    title: 'Annual Review Overdue',
    message: 'Susan Wright annual policy review is 60 days overdue. Client satisfaction at risk.',
    category: 'Client Management',
    type: 'Review Reminder',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule annual review appointment',
    relatedNumber: 'POL2021015',
    clientName: 'Susan Wright',
    createdDate: '2024-06-25',
    dueDate: '2024-07-10',
    urgencyLevel: 'This Week'
  },

  // Compliance - Critical Priority
  {
    id: '16',
    title: 'License Renewal - 30 Days Remaining',
    message: 'Your New York insurance license expires in 30 days. Renewal required to maintain active status.',
    category: 'Compliance',
    type: 'License Renewal',
    priority: 'Critical',
    isRead: false,
    isActionable: true,
    actionRequired: 'Complete license renewal process',
    createdDate: '2024-07-02',
    dueDate: '2024-08-01',
    urgencyLevel: 'This Month'
  },
  {
    id: '17',
    title: 'Continuing Education Credits Due',
    message: 'You need 8 more CE credits before December 31st to maintain Pennsylvania license compliance.',
    category: 'Compliance',
    type: 'Continuing Education',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Register for CE courses',
    createdDate: '2024-07-01',
    dueDate: '2024-12-31',
    urgencyLevel: 'This Month'
  },
  {
    id: '18',
    title: 'Suitability Documentation Expiring',
    message: 'Financial suitability forms for 3 high-value policies expire within 45 days. Updates required.',
    category: 'Compliance',
    type: 'Compliance Filing',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule client meetings for updated financials',
    createdDate: '2024-06-28',
    dueDate: '2024-08-15',
    urgencyLevel: 'This Month'
  },

  // Sales Pipeline - High Priority
  {
    id: '19',
    title: 'Hot Prospect Follow-up',
    message: 'Rachel Green showed strong interest 30 days ago. Follow-up required to prevent lead going cold.',
    category: 'Sales Pipeline',
    type: 'Prospect Follow-up',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Call to schedule needs analysis',
    clientName: 'Rachel Green',
    createdDate: '2024-07-01',
    dueDate: '2024-07-08',
    urgencyLevel: 'This Week'
  },
  {
    id: '20',
    title: 'Quote Expiring Soon',
    message: 'Term life quote for Kevin Martinez expires in 5 days. Client expressed strong purchase intent.',
    category: 'Sales Pipeline',
    type: 'Quote Expiration',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Contact client to finalize application',
    clientName: 'Kevin Martinez',
    createdDate: '2024-06-30',
    dueDate: '2024-07-07',
    urgencyLevel: 'This Week'
  },
  {
    id: '21',
    title: 'Incomplete Application Alert',
    message: 'Diana Foster application missing beneficiary designations and signature. 15 days since last contact.',
    category: 'Sales Pipeline',
    type: 'Application Incomplete',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Follow up on missing application components',
    clientName: 'Diana Foster',
    createdDate: '2024-06-20',
    dueDate: '2024-07-10',
    urgencyLevel: 'This Week'
  },

  // Business Management
  {
    id: '22',
    title: 'Territory Performance Below Target',
    message: 'Q2 new business production 15% below territory target. Action plan required.',
    category: 'Business Management',
    type: 'Territory Performance',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Review and update business plan',
    createdDate: '2024-07-01',
    dueDate: '2024-07-15',
    urgencyLevel: 'This Week'
  },
  {
    id: '23',
    title: 'Commission Discrepancy',
    message: 'Renewal commission for POL2022001 shows $450 expected vs $375 paid. Requires investigation.',
    category: 'Business Management',
    type: 'Commission',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Contact commission services',
    relatedNumber: 'POL2022001',
    clientName: 'David Garcia',
    createdDate: '2024-06-28',
    dueDate: '2024-07-15',
    urgencyLevel: 'This Month'
  },

  // Risk Management - Critical
  {
    id: '24',
    title: 'Persistency Rate Alert',
    message: 'Your 13-month persistency rate dropped to 82% (below 85% company standard). Immediate review required.',
    category: 'Risk Management',
    type: 'Persistency Alert',
    priority: 'Critical',
    isRead: false,
    isActionable: true,
    actionRequired: 'Analyze lapsed policies and create retention plan',
    createdDate: '2024-07-02',
    dueDate: '2024-07-09',
    urgencyLevel: 'This Week'
  },
  {
    id: '25',
    title: 'Client Complaint Escalation',
    message: 'Formal complaint filed by Robert Chen regarding policy service delays. Manager involvement required.',
    category: 'Risk Management',
    type: 'Client Complaint',
    priority: 'High',
    isRead: false,
    isActionable: true,
    actionRequired: 'Schedule resolution meeting with manager',
    clientName: 'Robert Chen',
    createdDate: '2024-07-01',
    dueDate: '2024-07-05',
    urgencyLevel: 'This Week'
  },

  // Market Intelligence
  {
    id: '26',
    title: 'Competitive Rate Change',
    message: 'MetLife reduced term rates by 8% for preferred class. Review pending quotes for competitiveness.',
    category: 'Market Intelligence',
    type: 'Rate Change',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Review and reprice pending term applications',
    createdDate: '2024-07-01',
    dueDate: '2024-07-10',
    urgencyLevel: 'This Week'
  },
  {
    id: '27',
    title: 'New Product Launch',
    message: 'Prudential launches new hybrid life/LTC product next month. Training webinar available.',
    category: 'Market Intelligence',
    type: 'Product Launch',
    priority: 'Low',
    isRead: false,
    isActionable: true,
    actionRequired: 'Register for product training',
    createdDate: '2024-06-30',
    dueDate: '2024-08-01',
    urgencyLevel: 'This Month'
  },
  {
    id: '28',
    title: 'Underwriting Guidelines Updated',
    message: 'New simplified issue guidelines for ages 18-45. Maximum coverage increased to $2M.',
    category: 'Market Intelligence',
    type: 'Underwriting Guideline',
    priority: 'Medium',
    isRead: false,
    isActionable: true,
    actionRequired: 'Review prospect list for simplified issue opportunities',
    createdDate: '2024-06-28',
    dueDate: '2024-07-15',
    urgencyLevel: 'This Week'
  }
];