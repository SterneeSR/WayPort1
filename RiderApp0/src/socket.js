import { io } from 'socket.io-client';
import BASE_URL from './config';

export const socket = io(BASE_URL, {
  transports: ['websocket'],
  reconnection: true,
});

socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ Socket connect error:', err.message);
});
