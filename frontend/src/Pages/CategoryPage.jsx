import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

import BannerCategorias from '../Components/BannerCategorias';
import CategoryCard from '../Components/CategoryCard';
import './CategoryPage.css';

import imgNintendo from '../assets/nintendo-categoria.jpg';
import imgPS5 from '../assets/play-categoria.png';
import imgXbox from '../assets/xbox-categoria.png';
import imgPC from '../assets/pc-categoria.png';

import ProductHigh from "../Components/ProductHigh";

const CategoryPage = () => {

  const categories = [
    { id: 1, name: 'Nintendo', img: imgNintendo },
    { id: 2, name: 'PlayStation', img: imgPS5 },
    { id: 3, name: 'Xbox', img: imgXbox },
    { id: 4, name: 'PC', img: imgPC },
  ];

  return (
    <>
      <NavBar />

      <div className="category-page-container">

        <BannerCategorias />

        <h2 className="section-title">Categorias</h2>

        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.name}
              image={cat.img}
            />
          ))}
        </div>

      </div>

      <ProductHigh />

      <Footer />
    </>
  );
};

export default CategoryPage;