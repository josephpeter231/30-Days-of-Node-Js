const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const connectedClients = {};

const wss = new WebSocket.Server({ server: http.createServer(app) }); 

wss.on('connection', (ws, req) => {
  const userId = req.url.split('/')[2]; 
  connectedClients[userId] = { ws, session: { /* Your session data structure here */ } };

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { userId, sessionData } = data;

    // Update the session data for the user (replace with your logic)
    connectedClients[userId].session = { ...connectedClients[userId].session, ...sessionData };

    // Broadcast changes to all connected clients (excluding the sender)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(JSON.stringify({ userId, sessionData }));
      }
    });
  });

  ws.on('close', () => {
    delete connectedClients[userId];
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Replace 'index.html' with your file path
});

// Import and use the path module (if needed)
const path = require('path'); 

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});




