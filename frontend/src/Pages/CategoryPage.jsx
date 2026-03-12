import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import BannerCategorias from "../Components/BannerCategorias";
import CategoryCard from "../Components/CategoryCard";
import ProductHigh from "../Components/ProductHigh";

import imgNintendo from "../assets/nintendo-categoria.jpg";
import imgPS5 from "../assets/play-categoria.png";
import imgXbox from "../assets/xbox-categoria.png";
import imgPC from "../assets/pc-categoria.png";

const CATEGORIES = [
  { id: 1, name: "Nintendo",     consoleName: "Nintendo",     img: imgNintendo },
  { id: 2, name: "PlayStation",  consoleName: "Playstation",  img: imgPS5      },
  { id: 3, name: "Xbox",         consoleName: "Xbox",         img: imgXbox     },
  { id: 4, name: "PC",           consoleName: "PC",           img: imgPC       },
];

export default function CategoryPage() {
  const [counts, setCounts] = useState({});

  // Busca contagem de jogos por console
  useEffect(() => {
    async function fetchCounts() {
      try {
        const snap = await getDocs(collection(db, "games"));
        const result = {};
        snap.docs.forEach((d) => {
          const c = d.data().console;
          if (c) result[c] = (result[c] || 0) + 1;
        });
        setCounts(result);
      } catch (err) {
        console.error("Erro ao buscar contagem:", err);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />

      <div className="px-[100px] py-[40px]">

        <BannerCategorias />

        {/* Header */}
        <div className="mb-[28px]">
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">
            Navegue por
          </p>
          <h2 className="text-[#1F1F1F] font-extrabold text-[26px]">
            Categorias
          </h2>
        </div>

        {/* Grid de categorias */}
        <div className="grid grid-cols-4 gap-6 mb-[80px]">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="relative">
              <CategoryCard
                title={cat.name}
                image={cat.img}
                console={cat.consoleName}
              />
              {/* Badge de quantidade */}
              {counts[cat.consoleName] !== undefined && (
                <span className="absolute top-3 right-3 bg-[#E7FF86] text-black font-bold text-[11px] px-2 py-1 rounded-full">
                  {counts[cat.consoleName]} jogos
                </span>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Produtos em alta */}
      <ProductHigh />

      <Footer />
    </div>
  );
}