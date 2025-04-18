import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  task?: {
    id: number;
    name: string;
    description: string;
  };
  onSave: () => void;
}

const AddEditTaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      // Update existing task
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        name,
        description,
      });
    } else {
      // Add new task
      await axios.post('http://localhost:5000/tasks', {
        name,
        description,
      });
    }

    onSave(); // Callback to refresh the task list
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default AddEditTaskForm;