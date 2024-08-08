import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await axios.get(
        `http://localhost:9000/api/todos/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        setTodos(response.data.todo);
        setLoading(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
      setLoading(false);
    }
  };

  const sortedTodos = todos.sort((a, b) => a.completed - b.completed);

  const handleAddTaskClick = () => {
    navigate('/add-todo');
  };

  const markAsCompleted = async (id) => {
    try {
      await axios.post(`http://localhost:9000/api/todos/${id}/completed`, {});
      fetchTodos();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="mx-auto flex-1 max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            onClick={handleAddTaskClick}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Add Task
          </button>
        </div>
        <div className="grid gap-4">
          {todos.length > 0 ? (
            sortedTodos.map((todo) => (
              <div
                key={todo._id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    {todo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {todo.description}
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => markAsCompleted(todo._id)}
                        type="button"
                        role="checkbox"
                        aria-checked={todo.completed}
                        data-state={todo.completed ? 'checked' : 'unchecked'}
                        value="on"
                        className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          todo.completed
                            ? 'bg-primary text-primary-foreground'
                            : ''
                        }`}
                        id={`task-${todo.id}`}
                      ></button>
                      <label
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium"
                        htmlFor={`task-${todo.id}`}
                      >
                        Completed
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          todo.completed
                            ? 'bg-light-green-500 text-success'
                            : 'bg-primary/10 text-primary'
                        }`}
                        data-v0-t="badge"
                      >
                        {todo.completed ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Todos;
