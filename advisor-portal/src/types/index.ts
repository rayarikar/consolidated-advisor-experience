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

export interface InsuranceProduct {
  id: string;
  name: string;
  productType: 'Term Life' | 'Whole Life' | 'Universal Life' | 'Variable Universal Life' | 'Indexed Universal Life';
  category: 'Individual' | 'Group' | 'Business';
  description: string;
  keyFeatures: string[];
  targetMarket: string[];
  ageRanges: {
    min: number;
    max: number;
  };
  coverageAmounts: {
    min: number;
    max: number;
  };
  premiumStructure: 'Level' | 'Increasing' | 'Flexible' | 'Single Premium';
  underwritingClass: 'Simplified Issue' | 'Full Underwriting' | 'Guaranteed Issue' | 'No Medical Exam';
  availableRiders: string[];
  riderIds?: string[];
  states: string[];
  competitiveAdvantages: string[];
  illustration?: string;
  rateBook?: string;
  marketingMaterials?: string[];
}

export interface Rider {
  id: string;
  name: string;
  type: 'Benefit' | 'Waiver' | 'Accelerated Death Benefit' | 'Income' | 'Long-Term Care' | 'Conversion' | 'Enhancement' | 'Income Protection' | 'Guarantee' | 'Investment';
  description: string;
  cost: 'Included' | 'Additional Premium' | 'Percentage of Base Premium' | 'Dividend Allocation' | 'Management Fees';
  compatibleProducts: string[];
  ageRestrictions?: {
    min: number;
    max: number;
  };
  coverageLimits?: {
    min: number;
    max: number;
  };
  keyBenefits: string[];
  exclusions: string[];
}

export interface InsuranceForm {
  id: string;
  name: string;
  formNumber: string;
  category: 'New Business' | 'Policy Service' | 'Claims' | 'Compliance';
  type: 'Application' | 'Amendment' | 'Request' | 'Declaration' | 'Authorization';
  description: string;
  applicableProducts: string[];
  submissionMethod: 'Electronic' | 'Paper' | 'Both';
  processingTime: string;
  externalUrl?: string;
  internalForm: boolean;
  lastUpdated: string;
  version: string;
  requirements: string[];
  relatedForms?: string[];
}

export interface ClientInfo {
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  smokerStatus: 'Smoker' | 'Non-Smoker';
  healthClass: 'Super Preferred' | 'Preferred Plus' | 'Preferred' | 'Standard Plus' | 'Standard' | 'Table Rated';
  state: string;
}

export interface IllustrationAssumptions {
  currentInterestRate: number;
  guaranteedInterestRate: number;
  dividendScale: 'Current' | 'Zero';
  expenseCharges: number;
  mortalityTable: string;
  surrenderChargeSchedule?: number[];
}

export interface YearlyProjection {
  policyYear: number;
  age: number;
  premiumPaid: number;
  cumulativePremiums: number;
  deathBenefit: number;
  cashValue: {
    guaranteed: number;
    current: number;
  };
  netAmount: number;
  loanBalance?: number;
  dividends?: number;
  endOfYearValues: {
    surrenderValue: number;
    paidUpValue: number;
  };
}

export interface IllustrationSummary {
  totalPremiumsPaid: number;
  cashValueAt65: number;
  cashValueAt100: number;
  deathBenefitAt65: number;
  internalRateOfReturn: number;
  breakEvenYear: number;
  maximumOutlay: number;
}

export interface IllustrationRequest {
  id: string;
  clientInfo: ClientInfo;
  productId: string;
  productName: string;
  productType: 'Term Life' | 'Whole Life' | 'Universal Life' | 'Variable Universal Life' | 'Indexed Universal Life';
  coverageAmount: number;
  premiumType: 'Target Premium' | 'Minimum Premium' | 'Maximum Premium' | 'Custom Amount';
  premiumAmount?: number;
  premiumMode: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
  paymentDuration: 'Life' | 'To Age 65' | 'To Age 100' | '10 Years' | '15 Years' | '20 Years' | 'Single Pay';
  assumptions: IllustrationAssumptions;
  illustrationEndAge: number;
  options: {
    showGuaranteed: boolean;
    showCurrent: boolean;
    includeDividends: boolean;
    includeLoans: boolean;
  };
}

export interface IllustrationResult {
  id: string;
  request: IllustrationRequest;
  projections: YearlyProjection[];
  summary: IllustrationSummary;
  createdDate: string;
  lastModified: string;
  createdBy: string;
  status: 'Draft' | 'Finalized' | 'Presented' | 'Archived';
  clientApproved?: boolean;
  notes?: string;
  complianceDisclosures: string[];
}

// Agent Preferences interfaces based on OpenAPI spec
export interface AgentPreferences {
  agentId: string;
  communicationChannels: CommunicationChannels;
  communicationTypes: CommunicationTypes;
  businessHours: BusinessHours;
  lastUpdated: string;
}

export interface CommunicationChannels {
  email: EmailChannel;
  sms: SmsChannel;
  phone: PhoneChannel;
  pushNotification: PushNotificationChannel;
  mail: MailChannel;
}

export interface EmailChannel {
  enabled: boolean;
  address: string;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface SmsChannel {
  enabled: boolean;
  phoneNumber: string;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface PhoneChannel {
  enabled: boolean;
  phoneNumber: string;
  timeSlots: TimeSlot[];
}

export interface PushNotificationChannel {
  enabled: boolean;
  deviceTokens: string[];
}

export interface MailChannel {
  enabled: boolean;
  address?: PostalAddress;
}

export interface PostalAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface TimeSlot {
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

export interface CommunicationTypes {
  leadAssignments: LeadAssignmentPreferences;
  policyRenewals: PolicyRenewalPreferences;
  claims: ClaimsPreferences;
  compliance: CompliancePreferences;
  marketing: MarketingPreferences;
  training: TrainingPreferences;
  commissions: CommissionPreferences;
}

export interface LeadAssignmentPreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface PolicyRenewalPreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  advanceNotice: number;
}

export interface ClaimsPreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  urgentOnly: boolean;
}

export interface CompliancePreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  mandatory: boolean;
}

export interface MarketingPreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  optIn: boolean;
}

export interface TrainingPreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  reminders: boolean;
}

export interface CommissionPreferences {
  channels: ('email' | 'sms' | 'phone' | 'pushNotification' | 'mail')[];
  statements: boolean;
}

export interface BusinessHours {
  timezone: string;
  schedule: WeeklySchedule;
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isWorkingDay: boolean;
  startTime?: string;
  endTime?: string;
  breakTimes?: BreakTime[];
}

export interface BreakTime {
  startTime: string;
  endTime: string;
  description?: string;
}