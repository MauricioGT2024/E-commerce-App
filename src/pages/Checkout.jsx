import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Checkout({ items, userId, clearCart, onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    const { error } = await supabase.from("orders").insert([
      {
        user_id: userId,
        items,
        total,
      },
    ]);

    if (error) {
      setMessage("❌ Error al realizar el pedido: " + error.message);
      setOrderCompleted(false);
    } else {
      setMessage("✅ Pedido realizado con éxito 🎉");
      clearCart();
      await supabase.from("carts").delete().eq("user_id", session.user.id);

      setOrderCompleted(true);
    }

    setLoading(false);
  };

  const handleGoToCatalog = () => {
    if (typeof onNavigate === "function") {
      clearCart();
      onNavigate("catalog"); // Llamas a onNavigate con el nombre de la página
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
        Resumen del pedido
      </h1>

      <ul className="mb-6 divide-y divide-gray-200 max-h-72 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-3">
            <span className="font-medium text-gray-900">
              {item.name} ×{" "}
              <span className="text-gray-600">{item.quantity}</span>
            </span>
            <span className="font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xl font-bold mb-6 text-right text-gray-800">
        Total: <span className="text-blue-600">${total.toFixed(2)}</span>
      </p>

      {!orderCompleted ? (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold text-white transition-colors duration-300
            ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
          aria-busy={loading}
        >
          {loading ? "Procesando..." : "Confirmar pedido"}
        </button>
      ) : (
        <button
          onClick={handleGoToCatalog}
          className="w-full py-3 rounded-full font-semibold text-blue-700 border border-blue-700 hover:bg-blue-50 transition-colors duration-300"
        >
          Volver al catálogo
        </button>
      )}

      {message && (
        <p
          className={`mt-6 text-center font-medium ${
            message.startsWith("❌") ? "text-red-600" : "text-green-600"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
}
