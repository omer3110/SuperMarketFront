import { LoggedInUser } from "@/providers/auth-provider";

export function generateTodoCart(loggedInUser: LoggedInUser) {
  return loggedInUser.currentCart.map((product) => ({
    isActive: true,
    productId: product.productId,
    productName: product.productName,
    quantity: product.quantity,
  }));
}
