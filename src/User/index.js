class User {
  static ID_COUNTER = 1;
  constructor(name, cpf, email, age) {
    this.id = User.ID_COUNTER++;
    this.name = name;
    this.age = age;
    this.cpf = cpf;
    this.email = email;
    this.transactions = [];
  }
}

export default User;
