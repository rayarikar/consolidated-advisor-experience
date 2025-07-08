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

export interface CommunicationChannels {
  email: EmailChannel;
  sms: SmsChannel;
  phone: PhoneChannel;
  pushNotification: PushNotificationChannel;
  mail: MailChannel;
}

export type CommunicationChannelType = 'email' | 'sms' | 'phone' | 'pushNotification' | 'mail';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface LeadAssignmentPreferences {
  channels: CommunicationChannelType[];
  priority: Priority;
}

export interface PolicyRenewalPreferences {
  channels: CommunicationChannelType[];
  advanceNotice: number;
}

export interface ClaimsPreferences {
  channels: CommunicationChannelType[];
  urgentOnly: boolean;
}

export interface CompliancePreferences {
  channels: CommunicationChannelType[];
  mandatory: boolean;
}

export interface MarketingPreferences {
  channels: CommunicationChannelType[];
  optIn: boolean;
}

export interface TrainingPreferences {
  channels: CommunicationChannelType[];
  reminders: boolean;
}

export interface CommissionPreferences {
  channels: CommunicationChannelType[];
  statements: boolean;
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

export interface BreakTime {
  startTime: string;
  endTime: string;
  description?: string;
}

export interface DaySchedule {
  isWorkingDay: boolean;
  startTime?: string;
  endTime?: string;
  breakTimes?: BreakTime[];
}

export interface BusinessHours {
  timezone: string;
  schedule: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };
}

export interface AgentPreferences {
  agentId: string;
  communicationChannels: CommunicationChannels;
  communicationTypes: CommunicationTypes;
  businessHours: BusinessHours;
  lastUpdated: string;
}