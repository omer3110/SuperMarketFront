
import api from "@/lib/api";


async function fetchProducts(search:string) {
  try {
    const res = await api.get(`/products${search}` );
    console.log("res:", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}

async function fetchProductById(productId:string) {
  try {
    const {data} = await api.get(`/products/${productId}`)
    return data
  } catch (error) {
    console.log(error);
    throw error
    
  }
} 

export const productService = { fetchProducts, fetchProductById };
