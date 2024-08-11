import { IProduct } from "@/types/product.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatPriceRange } from "@/lib/formatPriceRange";

import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

import { useCartItem } from "@/hooks/useCartItem";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;
  const {
    handleAddProduct,
    handleAddQuantity,
    handleSubtractQuantity,
    isProductInCart,
    quantity,
  } = useCartItem(product._id);

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

            <Input className="w-11 " disabled value={quantity} />
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
