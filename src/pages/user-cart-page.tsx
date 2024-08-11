import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface CartItem {
  name: string;
  quantity: number;
}

interface UserCart {
  id: string;
  name: string;
  items: CartItem[];
}

const UserCartsPage: React.FC = () => {
  const [userCarts, setUserCarts] = useState<UserCart[]>([
    {
      id: "1",
      name: "Weekly Groceries",
      items: [
        { name: "Milk", quantity: 2 },
        { name: "Bread", quantity: 1 },
        { name: "Eggs", quantity: 12 },
      ],
    },
    {
      id: "2",
      name: "Party Supplies",
      items: [
        { name: "Chips", quantity: 5 },
        { name: "Soda", quantity: 6 },
        { name: "Plates", quantity: 20 },
      ],
    },
  ]);

  const handleCopy = (cartId: string) => {
    // Handle copy cart functionality
    console.log(`Copy cart with ID: ${cartId}`);
  };

  const handleLiveMode = (cartId: string) => {
    // Handle live mode functionality
    console.log(`Activate live mode for cart with ID: ${cartId}`);
  };

  return (
    <main className="bg-white text-gray-800 py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          My Saved Carts
        </h1>

        <Accordion type="single" collapsible className="w-full max-w-3xl">
          {userCarts.map((cart) => (
            <AccordionItem key={cart.id} value={cart.id}>
              <AccordionTrigger>{cart.name}</AccordionTrigger>
              <AccordionContent>
                <ul className="mb-4">
                  {cart.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-2">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end gap-4">
                  <Button
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => handleCopy(cart.id)}
                  >
                    Copy
                  </Button>
                  <Button
                    className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => handleLiveMode(cart.id)}
                  >
                    Live Mode
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default UserCartsPage;
