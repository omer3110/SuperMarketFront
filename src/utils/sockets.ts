import { LoggedInUser } from "@/providers/auth-provider";
import { ActiveCartProductI } from "@/types/rooms.types";

export async function generateTodoCart(
  loggedInUser: LoggedInUser
): Promise<ActiveCartProductI[]> {
  return loggedInUser.currentCart.map((product) => ({
    isActive: true,
    productId: product.productId,
    productName: product.productName,
    quantity: product.quantity,
  }));
}
