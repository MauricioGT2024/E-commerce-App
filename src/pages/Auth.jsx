import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // para mostrar errores o info

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage({ type: "error", text: error.message });
      else setMessage({ type: "success", text: "¡Bienvenido!" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setMessage({ type: "error", text: error.message });
      else
        setMessage({
          type: "success",
          text: "Cuenta creada. Revisa tu email para confirmar.",
        });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-sm bg-white p-6 rounded shadow"
        aria-label={
          isLogin ? "Formulario de inicio de sesión" : "Formulario de registro"
        }
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h2>

        {message && (
          <p
            className={`text-center ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
            role="alert"
          >
            {message.text}
          </p>
        )}

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="email@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
        />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete={isLogin ? "current-password" : "new-password"}
          minLength={6}
        />

        <button
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading
            ? isLogin
              ? "Entrando..."
              : "Creando cuenta..."
            : isLogin
            ? "Entrar"
            : "Crear cuenta"}
        </button>

        <button
          type="button"
          className="w-full text-center text-blue-600 hover:underline focus:outline-none"
          onClick={() => {
            setIsLogin(!isLogin);
            setEmail("");
            setPassword("");
            setMessage(null);
          }}
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </form>
    </div>
  );
}
