import { isUser } from './verifyUser';

export default (request, response, next) => {
    const { idT } = request.params;

    const isTransaction = isUser.transactions.find(transc => transc.id === idT);
    if (!isTransaction) {
        return response
            .status(404)
            .json({ message: 'Transaction does not exist' });
    }
    return next();
};
