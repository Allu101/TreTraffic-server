import { Router } from 'express';
import locationsController from '../controllers/location.js';

const router = Router();

router.get('/intersections', locationsController.getAllIntersectionLocations);
router.get('/routes', locationsController.getAllRouteLocations);

export default router;