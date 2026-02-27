import React from 'react';


export default function BrandFilter({ brands, selectedBrands, onChange }) {
  return (
    <div>
      <h5 className="mb-3">Filtrar por Marca</h5>
      {brands.map((brand, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`brand-${index}`}
            checked={selectedBrands.includes(brand)}
            onChange={() => onChange(brand)}
          />
          <label className="form-check-label" htmlFor={`brand-${index}`}>
            {brand}
          </label>
        </div>
      ))}
    </div>
  );
}