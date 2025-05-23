import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { supabase } from "../services/supabaseClient";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      alert("Error cargando productos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, form);
      } else {
        await addProduct(form);
      }
      setForm({ name: "", description: "", price: "", image_url: "" });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert("Error al guardar");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar este producto?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  // Agregar dentro del componente
 const handleLogout = async () => {
   await supabase.auth.signOut();
   setSession(null);
   setRole(null);
   setView("catalog");
   setCartItems([]);
 };


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="URL de imagen"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {editingProduct ? "Actualizar" : "Agregar"} producto
        </button>
      </form>

      {/* LISTADO DE PRODUCTOS */}
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-blue-600">${product.price}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}

        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </ul>
    </div>
  );
}
