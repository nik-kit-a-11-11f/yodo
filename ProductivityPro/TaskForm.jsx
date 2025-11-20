// TaskForm.jsx 
import React, { useState } from 'react';

function TaskForm() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Добавить логику для добавления новой задачи
    // 1. Проверить, что input не пустой
    // 2. Вызвать функцию из props для обновления состояния
    // 3. Очистить поле ввода
    console.log('Форма отправлена, но ничего не происходит...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите новую задачу..."
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
