import { Router } from 'express';
import intersectionsRouter from './intersection.js';
import locationsRouter from './locations.js';

const routes = Router();

routes.use('/intersections', intersectionsRouter);
routes.use('/locations', locationsRouter);

export default routes;