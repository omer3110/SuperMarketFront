import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();

  return <div>ProductDetailsPage {productId}</div>;
}

export default ProductDetailsPage;
