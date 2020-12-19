import { v4 as uuidGenerator } from 'uuid';

class User {
    constructor(name, cpf, email, age) {
        this.id = uuidGenerator();
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.email = email;
        this.transactions = [];
        this.password = '';
        this.token = Math.random().toString(36).substring(2);
    }
}

export default User;
