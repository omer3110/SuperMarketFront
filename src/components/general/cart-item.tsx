import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { useCartItem } from "@/hooks/useCartItem";

interface CartItemProps {
  cartItem: { productId: string; productName: string; quantity: number };
}

function CartItem(props: CartItemProps) {
  const { cartItem } = props;
  const { handleAddQuantity, handleSubtractQuantity, quantity } = useCartItem(
    cartItem.productId
  );

  return (
    <>
      <DropdownMenuItem className="hover:bg-foreground/10">
        <div className="flex w-full ">
          <div>
            <p>{cartItem.productName}</p>
            <p>x{cartItem.quantity}</p>
          </div>
          <div className="flex gap-5 items-center">
            <Button
              className="w-11"
              variant="outline"
              onClick={(ev) => handleSubtractQuantity(ev, cartItem.productId)}
            >
              <Minus />
            </Button>

            <Input className="w-11 " disabled value={quantity} />
            <Button
              className="w-11"
              variant="outline"
              onClick={(ev) => handleAddQuantity(ev, cartItem.productId)}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
}

export default CartItem;
