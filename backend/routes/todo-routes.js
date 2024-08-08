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
todoRouter.get('/:userId', getTodos);
todoRouter.get('/single/:id', getTodo);
todoRouter.post('/:id/completed', toggleTodo);

export default todoRouter;
