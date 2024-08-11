import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "react-router-dom";

import CartItem from "./cart-item";

function CartToggle() {
  // const { handleAddQuantity, handleSubtractQuantity, quantity } = useCartItem();
  const { loggedInUser } = useAuth();
  const cart = loggedInUser?.currentCart;

  return (
    <>
      {cart && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-foreground/15"
              >
                <div className=" relative">
                  {loggedInUser.currentCart.length > 0 && (
                    <div
                      className=" absolute text-xs -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex 
                    text-white items-center justify-center"
                    >
                      {loggedInUser.currentCart.length}
                    </div>
                  )}

                  <ShoppingCart size={18} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-full" align="end">
              <DropdownMenuLabel>My Cart</DropdownMenuLabel>
              {cart.map((cartItem) => (
                <CartItem key={cartItem.productId} cartItem={cartItem} />
              ))}
              <DropdownMenuSeparator />
              {loggedInUser.currentCart.length > 0 && (
                <DropdownMenuItem asChild>
                  <Link to="/compare" className="w-full">
                    <Button className="w-full text-center">
                      Compare Prices
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}

export default CartToggle;
