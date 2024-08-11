import React, { useState } from "react";
import SupermarketCard from "../components/general/supermarket-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

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

const CartPage: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const { loggedInUser } = useAuth();

  // Map the user's current cart items
  const cartItems: CartItem[] =
    loggedInUser?.currentCart.map((item: any) => ({
      productName: item.productName,
      quantity: item.quantity,
      productPrices: item.productPrices || [],
    })) || [];
  console.log(loggedInUser);

  const supermarkets: Supermarket[] = [
    {
      name: "Rami Levy",
      totalPrice: 0,
      nearestLocation: "123 Market St",
      onlineLink: "https://www.rami-levy.co.il/he/online/market",
    },
    {
      name: "Yohananof",
      totalPrice: 0,
      nearestLocation: "456 Savings Ave",
      onlineLink: "https://yochananof.co.il/",
    },
    {
      name: "Shufersal",
      totalPrice: 0,
      nearestLocation: "789 Discount Rd",
      onlineLink: "https://www.shufersal.co.il/online/he/S",
    },
  ];

  // Calculate total price for each supermarket
  supermarkets.forEach((supermarket) => {
    supermarket.totalPrice = cartItems.reduce((total, item) => {
      // Find the price for the specific supermarket
      const priceObject = item.productPrices.find(
        (price) => price.brandName === supermarket.name
      );
      const itemPrice = priceObject ? priceObject.price : 0;

      console.log(
        `Calculating for ${supermarket.name}:`,
        `Item: ${item.productName}, Quantity: ${item.quantity}, Price: ${itemPrice}`
      );

      return total + itemPrice * item.quantity;
    }, 0);
  });

  const getCheapestPrice = (itemName: string): number => {
    const prices = cartItems
      .filter((item) => item.productName === itemName)
      .flatMap((item) => item.productPrices.map((price) => price.price));
    return Math.min(...prices);
  };

  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold mb-6">My Cart</h1>
      <div className="w-full max-w-5xl">
        <ul className="mb-8">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between py-4 border-b border-gray-200"
            >
              <div>{item.productName}</div>
              <div>x {item.quantity}</div>
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
  );
};

export default CartPage;
