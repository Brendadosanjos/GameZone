import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    tag: "Melhores ofertas personalizadas",
    title: "Queima de\nEstoque 🔥",
    subtitle: "Veja as ofertas que estão em destaque pra hoje",
    buttonText: "Ver ofertas",
    buttonTo: "/productlist",
    image: "games.png",
    bg: "#F5F5F5",
  },
  {
    tag: "Jogos com desconto",
    title: "Jogos para\nXbox",
    subtitle: "Confira as novidades e os jogos mais populares",
    buttonText: "Ver oferta",
    buttonTo: "/productlist",
    image: "xbox.png",
    bg: "#EEF4FF",
  },
];

export default function CarrouselHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-[100px] py-[40px]">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="rounded-[20px] overflow-hidden"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="flex items-center justify-between px-[60px] py-[50px] min-h-[340px]"
              style={{ backgroundColor: slide.bg }}
            >
              {/* Text */}
              <div className="flex flex-col gap-4 max-w-[420px]">
                <span className="inline-block bg-[#E7FF86] text-black font-bold text-[12px] px-4 py-1 rounded-full uppercase tracking-widest w-fit">
                  {slide.tag}
                </span>
                <h2 className="text-[#1F1F1F] font-extrabold text-[52px] leading-[1.1] whitespace-pre-line">
                  {slide.title}
                </h2>
                <p className="text-[#474747] text-[16px] leading-relaxed">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => navigate(slide.buttonTo)}
                  className="w-fit bg-[#2074c9] hover:bg-[#1a5faa] transition-colors duration-200 text-white font-bold text-[14px] px-8 py-3 rounded-[10px]"
                >
                  {slide.buttonText}
                </button>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-[260px] object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
