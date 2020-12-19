import { Router } from 'express';

import UserController from './app/controllers/UserController';
import TransactionController from './app/controllers/TransactionController';

import logRequestsMiddleware from './app/middleWares/logRequests';
import validateUserTransactionIdMiddleware from './app/middleWares/valideteUserTransactionId';
import verifyParamsTransactionMiddleware from './app/middleWares/verifyParamsTransaction';
import verifyParamsUserMiddleware from './app/middleWares/verifyParamsUser';
import verifyParamsLoginMiddleware from './app/middleWares/verifyParamsLogin';
import verifyUserMiddleware from './app/middleWares/verifyUser';
import verifyLoginMiddleware from './app/middleWares/verifyLogin';
import verifyTransactionMiddleware from './app/middleWares/verifyTransaction';

const routes = new Router();

routes.use(logRequestsMiddleware);
routes.use('/users/:id', validateUserTransactionIdMiddleware);
routes.use('/user/:id/transactions/:id', validateUserTransactionIdMiddleware);

routes.post('/users', verifyParamsUserMiddleware, UserController.store);
routes.post(
    '/users/:id/login',
    [verifyUserMiddleware, verifyParamsLoginMiddleware],
    UserController.login
);

routes.get('/users/:id', verifyUserMiddleware, UserController.show);
routes.get(
    '/users/:id/login',
    [verifyUserMiddleware, verifyParamsLoginMiddleware, verifyLoginMiddleware],
    UserController.doLogin
);
// verifyLoginUserMiddleware,

routes.get('/users', UserController.index);

routes.put(
    '/users/:id',
    [verifyParamsUserMiddleware, verifyUserMiddleware],
    UserController.update
);

routes.delete('/users/:id', verifyUserMiddleware, UserController.delete);

routes.post(
    '/user/:id/transactions',
    [verifyParamsTransactionMiddleware, verifyUserMiddleware],
    TransactionController.store
);

routes.get(
    '/user/:id/transactions/:idT',
    [verifyUserMiddleware, verifyTransactionMiddleware],
    TransactionController.show
);

routes.get(
    '/user/:id/transactions',
    verifyUserMiddleware,
    TransactionController.index
);

routes.put(
    '/users/:id/transactions/:idT',
    [
        verifyParamsTransactionMiddleware,
        verifyUserMiddleware,
        verifyTransactionMiddleware,
    ],
    TransactionController.update
);

routes.delete(
    '/users/:id/transactions/:idT',
    [verifyUserMiddleware, verifyTransactionMiddleware],
    TransactionController.delete
);

export default routes;
