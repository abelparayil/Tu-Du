import Todo from '../models.js/Todo.js';
import User from '../models.js/User.js';

export const addTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user._id;
    const todo = new Todo({
      title,
      description,
      completed,
      user: userId,
    });
    await todo.save();

    await User.findByIdAndUpdate(userId, {
      $push: { todo: todo._id },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.user.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await todo.remove();
    await User.findByIdAndUpdate(userId, {
      $pull: { todo: todo._id },
    });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const userId = req.user._id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.user.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('todo');
    res.json(user.todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.user.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.user.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
