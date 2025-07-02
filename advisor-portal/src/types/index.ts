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

export interface ApprovalStep {
  approver: string;
  approverRole: 'Client' | 'Advisor' | 'Home Office';
  status: 'Pending' | 'Approved' | 'Rejected';
  date?: string;
  comments?: string;
  documentsReviewed?: string[];
}

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  uploaded: boolean;
  uploadedFile?: UploadedDocument;
}

export interface UploadedDocument {
  id: string;
  filename: string;
  uploadDate: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
}

export interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'Pending' | 'Passed' | 'Failed' | 'Not Applicable';
  checkDate?: string;
  notes?: string;
}

export interface CommissionImpact {
  currentCommission: number;
  newCommission: number;
  impactAmount: number;
  impactPercentage: number;
  effectiveDate: string;
}

export interface RequestMessage {
  id: string;
  sender: string;
  senderRole: 'Client' | 'Advisor' | 'Home Office' | 'System';
  recipient: string;
  message: string;
  timestamp: string;
  isInternal: boolean;
}

export interface SelfServiceRequest {
  id: string;
  policyNumber: string;
  clientName: string;
  requestType: 'Address Change' | 'Beneficiary Change' | 'Payment Method' | 'Premium Mode' | 
               'Policy Loan' | 'Surrender Request' | 'Dividend Election' | 'Policy Reinstatement' |
               'Name Change' | 'Contact Update' | 'Premium Adjustment' | 'Policy Delivery Confirmation' |
               'Document Request' | 'Tax Document Request' | 'Performance Report' | 'Illustration Update';
  status: 'Client Submitted' | 'Advisor Review' | 'Advisor Approved' | 'Advisor Rejected' | 
          'Documentation Needed' | 'Home Office Review' | 'Home Office Approved' | 'Home Office Rejected' |
          'Completed' | 'Cancelled';
  priority: 'Urgent' | 'Standard' | 'Low';
  
  // Multi-party workflow
  initiatedBy: 'Client' | 'Advisor' | 'Home Office';
  clientApproval?: ApprovalStep;
  advisorApproval?: ApprovalStep;
  homeOfficeApproval?: ApprovalStep;
  
  // Documentation & compliance
  documentsRequired: DocumentRequirement[];
  documentsUploaded: UploadedDocument[];
  complianceChecks: ComplianceCheck[];
  
  // Business logic
  commissionImpact?: CommissionImpact;
  effectiveDate?: string;
  policyAnniversaryRequired?: boolean;
  
  // Communication
  messages: RequestMessage[];
  
  // Tracking
  requestDate: string;
  lastUpdated: string;
  estimatedCompletion?: string;
  processedDate?: string;
  
  // Legacy support
  details: any;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'New Business' | 'Inforce' | 'Claims' | 'Client Management' | 'Compliance' | 'Sales Pipeline' | 'Business Management' | 'Risk Management' | 'Market Intelligence';
  type: 'Status Change' | 'Anniversary' | 'Premium Due' | 'Document Required' | 'Commission' | 'Claim Update' | 'Underwriting' | 'System Alert' | 
        'Policy Lapse Risk' | 'Cross-sell Opportunity' | 'Review Reminder' | 'Follow-up Required' | 'License Renewal' | 'Continuing Education' | 
        'Compliance Filing' | 'Prospect Follow-up' | 'Quote Expiration' | 'Application Incomplete' | 'Territory Performance' | 'Rate Change' | 
        'Persistency Alert' | 'Client Complaint' | 'Product Launch' | 'Underwriting Guideline';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  isRead: boolean;
  isActionable: boolean;
  actionRequired?: string;
  relatedId?: string; // Policy or Case ID
  relatedNumber?: string; // Policy or Case Number
  clientName?: string;
  createdDate: string;
  dueDate?: string;
  urgencyLevel?: 'Immediate' | 'This Week' | 'This Month' | 'Future';
}