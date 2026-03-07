import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductHigh() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.error(`Erro ao buscar produtos: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-[100px] mb-[100px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[36px]">
        <div>
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">
            Catálogo
          </p>
          <h3 className="font-extrabold text-[#1F1F1F] text-[26px] leading-tight">
            Produtos em alta
          </h3>
        </div>
        <a
          href="/productlist"
          className="text-[#2074c9] font-semibold text-[14px] border border-[#2074c9] px-5 py-2 rounded-[8px] hover:bg-[#2074c9] hover:text-white transition-colors duration-200 no-underline"
        >
          Ver todos →
        </a>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-[#474747] text-[16px]">Carregando jogos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.slice(0, 8).map((produto) => (
            <div
              key={produto.id}
              onClick={() => navigate(`/produto/${produto.id}`)}
              className="cursor-pointer group"
            >
              {/* Image box */}
              <div className="relative w-full aspect-square rounded-[12px] bg-white shadow-sm flex items-center justify-center overflow-hidden mb-3 transition-shadow duration-200 group-hover:shadow-md">
                <img
                  src={produto.imageUrl}
                  alt={produto.title}
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-200 group-hover:scale-105"
                />
                {/* Console badge */}
                {produto.console && (
                  <span className="absolute top-3 left-3 bg-[#F9F8FE] text-[#474747] text-[10px] font-bold px-2 py-1 rounded-full border border-[#e0e0e0]">
                    {produto.console}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="px-1">
                <span className="text-[#8F8F8F] text-[11px] font-bold uppercase tracking-wide">
                  {produto.category}
                </span>
                <h4 className="text-[#1F1F1F] font-bold text-[14px] leading-snug mt-1 mb-2 line-clamp-2">
                  {produto.title}
                </h4>
                <p className="text-[#2074c9] font-extrabold text-[18px]">
                  R${" "}
                  {Number(produto.price).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
