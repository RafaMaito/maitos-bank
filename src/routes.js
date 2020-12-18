import { Router } from 'express';

import UserController from './app/controllers/UserController';
import TransactionController from './app/controllers/TransactionController';

import logRequestsMiddleware from './app/middleWares/logRequests';
import validateUserTransactionIdMiddleware from './app/middleWares/valideteUserTransactionId';

const routes = new Router();

routes.use(logRequestsMiddleware);
routes.use('/users/:id', validateUserTransactionIdMiddleware);
routes.use('/user/:id', validateUserTransactionIdMiddleware);

routes.post('/users', UserController.store);

routes.get('/users/:id', UserController.show);

routes.get('/users', UserController.index);

routes.put('/users/:id', UserController.update);

routes.delete('/users/:id', UserController.delete);

routes.post('/user/:id/transactions', TransactionController.store);

routes.get('/user/:id/transactions/:idT', TransactionController.show);

routes.get('/user/:id/transactions', TransactionController.index);

routes.put('/users/:id/transactions/:idT', TransactionController.update);

routes.delete('/users/:id/transactions/:idT', TransactionController.delete);

export default routes;
