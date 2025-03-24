import { Router } from 'express';
import triggerLinesController from '../controllers/triggerLines.js';

const router = Router();

router.get('/', triggerLinesController.getAllTriggerLines);

export default router;