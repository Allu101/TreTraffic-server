import { Router } from 'express';
import intersectionController from '../controllers/intersection.js';

const router = Router();

router.get('/intersection/:liva_nro', intersectionController.getIntersectionData);
//router.get('/intersection/:id/lightgroup/:id',intersectionController.getUserData);

export default router;