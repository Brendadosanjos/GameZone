import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import ProductList from "./Pages/ProductListPage";
import ProductPage from "./Pages/ProductPage";
import SubscriptionPage from "./Pages/SubscriptionPage";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import Checkout from "./Pages/Checkout";
import CategoryPage from "./Pages/CategoryPage";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import CheckoutSubscription from "./Pages/CheckoutSubscription";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/assinatura" element={<SubscriptionPage />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/categorias" element={<CategoryPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/checkout-assinatura" element={<CheckoutSubscription />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
