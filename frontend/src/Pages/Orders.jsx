import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import CartItem from "../Components/CartItem";
import "../Styles/Cart.css";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const removeItemFromOrder = (orderIndex, itemIndex) => {

    const updatedOrders = [...orders];

    updatedOrders[orderIndex].items.splice(itemIndex, 1);

    if (updatedOrders[orderIndex].items.length === 0) {
      updatedOrders.splice(orderIndex, 1);
    }

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <>
      <NavBar />

      <div className="cart-container">

        <h1 className="cart-title">Meus Pedidos</h1>

        {orders.length === 0 ? (

   <div className="no-orders">
    <h2>Sem pedidos</h2>
    <p>Você ainda não realizou nenhuma compra.</p>
  </div>

) : (
          orders.map((order, orderIndex) => (

            <div key={orderIndex} className="order-card">

              <h2 className="order-number">
                Pedido #{orderIndex + 1}
              </h2>

              <div className="cart-items">

                {order.items.map((item, itemIndex) => (
                  <CartItem
                    key={itemIndex}
                    product={item}
                    onRemove={() => removeItemFromOrder(orderIndex, itemIndex)}
                  />
                ))}

              </div>

            </div>

          ))
        )}

      </div>

      <Footer />
    </>
  );
}