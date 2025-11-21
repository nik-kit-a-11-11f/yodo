import React from 'react';
import FeaturedBook from './components/FeaturedBook/FeaturedBook';
import ProductCard from './components/ProductCard/ProductCard';
import './App.css';

const featuredBook = {
  id: 1,
  title: 'Мастер и Маргарита',
  author: 'Михаил Булгаков',
  description: 'Великий роман о добре и зле, любви и творчестве, написанный гениальным писателем.',
  cover: '/api/placeholder/150/200'
};

const products = [
  {
    id: 1,
    name: '1984',
    price: 450,
    image: '/api/placeholder/200/200'
  },
  {
    id: 2,
    name: 'Преступление и наказание',
    price: 520,
    image: '/api/placeholder/200/200'
  },
  {
    id: 3,
    name: 'Война и мир',
    price: 890,
    image: '/api/placeholder/200/200'
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Книжный мир</h1>
        <p>Добро пожаловать в наш магазин!</p>
      </header>

      <main className="main-content">
        <section className="featured-section">
          <h2>Книга дня</h2>
          <FeaturedBook book={featuredBook} />
        </section>

        <section className="products-section">
          <h2>Популярные книги</h2>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
