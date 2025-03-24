import { Router } from 'express';
import intersectionsRouter from './intersection.js';
import locationsRouter from './locations.js';
import triggerLinesRouter from './triggerLinesRouter.js';

const routes = Router();

routes.use('/intersections', intersectionsRouter);
routes.use('/triggerlines', triggerLinesRouter)
routes.use('/locations', locationsRouter);

export default routes;