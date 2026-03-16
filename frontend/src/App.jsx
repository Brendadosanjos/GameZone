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
import EditarPerfil from "./Pages/EditarPerfil";

import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/assinatura" element={<SubscriptionPage />} />
          <Route path="/categorias" element={<CategoryPage />} />

          {/* Rotas protegidas */}
          <Route path="/carrinho" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/pedidos" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/checkout-assinatura" element={<ProtectedRoute><CheckoutSubscription /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><EditarPerfil /></ProtectedRoute>} />

          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;