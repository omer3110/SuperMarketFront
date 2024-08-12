import { useAuth } from "@/providers/auth-provider";
import { useLiveCart } from "@/providers/live-cart-provider";
import { socket } from "@/services/sockets";
import { useEffect, useState } from "react";

function LiveCartPage() {
  const { loggedInUser } = useAuth();
  const [liveCart, setLiveCart] = useState(null);
  const { hasLiveCart, defineLiveCartStatus } = useLiveCart();

  useEffect(() => {
    // Handle the "New user joined" event
    const handleNewUserJoined = (userRoom: any) => {
      console.log("New user joined event received:", userRoom);
      setLiveCart(userRoom);
      defineLiveCartStatus(true);
    };

    // Set up the event listener
    socket.on("New user joined", handleNewUserJoined);

    // Clean up the listener on component unmount
    return () => {
      socket.off("New user joined", handleNewUserJoined);
    };
  }, [defineLiveCartStatus]);

  return (
    <div>
      LiveCartPage
      <button
        onClick={() => {
          console.log(liveCart);
        }}
      >
        O
      </button>
    </div>
  );
}

export default LiveCartPage;
