export default function Navbar({ onNavigate, currentView, onLogout }) {
  const navItemClass = (view) =>
    `px-4 py-2 rounded ${
      currentView === view
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white border-b px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <h1 className="font-bold text-xl text-blue-700">🛍️ Mi Tienda</h1>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => onNavigate("catalog")}
          className={navItemClass("catalog")}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate("cart")}
          className={navItemClass("cart")}
        >
          Carrito
        </button>
        <button
          onClick={() => onNavigate("orders")}
          className={navItemClass("orders")}
        >
          Mis pedidos
        </button>
        <button
          onClick={onLogout}
          className="ml-4 text-red-600 hover:underline text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
