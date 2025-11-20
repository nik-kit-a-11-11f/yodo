// src/App.jsx
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Приготовить эспрессо', completed: false },
    { id: 2, title: 'Обжарить новые зерна', completed: true },
    { id: 3, title: 'Проверить запасы молока', completed: false }
  ]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>☕ Утренний ритуал</h1>
        <p>Таск-менеджер для сотрудников кофейни</p>
      </header>
      
      <div className="app-content">
        {/* TODO: Передать функцию setTasks в TaskForm через props */}
        <TaskForm />
        
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
