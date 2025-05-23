import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Orders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al cargar pedidos:", error.message);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  const deleteOrder = async (orderId) => {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);
      if (error) {
      console.error("Error al eliminar el pedido:", error.message);
    } else {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    }
  }

  if (loading) return <p className="p-8 text-center">Cargando pedidos...</p>;

  if (orders.length === 0)
    return <p className="p-8 text-center">Aún no tienes pedidos.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mis pedidos</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow">
          <p className="text-sm text-gray-500">
            Fecha: {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
          <ul className="mt-2">
            {order.items.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.name} × {item.quantity} - ${item.price}
              </li>
            ))}

            <button
              onClick={() => deleteOrder(order.id)} // Consider adding a confirmation dialog here
              className="mt-2 text-red-600 hover:underline text-sm "
            >
              Eliminar pedido
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
}
