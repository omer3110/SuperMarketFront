import api from "@/lib/api";

async function addProductToCurrentCart(productId: string, quantity: number) {
  try {
    const { data } = await api.post("/user/current-cart", {
      productId,
      quantity,
    });
    return data;
  } catch (error) {
    console.error("Error adding product to current cart:", error);
    throw error;
  }
}

async function updateProductQuantityInCurrentCart(
  productId: string,
  quantity: number
) {
  try {
    const { data } = await api.put("/user/current-cart", {
      productId,
      quantity,
    });
    return data;
  } catch (error) {
    console.error("Error updating product quantity in current cart:", error);
    throw error;
  }
}

async function deleteProductFromCurrentCart(productId: string) {
  try {
    const { data } = await api.delete("/user/current-cart", {
      data: { productId },
    });
    return data;
  } catch (error) {
    console.error("Error deleting product from current cart:", error);
    throw error;
  }
}

async function clearCurrentCart() {
  try {
    const { data } = await api.delete("/user/current-cart/clear");
    return data;
  } catch (error) {
    console.error("Error clearing current cart:", error);
    throw error;
  }
}

async function copyCartToCurrentCart(cartItems: CartItem[]) {
  try {
    // Clear the current cart first
    await clearCurrentCart();

    // Add each item from the selected cart to the current cart
    for (const item of cartItems) {
      await addProductToCurrentCart(item.productId, item.quantity);
    }
  } catch (error) {
    console.error("Error copying cart to current cart:", error);
    throw error;
  }
}

export const userService = {
  addProductToCurrentCart,
  updateProductQuantityInCurrentCart,
  deleteProductFromCurrentCart,
  clearCurrentCart,
  copyCartToCurrentCart, // Export the new function
};
