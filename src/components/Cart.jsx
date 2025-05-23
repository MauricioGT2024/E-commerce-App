export default function Cart({
  items,
  goToCheckout,
  goToOrders,
  removeFromCart,
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed bottom-4 right-4 bg-white border p-4 shadow-lg rounded max-w-xs w-full z-50">
      <h2 className="font-bold text-lg mb-2">🛒 Carrito</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p>
                    {item.name} × {item.quantity}
                  </p>
                  <small>${item.price} c/u</small>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            className="mt-3 bg-blue-600 text-white w-full py-2 rounded"
            onClick={goToCheckout}
          >
            Ir al checkout
          </button>
          <button
            onClick={goToOrders}
            className="mt-2 w-full text-blue-600 underline"
          >
            Ver mis pedidos
          </button>
        </>
      )}
    </div>
  );
}
