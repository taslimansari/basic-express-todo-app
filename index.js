const express = require('express');
const app = express();
const port = 3000;

// Sample in-memory storage
let todos = [];

app.use(express.json());
app.use(express.static('public')); // Serve static frontend files

// Routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTask = { id: todos.length + 1, task, completed: false };
  todos.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Task not found' });
  }
  todo.completed = !todo.completed;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`To-Do app running at http://localhost:${port}`);
});
