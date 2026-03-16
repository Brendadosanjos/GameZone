import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function EditarPerfil() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");

    if (!name.trim()) return setError("O nome não pode estar vazio.");
    if (!email.trim() || !email.includes("@")) return setError("Digite um e-mail válido.");
    if (novaSenha && novaSenha.length < 6) return setError("A nova senha deve ter pelo menos 6 caracteres.");
    if (novaSenha && novaSenha !== confirmarSenha) return setError("As senhas não coincidem.");
    if ((novaSenha || email !== user.email) && !senhaAtual) return setError("Digite sua senha atual para confirmar as alterações.");

    setLoading(true);

    try {
      // Reautenticar se for mudar email ou senha
      if (novaSenha || email !== user.email) {
        const credential = EmailAuthProvider.credential(user.email, senhaAtual);
        await reauthenticateWithCredential(auth.currentUser, credential);
      }

      // Atualizar nome no Firestore
      if (name.trim() !== profile?.name) {
        await updateDoc(doc(db, "users", user.uid), { name: name.trim() });
      }

      // Atualizar email no Firebase Auth
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email.trim().toLowerCase());
        await updateDoc(doc(db, "users", user.uid), { email: email.trim().toLowerCase() });
      }

      // Atualizar senha
      if (novaSenha) {
        await updatePassword(auth.currentUser, novaSenha);
      }

      setSuccess(true);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Senha atual incorreta.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso por outra conta.");
      } else {
        setError("Erro ao salvar alterações. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F9F8FE] min-h-screen">
      <NavBar />

      <div className="px-[100px] py-[40px]">
        <div className="mb-[36px]">
          <p className="text-[#2074c9] font-bold text-[13px] uppercase tracking-widest mb-1">Conta</p>
          <h1 className="text-[#1F1F1F] font-extrabold text-[30px]">Editar perfil</h1>
        </div>

        <div className="max-w-[600px] flex flex-col gap-6">

          {/* Dados pessoais */}
          <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
            <p className="text-[#1F1F1F] font-bold text-[16px]">Dados pessoais</p>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors"
              />
            </div>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors"
              />
            </div>
          </div>

          {/* Alterar senha */}
          <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
            <p className="text-[#1F1F1F] font-bold text-[16px]">Alterar senha</p>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Nova senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Deixe em branco para não alterar"
                className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors"
              />
            </div>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Confirmar nova senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Repita a nova senha"
                className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors"
              />
            </div>
          </div>

          {/* Confirmação de segurança */}
          <div className="bg-white rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
            <p className="text-[#1F1F1F] font-bold text-[16px]">Confirmação de segurança</p>
            <p className="text-[#8F8F8F] text-[13px]">Necessário apenas se alterar e-mail ou senha.</p>

            <div>
              <label className="text-[#474747] text-[13px] font-semibold mb-1 block">Senha atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="Digite sua senha atual"
                className="w-full h-[44px] border border-[#E8E8E8] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#2074c9] transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[10px] px-4 py-3">
              <p className="text-red-600 text-[13px] font-semibold">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-[10px] px-4 py-3">
              <p className="text-green-600 text-[13px] font-semibold">✅ Perfil atualizado com sucesso!</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 h-[52px] bg-[#2074c9] hover:bg-[#1a5faa] disabled:opacity-50 text-white font-bold text-[15px] rounded-[10px] transition-colors duration-200"
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="h-[52px] px-6 border-2 border-[#E8E8E8] hover:border-[#2074c9] text-[#474747] hover:text-[#2074c9] font-semibold text-[14px] rounded-[10px] transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
