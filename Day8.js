const express = require('express');
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({ error: 'Invalid input. Please provide a positive integer.' });
});

// Express route to handle requests with a positive integer parameter
app.get('/positive', (req, res, next) => {
  const number = parseInt(req.query.number);

  if (Number.isNaN(number) || number <= 0) {
    const error = new Error('Invalid input. Please provide a positive integer.');
    console.log('Invalid input. Please provide a positive integer.');
    next(error);
  } else {
    res.send({ message: 'Success' });
    console.log( 'Success' );
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
