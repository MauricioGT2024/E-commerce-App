import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom"; // si usás router, si no, ignoralo

export default function Checkout({ items, userId, clearCart }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("Error al realizar el pedido: " + error.message);
    } else {
      setMessage("✅ Pedido realizado con éxito 🎉");
      clearCart();
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumen del pedido</h1>
      <ul className="mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between mb-1">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold text-lg mb-4">Total: ${total.toFixed(2)}</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Procesando..." : "Confirmar pedido"}
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
