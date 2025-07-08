import { AgentPreferences } from '../types';

export const mockAgentPreferences: AgentPreferences = {
  agentId: "agent-jadams",
  communicationChannels: {
    email: {
      enabled: true,
      address: "j.adams@prudential.com",
      frequency: "immediate"
    },
    sms: {
      enabled: true,
      phoneNumber: "+15551234567",
      frequency: "immediate"
    },
    phone: {
      enabled: true,
      phoneNumber: "+15551234567",
      timeSlots: [
        {
          dayOfWeek: "monday",
          startTime: "09:00",
          endTime: "17:00"
        },
        {
          dayOfWeek: "tuesday",
          startTime: "09:00",
          endTime: "17:00"
        },
        {
          dayOfWeek: "wednesday",
          startTime: "09:00",
          endTime: "17:00"
        },
        {
          dayOfWeek: "thursday",
          startTime: "09:00",
          endTime: "17:00"
        },
        {
          dayOfWeek: "friday",
          startTime: "09:00",
          endTime: "17:00"
        }
      ]
    },
    pushNotification: {
      enabled: true,
      deviceTokens: ["device-token-browser-123", "device-token-mobile-456"]
    },
    mail: {
      enabled: false,
      address: {
        street: "123 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA"
      }
    }
  },
  communicationTypes: {
    leadAssignments: {
      channels: ["email", "sms"],
      priority: "high"
    },
    policyRenewals: {
      channels: ["email", "mail"],
      advanceNotice: 30
    },
    claims: {
      channels: ["email", "phone"],
      urgentOnly: false
    },
    compliance: {
      channels: ["email", "mail"],
      mandatory: true
    },
    marketing: {
      channels: ["email"],
      optIn: true
    },
    training: {
      channels: ["email", "pushNotification"],
      reminders: true
    },
    commissions: {
      channels: ["email"],
      statements: true
    }
  },
  businessHours: {
    timezone: "America/New_York",
    schedule: {
      monday: {
        isWorkingDay: true,
        startTime: "09:00",
        endTime: "17:00",
        breakTimes: [
          {
            startTime: "12:00",
            endTime: "13:00",
            description: "Lunch break"
          }
        ]
      },
      tuesday: {
        isWorkingDay: true,
        startTime: "09:00",
        endTime: "17:00",
        breakTimes: [
          {
            startTime: "12:00",
            endTime: "13:00",
            description: "Lunch break"
          }
        ]
      },
      wednesday: {
        isWorkingDay: true,
        startTime: "09:00",
        endTime: "17:00",
        breakTimes: [
          {
            startTime: "12:00",
            endTime: "13:00",
            description: "Lunch break"
          }
        ]
      },
      thursday: {
        isWorkingDay: true,
        startTime: "09:00",
        endTime: "17:00",
        breakTimes: [
          {
            startTime: "12:00",
            endTime: "13:00",
            description: "Lunch break"
          }
        ]
      },
      friday: {
        isWorkingDay: true,
        startTime: "09:00",
        endTime: "17:00",
        breakTimes: [
          {
            startTime: "12:00",
            endTime: "13:00",
            description: "Lunch break"
          }
        ]
      },
      saturday: {
        isWorkingDay: false
      },
      sunday: {
        isWorkingDay: false
      }
    }
  },
  lastUpdated: "2024-07-08T10:30:00Z"
};