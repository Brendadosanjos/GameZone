import { useNavigate } from "react-router-dom";
import Cards from "../Components/Cards";
import CarrouselHome from "../Components/CarouselHome";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import ProductHigh from "../Components/ProductHigh";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F8FE]">
      <NavBar />
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
              <div
                key={i}
                className="bg-white/10 rounded-[16px] w-[90px] h-[90px] flex items-center justify-center text-[40px]"
              >
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