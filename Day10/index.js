const express = require('express');

function staticFileServer(req, res) {
  const app = express();

  // Serve static files from the "public" directory
  app.use(express.static('Public'));

  // Handle requests to the root ("/") by serving "index.html"
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/index.html');
  });

  // Start the Express server
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

  // Handle the incoming request using the Express app
  app(req, res);
}
module.exports = staticFileServer;