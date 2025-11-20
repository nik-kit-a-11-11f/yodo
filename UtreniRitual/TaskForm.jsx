// src/components/TaskForm.jsx
import React from 'react';
import './TaskForm.css';

function TaskForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Добавить логику добавления новой задачи
    console.log('Форма отправлена, но ничего не происходит...');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          // TODO: Сделать input контролируемым
          placeholder="Какая следующая задача?"
          className="task-input"
        />
        <button type="submit" className="add-button">
          Добавить задачу
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
