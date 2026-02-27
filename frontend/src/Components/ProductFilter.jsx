import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductHeader from './ProductHeader';
import ProductCard from '../Components/ProductCard';
import BrandFilter from '../Components/BrandFilter';


export default function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://6792c350cf994cc6804b0051.mockapi.io/produtos/Produtos');
        const data = await response.json();
        setProducts(data);

        const uniqueBrands = [...new Set(data.map(p => p.brand))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = selectedBrands.length
    ? products.filter(p => selectedBrands.includes(p.brand))
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'lowestPrice':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'highestPrice':
        return parseFloat(b.price) - parseFloat(a.price);
      default:
        return 0; // relevância simulada
    }
  });

  return (
    <div className="container mt-4">
      <ProductHeader
        total={filteredProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      {/* {sortedProducts.map(product => (<ProductCard key={product.id} product={product} />))} */}
      <div className="row">
        <div className="col-md-3">
          <BrandFilter
            brands={brands}
            selectedBrands={selectedBrands}
            onChange={handleBrandChange}
          />
        </div>
        <div className="col-md-9">
  <div className="row">
    {sortedProducts.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
    {sortedProducts.length === 0 && (
      <div className="col-12">
        <p className="text-center text-muted">Nenhum produto encontrado.</p>
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
}