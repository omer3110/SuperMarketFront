import { IProduct } from "@/types/product.types";
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
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import api from "@/lib/api";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [quantity, setQuantiy] = useState(1);
  const { toast } = useToast();
  const cart = loggedInUser?.currentCart;

  // function handleAddQuantity(
  //   ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   setQuantiyToAdd((prev) => prev + 1);
  // }

  // function handleSubtractQuantity(
  //   ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   setQuantiyToAdd((prev) => prev - 1);
  // }

  async function handleAddProduct(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    productName: string
  ) {
    ev.stopPropagation();
    ev.preventDefault();
    const prevCart = cart ? [...cart] : [];
    try {
      const productToAdd = { productId, productName, quantity: 1 };

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

  const isProductInCart = cart?.some(
    (cartProduct) => cartProduct.productId === product._id
  );

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
              // onClick={(ev) => handleAddQuantity(ev)}
            >
              <Plus />
            </Button>
            <Input className="w-11" disabled value={quantity} />
            <Button
              className="w-11"
              variant="outline"

              // onClick={(ev) => handleSubtractQuantity(ev)}
            >
              <Minus />
            </Button>
          </div>
        ) : (
          <Button
            onClick={(ev) => handleAddProduct(ev, product._id, product.name)}
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
