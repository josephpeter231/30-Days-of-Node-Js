const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

const JWT_SECRET = 'your_secret_key';

function authenticateAndAuthorize(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }

        const user = users.find(user => user.id === decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        req.user = user;

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Authorization failed: Insufficient permissions' });
        }

        next();
    });
}

app.get('/admin/dashboard', authenticateAndAuthorize, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}! This is the admin dashboard.` });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed: Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
