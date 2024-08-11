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
import React from "react";
import { useAuth } from "@/providers/auth-provider";

function CartToggle() {
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
                <ShoppingCart size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-400" align="end">
              <DropdownMenuLabel>My Cart</DropdownMenuLabel>
              {cart.map((cartItem) => (
                <React.Fragment key={cartItem.productId}>
                  <DropdownMenuItem className=" hover:bg-foreground/10">
                    <div className=" flex w-full justify-between">
                      <p>{cartItem.productName}</p>

                      <p>{cartItem.quantity}</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}

export default CartToggle;
