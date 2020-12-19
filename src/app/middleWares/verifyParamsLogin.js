export default (request, response, next) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response
            .status(409)
            .json({ message: 'Please, fill all fields' });
    }

    return next();
};
