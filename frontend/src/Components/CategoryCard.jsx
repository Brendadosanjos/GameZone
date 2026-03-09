import React from 'react';
import './CategoryCard.css';

// Recebe 'title' (ex: Nintendo) e 'image' (a foto do console) por props
const CategoryCard = ({ title, image }) => {
  return (
    <div className="category-card">
      <div className="category-image-wrapper">
        <img src={image} alt={title} />
      </div>
      <div className="category-info">
        <h3>{title}</h3>
        <a href="#" className="category-link">Ver Categorias →</a>
      </div>
    </div>
  );
};

export default CategoryCard;