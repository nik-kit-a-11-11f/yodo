  
// src/App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  // Начальное состояние с тремя задачами
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Создать логотип', completed: false },
    { id: 2, title: 'Разработать UI-кит', completed: true },
    { id: 3, title: 'Написать ТЗ', completed: false }
  ]);

  // Проверка количества задач
  console.log(tasks.length);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер задач Pixel Perfect</h1>
        <p>Всего задач: {tasks.length}</p>
      </header>
      
      <div className="tasks-container">
        <h2>Список задач</h2>
        <ul className="tasks-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span className="task-title">{task.title}</span>
              <span className="task-status">
                {task.completed ? '✅ Выполнено' : '⏳ В работе'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
