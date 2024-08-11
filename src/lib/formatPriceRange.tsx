import { IProduct } from "@/types/product.types";

export function formatPriceRange(product: IProduct) {
  if (!product || !product.prices || product.prices.length === 0) {
    return "";
  }

  // Filter out prices that are "N/A"
  const validPrices = product.prices
    .map((price) => price.price)
    .filter((price) => typeof price === "number");

  if (validPrices.length === 0) {
    return "N/A";
  }

  const minPrice = Math.min(...validPrices);
  const maxPrice = Math.max(...validPrices);

  return (
    <>
      <span className=" text-green-500">₪{minPrice.toFixed(2)}</span> -{" "}
      <span className=" text-red-500">₪{maxPrice.toFixed(2)}</span>
      {product.category === "Fruits and Vegetables" ||
      product.category === "Meat and Fish" ? (
        <span className=" text-muted-foreground text-sm ml-2">(Per Kg)</span>
      ) : (
        ""
      )}
    </>
  );
}
