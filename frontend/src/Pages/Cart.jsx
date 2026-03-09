import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import CartItem from "../Components/CartItem";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  const removeItem = (indexToRemove) => {

    console.log("clicou remover item:", indexToRemove);

    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const finishOrder = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      items: cart
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");
    setCartItems([]);

    navigate("/pedidos");
  };

  return (
    <>
      <NavBar />

      <div className="cart-container">

        <h1 className="cart-title">Carrinho</h1>

        <div className="cart-layout">

          <div className="cart-items">

            {cartItems.map((item, index) => (
              <CartItem
                key={item.description + index}
                product={item}
                onRemove={() => removeItem(index)}
              />
            ))}

            <button className="btn-clear-cart" onClick={clearCart}>
              Limpar carrinho
            </button>

          </div>

          <div className="cart-summary">

            <h3>Resumo do pedido</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>

            <button className="btn-checkout" onClick={finishOrder}>
              Finalizar compra
            </button>

          </div>

        </div>

      </div>

        <Footer />
    </>
  
);

}