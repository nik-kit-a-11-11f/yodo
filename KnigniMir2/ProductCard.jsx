import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="image" />
      <div className="content">
        <h3 className="title">{product.name}</h3>
        <p className="price">{product.price} ₽</p>
        <button className="button">В корзину</button>
      </div>
    </div>
  );
};

export default ProductCard;
