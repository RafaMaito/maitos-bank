import { v4 as uuidGenerator } from 'uuid';

class User {
    constructor(name, cpf, email, age) {
        this.id = uuidGenerator();
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.email = email;
        this.transactions = [];
    }
}

export default User;
