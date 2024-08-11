
import api from "@/lib/api";


async function fetchProducts(search:string) {
  console.log(1);
  
  
  
  try {
    const res = await api.get(`/products${search}` );
    console.log("res:", res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const productService = { fetchProducts };
