import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import ProductDetalhes from "../Components/ProductDetalhes";

export default function ProductPage() {
  return (
    <div className="bg-[#F9F8FE]">
      <NavBar />
      <ProductDetalhes />
      <Footer />
    </div>
  );
}