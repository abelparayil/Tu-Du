import express from 'express';
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from '../controllers/todo-controller.js';

const todoRouter = express.Router();

todoRouter.post('/add', addTodo);
todoRouter.delete('/delete', deleteTodo);
todoRouter.put('/update', updateTodo);
todoRouter.get('/all', getTodos);
todoRouter.get('/single/:id', getTodo);
todoRouter.post('/toggleComplete', toggleTodo);
