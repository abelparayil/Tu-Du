import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user-routes.js';
import todoRouter from './routes/todo-routes.js';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

mongoose
  .connect(
    `mongodb+srv://abelabr321:${process.env.MONGODB_PASSWORD}@cluster0.xpozz.mongodb.net/`
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to database and server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
