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
    fetchTasks();
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
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 p-2 border rounded bg-white shadow">
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <p>{task.description}</p>
            <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
            <button
              onClick={() => handleEditTask(task)}
              className="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`text-sm px-2 py-1 rounded ${
                task.completed ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
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