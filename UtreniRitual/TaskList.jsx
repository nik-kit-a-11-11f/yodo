// src/components/TaskList.jsx
import React from 'react';
import './TaskList.css';

function TaskList({ tasks }) {
  return (
    <div className="task-list">
      <h2>Текущие задачи ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p className="empty-state">Задач пока нет</p>
      ) : (
        <ul className="tasks">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span className="task-text">{task.title}</span>
              <span className="task-status">
                {task.completed ? '✅ Выполнено' : '⏳ В работе'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
