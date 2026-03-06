import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductHigh() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "games"));

      const gamesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(gamesList);
    } catch (error) {
      alert(`Erro ao buscar produtos: ${error}`);
    }
  };

  fetchProducts();
}, []);

  return (
    <>
      <div className="pl-[100px] pr-[100px] flex justify-between pt-[123px] pb-[20px]">
        <h3 className="font-bold text-[24px] leading-[38px]">
          Produtos em alta
        </h3>
        <a
          href="#"
          className="font-[400] text-[18px] leading-[34px] text-[#2074c9]"
        >
          Ver Todos
        </a>
      </div>

      <div className="pl-[100px] pr-[100px] mb-[120px]">
        <div className="grid grid-rows-2 grid-cols-4 gap-6">
          {products.map((produto) => (
            <div key={produto.id} className="mr-[24px] mb-[40px] ">
<div className="relative w-[250px] h-[250px] rounded-[4px] bg-white shadow-custom flex items-center justify-center overflow-hidden">
  <img
    src={produto.imageUrl}
    alt={produto.title}
    className="max-h-full max-w-full object-contain"
  />
</div>
              <div>
                <span className="font-bold text-[12px] leading-[24px] text-[#8F8F8F]">
                  {produto.category}
                </span>
                <h2 className="text-grayCustom">{produto.title}</h2>

                <div className="flex gap-2">
                  <p className="text-[#000000]">
                    R${produto.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
