import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartService } from "@/services/carts.service";

interface CartItem {
  productId: any;
  productName: string;
  quantity: number;
  productPrices: Array<{
    brandName: string;
    price: number;
  }>;
}

interface SaveCartDialogProps {
  cartItems: CartItem[];
  triggerComparison: () => void;
}

const SaveCartDialog: React.FC<SaveCartDialogProps> = ({
  cartItems,
  triggerComparison,
}) => {
  const [cartName, setCartName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveCart = async () => {
    setIsSaving(true);
    try {
      // Map the cartItems to the structure expected by your backend
      const cartProducts = cartItems.map((item) => ({
        productId: item.productId, // Ensure this is correctly set
        productName: item.productName,
        quantity: item.quantity,
        productPrices: item.productPrices.map((price) => ({
          brandName: price.brandName,
          price: price.price,
        })),
      }));
      console.log("Cart Items:", cartItems);
      // Call the cartService to save the cart with the mapped products
      await cartService.createCart({ name: cartName, cartProducts });

      // Reset the cart name and close the dialog
      setCartName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save the cart:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const openDialog = () => {
    triggerComparison();
    setIsDialogOpen(true);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={openDialog}>Compare Prices</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Cart</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to save this cart for future use?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder="Enter cart name"
          value={cartName}
          onChange={(e) => setCartName(e.target.value)}
          className="mb-4"
        />
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleSaveCart}
              className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
              disabled={!cartName || isSaving}
            >
              Save Cart
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SaveCartDialog;
