import express from 'express';
import dotenv from "dotenv"
//importing main router
import mainRouter from './routes/main.routes.js';
//importing MongoDB connection
import connectDB from './config/mongoDB.config.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});