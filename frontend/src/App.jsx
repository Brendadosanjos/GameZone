import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import ProductList from "./Pages/ProductListPage";
import ProductPage from "./Pages/ProductPage";
import SubscriptionPage from "./Pages/SubscriptionPage";
import Cart from "./Pages/Cart";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/assinatura" element={<SubscriptionPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;