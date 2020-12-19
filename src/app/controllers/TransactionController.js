import { users } from './UserController';
import Transaction from '../classes/Transaction';

class TransactionController {
    index(request, response) {
        const { id } = request.params;

        const isUser = users.find(user => user.id === id);
        if (isUser.transactions.length < 1) {
            return response
                .status(404)
                .json({ message: 'This user has no transactions ' });
        }
        let income = 0;
        let outcome = 0;
        isUser.transactions.reduce((total, next) => {
            if (next.type === 'income') {
                income += next.value;
            } else {
                outcome += next.value;
            }
            return income - outcome;
        }, 0);

        const balance = {
            income,
            outcome,
            total: income - outcome,
        };

        return response
            .status(200)
            .json({ transactions: isUser.transactions, balance });
    }

    store(request, response) {
        const { id } = request.params;
        const { title, value, type } = request.body;

        const isUser = users.find(user => user.id === id);
        if (!isUser) {
            return response
                .status(404)
                .json({ message: 'User does not exist' });
        }

        const transaction = new Transaction(title, value, type);
        isUser.transactions.push(transaction);
        return response.status(200).json(isUser);
    }

    show(request, response) {
        const { id, idT } = request.params;
        const isUser = users.find(user => user.id === id);

        if (!isUser) {
            return response
                .status(404)
                .json({ message: 'User does not exist' });
        }

        const isTransaction = isUser.transactions.find(
            transc => transc.id === idT
        );
        if (!isTransaction) {
            return response
                .status(404)
                .json({ message: 'Transaction does not exist' });
        }
        return response.status(200).json(isTransaction);
    }

    update(request, response) {
        const { id, idT } = request.params;
        const { title, value, type } = request.body;

        const isUser = users.find(user => user.id === id);
        if (!isUser) {
            return response
                .status(404)
                .json({ message: 'User does not exist' });
        }

        const isTransaction = isUser.transactions.find(
            transc => transc.id === idT
        );
        if (!isTransaction) {
            return response
                .status(404)
                .json({ message: 'Transaction does not exist' });
        }
        isTransaction.title = title;
        isTransaction.value = value;
        isTransaction.type = type;

        return response.status(200).json(isTransaction);
    }

    delete(request, response) {
        const { id, idT } = request.params;

        const isUser = users.find(user => user.id === id);

        if (!isUser) {
            return response
                .status(404)
                .json({ message: 'User does not exist' });
        }

        const indexTransaction = isUser.transactions.findIndex(
            transc => transc.id === idT
        );
        if (indexTransaction < 0) {
            return response
                .status(404)
                .json({ message: 'Transaction does not exist' });
        }
        isUser.transactions.splice(indexTransaction, 1);
        return response.status(200).json(isUser.transactions);
    }
}

export default new TransactionController();
