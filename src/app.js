import User from './User';
import Transaction from './Transaction';
import express, { request, response } from 'express';

const app = express();
app.use(express.json());

const users = [];

app.post('/users', (request, response) => {
  const { name, cpf, email, age } = request.body;

  if (users.length < 1) {
    const user = new User(name, cpf, email, age);
    users.push(user);
    return response.json({ message: `User created` });
  }

  const isUser = users.find((user) => user.cpf === cpf);
  if (isUser) {
    return response.status(406).json({ error: 'User already exist' });
  } else {
    const user = new User(name, cpf, email, age);
    users.push(user);
    return response.json({ message: `User created` });
  }
});

app.get('/users/:id', (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);
  const isUser = users.find((user) => user.id === intId);
  if (!isUser) {
    return response.status(404).json({ error: 'User does not exist' });
  }
  return response.json({
    id: isUser.id,
    name: isUser.name,
    cpf: isUser.cpf,
    email: isUser.email,
    age: isUser.age,
  });
});

app.get('/users', (request, response) => {
  if (users.length < 1) {
    return response.status(404).json({ error: `There are no users` });
  }
  return response.json(users);
});

app.put('/users/:id', (request, response) => {
  const { id } = request.params;
  const { name, age, email, cpf } = request.body;

  if (!name || !age || !cpf || !email) {
    return response.status(409).json({ message: 'Please, fill all fields' });
  }

  const intId = parseInt(id);
  const searchId = users.findIndex((user) => user.id === intId);

  if (searchId < 0) {
    return response.status(404).json({ message: 'User does not exist' });
  } else {
    users[searchId].name = name;
    users[searchId].age = age;
    users[searchId].cpf = cpf;
    users[searchId].email = email;
  }

  const newUser = users[searchId];
  return response.json(newUser);
});

app.delete('/users/:id', (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);
  const searchId = users.findIndex((user) => user.id === intId);

  if (searchId < 0) {
    return response.status(404).json({ message: 'User does not exist' });
  }
  users.splice(intId - 1, 1);
  return response.status(200).json({ message: 'The user has been removed' });
});

app.post('/user/:id/transactions', (request, response) => {
  const { id } = request.params;
  const { title, value, type } = request.body;
  const intId = parseInt(id);

  if (!title || !value || !type) {
    return response.status(409).json({ message: 'Please, fill all fields' });
  }

  if (type !== 'income' && type !== 'outcome') {
    return response
      .status(404)
      .json({ message: 'This operation does not exist' });
  }

  const isUser = users.find((user) => user.id === intId);
  if (!isUser) {
    return response.status(404).json({ message: 'User does not exist' });
  }

  const transaction = new Transaction(title, value, type);
  isUser.transactions.push(transaction);
  return response.status(200).json(isUser);
});

app.get('/user/:id/transactions/:idT', (request, response) => {
  const { id, idT } = request.params;
  const intId = parseInt(id);
  const intIdt = parseInt(idT);

  const isUser = users.find((user) => user.id === intId);

  if (!isUser) {
    return response.status(404).json({ message: 'User does not exist' });
  }

  const isTransaction = isUser.transactions.find(
    (transc) => transc.id === intIdt
  );
  if (!isTransaction) {
    return response.status(404).json({ message: 'Transaction does not exist' });
  }
  return response.status(200).json(isUser.transactions[intIdt - 1]);
});

app.get('/user/:id/transactions', (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);

  const isUser = users.find((user) => user.id === intId);
  if (!isUser) {
    return response.status(404).json({ message: 'User does not exist' });
  }
  if (isUser.transactions.length < 1) {
    return response
      .status(404)
      .json({ message: 'This user has no transactions ' });
  } else {
    let income = 0,
      outcome = 0;
    const values = isUser.transactions.reduce((total, next) => {
      if (next.type === 'income') {
        income += next.value;
      } else {
        outcome += next.value;
      }
      return income - outcome;
    }, 0);

    let balance = {
      income: income,
      outcome: outcome,
      total: income - outcome,
    };

    return response
      .status(200)
      .json({ transactions: isUser.transactions, balance: balance });
  }
});

app.put('/users/:id/transactions/:idT', (request, response) => {
  const { id, idT } = request.params;
  const { title, value, type } = request.body;

  const intId = parseInt(id);
  const intIdt = parseInt(idT);

  if (!title || !value || !type) {
    return response.status(409).json({ message: 'Please, fill all fields' });
  }

  if (type !== 'income' && type !== 'outcome') {
    return response
      .status(404)
      .json({ message: 'This operation does not exist' });
  }

  const isUser = users.find((user) => user.id === intId);
  if (!isUser) {
    return response.status(404).json({ message: 'User does not exist' });
  }

  const isTransaction = isUser.transactions.find(
    (transc) => transc.id === intIdt
  );
  if (!isTransaction) {
    return response.status(404).json({ message: 'Transaction does not exist' });
  } else {
    isUser.transactions[intIdt - 1].title = title;
    isUser.transactions[intIdt - 1].value = value;
    isUser.transactions[intIdt - 1].type = type;
    const newTransaction = isUser.transactions[intIdt - 1];
    return response.status(200).json(newTransaction);
  }
});

app.delete('/users/:id/transactions/:idT', (request, response) => {
  const { id, idT } = request.params;
  const intId = parseInt(id);
  const intIdt = parseInt(idT);

  const isUser = users.find((user) => user.id === intId);

  if (!isUser) {
    return response.status(404).json({ message: 'User does not exist' });
  }

  const isTransaction = isUser.transactions.find(
    (transc) => transc.id === intIdt
  );
  if (!isTransaction) {
    return response.status(404).json({ message: 'Transaction does not exist' });
  } else {
    isUser.transactions.splice(intIdt - 1, 1);
    return response.status(200).json(isUser.transactions);
  }
});

app.listen(3333, () => {
  console.log('Working');
});
