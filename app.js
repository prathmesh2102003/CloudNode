const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os');

// Initialize the app and create a server
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

// Serve a simple HTML page for WebSocket demo
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome! This CI/CD pipeline (Node.js) was deployed by Prathmesh using GitHub Actions!!!</h1>
    <p>Open the console to see real-time WebSocket messages.</p>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();
      socket.on('message', function(msg) {
        console.log('New message from server: ' + msg);
      });
      setInterval(() => {
        socket.emit('ping', 'Hello from the client');
      }, 2000);
    </script>
  `);
});

// Health check route
app.get('/health', (req, res) => {
  res.send(`Server is running on ${os.hostname()} with uptime of ${os.uptime()} seconds.\n`);
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send a welcome message to the client
  socket.emit('message', 'Welcome to the real-time server!');

  // Listen for messages from the client
  socket.on('ping', (msg) => {
    console.log('Received from client: ' + msg);
    socket.emit('message', `Server response: Received "${msg}"`);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = server;
