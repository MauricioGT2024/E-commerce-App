import { useState, useEffect, useRef } from "react";
import Cart from "./Cart";

export default function Navbar({
  onNavigate,
  currentView,
  onLogout,
  cartItems,
  removeFromCart,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar dropdown si clic fuera o ESC
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setCartOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") {
        setCartOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [cartOpen]);

  const navItemClass = (view) =>
    `px-4 py-2 rounded ${
      currentView === view
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    }`;

  // Cantidad total de items
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <h1
          className="font-bold text-xl text-blue-700 cursor-pointer"
          onClick={() => onNavigate("catalog")}
        >
          🛍️ Mi Tienda
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("catalog")}
            className={navItemClass("catalog")}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate("orders")}
            className={navItemClass("orders")}
          >
            Mis pedidos
          </button>

          {/* Botón carrito */}
          <button
            ref={buttonRef}
            onClick={() => setCartOpen((v) => !v)}
            className="relative text-blue-600 hover:bg-blue-100 rounded px-3 py-2 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-haspopup="true"
            aria-expanded={cartOpen}
            aria-label="Mostrar carrito"
            type="button"
          >
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center pointer-events-none">
                {totalQuantity}
              </span>
            )}
          </button>

          <button
            onClick={onLogout}
            className="text-red-600 hover:underline text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Dropdown justo debajo del navbar */}
      {cartOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 bg-transparent  z-40 max-w-7xl mx-auto px-6 py-4"
          style={{ top: "100%" }}
          role="dialog"
          aria-modal="true"
        >
          <Cart
            items={cartItems}
            removeFromCart={removeFromCart}
            goToCheckout={() => {
              setCartOpen(false);
              onNavigate("checkout");
            }}
            goToOrders={() => {
              setCartOpen(false);
              onNavigate("orders");
            }}
            noBorder
          />
        </div>
      )}
    </nav>
  );
}
