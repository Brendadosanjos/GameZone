import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const PAYMENT_METHODS = [
  { id: "cartao", label: "Cartão de Crédito", icon: "💳" },
  { id: "pix",    label: "PIX",               icon: "⚡" },
  { id: "boleto", label: "Boleto",             icon: "📄" },
];

const FREE_GAMES_BY_MONTH = {
  0: "FIFA 25", 1: "Hogwarts Legacy", 2: "EA FC 25", 3: "Spider-Man 2",
  4: "Elden Ring", 5: "Tekken 8", 6: "Mortal Kombat 1", 7: "Baldur's Gate 3",
  8: "Alan Wake 2", 9: "Cyberpunk 2077", 10: "The Last of Us Part I", 11: "God of War Ragnarök",
};

export default function CheckoutSubscription() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const freeGameOfMonth = FREE_GAMES_BY_MONTH[new Date().getMonth()];

  function formatCardNumber(val) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(val) {
    return val.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");
  }
  function isFormValid() {
    if (paymentMethod === "cartao") {
      return cardNumber.replace(/\s/g, "").length === 16 && cardName && cardExpiry.length === 5 && cardCvv.length === 3;
    }
    return true;
  }

  async function handleFinish() {
    if (!isFormValid() || !user) return;
    setProcessing(true);

    await new Promise((res) => setTimeout(res, 2000));

    try {
      const startDate = Timestamp.now();
      const endDate = Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

      await addDoc(collection(db, "subscriptions"), {
        userId: user.uid,
        plan: "premium",
        status: "activate",
        starDate: startDate,
        endDate,
        freeGameMonth: freeGameOfMonth,
        paymentMethod,
      });

      await updateDoc(doc(db, "users", user.uid), {
        isSubscriber: true,
      });

      setSuccess(true);
      setTimeout(() => navigate("/assinatura"), 2500);
    } catch (err) {
      console.error("Erro ao assinar:", err);
      setProcessing(false);
    }
  }

  if (success) {
    return (
      <div className="bg-[#F9F8FE] min-h-screen">
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[500px] gap-5">
          <div className="w-[80px] h-[80px] rounded-full bg-green-100 flex items-center justify-center text-[40px]">🎉</div>
          <h2 className="text-[#1F1F1F] font-extrabold text-[28px]">Assinatura ativada!</h2>
          <p className="text-[#474747] text-[15px]">Bem-vindo ao Premium. Redirecionando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />

      <div className="px-[100px] py-[40px]">
        <div className="mb-[36px]">
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">Assinatura</p>
          <h1 className="text-[#1F1F1F] font-extrabold text-[30px]">Ativar Premium</h1>
        </div>

        <div className="flex gap-[40px] items-start">

          <div className="flex-1 flex flex-col gap-6">

            <div className="bg-white rounded-[16px] p-6 shadow-sm">
              <p className="text-[#1F1F1F] font-bold text-[16px] mb-4">Forma de pagamento</p>
              <div className="flex gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-[12px] border-2 font-bold text-[13px] transition-all duration-150
                      ${paymentMethod === method.id
                        ? "border-[#2074c9] bg-[#EEF4FF] text-[#2074c9]"
                        : "border-[#E8E8E8] text-[#474747] hover:border-[#2074c9]"}`}
                  >
                    <span className="text-[28px]">{method.icon}</span>
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "cartao" && (
              <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <p className="text-[#1F1F1F] font-bold text-[16px]">Dados do cartão</p>
                <div className="bg-gradient-to-br from-[#2074c9] to-[#1a3a6b] rounded-[14px] p-5 text-white h-[160px] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[18px] tracking-widest opacity-80">VISA</span>
                    <span className="text-[24px]">💳</span>
                  </div>
                  <div>
                    <p className="font-mono text-[18px] tracking-[4px] mb-2">{cardNumber || "•••• •••• •••• ••••"}</p>
                    <div className="flex justify-between text-[12px] opacity-80">
                      <span>{cardName || "NOME NO CARTÃO"}</span>
                      <span>{cardExpiry || "MM/AA"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Número do cartão</label>
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="0000 0000 0000 0000"
                      className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Nome no cartão</label>
                    <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} placeholder="COMO ESTÁ NO CARTÃO"
                      className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Validade</label>
                      <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/AA"
                        className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[#474747] text-[13px] font-semibold mb-1 block">CVV</label>
                      <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••"
                        className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "pix" && (
              <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col items-center gap-4">
                <p className="text-[#1F1F1F] font-bold text-[16px] self-start">Pague via PIX</p>
                <div className="w-[180px] h-[180px] bg-[#F5F5F5] rounded-[12px] flex items-center justify-center text-[80px]">⬛</div>
                <div className="flex gap-2 w-full">
                  <input readOnly value="00020126580014br.gov.bcb.pix0136gamezone-subscription-key"
                    className="flex-1 h-[40px] border border-[#E8E8E8] rounded-[8px] px-3 text-[12px] text-[#8F8F8F] bg-[#F9F8FE]" />
                  <button onClick={() => navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136gamezone-subscription-key")}
                    className="bg-[#2074c9] text-white font-bold text-[12px] px-4 rounded-[8px] hover:bg-[#1a5faa] transition-colors">
                    Copiar
                  </button>
                </div>
                <p className="text-[#8F8F8F] text-[12px]">⏱ Código válido por <strong>30 minutos</strong></p>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <p className="text-[#1F1F1F] font-bold text-[16px]">Pague via Boleto</p>
                <div className="bg-[#F9F8FE] rounded-[10px] p-4 flex flex-col gap-2">
                  <p className="text-[#474747] text-[13px]">📄 O boleto será gerado após a confirmação.</p>
                  <p className="text-[#474747] text-[13px]">📅 Vencimento em <strong>3 dias úteis</strong>.</p>
                  <p className="text-[#474747] text-[13px]">⏳ Assinatura ativada em até <strong>2 dias úteis</strong> após o pagamento.</p>
                </div>
                <div className="flex gap-2">
                  <input readOnly value="34191.75400 00000.000004 00000.000000 1 00000000000299"
                    className="flex-1 h-[40px] border border-[#E8E8E8] rounded-[8px] px-3 text-[12px] text-[#8F8F8F] bg-[#F9F8FE]" />
                  <button onClick={() => navigator.clipboard.writeText("34191.75400 00000.000004 00000.000000 1 00000000000299")}
                    className="bg-[#2074c9] text-white font-bold text-[12px] px-4 rounded-[8px] hover:bg-[#1a5faa] transition-colors">
                    Copiar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-[320px] shrink-0">
            <div className="bg-white rounded-[16px] p-6 shadow-sm">
              <p className="text-[#1F1F1F] font-bold text-[16px] mb-4">Resumo da assinatura</p>

              <div className="bg-[#2074c9] rounded-[12px] p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-extrabold text-[18px]">Premium</span>
                  <span className="bg-[#E7FF86] text-black text-[11px] font-bold px-2 py-0.5 rounded-full">Mensal</span>
                </div>
                <p className="text-white/70 text-[13px]">Jogo grátis deste mês:</p>
                <p className="text-white font-bold text-[15px]">🎮 {freeGameOfMonth}</p>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                {["Jogo grátis todo mês", "15% de desconto", "Acesso antecipado", "Suporte prioritário"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-[#474747]">
                    <span className="text-[#2074c9] font-bold">✓</span> {f}
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0F0F0] pt-4 mb-5">
                <div className="flex justify-between font-extrabold text-[16px]">
                  <span className="text-[#1F1F1F]">Total mensal</span>
                  <span className="text-[#2074c9]">R$ 29,90</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                disabled={processing || !isFormValid()}
                className="w-full h-[52px] bg-[#2074c9] hover:bg-[#1a5faa] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[15px] rounded-[10px] transition-colors duration-200"
              >
                {processing ? "Ativando assinatura..." : "Confirmar assinatura"}
              </button>
              <p className="text-center text-[11px] text-[#8F8F8F] mt-3">🔒 Pagamento 100% seguro e simulado</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
