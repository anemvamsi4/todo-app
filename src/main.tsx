import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Todo App</h1>
        <TaskList />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);