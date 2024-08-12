import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartService } from "@/services/carts.servise";
import { useAuth } from "@/providers/auth-provider";
import CopyCartDialog from "@/components/general/copy-cart-alert-dialog";
import { userService } from "@/services/user-service";
import { generateTodoCart } from "@/utils/sockets";
import { socket, socketService } from "@/services/sockets";
import { useLiveCart } from "@/providers/live-cart-provider";

interface CartItem {
  productId: string;
  productPrices: { brandName: string; price: number }[];
  name: string;
  quantity: number;
}

interface UserCart {
  id: string;
  name: string;
  items: CartItem[];
}

const UserCartsPage: React.FC = () => {
  const { defineLiveCartStatus } = useLiveCart();
  const { loggedInUser } = useAuth();
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
              productId: item.productId, // Ensure this is fetched
              name: item.productName,
              quantity: item.quantity,
              productPrices: item.productPrices, // Ensure this is fetched
            })),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch user carts:", error);
      }
    }

    fetchCarts();
  }, []);

  const handleCopy = async (cartId: string) => {
    if (!loggedInUser) {
      console.error("User is not logged in");
      return;
    }
    const userHasCurrentCart = loggedInUser?.currentCart?.length > 0;
    const selectedCart = userCarts.find((cart) => cart.id === cartId);

    const onConfirm = async () => {
      try {
        if (userHasCurrentCart) {
          await userService.clearCurrentCart();
        }
        console.log("Selected cart:", selectedCart);

        if (selectedCart) {
          for (const item of selectedCart.items) {
            console.log("Copying item:", item);

            await userService.addProductToCurrentCart(
              item.productId, // This should be the actual product ID
              item.name, // This should be the product name
              item.quantity, // The quantity of the product
              item.productPrices // The array of product prices by brand
            );
          }
        }
        console.log(`Cart with ID: ${cartId} copied to the current cart.`);
      } catch (error) {
        console.error(`Failed to copy cart with ID: ${cartId}`, error);
      }
    };

    if (selectedCart) {
      onConfirm();
    } else {
      console.error("Selected cart not found");
    }
  };

  const handleLiveMode = async () => {
    if (!loggedInUser) {
      console.error("User is not logged in");
      return;
    }
    const todoCart = await generateTodoCart(loggedInUser);
    await socketService.createRoom(todoCart);
    socket.emit("create_room", loggedInUser._id);
    defineLiveCartStatus(true);
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
    <main className="py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-6">My Saved Carts</h1>

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
                  <CopyCartDialog
                    cartId={cart.id}
                    userHasCurrentCart={
                      (loggedInUser && loggedInUser?.currentCart?.length > 0) ||
                      false
                    }
                    onConfirm={() => handleCopy(cart.id)}
                  />
                  <Button onClick={() => handleLiveMode()}>Live Mode</Button>
                  <Button onClick={() => handleAddCollaboratorClick(cart.id)}>
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
                        onClick={() => handleCancelAddCollaborator(cart.id)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleSaveCollaborator(cart.id)}>
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
