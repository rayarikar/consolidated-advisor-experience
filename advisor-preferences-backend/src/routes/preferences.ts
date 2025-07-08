import { Router } from 'express';
import { PreferencesController } from '../controllers/preferencesController';

const router = Router();
const preferencesController = new PreferencesController();

router.get('/:agentId/preferences', (req, res) => 
  preferencesController.getAgentPreferences(req, res)
);

router.get('/:agentId/preferences/channels', (req, res) =>
  preferencesController.getAgentCommunicationChannels(req, res)
);

router.get('/:agentId/preferences/types', (req, res) =>
  preferencesController.getAgentCommunicationTypes(req, res)
);

export default router;