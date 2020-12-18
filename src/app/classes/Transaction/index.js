import { v4 as uuidGenerator } from 'uuid';

class Transaction {
    static ID_COUNTER = 1;
    constructor(title, value, type) {
        this.id = uuidGenerator();
        this.title = title;
        this.value = value;
        this.type = type;
    }
}

export default Transaction;
