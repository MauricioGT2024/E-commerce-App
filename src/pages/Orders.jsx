import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Orders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);

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
    if (!confirm("¿Estás seguro de eliminar este pedido?")) return;

    const { error } = await supabase.from("orders").delete().eq("id", orderId);
    if (error) {
      console.error("Error al eliminar el pedido:", error.message);
    } else {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );

  if (orders.length === 0)
    return (
      <p className="p-8 text-center text-gray-500 italic">
        Aún no tienes pedidos.
      </p>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow-md">
        Mis pedidos
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-300 rounded-xl p-6 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
        >
          <p className="text-gray-400 text-sm mb-2">
            Fecha: {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-2xl font-semibold mb-4 text-gray-900">
            Total: ${order.total.toFixed(2)}
          </p>

          <ul>
            {order.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-4 mb-4 text-base border-b border-gray-100 pb-3 last:border-b-0"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-blue-500 hover:scale-105 transition-transform duration-200"
                    onClick={() => setModalImage(item.image_url)}
                    title="Click para ver imagen"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    Sin imagen
                  </div>
                )}
                <div>
                  <p className="font-semibold">
                    {item.name} × {item.quantity}
                  </p>
                  <p className="text-blue-700 font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={() => deleteOrder(order.id)}
            className="mt-4 px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Eliminar pedido
          </button>
        </div>
      ))}

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl max-w-lg max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="mb-4 text-right text-red-600 font-bold hover:text-red-800"
              aria-label="Cerrar imagen"
            >
              Cerrar ✕
            </button>
            <img
              src={modalImage}
              alt="Producto ampliado"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
