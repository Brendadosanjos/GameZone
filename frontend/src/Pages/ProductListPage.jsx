import ProductFilter from "../Components/ProductFilter";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";



export default function ProductListPage(){

  return (
    <div className="bg-[#F9F8FE]">
      <NavBar />
      <ProductFilter />
      <Footer />
    </div>
  );
}