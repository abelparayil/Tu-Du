import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Todos from '../pages/Todos';
import AddTodo from '../pages/AddTodo';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/add-todo" element={<AddTodo />} />
    </Routes>
  );
};

export default AppRoutes;
