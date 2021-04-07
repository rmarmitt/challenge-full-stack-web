import { Router } from 'express';

import StudentsController from './controllers/StudentsController';

const routes = Router();

routes.get('/api/v1/students', StudentsController.list);
// routes.get("/orphanages/:id", OrphanagesController.get);
routes.post('/api/v1/students', StudentsController.create);
routes.put('/api/v1/students', StudentsController.update);

export default routes;