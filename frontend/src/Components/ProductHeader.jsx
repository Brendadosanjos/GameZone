import React from 'react';
import '../styles/ProductHeader.css';

export default function ProductHeader({ total, sortOption, setSortOption }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 product-header">
      <div>
        <strong>Resultados para “Tênis”</strong> – {total} produtos
      </div>
      <div>
        <label htmlFor="sort" className="me-2 fw-semibold">Ordenar por:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="form-select d-inline-block sort-select"
        >
          <option value="relevance">mais relevantes</option>
          <option value="lowestPrice">menor preço</option>
          <option value="highestPrice">maior preço</option>
        </select>
      </div>
    </div>
  );
}