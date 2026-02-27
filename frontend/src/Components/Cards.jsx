import "../Styles/Cards.css";

export default function Cards() {
  return (
    <>
      <h2 className="text-[#474747] mb-[20px] font-bold text-[24px] ml-[100px] mt-[38px]">
        Coleção em destaque
      </h2>

      <div className="flex justify-center gap-[34px] mb-[100px]">

        <div className="relative rounded-[8px] bg-[#D8E3F2] pl-[30px] pt-[34px] w-[400px] h-[300px]">

          <h6 className="text-[16px] font-bold uppercase leading-[32px] px-[15px] rounded-[20px] inline-block bg-[#E7FF86] mb-[10px]">
            30% off
          </h6>

          <h2 className="text-[32px] font-bold mb-[20px]">
            Promoção <br /> Nintendo
          </h2>

          <button className="rounded-[8px] bg-[#2074c9] text-white font-bold text-[14px] w-[150px] h-[40px]">
            Comprar
          </button>

          <img
            src="mario.png"
            alt="Mario"
            className="absolute bottom-0 right-6 w-[120px]"
          />

        </div>

        <div className="relative rounded-[8px] bg-[#D8E3F2] pl-[30px] pt-[34px] w-[400px] h-[300px]">

          <h6 className="text-[16px] font-bold uppercase leading-[32px] px-[15px] rounded-[20px] inline-block bg-[#E7FF86] mb-[10px]">
            30% off
          </h6>

          <h2 className="text-[32px] font-bold mb-[20px]">
            Promoção <br /> Playstation
          </h2>

          <button className="rounded-[8px] bg-[#2074c9] text-white font-bold text-[14px] w-[150px] h-[40px]">
            Comprar
          </button>

          <img
            src="play2.png"
            alt="Playstation"
            className="absolute bottom-0 right-4 w-[180px]"
          />

        </div>

        <div className="relative rounded-[8px] bg-[#D8E3F2] pl-[30px] pt-[34px] w-[400px] h-[300px]">

          <h6 className="text-[16px] font-bold uppercase leading-[32px] px-[15px] rounded-[20px] inline-block bg-[#E7FF86] mb-[10px]">
            30% off
          </h6>

          <h2 className="text-[32px] font-bold mb-[20px]">
            Promoção <br /> XBOX
          </h2>

          <button className="rounded-[8px] bg-[#2074c9] text-white font-bold text-[14px] w-[150px] h-[40px]">
            Comprar
          </button>

          <img
            src="controlexbox.png"
            alt="Controle Xbox"
            className="absolute bottom-0 right-2 w-[220px]"
          />

        </div>

      </div>
    </>
  );
}