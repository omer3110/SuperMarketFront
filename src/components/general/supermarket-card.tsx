import React from "react";
import { Button } from "@/components/ui/button";

interface CartItem {
  name: string;
  quantity: number;
}

interface Supermarket {
  name: string;
  prices: Record<string, number>;
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
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        {supermarket.name}
      </h3>
      <ul className="text-left mb-4">
        {cartItems.map((item, idx) => (
          <li
            key={idx}
            className={`py-2 ${
              supermarket.prices[item.name] === getCheapestPrice(item.name)
                ? "text-green-600 font-bold"
                : "text-red-600"
            }`}
          >
            {item.name}: ${supermarket.prices[item.name].toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="text-lg font-bold text-gray-800">
        Total: ${supermarket.totalPrice.toFixed(2)}
      </p>
      <p className="text-gray-600 mb-4">
        Nearest Location: {supermarket.nearestLocation}
      </p>
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
