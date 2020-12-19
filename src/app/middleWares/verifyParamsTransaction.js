export default (request, response, next) => {
    const { title, value, type } = request.body;

    if (!title || !value || !type) {
        return response
            .status(409)
            .json({ message: 'Please, fill all fields' });
    }

    if (type !== 'income' && type !== 'outcome') {
        return response
            .status(404)
            .json({ message: 'This operation does not exist' });
    }

    next();
};
