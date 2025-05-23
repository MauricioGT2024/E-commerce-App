export default function Cart({
  items,
  goToCheckout,
  goToOrders,
  removeFromCart,
  noBorder = false,
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`absolute -top-1 right-0 mt-2 shadow-xl rounded-xl max-w-xs w-80 z-50
        ${noBorder ? "" : "border border-gray-300 bg-white"}
      `}
      style={{ minWidth: "280px" }}
      role="menu"
      aria-label="Carrito desplegable"
    >
      <div className="p-5 bg-white">
        <h2 className="font-extrabold text-xl mb-4 flex items-center gap-2">
          <span className="text-2xl">🛒</span> Carrito
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-400 italic text-center py-8">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <ul className="max-h-64 overflow-y-auto mb-4 space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.name}{" "}
                      <span className="text-gray-600">× {item.quantity}</span>
                    </p>
                    <small className="text-gray-500">
                      ${item.price.toFixed(2)} c/u
                    </small>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm hover:underline focus:outline-none"
                    aria-label={`Quitar ${item.name} del carrito`}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-1 text-lg font-bold text-gray-900">
              Total: ${total.toFixed(2)}
            </p>

            <button
              className="mt-4 bg-blue-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={goToCheckout}
            >
              Ir al checkout
            </button>

            <button
              onClick={goToOrders}
              className="mt-3 w-full text-blue-600 underline hover:text-blue-800 transition-colors duration-300 focus:outline-none"
            >
              Ver mis pedidos
            </button>
          </>
        )}
      </div>
    </div>
  );
}
