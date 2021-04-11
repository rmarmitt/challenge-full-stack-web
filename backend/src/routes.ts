import { Router } from 'express';

import StudentsController from './controllers/StudentsController';

const routes = Router();

routes.get('/api/v1/students', StudentsController.list);
routes.get("/api/v1/students/:id", StudentsController.get);
routes.post('/api/v1/students', StudentsController.create);
routes.patch('/api/v1/students', StudentsController.update);
routes.delete('/api/v1/students/:id', StudentsController.delete);

export default routes;