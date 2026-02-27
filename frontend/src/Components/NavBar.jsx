import "boxicons";
import { Button } from "react-bootstrap";
import "../Styles/NavBar.css";

export default function NavBar() {
  return (
    <>
      <div className="flex flex-col pt-[34px] px-[100px] pb-[29px]">

        {/* TOPO */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* LOGO */}
          <div className="flex items-center gap-[5px] text-[#2074c9] font-bold text-[28px] md:text-[36px]">
            <img src="logo.png" alt="logo-navBar" width={60} />
            <h1 className="whitespace-nowrap">GameZone</h1>
          </div>

          {/* BUSCA */}
          <div className="relative flex-1 min-w-[250px] max-w-[500px]">
            <input
              type="text"
              placeholder="Pesquisar um produto..."
              className="w-full h-[50px] bg-black/10 pl-4 rounded-[8px] outline-none border-2 border-transparent focus:border-[#2074c9] duration-150"
            />
            <box-icon
              class="absolute top-1/2 -translate-y-1/2 right-4"
              name="search"
            ></box-icon>
          </div>

          {/* LOGIN / CARRINHO */}
          <div className="flex items-center gap-4">

            <a
              className="text-[#474747] underline hover:text-[#2074c9]"
              href="#"
            >
              Cadastre-se
            </a>

            <Button
              className="w-[100px] no-underline bg-[#2074c9] border-none hover:bg-[#2074c9] font-bold text-[14px]"
              variant="primary"
            >
              Entrar
            </Button>

            <button>
              <img src="Buy.png" width={28} />
            </button>

          </div>

        </div>

        {/* MENU */}
        <div className="flex flex-wrap gap-[32px] mt-[40px] mb-[21px]">

          <a
            className="text-[#474747] hover:text-[#2074c9]"
            href="#"
          >
            Home
          </a>

          <a
            className="text-[#474747] hover:text-[#2074c9]"
            href="#"
          >
            Produtos
          </a>

          <a
            className="text-[#474747] hover:text-[#2074c9]"
            href="#"
          >
            Categorias
          </a>

          <a
            className="text-[#474747] hover:text-[#2074c9]"
            href="#"
          >
            Meus pedidos
          </a>

        </div>

      </div>
    </>
  );
}