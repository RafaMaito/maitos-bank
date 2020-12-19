export default (request, response, next) => {
    const { email, password, token } = request.body;

    if (!token && !email && !password) {
        return response
            .status(400)
            .json({ error: 'Params sent are not a valid' });
    }
    if (!token) {
        if (!email || !password) {
            return response
                .status(409)
                .json({ message: 'Please, fill all fields' });
        }
        return next();
    }
    if (email && password) {
        return response.status(400).json({ error: 'To much Params' });
    }
    return next();
};
