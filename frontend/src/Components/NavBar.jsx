import "boxicons";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../Styles/Navbar.css";

const USER_ID = "user1";

export default function NavBar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const userId = user?.uid || USER_ID;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cart"), (snap) => {
      setCartCount(snap.size);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/productlist?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  }

  const firstName =
    profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || null;

  return (
    <>
      <div className="flex flex-col pt-[34px] px-[100px] pb-[29px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-[5px] text-[#2074c9] font-bold text-[28px] md:text-[36px] no-underline"
          >
            <img src="/logo.png" alt="logo-navBar" width={60} />
            <h1 className="whitespace-nowrap">GameZone</h1>
          </Link>

          <form
            onSubmit={handleSearch}
            className="relative flex-1 min-w-[250px] max-w-[500px]"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar um produto..."
              className="w-full h-[50px] bg-black/10 pl-4 pr-12 rounded-[8px] outline-none border-2 border-transparent focus:border-[#2074c9] duration-150"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-4 bg-transparent border-none p-0"
            >
              <box-icon name="search"></box-icon>
            </button>
          </form>


          <div className="flex items-center gap-4">
            {user ? (

              <>
                <div className="flex items-center gap-2">
                  <div className="w-[34px] h-[34px] rounded-full bg-[#2074c9] flex items-center justify-center text-white font-bold text-[14px]">
                    {firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[#8F8F8F] text-[11px]">Olá,</span>
                    <span className="text-[#1F1F1F] font-bold text-[14px]">
                      {firstName}
                    </span>
                  </div>
                  {profile?.isSubscriber && (
                    <span className="bg-[#E7FF86] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Premium
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-[#2074c9] hover:bg-[#1a5faa] text-white font-bold text-[13px] px-5 py-2 rounded-[8px] transition-colors duration-150"
                >
                  Sair
                </button>
              </>
            ) : (

              <>
                <Link
                  to="/cadastro"
                  className="text-[#474747] underline hover:text-[#2074c9] no-underline"
                >
                  Cadastre-se
                </Link>
                <Link to="/login">
                  <Button
                    className="w-[100px] no-underline bg-[#2074c9] border-none hover:bg-[#2074c9] font-bold text-[14px]"
                    variant="primary"
                  >
                    Entrar
                  </Button>
                </Link>
              </>
            )}

            <Link to="/carrinho" className="relative inline-flex items-center">
              <img src="/Buy.png" width={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2074c9] text-white text-[10px] font-extrabold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-[32px] mt-[40px] mb-[21px]">
          <Link
            className="text-[#474747] hover:text-[#2074c9] no-underline"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-[#474747] hover:text-[#2074c9] no-underline"
            to="/assinatura"
          >
            Assinatura
          </Link>
          <Link
            className="text-[#474747] hover:text-[#2074c9] no-underline"
            to="/productlist"
          >
            Produtos
          </Link>
          <Link
            className="text-[#474747] hover:text-[#2074c9] no-underline"
            to="/categorias"
          >
          Categorias
          </Link>
          <Link
            className="text-[#474747] hover:text-[#2074c9] no-underline"
            to="/carrinho"
          >
            Carrinho
          </Link>
          <Link
            className="text-[#474747] hover:text-[#2074c9] no-underline"
            to="/pedidos"
          >
            Meus pedidos
          </Link>
        </div>
      </div>
    </>
  );
}
