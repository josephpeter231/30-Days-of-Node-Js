const express = require('express');

// Define the middleware function
function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received.`);
  next();
}

// Create an Express application
const app = express();

// Use the middleware for all routes
app.use(requestLoggerMiddleware);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
