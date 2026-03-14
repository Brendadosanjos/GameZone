import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const STATUS_STYLE = {
  "Enviado":            { bg: "bg-blue-100",   text: "text-blue-700"   },
  "Entregue":           { bg: "bg-green-100",  text: "text-green-700"  },
  "Cancelado":          { bg: "bg-red-100",    text: "text-red-600"    },
  "Processando":        { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Aguardando entrega": { bg: "bg-orange-100", text: "text-orange-700" },
};

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }

    const q = query(collection(db, "orders"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB - dateA;
        });
      setOrders(list);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao buscar pedidos:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  function formatDate(timestamp) {
    if (!timestamp?.toDate) return "—";
    return timestamp.toDate().toLocaleDateString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />
      <div className="px-[100px] py-[40px]">
        <div className="mb-[36px]">
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">Histórico</p>
          <h1 className="text-[#1F1F1F] font-extrabold text-[30px]">Meus pedidos</h1>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-[#474747] text-[16px]">Carregando pedidos...</p>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] gap-4">
            <span className="text-[56px]">📦</span>
            <p className="text-[#474747] font-semibold text-[18px]">Você ainda não realizou nenhuma compra.</p>
            <button onClick={() => navigate("/productlist")}
              className="bg-[#2074c9] hover:bg-[#1a5faa] text-white font-bold text-[14px] px-8 py-3 rounded-[10px] transition-colors duration-200">
              Ver jogos
            </button>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-6">
            {orders.map((order, index) => {
              const statusStyle = STATUS_STYLE[order.status] || STATUS_STYLE["Processando"];
              const items = order.items || [];
              return (
                <div key={order.id} className="bg-white rounded-[16px] shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-[#8F8F8F] text-[12px]">Pedido</p>
                        <p className="text-[#1F1F1F] font-bold text-[15px]">#{orders.length - index}</p>
                      </div>
                      <div className="w-px h-8 bg-[#F0F0F0]" />
                      <div>
                        <p className="text-[#8F8F8F] text-[12px]">Data</p>
                        <p className="text-[#1F1F1F] font-semibold text-[14px]">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="w-px h-8 bg-[#F0F0F0]" />
                      <div>
                        <p className="text-[#8F8F8F] text-[12px]">Total</p>
                        <p className="text-[#2074c9] font-extrabold text-[15px]">
                          R$ {Number(order.total || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[12px] font-bold px-4 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                      {order.status || "Processando"}
                    </span>
                  </div>
                  <div className="px-6 py-4 flex flex-col gap-4">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-[70px] h-[70px] rounded-[10px] bg-[#F5F5F5] flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {item.console && (
                            <span className="text-[#2074c9] text-[11px] font-bold uppercase tracking-wide">{item.console}</span>
                          )}
                          <p className="text-[#1F1F1F] font-bold text-[14px] truncate">{item.title}</p>
                          <p className="text-[#8F8F8F] text-[12px]">{item.category}</p>
                        </div>
                        <p className="text-[#2074c9] font-extrabold text-[15px] shrink-0">
                          R$ {Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}