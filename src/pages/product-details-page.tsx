import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPriceRange } from "@/lib/formatPriceRange";
import { productService } from "@/services/proucts.service";
import { IProduct } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();

  const { data, isLoading } = useQuery<IProduct>({
    queryKey: ["singleProduct"],
    queryFn: () => productService.fetchProductById(productId!),
  });

  if (data)
    return (
      <Dialog open={true}>
        <DialogContent aria-describedby={undefined}>
          <Card className=" min-h-full flex flex-col justify-between transition-all">
            <CardHeader className=" items-center gap-4">
              <div className="  rounded-sm bg-white w-full  ">
                <img
                  className=" mx-auto min-h-full p-2"
                  src={data.img}
                  alt={data.name}
                />
              </div>
              <CardTitle className=" text-base">{data.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className=" text-xs text-muted-foreground">
                Category: {data.category}
              </p>
              <p className=" text-xs">Price range: {formatPriceRange(data)}</p>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
}

export default ProductDetailsPage;
