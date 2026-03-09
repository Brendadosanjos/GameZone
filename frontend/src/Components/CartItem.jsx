import "../Styles/CartItem.css";

export default function CartItem({ product, onRemove }) {
  return (
    <div className="cart-item">

      <img
        src={product.imgUrl}
        alt={product.description}
      />

      <div className="cart-info">
        <h4>{product.description}</h4>
        <p>R$ {product.price}</p>
      </div>

      <div className="cart-actions">
        <button onClick={onRemove} className="remove-btn">
  Remover
</button>
      </div>

    </div>
  );
}