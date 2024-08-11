import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartService } from "@/services/carts.servise"; // Import the cart service

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
  const [userCarts, setUserCarts] = useState<UserCart[]>([]);
  const [collaboratorInputVisible, setCollaboratorInputVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const [collaboratorUsername, setCollaboratorUsername] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    async function fetchCarts() {
      try {
        const carts = await cartService.fetchUserCarts();
        console.log(carts);

        setUserCarts(
          carts.map((cart: any) => ({
            id: cart._id,
            name: cart.name,
            items: cart.cartProducts.map((item: any) => ({
              name: item.productName,
              quantity: item.quantity,
            })),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch user carts:", error);
      }
    }

    fetchCarts();
  }, []);

  const handleCopy = (cartId: string) => {
    console.log(`Copy cart with ID: ${cartId}`);
  };

  const handleLiveMode = (cartId: string) => {
    console.log(`Activate live mode for cart with ID: ${cartId}`);
  };

  const handleAddCollaboratorClick = (cartId: string) => {
    setCollaboratorInputVisible({
      ...collaboratorInputVisible,
      [cartId]: true,
    });
  };

  const handleCancelAddCollaborator = (cartId: string) => {
    setCollaboratorInputVisible({
      ...collaboratorInputVisible,
      [cartId]: false,
    });
    setCollaboratorUsername({ ...collaboratorUsername, [cartId]: "" });
  };

  const handleSaveCollaborator = async (cartId: string) => {
    try {
      const username = collaboratorUsername[cartId];
      if (username) {
        await cartService.addCollaborator(cartId, {
          collaboratorUsername: username,
        });
        setCollaboratorInputVisible({
          ...collaboratorInputVisible,
          [cartId]: false,
        });
        setCollaboratorUsername({ ...collaboratorUsername, [cartId]: "" });
        console.log(`Collaborator ${username} added to cart ID: ${cartId}`);
      }
    } catch (error) {
      console.error(`Failed to add collaborator to cart ID: ${cartId}`, error);
    }
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
                  <Button
                    className="text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => handleAddCollaboratorClick(cart.id)}
                  >
                    Add Collaborator
                  </Button>
                </div>
                {collaboratorInputVisible[cart.id] && (
                  <div className="m-4">
                    <Input
                      type="text"
                      placeholder="Enter collaborator username"
                      value={collaboratorUsername[cart.id] || ""}
                      onChange={(e) =>
                        setCollaboratorUsername({
                          ...collaboratorUsername,
                          [cart.id]: e.target.value,
                        })
                      }
                      className="mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        onClick={() => handleCancelAddCollaborator(cart.id)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        onClick={() => handleSaveCollaborator(cart.id)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default UserCartsPage;
