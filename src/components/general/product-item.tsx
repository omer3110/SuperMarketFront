import { IProduct } from "@/types/product.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPriceRange } from "@/lib/formatPriceRange";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;
  return (
    <Card className=" min-h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" text-sm text-muted-foreground">
          Category: {product.category}
        </p>
        <p className=" text-sm">Price range: {formatPriceRange(product)}</p>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
