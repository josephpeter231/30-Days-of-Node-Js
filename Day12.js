const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: 'Too many requests from this IP, please try again later'
});

app.use(limiter);

// Route handler
app.get('/', (req, res) => {
  res.send('Day 12 compleated ');
  console.log('Day 12 compleated ')
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

