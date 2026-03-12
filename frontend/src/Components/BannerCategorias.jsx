import imgBanner from "../assets/banner-categoria.png";

export default function BannerCategorias() {
  return (
    <div className="bg-gradient-to-r from-[#EEF4FF] to-[#D8E3F2] rounded-[20px] flex items-center justify-between px-[60px] py-[50px] mb-[48px] overflow-hidden relative">

      <div className="flex flex-col gap-4 max-w-[500px] z-10">
        <div className="flex items-center gap-2 text-[#2074c9] font-bold text-[22px]">
          <img src="/logo.png" alt="logo" width={36} />
          <span>GameZone</span>
        </div>
        <h1 className="text-[#1F1F1F] font-extrabold text-[42px] leading-[1.15]">
          Explore as melhores{" "}
          <span className="text-[#f97316]">categorias</span>{" "}
          de produtos gamers
        </h1>
        <p className="text-[#474747] text-[16px] leading-relaxed">
          Selecione uma categoria para encontrar os melhores jogos disponíveis!
        </p>
      </div>

      <div className="flex items-center justify-end shrink-0">
        <img
          src={imgBanner}
          alt="Banner categorias"
          className="max-h-[260px] object-contain drop-shadow-xl"
        />
      </div>

    </div>
  );
}