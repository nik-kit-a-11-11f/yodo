// src/components/TaskItem.jsx
import React from 'react';

function TaskItem({ productName }) {
  return (
    <div className="task-item">
      <span className="product-icon">🛒</span>
      <span className="product-name">{productName || 'Продукт'}</span>
    </div>
  );
}

export default TaskItem;
