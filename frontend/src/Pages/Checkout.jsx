import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import {
  collection, query, where, getDocs, addDoc, deleteDoc, doc, Timestamp,
} from "firebase/firestore";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const PAYMENT_METHODS = [
  { id: "cartao", label: "Cartão de Crédito", icon: "💳" },
  { id: "pix",    label: "PIX",               icon: "⚡" },
  { id: "boleto", label: "Boleto",             icon: "📄" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  useEffect(() => {
    async function fetchCart() {
      if (!user?.uid) return;
      try {
        const q = query(collection(db, "cart"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        setCartItems(snap.docs.map((d) => ({ docId: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [user?.uid]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1), 0
  );

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
    if (!isFormValid() || !user?.uid) return;
    setProcessing(true);
    await new Promise((res) => setTimeout(res, 2000));
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems.map(({ docId, ...item }) => item),
        total: subtotal,
        status: "Aguardando entrega",
        paymentMethod,
        createdAt: Timestamp.now(),
      });
      await Promise.all(cartItems.map((item) => deleteDoc(doc(db, "cart", item.docId))));
      setSuccess(true);
      setTimeout(() => navigate("/pedidos"), 2500);
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-[#F9F8FE] min-h-screen">
        <NavBar />
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-[#474747]">Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-[#F9F8FE] min-h-screen">
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[500px] gap-5">
          <div className="w-[80px] h-[80px] rounded-full bg-green-100 flex items-center justify-center text-[40px]">✅</div>
          <h2 className="text-[#1F1F1F] font-extrabold text-[28px]">Pagamento confirmado!</h2>
          <p className="text-[#474747] text-[15px]">Seu pedido foi realizado com sucesso. Redirecionando...</p>
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
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">Finalizar compra</p>
          <h1 className="text-[#1F1F1F] font-extrabold text-[30px]">Pagamento</h1>
        </div>

        <div className="flex gap-[40px] items-start">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-[16px] p-6 shadow-sm">
              <p className="text-[#1F1F1F] font-bold text-[16px] mb-4">Forma de pagamento</p>
              <div className="flex gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-[12px] border-2 font-bold text-[13px] transition-all duration-150
                      ${paymentMethod === method.id ? "border-[#2074c9] bg-[#EEF4FF] text-[#2074c9]" : "border-[#E8E8E8] text-[#474747] hover:border-[#2074c9]"}`}>
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
                <p className="text-[#474747] text-[13px] text-center max-w-[300px]">Escaneie o QR Code acima com o app do seu banco ou copie o código PIX abaixo.</p>
                <div className="flex gap-2 w-full">
                  <input readOnly value="00020126580014br.gov.bcb.pix0136gamezone-fake-pix-key"
                    className="flex-1 h-[40px] border border-[#E8E8E8] rounded-[8px] px-3 text-[12px] text-[#8F8F8F] bg-[#F9F8FE]" />
                  <button onClick={() => navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136gamezone-fake-pix-key")}
                    className="bg-[#2074c9] text-white font-bold text-[12px] px-4 rounded-[8px] hover:bg-[#1a5faa] transition-colors">Copiar</button>
                </div>
                <p className="text-[#8F8F8F] text-[12px]">⏱ Código válido por <strong>30 minutos</strong></p>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <p className="text-[#1F1F1F] font-bold text-[16px]">Pague via Boleto</p>
                <div className="bg-[#F9F8FE] rounded-[10px] p-4 flex flex-col gap-2">
                  <p className="text-[#474747] text-[13px]">📄 O boleto será gerado após a confirmação do pedido.</p>
                  <p className="text-[#474747] text-[13px]">📅 Vencimento em <strong>3 dias úteis</strong>.</p>
                  <p className="text-[#474747] text-[13px]">⏳ O pedido será confirmado em até <strong>2 dias úteis</strong> após o pagamento.</p>
                </div>
                <div className="flex gap-2">
                  <input readOnly value="34191.75400 00000.000004 00000.000000 1 00000000000000"
                    className="flex-1 h-[40px] border border-[#E8E8E8] rounded-[8px] px-3 text-[12px] text-[#8F8F8F] bg-[#F9F8FE]" />
                  <button onClick={() => navigator.clipboard.writeText("34191.75400 00000.000004 00000.000000 1 00000000000000")}
                    className="bg-[#2074c9] text-white font-bold text-[12px] px-4 rounded-[8px] hover:bg-[#1a5faa] transition-colors">Copiar</button>
                </div>
              </div>
            )}
          </div>

          <div className="w-[320px] shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-[16px] p-6 shadow-sm">
              <p className="text-[#1F1F1F] font-bold text-[16px] mb-4">Resumo do pedido</p>
              <div className="flex flex-col gap-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.docId} className="flex items-center gap-3">
                    <div className="w-[44px] h-[44px] rounded-[8px] bg-[#F5F5F5] flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <p className="text-[#474747] text-[13px] flex-1 line-clamp-2">{item.title}</p>
                    <p className="text-[#1F1F1F] font-bold text-[13px] shrink-0">
                      R$ {Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F0F0F0] pt-4 flex flex-col gap-2 mb-5">
                <div className="flex justify-between text-[13px] text-[#474747]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#474747]">
                  <span>Entrega</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
                <div className="flex justify-between font-extrabold text-[16px] mt-1">
                  <span className="text-[#1F1F1F]">Total</span>
                  <span className="text-[#2074c9]">R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button onClick={handleFinish} disabled={processing || !isFormValid()}
                className="w-full h-[52px] bg-[#2074c9] hover:bg-[#1a5faa] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[15px] rounded-[10px] transition-colors duration-200">
                {processing ? "Processando pagamento..." : "Confirmar pagamento"}
              </button>
              <p className="text-center text-[11px] text-[#8F8F8F] mt-3 flex items-center justify-center gap-1">
                🔒 Pagamento 100% seguro e simulado
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}