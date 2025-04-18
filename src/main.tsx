import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">Welcome to the Todo App!</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);