import { supabase } from "./supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return data;
};

export const addProduct = async (product) => {
  const { data, error } = await supabase.from("products").insert([product]);
  if (error) throw error;
  return data;
};

export const updateProduct = async (id, product) => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id) => {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  return data;
};
