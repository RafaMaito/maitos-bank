export default (request, response, next) => {
    const { name, age, email, cpf } = request.body;

    if (!name || !age || !cpf || !email) {
        return response
            .status(409)
            .json({ message: 'Please, fill all fields' });
    }
    next();
};
