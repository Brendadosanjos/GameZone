import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Cadastro() {
  const navigate = useNavigate();
  const auth = getAuth();
  const redirectTimeoutRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (form.password !== form.confirmPassword) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: form.name });

      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        name: form.name,
        email: form.email,
        isSubscriber: false,
        createdAt: Timestamp.now(),
      });

      setSucesso(true);
      redirectTimeoutRef.current = setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const messages = {
        "auth/email-already-in-use": "Este e-mail já está cadastrado.",
        "auth/invalid-email": "E-mail inválido.",
        "auth/weak-password": "Senha muito fraca. Use pelo menos 6 caracteres.",
      };
      setErro(messages[error.code] || "Não foi possível concluir o cadastro.");
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <div className="bg-[#F9F8FE] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[80px] h-[80px] rounded-full bg-green-100 flex items-center justify-center text-[40px]">
            ✅
          </div>
          <h2 className="text-[#1F1F1F] font-extrabold text-[24px]">Cadastro realizado!</h2>
          <p className="text-[#474747] text-[14px]">Redirecionando para a home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F8FE] min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">

        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img src="/logo.png" alt="GameZone" width={64} className="mb-3" />
          </Link>
          <h1 className="text-[#2074c9] font-extrabold text-[28px]">GameZone</h1>
          <p className="text-[#8F8F8F] text-[14px] mt-1">Crie sua conta</p>
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
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className="w-full h-[46px] border border-[#E8E8E8] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors bg-[#F9F8FE]"
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                required
                className="w-full h-[46px] border border-[#E8E8E8] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors bg-[#F9F8FE]"
              />
            </div>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">
                Confirmar senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repita sua senha"
                required
                className="w-full h-[46px] border border-[#E8E8E8] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors bg-[#F9F8FE]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] bg-[#2074c9] hover:bg-[#1a5faa] disabled:opacity-60 text-white font-bold text-[15px] rounded-[10px] transition-colors duration-200 mt-2"
            >
              {loading ? "Cadastrando..." : "Criar conta"}
            </button>

          </form>

          <p className="text-center text-[13px] text-[#474747] mt-5">
            Já tem conta?{" "}
            <Link to="/login" className="text-[#2074c9] font-bold no-underline hover:underline">
              Entrar
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}