import { Router } from 'express';
import intersectionController from '../controllers/intersection.js';

const router = Router();

router.get('/intersection/:id', intersectionController.getUserData);
router.get('/intersection/:id/direction/:direction_id',
    intersectionController.getUserData);

export default router;