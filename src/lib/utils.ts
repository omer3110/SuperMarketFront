import { IProduct } from "@/types/product.types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPriceRange(product: IProduct) {
  if (!product || !product.prices || product.prices.length === 0) {
    return '';
  }

  // Filter out prices that are "N/A"
  const validPrices = product.prices
    .map(price => price.price)
    .filter(price => typeof price === 'number');

  if (validPrices.length === 0) {
    return 'N/A';
  }

  const minPrice = Math.min(...validPrices);
  const maxPrice = Math.max(...validPrices);

  return `₪${minPrice.toFixed(2)}-₪${maxPrice.toFixed(2)}`;
}