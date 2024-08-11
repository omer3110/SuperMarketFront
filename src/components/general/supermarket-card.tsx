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
  supermarketImage: string;
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
        <CardTitle className="text-2xl font-semibold mb-4 flex items-center justify-between gap-2">
          <div>{supermarket.name}</div>
          <img
            src={supermarket.supermarketImage}
            alt={`${supermarket.name} logo`}
            className="h-12 w-12 object-contain"
          />
        </CardTitle>
      </CardHeader>
      <CardContent
        className="max-h-64 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        <style>
          {`
            .max-h-64::-webkit-scrollbar {
              width: 6px;
            }
            .max-h-64::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .max-h-64::-webkit-scrollbar-thumb {
              background-color: #007bff;
              border-radius: 10px;
            }
            .max-h-64::-webkit-scrollbar-thumb:hover {
              background-color: #0056b3;
            }
          `}
        </style>
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
                    isCheapest ? "text-green-500 " : "text-red-500"
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
        <Button asChild>
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
