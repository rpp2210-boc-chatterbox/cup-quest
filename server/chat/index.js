import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const server = http.createServer();
server.listen(5000);

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
  }
});

io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
})

export { io };