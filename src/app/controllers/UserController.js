import User from '../classes/User';

export const users = [];

class UserController {
    index(request, response) {
        if (users.length < 1) {
            return response.status(404).json({ error: `There are no users` });
        }
        const newUsers = users.map(user => {
            const newUser = {
                id: user.id,
                name: user.name,
                age: user.age,
                cpf: user.cpf,
            };
            return newUser;
        });

        return response.json(newUsers);
    }

    store(request, response) {
        const { name, cpf, email, age } = request.body;

        if (users.length < 1) {
            const user = new User(name, cpf, email, age);
            users.push(user);
            return response.json({ message: `User created` });
        }

        const isUser = users.find(user => user.cpf === cpf);
        if (isUser) {
            return response.status(406).json({ error: 'User already exist' });
        }
        const user = new User(name, cpf, email, age);
        users.push(user);
        return response.json({ message: `User created` });
    }

    show(request, response) {
        const { id } = request.params;

        const isUser = users.find(user => user.id === id);
        return response.json({
            id: isUser.id,
            name: isUser.name,
            cpf: isUser.cpf,
            email: isUser.email,
            age: isUser.age,
        });
    }

    update(request, response) {
        const { id } = request.params;
        const { name, age, email, cpf } = request.body;

        const isUser = users.find(user => user.id === id);

        isUser.name = name;
        isUser.age = age;
        isUser.cpf = cpf;
        isUser.email = email;

        return response.json(isUser);
    }

    delete(request, response) {
        const { id } = request.params;
        const searchId = users.findIndex(user => user.id === id);

        users.splice(searchId, 1);
        return response
            .status(200)
            .json({ message: 'The user has been removed' });
    }

    login(request, response) {
        const { id } = request.params;
        const { password } = request.body;
        const isUser = users.find(user => user.id === id);
        isUser.password = password;
        return response.json({ message: 'Password has been created' });
    }

    doLogin(request, response) {
        const { id } = request.params;
        const isUser = users.find(user => user.id === id);
        return response.json({
            id: isUser.id,
            name: isUser.name,
            cpf: isUser.cpf,
            email: isUser.email,
            age: isUser.age,
        });
    }
}

export default new UserController();
