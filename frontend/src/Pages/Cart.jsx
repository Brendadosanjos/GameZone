import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import CartItem from "../Components/CartItem";

// Substituir por auth.currentUser.uid quando implementar Firebase Auth
const USER_ID = "user1";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);

  // Busca itens do carrinho no Firestore
  async function fetchCart() {
    try {
      const q = query(collection(db, "cart"), where("userId", "==", USER_ID));
      const snap = await getDocs(q);
      const items = snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      setCartItems(items);
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * (item.quantity || 1),
    0
  );

  // Remove item do Firestore e do estado
  async function removeItem(docId) {
    try {
      await deleteDoc(doc(db, "cart", docId));
      setCartItems((prev) => prev.filter((item) => item.docId !== docId));
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  }

  // Limpa todos os itens do carrinho
  async function clearCart() {
    try {
      await Promise.all(
        cartItems.map((item) => deleteDoc(doc(db, "cart", item.docId)))
      );
      setCartItems([]);
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  }

  // Redireciona para o checkout
  function finishOrder() {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  }

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />

      <div className="px-[100px] py-[40px]">

        {/* Header */}
        <div className="mb-[36px]">
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">
            Compras
          </p>
          <h1 className="text-[#1F1F1F] font-extrabold text-[30px]">
            Meu carrinho
          </h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-[#474747] text-[16px]">Carregando carrinho...</p>
          </div>
        )}

        {/* Carrinho vazio */}
        {!loading && cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] gap-4">
            <span className="text-[56px]">🛒</span>
            <p className="text-[#474747] font-semibold text-[18px]">
              Seu carrinho está vazio.
            </p>
            <button
              onClick={() => navigate("/productlist")}
              className="bg-[#2074c9] hover:bg-[#1a5faa] text-white font-bold text-[14px] px-8 py-3 rounded-[10px] transition-colors duration-200"
            >
              Ver jogos
            </button>
          </div>
        )}

        {/* Layout carrinho */}
        {!loading && cartItems.length > 0 && (
          <div className="flex gap-[40px] items-start">

            {/* Lista de itens */}
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.docId}
                  product={item}
                  onRemove={() => removeItem(item.docId)}
                />
              ))}

              <button
                onClick={clearCart}
                className="self-start text-[#FF4D4F] hover:text-[#d9363e] font-semibold text-[13px] underline transition-colors duration-150 mt-2"
              >
                Limpar carrinho
              </button>
            </div>

            {/* Resumo */}
            <div className="w-[320px] shrink-0 bg-white rounded-[16px] p-6 shadow-sm">
              <h3 className="text-[#1F1F1F] font-extrabold text-[18px] mb-5">
                Resumo do pedido
              </h3>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between text-[14px] text-[#474747]">
                  <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "itens"})</span>
                  <span>
                    R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[14px] text-[#474747]">
                  <span>Entrega</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
              </div>

              <div className="border-t border-[#E8E8E8] pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="text-[#1F1F1F] font-extrabold text-[16px]">Total</span>
                  <span className="text-[#2074c9] font-extrabold text-[20px]">
                    R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={finishOrder}
                disabled={finishing}
                className="w-full h-[52px] bg-[#2074c9] hover:bg-[#1a5faa] disabled:opacity-60 text-white font-bold text-[15px] rounded-[10px] transition-colors duration-200"
              >
                {finishing ? "Processando..." : "Finalizar compra"}
              </button>

              <button
                onClick={() => navigate("/productlist")}
                className="w-full mt-3 h-[44px] border-2 border-[#E8E8E8] hover:border-[#2074c9] text-[#474747] hover:text-[#2074c9] font-semibold text-[14px] rounded-[10px] transition-colors duration-200"
              >
                Continuar comprando
              </button>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}