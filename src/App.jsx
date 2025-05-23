import { useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";
import Catalog from "./pages/Catalog";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [viewingOrders, setViewingOrders] = useState(false);
  const [view, setView] = useState("catalog");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setRole(null);
    setView("catalog");
    setCartItems([]);
  };
  // 👉 Obtener sesión y rol
  useEffect(() => {
    const getSessionAndRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching role:", error.message);
        } else {
          setRole(data.role);
        }
      }

      setLoading(false);
    };

    getSessionAndRole();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (session) {
          supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single()
            .then(({ data }) => setRole(data?.role));
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 👉 Funciones para el carrito
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 👉 Vistas
  if (loading) return <p className="p-8 text-center">Cargando...</p>;

  if (!session) return <Auth />;

  if (role === "admin") return <AdminPanel />;
if (role === "cliente") {
  return (
    <>
      <ToastContainer />
      <Navbar onNavigate={setView} currentView={view} onLogout={handleLogout} />

      {view === "catalog" && <Catalog addToCart={addToCart} />}

      {view === "cart" && (
        <Cart
          items={cartItems}
          removeFromCart={removeFromCart}
          goToCheckout={() => setView("checkout")}
          goToOrders={() => setView("orders")}
        />
      )}

      {view === "orders" && <Orders userId={session.user.id} />}

      {view === "checkout" && (
        <Checkout
          items={cartItems}
          userId={session.user.id}
          clearCart={() => setCartItems([])}
        />
      )}
    </>
  );
}




  return (
    <p className="p-8 text-center text-red-600">
      Acceso restringido. Tu rol no está definido.
    </p>
  );
}

export default App;
