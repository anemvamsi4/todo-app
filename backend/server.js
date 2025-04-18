const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Add a task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const query = `INSERT INTO tasks (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name, description, completed: 0 });
    }
  });
});

// Fetch all tasks
app.get('/tasks', (req, res) => {
  const query = `SELECT * FROM tasks`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const query = `UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?`;
  db.run(query, [name, description, completed, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Task updated successfully' });
    }
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tasks WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

// Toggle task completion
app.patch('/tasks/:id/toggle', (req, res) => {
  const { id } = req.params;
  const query = `UPDATE tasks SET completed = NOT completed WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Task completion toggled successfully' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});