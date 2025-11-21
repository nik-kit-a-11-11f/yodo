import React from 'react';
import './FeaturedBook.css';

const FeaturedBook = ({ book }) => {
  return (
    <div className="card">
      <img src={book.cover} alt={book.title} className="cover" />
      <div className="details">
        <h2 className="title">{book.title}</h2>
        <p className="author">by {book.author}</p>
        <p className="description">{book.description}</p>
        <button className="button">Подробнее</button>
      </div>
    </div>
  );
};

export default FeaturedBook;
