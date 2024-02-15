const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key_here');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/protected-route', authenticationMiddleware, (req, res) => {
  res.json({ message: 'Authenticated successfully' });
});

app.post('/login', (req, res) => {
  const token = jwt.sign({ userId: 123 }, 'your_secret_key_here', { expiresIn: '1h' });
  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
