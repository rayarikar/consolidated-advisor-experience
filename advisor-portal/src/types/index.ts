export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  licenseNumber: string;
  licenseStates: string[];
  agencyCode: string;
  profilePicture?: string;
}

export interface Preferences {
  emailNotifications: boolean;
  smsAlerts: boolean;
  autoSaveDrafts: boolean;
  autoDownloadMaterials: boolean;
  communicationMethod: 'email' | 'phone' | 'text';
  defaultCaseCategory: string;
  dashboardLayout: 'grid' | 'list';
  territory: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  productType: 'Term Life' | 'Whole Life' | 'Universal Life' | 'Variable Universal Life';
  coverageAmount: number;
  annualPremium: number;
  status: 'Submitted' | 'Under Review' | 'Additional Requirements' | 'Approved' | 'Declined' | 'Withdrawn';
  submissionDate: string;
  lastUpdated: string;
  underwriter: string;
  notes: string;
  documentsRequired: string[];
  nextAction: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  clientName: string;
  productType: 'Term Life' | 'Whole Life' | 'Universal Life' | 'Variable Universal Life';
  coverageAmount: number;
  annualPremium: number;
  status: 'Active' | 'Lapsed' | 'Surrendered' | 'Paid Up';
  issueDate: string;
  renewalDate: string;
  beneficiaries: Beneficiary[];
  cashValue?: number;
  premiumMode: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  percentage: number;
  type: 'Primary' | 'Contingent';
}

export interface Commission {
  id: string;
  policyNumber: string;
  clientName: string;
  productType: string;
  commissionType: 'First Year' | 'Renewal' | 'Trail' | 'Bonus';
  amount: number;
  percentage: number;
  paymentDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Adjusted';
  year: number;
  quarter: number;
}

export interface SelfServiceRequest {
  id: string;
  policyNumber: string;
  requestType: 'Address Change' | 'Beneficiary Change' | 'Payment Method' | 'Premium Mode';
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
  processedDate?: string;
  details: any;
}