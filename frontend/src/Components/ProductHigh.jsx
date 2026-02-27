import { useEffect, useState } from "react";

export default function ProductHigh() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://6792c38acf994cc6804b011b.mockapi.io/products/produtos"
        );
        const data = await response.json();
        setProducts(data);
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
              <div className="relative w-[300px] rounded-[4px] bg-white shadow-custom">
                <img
                  src={produto.imagem || "goodofwar.jpg"}
                  alt={produto.nome}
                  className=""
                />
              </div>
              <div>
                <span className="font-bold text-[12px] leading-[24px] text-[#8F8F8F]">
                  {produto.categoria || "Jogo"}
                </span>
                <h2 className="text-grayCustom">{produto.nome}</h2>

                <div className="flex gap-2">
                  <p className="text-[#000000]">
                    R${produto.preco|| "200"}
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
