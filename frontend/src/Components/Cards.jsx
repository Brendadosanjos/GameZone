import { useNavigate } from "react-router-dom";

const promos = [
  {
    badge: "30% off",
    title: "Promoção\nNintendo",
    image: "mario.png",
    imageClass: "absolute bottom-0 right-6 w-[110px]",
    to: "/productlist?console=Nintendo",
  },
  {
    badge: "30% off",
    title: "Promoção\nPlaystation",
    image: "play2.png",
    imageClass: "absolute bottom-0 right-4 w-[160px]",
    to: "/productlist?console=Playstation",
  },
  {
    badge: "30% off",
    title: "Promoção\nXBOX",
    image: "controlexbox.png",
    imageClass: "absolute bottom-0 right-2 w-[200px]",
    to: "/productlist?console=Xbox",
  },
];

export default function Cards() {
  const navigate = useNavigate();

  return (
    <div className="px-[100px] mb-[80px]">
      <h2 className="text-[#1F1F1F] font-extrabold text-[26px] mb-[28px]">
        Coleção em destaque
      </h2>

      <div className="flex justify-between gap-6">
        {promos.map((promo, i) => (
          <div
            key={i}
            className="relative rounded-[16px] bg-[#D8E3F2] pl-[28px] pt-[30px] pb-[28px] flex-1 min-h-[260px] overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
  
            <span className="inline-block bg-[#E7FF86] text-black font-bold text-[12px] px-4 py-1 rounded-full uppercase tracking-wide mb-3">
              {promo.badge}
            </span>

            
            <h2 className="text-[#1F1F1F] font-extrabold text-[28px] leading-[1.2] whitespace-pre-line mb-5">
              {promo.title}
            </h2>

           
            <button
              onClick={() => navigate(promo.to)}
              className="bg-[#2074c9] hover:bg-[#1a5faa] transition-colors duration-200 text-white font-bold text-[13px] px-6 py-2 rounded-[8px] z-10 relative"
            >
              Comprar
            </button>

            
            <img src={promo.image} alt={promo.title} className={promo.imageClass} />
          </div>
        ))}
      </div>
    </div>
  );
}