import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEditTaskForm from './AddEditTaskForm';

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const toggleTaskCompletion = async (id: number) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${id}/toggle`);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    fetchTasks();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <button
        onClick={handleAddTask}
        className="mb-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
      >
        ➕ Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">
              Status: {task.completed ? '✅ Completed' : '⏳ In Progress'}
            </p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEditTask(task)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`px-4 py-2 rounded ${
                  task.completed
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showForm && (
        <AddEditTaskForm task={editingTask || undefined} onSave={handleSave} />
      )}
    </div>
  );
};

export default TaskList;