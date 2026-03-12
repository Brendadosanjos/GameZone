import React from 'react';
import "../Styles/CategoryCard.css";

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