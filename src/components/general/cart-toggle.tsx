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
import { formatPriceRange } from "@/lib/formatPriceRange";

const cart = [
  {
    _id: "1",
    name: "Product A",
    category: "Electronics",
    prices: [{ amount: 299.99, currency: "USD" }],
    quantity: 2,
  },
  {
    _id: "3",
    name: "Product C",
    category: "Home & Kitchen",
    prices: [{ amount: 49.99, currency: "USD" }],
    quantity: 1,
  },
  {
    _id: "4",
    name: "Product D",
    category: "Books",
    prices: [{ amount: 15.99, currency: "USD" }],
    quantity: 3,
  },
];

function CartToggle() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/15"
          >
            <ShoppingCart size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-400" align="end">
          <DropdownMenuLabel>My Cart</DropdownMenuLabel>
          {cart.map((cartItem) => (
            <>
              <DropdownMenuItem
                className=" hover:bg-white/10"
                key={cartItem._id}
              >
                <div className=" flex w-full justify-between">
                  <p>{cartItem.name}</p>
                  <p>{cartItem.category}</p>
                  <p>{cartItem.quantity}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default CartToggle;
