import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import ProductList from "./Pages/ProductListPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
