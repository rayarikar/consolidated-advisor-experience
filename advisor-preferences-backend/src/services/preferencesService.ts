import { AgentPreferences, CommunicationChannels, CommunicationTypes } from '../models/agentPreferences';
import { mockAgentPreferences } from '../data/mockData';
import logger from '../utils/logger';

export class PreferencesService {
  async getAgentPreferences(agentId: string): Promise<AgentPreferences | null> {
    try {
      logger.info(`Retrieving preferences for agent: ${agentId}`);
      
      const preferences = mockAgentPreferences[agentId];
      
      if (!preferences) {
        logger.warn(`No preferences found for agent: ${agentId}`);
        return null;
      }
      
      logger.info(`Successfully retrieved preferences for agent: ${agentId}`);
      return preferences;
    } catch (error) {
      logger.error(`Error retrieving preferences for agent ${agentId}:`, error);
      throw error;
    }
  }

  async getAgentCommunicationChannels(agentId: string): Promise<CommunicationChannels | null> {
    try {
      logger.info(`Retrieving communication channels for agent: ${agentId}`);
      
      const preferences = mockAgentPreferences[agentId];
      
      if (!preferences) {
        logger.warn(`No preferences found for agent: ${agentId}`);
        return null;
      }
      
      logger.info(`Successfully retrieved communication channels for agent: ${agentId}`);
      return preferences.communicationChannels;
    } catch (error) {
      logger.error(`Error retrieving communication channels for agent ${agentId}:`, error);
      throw error;
    }
  }

  async getAgentCommunicationTypes(agentId: string): Promise<CommunicationTypes | null> {
    try {
      logger.info(`Retrieving communication types for agent: ${agentId}`);
      
      const preferences = mockAgentPreferences[agentId];
      
      if (!preferences) {
        logger.warn(`No preferences found for agent: ${agentId}`);
        return null;
      }
      
      logger.info(`Successfully retrieved communication types for agent: ${agentId}`);
      return preferences.communicationTypes;
    } catch (error) {
      logger.error(`Error retrieving communication types for agent ${agentId}:`, error);
      throw error;
    }
  }

  async getAllAgentIds(): Promise<string[]> {
    try {
      logger.info('Retrieving all agent IDs');
      const agentIds = Object.keys(mockAgentPreferences);
      logger.info(`Found ${agentIds.length} agents`);
      return agentIds;
    } catch (error) {
      logger.error('Error retrieving agent IDs:', error);
      throw error;
    }
  }

  async validateAgentExists(agentId: string): Promise<boolean> {
    try {
      const preferences = await this.getAgentPreferences(agentId);
      return preferences !== null;
    } catch (error) {
      logger.error(`Error validating agent existence for ${agentId}:`, error);
      return false;
    }
  }
}