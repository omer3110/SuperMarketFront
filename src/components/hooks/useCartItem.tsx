import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";

interface UseCartItemProps {
  productId: string;
  productName: string;
  initialQuantity: number;
}

export function useCartItem({
  productId,
  productName,
  initialQuantity,
}: UseCartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { toast } = useToast();

  const isInCart = quantity > 0;

  const updateCart = async (newQuantity: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const prevCart = loggedInUser?.currentCart
      ? [...loggedInUser.currentCart]
      : [];
    try {
      setQuantity(newQuantity);
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        let updatedCart;
        if (newQuantity === 0) {
          updatedCart = prevUser.currentCart.filter(
            (item) => item.productId !== productId
          );
        } else {
          updatedCart = prevUser.currentCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          if (!updatedCart.some((item) => item.productId === productId)) {
            updatedCart.push({ productId, productName, quantity: newQuantity });
          }
        }
        return { ...prevUser, currentCart: updatedCart };
      });

      if (newQuantity === 0) {
        await api.delete(`/user/current-cart/${productId}`);
      } else if (isInCart) {
        if (newQuantity > quantity) {
          await api.patch(`/user/current-cart/increment/${productId}`);
        } else {
          await api.patch(`/user/current-cart/decrement/${productId}`);
        }
      } else {
        await api.post("/user/current-cart", {
          productId,
          productName,
          quantity: newQuantity,
        });
      }
    } catch (error) {
      setQuantity(initialQuantity);
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: prevCart };
      });
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive",
      });
    }
  };

  const increment = (event: React.MouseEvent) =>
    updateCart(quantity + 1, event);
  const decrement = (event: React.MouseEvent) => {
    if (quantity > 1) {
      updateCart(quantity - 1, event);
    } else {
      // Show confirmation dialog
      if (window.confirm("Remove item from cart?")) {
        updateCart(0, event);
      }
    }
  };
  const addToCart = (event: React.MouseEvent) => updateCart(1, event);

  return { quantity, isInCart, increment, decrement, addToCart };
}
