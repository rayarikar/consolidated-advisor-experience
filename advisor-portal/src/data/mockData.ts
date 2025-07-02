import { User, Preferences, Case, Policy, Commission, SelfServiceRequest, Beneficiary } from '../types';

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