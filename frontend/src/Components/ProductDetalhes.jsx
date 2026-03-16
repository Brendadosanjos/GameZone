import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default function ProductDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "games", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) { navigate("/404"); return; }
        const data = { id: docSnap.id, ...docSnap.data() };
        setProduct(data);
        const q = query(collection(db, "games"), where("category", "==", data.category));
        const relSnap = await getDocs(q);
        const relList = relSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((d) => d.id !== id)
          .slice(0, 4);
        setRelated(relList);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

async function handleAddToCart() {
  if (!user?.uid) {
    navigate("/login", { state: { from: `/produto/${id}` } });
    return;
  }

  try {
    await addDoc(collection(db, "cart"), {
      userId: user.uid,
      gameId: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      console: product.console,
      category: product.category,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error);
  }
}

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-[#474747] text-[16px]">Carregando produto...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-[#F9F8FE] px-[100px] py-[40px]">
      <nav className="flex items-center gap-2 text-[13px] text-[#8F8F8F] mb-[36px]">
        <Link to="/" className="hover:text-[#2074c9] no-underline text-[#8F8F8F]">Home</Link>
        <span>/</span>
        <Link to="/productlist" className="hover:text-[#2074c9] no-underline text-[#8F8F8F]">Produtos</Link>
        <span>/</span>
        <span className="text-[#474747] font-semibold">{product.title}</span>
      </nav>

      <div className="flex gap-[60px] mb-[80px]">
        <div className="flex-1 max-w-[480px]">
          <div className="bg-white rounded-[16px] shadow-sm flex items-center justify-center p-8 aspect-square">
            <img src={product.imageUrl} alt={product.title} className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            {product.console && (
              <span className="bg-[#D8E3F2] text-[#2074c9] font-bold text-[12px] px-3 py-1 rounded-full">
                {product.console}
              </span>
            )}
            <span className="bg-[#F5F5F5] text-[#474747] font-semibold text-[12px] px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-[#1F1F1F] font-extrabold text-[32px] leading-tight">{product.title}</h1>

          {product.releaseYear && (
            <p className="text-[#8F8F8F] text-[13px]">
              Lançamento: <span className="font-semibold">{product.releaseYear}</span>
            </p>
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-[#2074c9] font-extrabold text-[36px]">
              R$ {Number(product.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[#8F8F8F] text-[14px]">à vista</span>
          </div>

          {product.stock !== undefined && (
            <p className="text-[13px]">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">✓ Em estoque ({product.stock} unidades)</span>
              ) : (
                <span className="text-red-500 font-semibold">✗ Fora de estoque</span>
              )}
            </p>
          )}

          {product.description && (
            <p className="text-[#474747] text-[15px] leading-relaxed border-t border-[#E8E8E8] pt-4">
              {product.description}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className={`flex-1 h-[52px] rounded-[10px] font-bold text-[15px] transition-all duration-200
                ${product.stock === 0 ? "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
                  : added ? "bg-green-500 text-white"
                  : "bg-[#2074c9] hover:bg-[#1a5faa] text-white"}`}>
              {added ? "✓ Adicionado ao carrinho!" : product.stock === 0 ? "Fora de estoque" : "Adicionar ao carrinho"}
            </button>
            <button className="h-[52px] w-[52px] rounded-[10px] border-2 border-[#E8E8E8] flex items-center justify-center text-[20px] hover:border-[#2074c9] transition-colors duration-200" title="Favoritar">
              🤍
            </button>
          </div>

          <div className="flex gap-4 mt-2">
            {[
              { icon: "🔒", text: "Compra segura" },
              { icon: "⚡", text: "Entrega digital" },
              { icon: "↩️", text: "Suporte garantido" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1 text-[12px] text-[#8F8F8F]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="text-[#1F1F1F] font-extrabold text-[22px] mb-[24px]">Jogos relacionados</h3>
          <div className="grid grid-cols-4 gap-6">
            {related.map((item) => (
              <div key={item.id} onClick={() => navigate(`/produto/${item.id}`)} className="cursor-pointer group">
                <div className="bg-white rounded-[12px] shadow-sm flex items-center justify-center p-4 aspect-square mb-3 transition-shadow duration-200 group-hover:shadow-md overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105" />
                </div>
                <span className="text-[#8F8F8F] text-[11px] font-bold uppercase tracking-wide">{item.category}</span>
                <h4 className="text-[#1F1F1F] font-bold text-[14px] mt-1 mb-1 line-clamp-2">{item.title}</h4>
                <p className="text-[#2074c9] font-extrabold text-[16px]">
                  R$ {Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}