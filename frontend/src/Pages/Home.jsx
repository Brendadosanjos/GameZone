import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cards from "../Components/Cards";
import CarrouselHome from "../Components/CarouselHome";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import ProductHigh from "../Components/ProductHigh";

export default function Home() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const firstName = profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || null;
  const isSubscriber = profile?.isSubscriber;

  return (
    <div className="bg-[#F9F8FE]">
      <NavBar />

      {user && (
        <div className="px-[100px] pt-[10px] pb-[0px]">
          {isSubscriber ? (
            <div className="bg-[#2074c9] rounded-[16px] px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-[46px] h-[46px] rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-[18px]">
                  {firstName?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white/70 text-[12px] font-semibold uppercase tracking-widest">
                    Bem-vindo de volta
                  </p>
                  <p className="text-white font-extrabold text-[20px]">
                    Olá, {firstName}! 🎮
                  </p>
                </div>
                <span className="bg-[#E7FF86] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ml-2">
                  Premium
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-white/80 text-[13px]">
                  Seu jogo grátis do mês está disponível!
                </p>
                <button
                  onClick={() => navigate("/assinatura")}
                  className="bg-[#E7FF86] hover:bg-yellow-200 text-black font-bold text-[13px] px-5 py-2 rounded-[8px] transition-colors duration-150"
                >
                  Resgatar →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[16px] px-8 py-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-[46px] h-[46px] rounded-full bg-[#D8E3F2] flex items-center justify-center text-[#2074c9] font-extrabold text-[18px]">
                  {firstName?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-[#8F8F8F] text-[12px] font-semibold uppercase tracking-widest">
                    Bem-vindo de volta
                  </p>
                  <p className="text-[#1F1F1F] font-extrabold text-[20px]">
                    Olá, {firstName}! 👋
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[#474747] text-[13px]">
                  Assine o Premium e ganhe um jogo grátis todo mês.
                </p>
                <button
                  onClick={() => navigate("/assinatura")}
                  className="bg-[#2074c9] hover:bg-[#1a5faa] text-white font-bold text-[13px] px-5 py-2 rounded-[8px] transition-colors duration-150"
                >
                  Conhecer planos →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <CarrouselHome />
      <Cards />
      <ProductHigh />

      <div className="px-[100px] mb-[100px]">
        <div className="bg-[#1F1F1F] rounded-[20px] px-[60px] py-[50px] flex items-center justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <span className="inline-block bg-[#E7FF86] text-black font-bold text-[12px] px-4 py-1 rounded-full uppercase tracking-widest w-fit">
              GameZone Plus
            </span>
            <h2 className="text-white font-extrabold text-[36px] leading-[1.15]">
              Um jogo grátis todo mês.<br />Descontos exclusivos.
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed">
              Assine o plano Premium e aproveite benefícios exclusivos para gamers de verdade.
            </p>
            <button
              onClick={() => navigate("/assinatura")}
              className="w-fit bg-[#2074c9] hover:bg-[#1a5faa] transition-colors duration-200 text-white font-bold text-[14px] px-8 py-3 rounded-[10px]"
            >
              Conhecer planos →
            </button>
          </div>
          <div className="flex gap-4">
            {["🎮", "🏆", "💰"].map((icon, i) => (
              <div key={i} className="bg-white/10 rounded-[16px] w-[90px] h-[90px] flex items-center justify-center text-[40px]">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}