import ProductFilter from "../Components/ProductFilter";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
// import ProductList from "../Components/ProductList"


export default function ProductListPage(){

    return (
        <>
        <NavBar/>
        {/* <ProductList/> */}
        <ProductFilter/>
        
        <Footer/>
        </>
    )
}