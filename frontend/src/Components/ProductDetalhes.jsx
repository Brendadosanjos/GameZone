import React, { useState } from "react";
import "./ProductDetalhes.css"; // Importando o CSS externo

const ProductDetalhes = () => {
  const [selectedSize, setSelectedSize] = useState(39);
  const [selectedColor, setSelectedColor] = useState("#E63946");
  const [selectedImage, setSelectedImage] = useState("tenis.png");

  const product = {
    name: "Tênis Nike Revolution 6 Next Nature Masculino",
    category: "Casual | Nike",
    reference: "38416711",
    rating: 4.7,
    reviews: 90,
    price: 219.0,
    oldPrice: 299.0, 
    sizes: [39, 42, 43],
    colors: ["#E63946", "#457B9D", "#F4A261", "#2A2A2A"],
    images: ["tenis.png", "tenis.png", "tenis.png", "tenis.png"],
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <span>Home</span> / <span>Produtos</span> / <span>Tênis</span> /
        <span>Nike</span> / <strong>{product.name}</strong>
      </nav>

      <div className="product-container">
        {/* Seção de imagem do produto */}
        <div className="product-image-section">
          <img src={selectedImage} alt={product.name} className="main-image" />
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Miniatura"
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Seção de detalhes do produto */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-category">
            {product.category} | REF: {product.reference}
          </p>
          <div className="rating">
            ⭐⭐⭐⭐⭐ <span className="rating-score">{product.rating}</span> ({product.reviews} avaliações)
          </div>
          <div className="product-price">
            <span className="current-price">R$ {product.price.toFixed(2)}</span>
            <span className="old-price">R$ {product.oldPrice.toFixed(2)}</span>
          </div>
          <p className="product-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          {/* Seleção de tamanho */}
          <div className="size-selection">
            <p>Tamanho</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Seleção de cores */}
          <div className="product-colors">
            <p>Cor</p>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-option ${selectedColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Botão de compra */}
          <button className="buy-button" type="button">COMPRAR</button>
        </div>
      </div>

      {/* Produtos Relacionados */}
      <div className="related-products">
        <h2>Produtos Relacionados</h2>
        <div className="related-list">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="related-product-card">
                <span className="discount-tag">30% OFF</span>
                <img src="public/blusaDestaque.png" alt="Produto relacionado" />
                <p className="related-title">K-Swiss V8 - Masculino</p>
                <p className="related-price">
                  <span className="original-price">R$ 200,00</span> <strong>R$ 100,00</strong>
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetalhes;
