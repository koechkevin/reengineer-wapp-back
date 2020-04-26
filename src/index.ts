import express, { Express, Request, Response } from 'express';
import { createServer, Server } from 'http';
import socket, { Server as SocketServer, Socket } from 'socket.io';
import authentication from './Authentication';
import bodyParser from 'body-parser';
import {Message} from "./app.interfaces";

const app: Express = express();
const server: Server = createServer(app);
const io: SocketServer = socket(server);
const PORT: number = parseInt(process.env.PORT || '', 10) || 5000;

app.use(bodyParser.json());

app.use('/auth', authentication);

app.use('*', (req: Request, res: Response) => res.status(404).json({}));

io.on('connection', (socket: Socket) => {
  const interval = setInterval(() => {
    socket.broadcast.emit('status', { id: socket.request._query.id, online: true});
  }, 3000);
  socket.on('send', (message: Message) => {
    io.emit(`${message.recipient}`, message);
    socket.emit(`${message.sender}`, {...message, sent: true});
  });
  socket.on('deliver', (message: Message) => {
    io.emit(`${message.sender}`, message);
  });
  socket.on('typing', (value: Partial<Message>) => {});
  socket.on('disconnect', () => {
    clearInterval(interval);
    socket.broadcast.emit('status', { id: socket.request._query.id, online: false});
  })
});

server.listen(PORT, () => console.log('=======>', PORT));
