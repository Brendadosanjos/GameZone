import React from 'react';
import '../styles/ProductCard.css';

export default function ProductCard({ product }) {
  const isOnSale = parseFloat(product.oldprice) > parseFloat(product.price);

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card custom-card h-100 position-relative">
        {isOnSale && (
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            SALE OFF
          </span>
        )}
        <img
          src={product.imgUrl}
          className="card-img-top p-3"
          alt={product.description}
        />
        <div className="card-body text-center">
          <p className="card-title mb-1">{product.description}</p>
          <small className="text-muted">R$ <s>{product.oldprice}</s></small>
          <h5 className="text-price">R$ {product.price}</h5>
        </div>
      </div>
    </div>
  );
}