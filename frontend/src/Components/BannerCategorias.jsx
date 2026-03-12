import React from 'react';
import '../Styles/BannerCategorias.css';
import imgbanner from '../assets/banner-categoria.png';

const BannerCategorias = () => {
  return (
    <div className="banner-container-novo">
      <div className="banner-content">
        <div className="flex items-center gap-[5px] text-[#1a5ea2] font-bold text-[28px] md:text-[30px]">
            <img src="logo.png" alt="logo-navBar" width={40} />
            <h1 className="whitespace-nowrap">GameZone</h1>
          </div>

        <h1 className="banner-title">
          Explore as melhores <span className="text-orange">categorias</span> de produtos gamers
        </h1>
        <p className="banner-subtitle">
          Selecione uma categoria para encontrar os melhores jogos disponíveis!
        </p>
      </div>
      <div className="banner-image">
        <img src={imgbanner} alt="Destaque Coleção" />
      </div>
    </div>
  );
};

export default BannerCategorias;