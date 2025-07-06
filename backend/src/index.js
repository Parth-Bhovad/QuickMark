import dotenv from "dotenv"
dotenv.config();
import express from 'express';
//importing main router
import mainRouter from './routes/main.routes.js';
//importing MongoDB connection
import connectDB from './config/mongoDB.config.js';
import cors from 'cors';
import {createServer} from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
connectDB();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('teacher', () => {
    console.log("req received from teacher");
  });

  socket.emit('teacher', { message: "res sent to teacher" });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRouter);

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).json({ msg: message });
});

httpServer.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});