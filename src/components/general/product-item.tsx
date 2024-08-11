import { IBrandProduct, IProduct } from "@/types/product.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatPriceRange } from "@/lib/formatPriceRange";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { toast } = useToast();
  const cart = loggedInUser?.currentCart;

  const cartItem = cart?.find(
    (cartProduct) => cartProduct.productId === product._id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  async function handleAddQuantity(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) {
    ev.preventDefault();
    ev.stopPropagation();
    const prevCart = cart ? [...cart] : [];
    try {
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedCart = prevUser.currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...prevUser, currentCart: updatedCart };
      });
      await api.patch(`/user/current-cart/increment/${productId}`);
    } catch (error) {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: prevCart };
      });
      toast({
        title: "Oops",
        description: "Something went wrong while trying to update the item ",
        variant: "destructive",
      });
    }
  }

  async function handleSubtractQuantity(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) {
    ev.preventDefault();
    ev.stopPropagation();
    const prevCart = cart ? [...cart] : [];
    const isItemDeleted = quantity - 1 === 0;
    try {
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        let updatedCart;
        if (isItemDeleted) {
          updatedCart = prevUser.currentCart.filter(
            (item) => item.productId !== productId
          );
        } else {
          updatedCart = prevUser.currentCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
        return { ...prevUser, currentCart: updatedCart };
      });
      if (isItemDeleted) {
        await api.delete(`/user/current-cart/${productId}`);
      } else {
        await api.patch(`/user/current-cart/decrement/${productId}`);
      }
    } catch (error) {
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        return { ...prev, currentCart: prevCart };
      });
      toast({
        title: "Oops",
        description:
          "Something went wrong while trying to update the product count",
        variant: "destructive",
      });
    }
  }

  async function handleAddProduct(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    productName: string,
    productPrices: IBrandProduct[]
  ) {
    ev.stopPropagation();
    ev.preventDefault();
    const prevCart = cart ? [...cart] : [];
    try {
      const productToAdd = {
        productId,
        productName,
        quantity: 1,
        productPrices,
      };

      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedCart = [...prevUser.currentCart, productToAdd];
        return { ...prevUser, currentCart: updatedCart };
      });
      await api.post("/user/current-cart", productToAdd);
    } catch (error) {
      setLoggedInUser((prevUser) => {
        if (!prevUser) return prevUser;
        return { ...prevUser, currentCart: prevCart };
      });
      toast({
        title: "Oops",
        description:
          "Something went wrong while trying to add an Item to the cart",
        variant: "destructive",
      });
    }
  }

  const isProductInCart = quantity > 0;

  return (
    <Card className=" min-h-full flex flex-col justify-between hover:bg-foreground/10 transition-all">
      <CardHeader className=" items-center gap-4">
        <div className="  rounded-sm bg-white w-full  ">
          <img
            className=" mx-auto min-h-full p-2"
            src={product.img}
            alt={product.name}
          />
        </div>
        <CardTitle className=" text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" text-xs text-muted-foreground">
          Category: {product.category}
        </p>
        <p className=" text-xs">Range: {formatPriceRange(product)}</p>
      </CardContent>
      <CardFooter className=" flex-col gap-4">
        {isProductInCart ? (
          <div className="flex gap-5 items-center">
            <Button
              className="w-11"
              variant="outline"
              onClick={(ev) => handleSubtractQuantity(ev, product._id)}
            >
              <Minus />
            </Button>

            <Input className="w-11" disabled value={quantity} />
            <Button
              className="w-11"
              variant="outline"
              onClick={(ev) => handleAddQuantity(ev, product._id)}
            >
              <Plus />
            </Button>
          </div>
        ) : (
          <Button
            onClick={(ev) =>
              handleAddProduct(ev, product._id, product.name, product.prices)
            }
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
