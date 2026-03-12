import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "Grátis para sempre",
    color: "#F5F5F5",
    textColor: "#474747",
    badge: null,
    features: ["Acesso ao catálogo de jogos","Compra de jogos avulsos","Histórico de pedidos","Suporte básico"],
    disabled: ["Jogo grátis todo mês","Desconto","Acesso antecipado a lançamentos","Suporte prioritário"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 29.9,
    period: "por mês",
    color: "#2074c9",
    textColor: "#fff",
    badge: "Mais popular",
    features: ["Acesso ao catálogo de jogos","Compra de jogos avulsos","Histórico de pedidos","Suporte prioritário","Jogo grátis todo mês","15% de desconto","Acesso antecipado a lançamentos"],
    disabled: [],
  },
];

const FREE_GAMES_BY_MONTH = {
  0:"FIFA 25",1:"Hogwarts Legacy",2:"EA FC 25",3:"Spider-Man 2",
  4:"Elden Ring",5:"Tekken 8",6:"Mortal Kombat 1",7:"Baldur's Gate 3",
  8:"Alan Wake 2",9:"Cyberpunk 2077",10:"The Last of Us Part I",11:"God of War Ragnarök",
};

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [currentSub, setCurrentSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloaded, setDownloaded] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const freeGameOfMonth = FREE_GAMES_BY_MONTH[new Date().getMonth()];
  const isPremium = profile?.isSubscriber && currentSub?.status === "activate";

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) { setLoading(false); return; }
      try {
        const q = query(collection(db, "subscriptions"), where("userId", "==", user.uid), where("status", "==", "activate"));
        const snap = await getDocs(q);
        if (!snap.empty) setCurrentSub({ id: snap.docs[0].id, ...snap.docs[0].data() });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    fetchSubscription();
  }, [user]);

  function handleDownload() {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  function handleSubscribe(plan) {
    if (plan.id === "free") return;
    if (!user) { navigate("/login"); return; }
    navigate("/checkout-assinatura");
  }

  async function handleCancel() {
    if (!currentSub || !user) return;
    setCancelling(true);
    try {
      // Marca subscription como cancelada
      await updateDoc(doc(db, "subscriptions", currentSub.id), {
        status: "cancelled",
        cancelledAt: Timestamp.now(),
      });
      // Atualiza isSubscriber no perfil
      await updateDoc(doc(db, "users", user.uid), {
        isSubscriber: false,
      });
      setCurrentSub(null);
      setConfirmCancel(false);
    } catch (e) {
      console.error("Erro ao cancelar:", e);
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />

      <div className="text-center pt-[60px] pb-[20px] px-4">
        <span className="inline-block bg-[#E7FF86] text-black font-bold text-[13px] px-4 py-1 rounded-full mb-4 uppercase tracking-wide">GameZone Plus</span>
        <h1 className="text-[#1F1F1F] font-extrabold text-[40px] leading-tight mb-3">Eleve sua experiência <br /> gamer</h1>
        <p className="text-[#474747] text-[16px] max-w-[500px] mx-auto">Assine o plano Premium e ganhe um jogo grátis todo mês, descontos exclusivos e muito mais.</p>
      </div>

      {/* Jogo do mês */}
      <div className="mx-auto max-w-[700px] mt-8 mb-4 px-4">
        <div className={`rounded-[16px] p-6 shadow-md ${isPremium ? "bg-[#2074c9]" : "bg-[#1F1F1F]"}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className={`text-[13px] font-semibold uppercase tracking-widest mb-1 ${isPremium ? "text-white/70" : "text-white/50"}`}>Jogo grátis deste mês</p>
              <h2 className="text-white font-extrabold text-[26px] mb-3">{isPremium ? freeGameOfMonth : "••••••••••••"}</h2>
              {isPremium ? (
                <button onClick={handleDownload}
                  className={`inline-flex items-center gap-2 font-bold text-[13px] px-5 py-2 rounded-full transition-all duration-200 ${downloaded ? "bg-green-400 text-white" : "bg-[#E7FF86] text-black hover:bg-yellow-200"}`}>
                  {downloaded ? "✓ Download iniciado!" : "⬇ Baixar jogo grátis"}
                </button>
              ) : (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="bg-white/10 text-white/60 text-[12px] px-4 py-2 rounded-full">🔒 Exclusivo para assinantes Premium</span>
                  <button onClick={() => navigate(user ? "/checkout-assinatura" : "/login")}
                    className="bg-[#E7FF86] hover:bg-yellow-200 text-black font-bold text-[13px] px-5 py-2 rounded-full transition-colors">
                    Assinar agora →
                  </button>
                </div>
              )}
            </div>
            <div className="text-[64px]">{isPremium ? "🎮" : "🔒"}</div>
          </div>
        </div>
      </div>

      {isPremium && (
        <div className="text-center mt-3 mb-2">
          <div className="inline-flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-white border border-[#2074c9] text-[#2074c9] font-bold px-5 py-2 rounded-full text-[14px] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Assinatura Premium ativa
            </span>

            {!confirmCancel ? (
              <button
                onClick={() => setConfirmCancel(true)}
                className="text-[#8F8F8F] hover:text-red-500 text-[13px] underline transition-colors duration-150"
              >
                Cancelar assinatura
              </button>
            ) : (
              <div className="bg-white rounded-[14px] shadow-md px-6 py-4 flex flex-col items-center gap-3 border border-red-100">
                <p className="text-[#1F1F1F] font-bold text-[15px]">Tem certeza?</p>
                <p className="text-[#474747] text-[13px] text-center max-w-[260px]">
                  Você perderá acesso ao jogo grátis e todos os benefícios Premium.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmCancel(false)}
                    className="px-5 py-2 border-2 border-[#E8E8E8] text-[#474747] font-bold text-[13px] rounded-[8px] hover:border-[#2074c9] transition-colors"
                  >
                    Manter plano
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="px-5 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-bold text-[13px] rounded-[8px] transition-colors"
                  >
                    {cancelling ? "Cancelando..." : "Confirmar cancelamento"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Planos */}
      <div className="flex flex-wrap justify-center gap-8 mt-10 mb-[80px] px-4">
        {PLANS.map((plan) => {
          const isCurrentPlan = (plan.id === "premium" && isPremium) || (plan.id === "free" && !isPremium);
          return (
            <div key={plan.id} className="relative rounded-[16px] w-[340px] overflow-hidden shadow-md transition-transform hover:-translate-y-1" style={{ backgroundColor: plan.color }}>
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-[#E7FF86] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">{plan.badge}</div>
              )}
              <div className="p-8">
                <h3 className="font-extrabold text-[22px] mb-1" style={{ color: plan.textColor }}>{plan.name}</h3>
                <span className="font-extrabold text-[42px] leading-none" style={{ color: plan.textColor }}>
                  {plan.price === 0 ? "R$ 0" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                </span>
                <p className="text-[13px] mb-6 mt-1 opacity-80" style={{ color: plan.textColor }}>{plan.period}</p>
                <hr className="mb-5 opacity-20" style={{ borderColor: plan.textColor }} />
                <ul className="flex flex-col gap-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[18px]">✓</span>
                      <span className="text-[14px] font-medium" style={{ color: plan.textColor }}>{f}</span>
                    </li>
                  ))}
                  {plan.disabled.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 opacity-40">
                      <span className="text-[18px]" style={{ color: plan.textColor }}>✗</span>
                      <span className="text-[14px] line-through" style={{ color: plan.textColor }}>{f}</span>
                    </li>
                  ))}
                </ul>
                {isCurrentPlan ? (
                  <button disabled className="w-full h-[48px] rounded-[8px] font-bold text-[14px] border-2 opacity-60 cursor-not-allowed"
                    style={{ borderColor: plan.id === "premium" ? "#fff" : "#2074c9", color: plan.id === "premium" ? "#fff" : "#2074c9", backgroundColor: "transparent" }}>
                    Plano atual
                  </button>
                ) : plan.id === "premium" ? (
                  <button onClick={() => handleSubscribe(plan)}
                    className="w-full h-[48px] rounded-[8px] font-bold text-[14px] transition-all duration-200"
                    style={{ backgroundColor: "#E7FF86", color: "#1F1F1F" }}>
                    {!user ? "Entrar para assinar" : "Assinar agora"}
                  </button>
                ) : (
                  <button disabled className="w-full h-[48px] rounded-[8px] font-bold text-[14px] cursor-default" style={{ backgroundColor: "#2074c9", color: "#fff" }}>
                    Plano gratuito
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefícios */}
      <div className="bg-white py-[60px] px-4">
        <h2 className="text-center text-[#1F1F1F] font-extrabold text-[28px] mb-10">Por que ser Premium?</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-[900px] mx-auto">
          {[
            { icon: "🎮", title: "Jogo grátis todo mês", desc: "Um novo jogo digital liberado pra você no início de cada mês." },
            { icon: "💰", title: "Descontos", desc: "Desconto exclusivo em todos os jogos do catálogo para assinantes." },
            { icon: "🚀", title: "Acesso antecipado", desc: "Jogue antes de todo mundo com acesso early access a lançamentos." },
            { icon: "🎧", title: "Suporte prioritário", desc: "Atendimento preferencial com tempo de resposta reduzido." },
          ].map((b, i) => (
            <div key={i} className="bg-[#F9F8FE] rounded-[12px] p-6 w-[200px] text-center shadow-sm">
              <div className="text-[40px] mb-3">{b.icon}</div>
              <h4 className="font-bold text-[#1F1F1F] text-[15px] mb-2">{b.title}</h4>
              <p className="text-[#474747] text-[13px] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="text-[#2074c9] font-bold text-[18px]">Carregando...</div>
        </div>
      )}

      <Footer />
    </div>
  );
}