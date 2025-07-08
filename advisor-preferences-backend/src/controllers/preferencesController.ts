import { Request, Response } from 'express';
import { PreferencesService } from '../services/preferencesService';
import { ResponseHandler } from '../utils/responseHandler';
import logger from '../utils/logger';

export class PreferencesController {
  private preferencesService: PreferencesService;

  constructor() {
    this.preferencesService = new PreferencesService();
  }

  async getAgentPreferences(req: Request, res: Response): Promise<void> {
    try {
      const { agentId } = req.params;
      
      if (!agentId) {
        ResponseHandler.badRequest(res, 'Agent ID is required');
        return;
      }
      
      logger.info(`Getting preferences for agent: ${agentId}`);
      
      const preferences = await this.preferencesService.getAgentPreferences(agentId);
      
      if (!preferences) {
        ResponseHandler.notFound(res, `Agent with ID ${agentId} not found`);
        return;
      }
      
      ResponseHandler.success(res, preferences);
    } catch (error) {
      logger.error('Error in getAgentPreferences:', error);
      ResponseHandler.internalError(res, 'Failed to retrieve agent preferences');
    }
  }

  async getAgentCommunicationChannels(req: Request, res: Response): Promise<void> {
    try {
      const { agentId } = req.params;
      
      if (!agentId) {
        ResponseHandler.badRequest(res, 'Agent ID is required');
        return;
      }
      
      logger.info(`Getting communication channels for agent: ${agentId}`);
      
      const channels = await this.preferencesService.getAgentCommunicationChannels(agentId);
      
      if (!channels) {
        ResponseHandler.notFound(res, `Agent with ID ${agentId} not found`);
        return;
      }
      
      ResponseHandler.success(res, channels);
    } catch (error) {
      logger.error('Error in getAgentCommunicationChannels:', error);
      ResponseHandler.internalError(res, 'Failed to retrieve communication channels');
    }
  }

  async getAgentCommunicationTypes(req: Request, res: Response): Promise<void> {
    try {
      const { agentId } = req.params;
      
      if (!agentId) {
        ResponseHandler.badRequest(res, 'Agent ID is required');
        return;
      }
      
      logger.info(`Getting communication types for agent: ${agentId}`);
      
      const types = await this.preferencesService.getAgentCommunicationTypes(agentId);
      
      if (!types) {
        ResponseHandler.notFound(res, `Agent with ID ${agentId} not found`);
        return;
      }
      
      ResponseHandler.success(res, types);
    } catch (error) {
      logger.error('Error in getAgentCommunicationTypes:', error);
      ResponseHandler.internalError(res, 'Failed to retrieve communication types');
    }
  }
}