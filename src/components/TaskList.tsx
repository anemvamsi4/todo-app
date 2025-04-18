import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 p-2 border rounded bg-white shadow">
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <p>{task.description}</p>
            <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;