import { isUser } from './verifyUser';

export default (request, response, next) => {
    const { email, password, token } = request.body;
    if (!email && !password) {
        if (isUser.token !== token) {
            return response.status(404).json({ message: 'Token is incorect' });
        }
        return next();
    }
    if (isUser.email !== email || isUser.password !== password) {
        return response
            .status(404)
            .json({ message: 'Email/Password is incorect' });
    }
    return next();
};
