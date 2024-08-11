import React, { useState } from "react";
import SupermarketCard from "../components/general/supermarket-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

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

const CartPage: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const { loggedInUser } = useAuth();
  console.log(loggedInUser.currentCart);
  const cartItems: CartItem[] = [
    { name: "Milk", quantity: 2 },
    { name: "Bread", quantity: 1 },
    { name: "Eggs", quantity: 12 },
  ];

  const supermarkets: Supermarket[] = [
    {
      name: "Rami Levi",
      prices: { Milk: 2.5, Bread: 1.5, Eggs: 3.2 },
      totalPrice: 7.2,
      nearestLocation: "123 Market St",
      onlineLink: "https://www.rami-levy.co.il/he/online/market",
    },
    {
      name: "Yohananof",
      prices: { Milk: 2.3, Bread: 1.6, Eggs: 3.4 },
      totalPrice: 7.3,
      nearestLocation: "456 Savings Ave",
      onlineLink: "https://yochananof.co.il/",
    },
    {
      name: "Shufersal",
      prices: { Milk: 2.7, Bread: 1.4, Eggs: 3.3 },
      totalPrice: 7.4,
      nearestLocation: "789 Discount Rd",
      onlineLink: "https://www.shufersal.co.il/online/he/S",
    },
  ];

  const getCheapestPrice = (itemName: string): number => {
    const prices = supermarkets.map(
      (supermarket) => supermarket.prices[itemName]
    );
    return Math.min(...prices);
  };

  return (
    <main className=" py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-6 ">My Cart</h1>

        <div className="w-full max-w-3xl">
          <ul className="mb-8">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between py-4 border-b border-gray-200"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <Button
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium"
            onClick={() => setShowComparison(true)}
          >
            Compare Prices
          </Button>

          {showComparison && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {supermarkets.map((supermarket, index) => (
                <SupermarketCard
                  key={index}
                  supermarket={supermarket}
                  cartItems={cartItems}
                  getCheapestPrice={getCheapestPrice}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CartPage;
