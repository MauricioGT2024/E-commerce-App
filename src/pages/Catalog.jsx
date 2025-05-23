// src/pages/Catalog.jsx
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Catalog({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener los productos de Supabase cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} añadido al carrito!`);
  };

  if (loading) {
    return <p className="text-center p-8">Cargando productos...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Catálogo de Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">${product.price}</span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
