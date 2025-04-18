import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Todo App</h1>
      <TaskList />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);