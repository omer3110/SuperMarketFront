import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <Card className="w-full p-6 rounded-lg shadow-lg text-center">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4">
          {supermarket.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-64 overflow-y-auto">
        <ul className="text-left mb-4 space-y-2">
          {cartItems.map((item, idx) => {
            const priceObject = item.productPrices.find(
              (price) => price.brandName === supermarket.name
            );
            const itemPrice = priceObject ? priceObject.price : 0;
            const isCheapest = itemPrice === getCheapestPrice(item.productName);

            return (
              <React.Fragment key={idx}>
                <li
                  className={`py-2 ${
                    isCheapest ? "text-green-600 font-bold" : "text-red-600"
                  }`}
                >
                  {item.productName}: ₪{itemPrice.toFixed(2)}
                </li>
                {idx < cartItems.length - 1 && <Separator />}
              </React.Fragment>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-lg font-bold mb-4">
          Total: ₪{supermarket.totalPrice.toFixed(2)}
        </p>
        <p className="mb-4">Nearest Location: {supermarket.nearestLocation}</p>
        <Button
          asChild
          className="text-white bg-blue-600 hover:bg-blue-700-700 px-4 py-2 rounded-md"
        >
          <a
            href={supermarket.onlineLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go Online
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupermarketCard;
