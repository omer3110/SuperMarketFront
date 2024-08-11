import { Dialog, DialogContent } from "@/components/ui/dialog";
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

  return (
    <Dialog open={true}>
      <DialogContent aria-describedby={undefined}></DialogContent>
    </Dialog>
  );
}

export default ProductDetailsPage;
