import { Router } from 'express';
import intersectionController from '../controllers/intersection.js';

const router = Router();

router.get('/intersection/:liva_nro', intersectionController.getIntersectionData);
//router.get('/intersection/:liva_nro/lightgroup/:id',intersectionController.getUserData);
router.get('/lightgroups/:idQuery', intersectionController.getLightGroupsData);

export default router;