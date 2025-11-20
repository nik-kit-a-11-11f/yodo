jsx
// src/components/IngredientList.jsx
import React from 'react';
import IngredientItem from './IngredientItem';

const ingredients = [
  { id: 1, name: 'Морковь' },
  { id: 2, name: 'Лук' },
  { id: 3, name: 'Картофель' }
];

function IngredientList() {
  return (
    <div className="ingredient-list">
      <h2>Ингредиенты набора</h2>
      {/* Ученики будут добавлять код map() здесь */}
    </div>
  );
}

export default IngredientList;
