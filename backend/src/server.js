// src/server.js
require('dotenv').config();
const { createApp } = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const startCLI = require('./utils/cli');

const PORT = process.env.PORT || 5000;
const app = createApp();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('client connected', socket.id);
});

server.listen(PORT, async () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
  // initialize CLI simulator and pass io for broadcasting
  startCLI(io);
});

module.exports = { io };
