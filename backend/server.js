const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage (for now)
let tasks = [];

// Routes
// Add a task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const newTask = { id: tasks.length + 1, name, description, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Fetch tasks for a specific day (mocked for now)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update task details
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    task.name = name || task.name;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Toggle task completion
app.patch('/tasks/:id/toggle', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});