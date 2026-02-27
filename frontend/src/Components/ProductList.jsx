import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "../Styles/ProductList.css";

function ProductList() {
  const [produtosEmAlta, setProdutosEmAlta] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        let page = 1;
        let perPage = 15;
        const response = await fetch(
          `https://6792c350cf994cc6804b0051.mockapi.io/produtos/Produtos?limit=${perPage}&page=${page}`
        );
        const data = await response.json();

        setProdutosEmAlta(data);
      } catch (error) {
        console.log(`Erro ao buscar produtos : ${error}`);
      }
    };
    buscarDados();
  }, []);

  return (
    <>
      <section id="batata">
        {produtosEmAlta.map((produto) => (
          <Card
            key={produto.id}
            imgUrl={produto.imageUrl}
            category={produto.category}
            description={produto.description}
            price={produto.price}
          />
        ))}
      </section>
    </>
  );
}

export default ProductList;
