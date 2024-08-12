

export async function generateTodoCart(
  loggedInUser ) {
  return loggedInUser.currentCart.map((product) => ({
    isActive: true,
    productId: product.productId,
    productName: product.productName,
    quantity: product.quantity,
  }));
}
