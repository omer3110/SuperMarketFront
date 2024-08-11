import { IProduct } from "@/types/product.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPriceRange } from "@/lib/formatPriceRange";

interface ProductItemProps {
  product: IProduct;
}

function ProductItem(props: ProductItemProps) {
  const { product } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" text-sm text-muted-foreground">{product.category}</p>
        <p className=" text-sm">{formatPriceRange(product)}</p>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
