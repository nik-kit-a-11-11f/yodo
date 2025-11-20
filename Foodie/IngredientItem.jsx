// src/components/IngredientItem.jsx
import React from 'react';

function IngredientItem({ itemName }) {
  return (
    <li className="ingredient-item">
      <span className="ingredient-icon">🥕</span>
      <span className="ingredient-name">{itemName || 'Ингредиент'}</span>
    </li>
  );
}

export default IngredientItem;
