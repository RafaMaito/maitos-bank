import { isUser } from './verifyUser';

export default (request, response, next) => {
    const { email, password } = request.body;
    if (isUser.email !== email || isUser.password !== password) {
        return response
            .status(404)
            .json({ message: 'Email/Password is incorect' });
    }
    return next();
};
