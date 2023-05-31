import { Router } from 'express';
import * as MovieController from './controller.js';

const routes = Router();

// Visible part
routes.get('/', MovieController.mainPage);
routes.get('/guest', MovieController.guestPage);
routes.get('/guest/book', MovieController.bookTicketPage);
routes.get('/admin', MovieController.adminPage);

// REST API
routes.get('/api/v1/session', MovieController.getSessions);
routes.get('/api/v1/session/:id', MovieController.getOneSession);
routes.post('/api/v1/session/add', MovieController.addSession);
routes.put('/api/v1/session', MovieController.updateSession);
routes.delete('/api/v1/session', MovieController.deleteSession);

routes.get('/api/v1/placement', MovieController.getPlacements);
routes.post('/api/v1/placement/add', MovieController.addPlacement);
routes.post('/api/v1/placement/book', MovieController.bookPlacement);
routes.delete('/api/v1/placement', MovieController.deletePlacement);

export default routes;
