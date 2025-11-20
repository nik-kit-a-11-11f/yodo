// src/components/TaskList.jsx
import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      <h2>Текущие задачи ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>Задач пока нет. Добавьте первую задачу!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li 
              key={task.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '10px',
                margin: '5px 0',
                background: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              <span>{task.title}</span>
              <span>{task.completed ? '✅' : '⏳'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
