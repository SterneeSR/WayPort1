require('dotenv').config();
const { createApp } = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const startCLI = require('./utils/cli');

const PORT = process.env.PORT || 5000;
const app = createApp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

global._io = io; // 👈 store globally so routes can always access the same instance

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);
});

server.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Backend listening on http://0.0.0.0:${PORT}`);
  startCLI(io);
});

