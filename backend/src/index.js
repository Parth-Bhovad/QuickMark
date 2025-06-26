import express from 'express';

//importing main router
import mainRouter from './routes/main.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});