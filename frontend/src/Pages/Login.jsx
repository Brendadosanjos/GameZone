import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  const location = useLocation();

const from = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e) {
  e.preventDefault();
  setErro("");
  setLoading(true);

  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);

    navigate(from, { replace: true });

  } catch (error) {
    const messages = {
      "auth/user-not-found": "E-mail não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/invalid-email": "E-mail inválido.",
      "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    };

    setErro(messages[error.code] || "Não foi possível fazer login.");

  } finally {
    setLoading(false);
  }
}

  return (
    <div className="bg-[#F9F8FE] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">

        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img src="/logo.png" alt="GameZone" width={64} className="mb-3" />
          </Link>
          <h1 className="text-[#2074c9] font-extrabold text-[28px]">GameZone</h1>
          <p className="text-[#8F8F8F] text-[14px] mt-1">Entre na sua conta</p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm p-8">

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold px-4 py-3 rounded-[10px] mb-5">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full h-[46px] border border-[#E8E8E8] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors bg-[#F9F8FE]"
              />
            </div>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full h-[46px] border border-[#E8E8E8] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors bg-[#F9F8FE]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] bg-[#2074c9] hover:bg-[#1a5faa] disabled:opacity-60 text-white font-bold text-[15px] rounded-[10px] transition-colors duration-200 mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

          </form>

          <p className="text-center text-[13px] text-[#474747] mt-5">
            Não tem conta?{" "}
            <Link to="/cadastro" className="text-[#2074c9] font-bold no-underline hover:underline">
              Cadastre-se
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}