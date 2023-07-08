import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const router = express.Router();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

router.get('/', async (res, req) => {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
})

export default router;