jsx

// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

// Массив данных с продуктами
const tasks = [
  { id: 1, text: 'Молоко' },
  { id: 2, text: 'Хлеб' },
  { id: 3, text: 'Яйца' }
];

function TaskList() {
  return (
    <div className="task-list">
      <h2>Список покупок</h2>
      {/* Ученики будут добавлять код map() здесь */}
    </div>
  );
}

export default TaskList;
