import React from "react";
import { Button } from "@/components/ui/button";

interface CartItem {
  productName: string;
  quantity: number;
  productPrices: Array<{
    brandName: string;
    price: number;
  }>;
}

interface Supermarket {
  name: string;
  totalPrice: number;
  nearestLocation: string;
  onlineLink: string;
}

interface SupermarketCardProps {
  supermarket: Supermarket;
  cartItems: CartItem[];
  getCheapestPrice: (itemName: string) => number;
}

const SupermarketCard: React.FC<SupermarketCardProps> = ({
  supermarket,
  cartItems,
  getCheapestPrice,
}) => {
  return (
    <div className=" p- rounded-lg shadow-lg text-center">
      <h3 className="text-2xl font-semibold  mb-4">{supermarket.name}</h3>
      <ul className="text-left mb-4">
        {cartItems.map((item, idx) => {
          const priceObject = item.productPrices.find(
            (price) => price.brandName === supermarket.name
          );
          const itemPrice = priceObject ? priceObject.price : 0;
          const isCheapest = itemPrice === getCheapestPrice(item.productName);

          return (
            <li
              key={idx}
              className={`py-2 ${
                isCheapest ? "text-green-600 font-bold" : "text-red-600"
              }`}
            >
              {item.productName}: ${itemPrice.toFixed(2)}
            </li>
          );
        })}
      </ul>
      <p className="text-lg font-bold ">
        Total: ${supermarket.totalPrice.toFixed(2)}
      </p>
      <p className=" mb-4">Nearest Location: {supermarket.nearestLocation}</p>
      <Button asChild>
        <a
          href={supermarket.onlineLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          Go Online
        </a>
      </Button>
    </div>
  );
};

export default SupermarketCard;
