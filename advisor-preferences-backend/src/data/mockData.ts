import { AgentPreferences } from '../models/agentPreferences';

export const mockAgentPreferences: Record<string, AgentPreferences> = {
  'agent-12345': {
    agentId: 'agent-12345',
    communicationChannels: {
      email: {
        enabled: true,
        address: 'john.smith@insurance.com',
        frequency: 'immediate'
      },
      sms: {
        enabled: true,
        phoneNumber: '+1234567890',
        frequency: 'immediate'
      },
      phone: {
        enabled: true,
        phoneNumber: '+1234567890',
        timeSlots: [
          {
            dayOfWeek: 'monday',
            startTime: '09:00',
            endTime: '17:00'
          },
          {
            dayOfWeek: 'tuesday',
            startTime: '09:00',
            endTime: '17:00'
          },
          {
            dayOfWeek: 'wednesday',
            startTime: '09:00',
            endTime: '17:00'
          },
          {
            dayOfWeek: 'thursday',
            startTime: '09:00',
            endTime: '17:00'
          },
          {
            dayOfWeek: 'friday',
            startTime: '09:00',
            endTime: '17:00'
          }
        ]
      },
      pushNotification: {
        enabled: true,
        deviceTokens: ['token123456', 'token789012']
      },
      mail: {
        enabled: false,
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      }
    },
    communicationTypes: {
      leadAssignments: {
        channels: ['email', 'sms', 'pushNotification'],
        priority: 'high'
      },
      policyRenewals: {
        channels: ['email', 'mail'],
        advanceNotice: 30
      },
      claims: {
        channels: ['email', 'phone', 'sms'],
        urgentOnly: false
      },
      compliance: {
        channels: ['email', 'mail'],
        mandatory: true
      },
      marketing: {
        channels: ['email'],
        optIn: true
      },
      training: {
        channels: ['email', 'pushNotification'],
        reminders: true
      },
      commissions: {
        channels: ['email'],
        statements: true
      }
    },
    businessHours: {
      timezone: 'America/New_York',
      schedule: {
        monday: {
          isWorkingDay: true,
          startTime: '09:00',
          endTime: '17:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '13:00',
              description: 'Lunch break'
            }
          ]
        },
        tuesday: {
          isWorkingDay: true,
          startTime: '09:00',
          endTime: '17:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '13:00',
              description: 'Lunch break'
            }
          ]
        },
        wednesday: {
          isWorkingDay: true,
          startTime: '09:00',
          endTime: '17:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '13:00',
              description: 'Lunch break'
            }
          ]
        },
        thursday: {
          isWorkingDay: true,
          startTime: '09:00',
          endTime: '17:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '13:00',
              description: 'Lunch break'
            }
          ]
        },
        friday: {
          isWorkingDay: true,
          startTime: '09:00',
          endTime: '17:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '13:00',
              description: 'Lunch break'
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
    lastUpdated: '2024-07-08T10:30:00Z'
  },
  'agent-67890': {
    agentId: 'agent-67890',
    communicationChannels: {
      email: {
        enabled: true,
        address: 'sarah.jones@insurance.com',
        frequency: 'daily'
      },
      sms: {
        enabled: false,
        phoneNumber: '+1987654321',
        frequency: 'immediate'
      },
      phone: {
        enabled: true,
        phoneNumber: '+1987654321',
        timeSlots: [
          {
            dayOfWeek: 'monday',
            startTime: '08:00',
            endTime: '16:00'
          },
          {
            dayOfWeek: 'tuesday',
            startTime: '08:00',
            endTime: '16:00'
          },
          {
            dayOfWeek: 'wednesday',
            startTime: '08:00',
            endTime: '16:00'
          },
          {
            dayOfWeek: 'thursday',
            startTime: '08:00',
            endTime: '16:00'
          }
        ]
      },
      pushNotification: {
        enabled: true,
        deviceTokens: ['token345678']
      },
      mail: {
        enabled: true,
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        }
      }
    },
    communicationTypes: {
      leadAssignments: {
        channels: ['email', 'pushNotification'],
        priority: 'medium'
      },
      policyRenewals: {
        channels: ['email', 'mail'],
        advanceNotice: 45
      },
      claims: {
        channels: ['email', 'phone'],
        urgentOnly: true
      },
      compliance: {
        channels: ['email', 'mail'],
        mandatory: true
      },
      marketing: {
        channels: ['email'],
        optIn: false
      },
      training: {
        channels: ['email'],
        reminders: false
      },
      commissions: {
        channels: ['email', 'mail'],
        statements: true
      }
    },
    businessHours: {
      timezone: 'America/Los_Angeles',
      schedule: {
        monday: {
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '16:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '12:30',
              description: 'Lunch break'
            }
          ]
        },
        tuesday: {
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '16:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '12:30',
              description: 'Lunch break'
            }
          ]
        },
        wednesday: {
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '16:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '12:30',
              description: 'Lunch break'
            }
          ]
        },
        thursday: {
          isWorkingDay: true,
          startTime: '08:00',
          endTime: '16:00',
          breakTimes: [
            {
              startTime: '12:00',
              endTime: '12:30',
              description: 'Lunch break'
            }
          ]
        },
        friday: {
          isWorkingDay: false
        },
        saturday: {
          isWorkingDay: false
        },
        sunday: {
          isWorkingDay: false
        }
      }
    },
    lastUpdated: '2024-07-07T14:15:00Z'
  }
};