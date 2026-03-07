import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
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
    features: [
      "Acesso ao catálogo de jogos",
      "Compra de jogos avulsos",
      "Histórico de pedidos",
      "Suporte básico",
    ],
    disabled: ["Jogo grátis todo mês", "Acesso antecipado a lançamentos", "Suporte prioritário"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 29.9,
    period: "por mês",
    color: "#2074c9",
    textColor: "#fff",
    badge: "Mais popular",
    features: [
      "Suporte prioritário",
      "Jogo grátis todo mês",
      "Acesso antecipado a lançamentos",
    ],
    disabled: [],
  },
];

const FREE_GAMES_BY_MONTH = {
  0: "FIFA 25",
  1: "Hogwarts Legacy",
  2: "EA FC 25",
  3: "Spider-Man 2",
  4: "Elden Ring",
  5: "Tekken 8",
  6: "Mortal Kombat 1",
  7: "Baldur's Gate 3",
  8: "Alan Wake 2",
  9: "Cyberpunk 2077",
  10: "The Last of Us Part I",
  11: "God of War Ragnarök",
};

export default function SubscriptionPage() {
  // Simule um userId logado; substitua por auth.currentUser.uid quando tiver auth
  const userId = "user1";

  const [currentSub, setCurrentSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const currentMonth = new Date().getMonth();
  const freeGameOfMonth = FREE_GAMES_BY_MONTH[currentMonth];

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const q = query(
          collection(db, "subscriptions"),
          where("userId", "==", userId),
          where("status", "==", "activate")
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setCurrentSub({ id: snap.docs[0].id, ...snap.docs[0].data() });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscription();
  }, []);

  async function handleSubscribe(plan) {
    if (plan.id === "free") return;
    setSubscribing(true);
    setError("");
    try {
      const startDate = Timestamp.now();
      const endDate = Timestamp.fromDate(
        new Date(Date.now() + 16 * 30 * 24 * 60 * 60 * 1000)
      );
      await addDoc(collection(db, "subscriptions"), {
        userId,
        plan: plan.id,
        status: "activate",
        starDate: startDate,
        endDate,
        freeGameMonth: freeGameOfMonth,
      });
      setSuccess(true);
      setCurrentSub({ plan: plan.id, status: "activate", freeGameMonth: freeGameOfMonth });
    } catch (e) {
      setError("Erro ao assinar. Tente novamente.");
    } finally {
      setSubscribing(false);
    }
  }

  const isPremium = currentSub?.plan === "premium" && currentSub?.status === "activate";

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />


      <div className="text-center pt-[60px] pb-[20px] px-4">
        <span className="inline-block bg-[#E7FF86] text-black font-bold text-[13px] px-4 py-1 rounded-full mb-4 uppercase tracking-wide">
          GameZone Plus
        </span>
        <h1 className="text-[#1F1F1F] font-extrabold text-[40px] leading-tight mb-3">
          Eleve sua experiência <br /> gamer
        </h1>
        <p className="text-[#474747] text-[16px] max-w-[500px] mx-auto">
          Assine o plano Premium e ganhe um jogo grátis todo mês, descontos
          exclusivos e muito mais.
        </p>
      </div>

      {isPremium && (
        <div className="mx-auto max-w-[700px] mt-6 mb-2 px-4">
          <div className="bg-[#2074c9] rounded-[16px] p-6 flex items-center justify-between gap-4 shadow-lg">
            <div>
              <p className="text-white/70 text-[13px] font-semibold uppercase tracking-widest mb-1">
                jogo grátis deste mês
              </p>
              <h2 className="text-white font-extrabold text-[26px]">
                {currentSub.freeGameMonth}
              </h2>
              <span className="inline-block bg-[#E7FF86] text-black text-[12px] font-bold px-3 py-1 rounded-full mt-2">
                Resgatado com sucesso ✓
              </span>
            </div>
            <div className="text-[60px]">🎮</div>
          </div>
        </div>
      )}


      {isPremium && (
        <div className="text-center mt-4 mb-2">
          <span className="inline-flex items-center gap-2 bg-white border border-[#2074c9] text-[#2074c9] font-bold px-5 py-2 rounded-full text-[14px] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Assinatura Premium ativa
          </span>
        </div>
      )}


      <div className="flex flex-wrap justify-center gap-8 mt-10 mb-[80px] px-4">
        {PLANS.map((plan) => {
          const isCurrentPlan =
            (plan.id === "premium" && isPremium) ||
            (plan.id === "free" && !isPremium);

          return (
            <div
              key={plan.id}
              className="relative rounded-[16px] w-[340px] overflow-hidden shadow-md transition-transform hover:-translate-y-1"
              style={{ backgroundColor: plan.color }}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-[#E7FF86] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                <h3
                  className="font-extrabold text-[22px] mb-1"
                  style={{ color: plan.textColor }}
                >
                  {plan.name}
                </h3>

                <div className="flex items-end gap-1 mb-1">
                  <span
                    className="font-extrabold text-[42px] leading-none"
                    style={{ color: plan.textColor }}
                  >
                    {plan.price === 0 ? "R$ 0" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                  </span>
                </div>
                <p
                  className="text-[13px] mb-6 opacity-80"
                  style={{ color: plan.textColor }}
                >
                  {plan.period}
                </p>

                <hr
                  className="mb-5 opacity-20"
                  style={{ borderColor: plan.textColor }}
                />

                <ul className="flex flex-col gap-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[18px]">✓</span>
                      <span
                        className="text-[14px] font-medium"
                        style={{ color: plan.textColor }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                  {plan.disabled.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 opacity-40">
                      <span className="text-[18px]" style={{ color: plan.textColor }}>✗</span>
                      <span
                        className="text-[14px] line-through"
                        style={{ color: plan.textColor }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full h-[48px] rounded-[8px] font-bold text-[14px] border-2 opacity-60 cursor-not-allowed"
                    style={{
                      borderColor: plan.id === "premium" ? "#fff" : "#2074c9",
                      color: plan.id === "premium" ? "#fff" : "#2074c9",
                      backgroundColor: "transparent",
                    }}
                  >
                    Plano atual
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={subscribing || plan.id === "free"}
                    className="w-full h-[48px] rounded-[8px] font-bold text-[14px] transition-all duration-200"
                    style={
                      plan.id === "premium"
                        ? {
                            backgroundColor: "#E7FF86",
                            color: "#1F1F1F",
                          }
                        : {
                            backgroundColor: "#2074c9",
                            color: "#fff",
                          }
                    }
                  >
                    {subscribing && plan.id === "premium"
                      ? "Processando..."
                      : plan.id === "free"
                      ? "Plano gratuito"
                      : "Assinar agora"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {success && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2074c9] text-white px-6 py-4 rounded-[12px] shadow-xl font-semibold text-[15px] z-50 flex items-center gap-3">
          <span>🎉</span> Assinatura Premium ativada com sucesso!
        </div>
      )}
      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-4 rounded-[12px] shadow-xl font-semibold text-[15px] z-50">
          {error}
        </div>
      )}

      {/* Benefícios extras */}
      <div className="bg-white py-[60px] px-4">
        <h2 className="text-center text-[#1F1F1F] font-extrabold text-[28px] mb-10">
          Por que ser Premium?
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-[900px] mx-auto">
          {[
            { icon: "🎮", title: "Jogo grátis todo mês", desc: "Um novo jogo digital liberado pra você no início de cada mês." },
            { icon: "💰", title: "15% de desconto", desc: "Desconto exclusivo em todos os jogos do catálogo para assinantes." },
            { icon: "🚀", title: "Acesso antecipado", desc: "Jogue antes de todo mundo com acesso early access a lançamentos." },
            { icon: "🎧", title: "Suporte prioritário", desc: "Atendimento preferencial com tempo de resposta reduzido." },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-[#F9F8FE] rounded-[12px] p-6 w-[200px] text-center shadow-sm"
            >
              <div className="text-[40px] mb-3">{b.icon}</div>
              <h4 className="font-bold text-[#1F1F1F] text-[15px] mb-2">{b.title}</h4>
              <p className="text-[#474747] text-[13px] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="text-[#2074c9] font-bold text-[18px]">Carregando...</div>
        </div>
      )}

      <Footer />
    </div>
  );
}
