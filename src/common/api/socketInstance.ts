import { io } from 'socket.io-client';

const URL = 'http://localhost:3000'; // Replace with your server URL in production

export const socket = io(URL, {
  autoConnect: false,
});
