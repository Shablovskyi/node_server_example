const express = require('express');
const app = express();
const PORT = 3000;

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Middleware для парсингу JSON
app.use(express.json());

// Головний маршрут
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Отримати список користувачів
app.get('/users', (req, res) => {
    res.json(users);
});

// Додати нового користувача
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Отримати користувача за id
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Обробка невизначених маршрутів
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
