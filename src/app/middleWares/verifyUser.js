import { users } from '../controllers/UserController';

export default (request, response, next) => {
    const { id } = request.params;
    export const isUser = users.find(user => user.id === id);
    if (!isUser) {
        return response.status(404).json({ error: 'User does not exist' });
    }

    return next();
};
