import { IProduct } from "@/types/product.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPriceRange } from "@/lib/formatPriceRange";
import { useAuth } from "@/providers/auth-provider";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);

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
        <p className=" text-xs">Price range: {formatPriceRange(product)}</p>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
