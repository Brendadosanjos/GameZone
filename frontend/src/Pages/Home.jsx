
import Cards from "../Components/Cards";
import CarrouselHome from "../Components/CarouselHome";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import ProductHigh from "../Components/ProductHigh";


export default function Home() {
  return (
    <>
    <div className="bg-[#F9F8FE]">
      <NavBar />
      <CarrouselHome />
      <Cards />
      <ProductHigh />
      <Footer />
      </div>
    </>
  );
}
