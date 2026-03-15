import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const CONSOLES = ["Todos", "Playstation", "Xbox", "Nintendo", "PC"];
const SORT_OPTIONS = [
  { value: "relevance", label: "Mais relevantes" },
  { value: "lowestPrice", label: "Menor preço" },
  { value: "highestPrice", label: "Maior preço" },
  { value: "newest", label: "Mais recentes" },
];

export default function ProductFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedConsole, setSelectedConsole] = useState("Todos");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");

  useEffect(() => {
    const searchParam = searchParams.get("search");
    const consoleParam = searchParams.get("console");
    if (searchParam) setSearch(decodeURIComponent(searchParam));
    if (consoleParam) setSelectedConsole(decodeURIComponent(consoleParam));
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snap = await getDocs(collection(db, "games"));
        const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
      } catch (err) {
        console.error("Erro ao buscar jogos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  function toggleCategory(cat) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  const filtered = products
    .filter((p) => {
      const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
      const matchConsole =
        selectedConsole === "Todos" || p.console === selectedConsole;
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      return matchSearch && matchConsole && matchCategory;
    })
    .sort((a, b) => {
      if (sortOption === "lowestPrice") return a.price - b.price;
      if (sortOption === "highestPrice") return b.price - a.price;
      if (sortOption === "newest") return (b.releaseYear || 0) - (a.releaseYear || 0);
      return 0;
    });

  return (
    <div className="bg-[#F9F8FE] min-h-screen px-[100px] py-[40px]">

      <div className="mb-[32px]">
        <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">
          Produtos
        </p>
        <h1 className="text-[#1F1F1F] font-extrabold text-[30px]">
          Todos os jogos
        </h1>
      </div>

      <div className="flex gap-3 mb-[32px] flex-wrap">
        {CONSOLES.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedConsole(c)}
            className={`px-5 py-2 rounded-full font-bold text-[13px] transition-all duration-150 border
              ${selectedConsole === c
                ? "bg-[#2074c9] text-white border-[#2074c9]"
                : "bg-white text-[#474747] border-[#E0E0E0] hover:border-[#2074c9] hover:text-[#2074c9]"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex gap-[40px]">

        <aside className="w-[220px] shrink-0 flex flex-col gap-6">

          <div>
            <p className="text-[#1F1F1F] font-bold text-[14px] mb-3">Buscar</p>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome do jogo..."
              className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[8px] px-3 text-[13px] outline-none focus:border-[#2074c9] transition-colors duration-150"
            />
          </div>

          {categories.length > 0 && (
            <div>
              <p className="text-[#1F1F1F] font-bold text-[14px] mb-3">Categoria</p>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="accent-[#2074c9] w-4 h-4"
                    />
                    <span className="text-[#474747] text-[13px] group-hover:text-[#2074c9] transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {(selectedCategories.length > 0 || selectedConsole !== "Todos" || search) && (
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedConsole("Todos");
                setSearch("");
              }}
              className="text-[#2074c9] text-[13px] font-semibold underline text-left"
            >
              Limpar filtros
            </button>
          )}
        </aside>

        <div className="flex-1">

          <div className="flex items-center justify-between mb-[24px]">
            <p className="text-[#474747] text-[14px]">
              <span className="font-bold text-[#1F1F1F]">{filtered.length}</span> jogos encontrados
            </p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="h-[38px] border border-[#E0E0E0] rounded-[8px] px-3 text-[13px] text-[#474747] outline-none focus:border-[#2074c9] bg-white"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-[300px]">
              <p className="text-[#474747] text-[16px]">Carregando jogos...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[300px] gap-3">
              <span className="text-[48px]">🎮</span>
              <p className="text-[#474747] font-semibold text-[16px]">Nenhum jogo encontrado.</p>
              <p className="text-[#8F8F8F] text-[14px]">Tente ajustar os filtros.</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/produto/${product.id}`)}
                  className="bg-white rounded-[16px] shadow-sm overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative bg-[#F5F5F5] flex items-center justify-center h-[200px] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="max-h-[160px] max-w-[80%] object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                    {product.console && (
                      <span className="absolute top-3 left-3 bg-white text-[#474747] text-[10px] font-bold px-2 py-1 rounded-full border border-[#E0E0E0]">
                        {product.console}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="text-[#8F8F8F] text-[11px] font-bold uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-[#1F1F1F] font-bold text-[15px] mt-1 mb-3 line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[#2074c9] font-extrabold text-[18px]">
                        R${" "}
                        {Number(product.price).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/produto/${product.id}`);
                        }}
                        className="bg-[#2074c9] hover:bg-[#1a5faa] text-white font-bold text-[12px] px-4 py-2 rounded-[8px] transition-colors duration-150"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}