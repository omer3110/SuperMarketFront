import { createContext, useContext, useState } from "react";

interface LiveCartContextI {
  hasLiveCart: boolean;
  changeLiveCartStatus: () => void;
  defineLiveCartStatus: (newValue: boolean) => void;
}

const LiveCartContext = createContext<LiveCartContextI | undefined>(undefined);

export function LiveCartProvider({ children }: { children: React.ReactNode }) {
  const [hasLiveCart, setHasLiveCart] = useState<boolean>(false);

  function changeLiveCartStatus() {
    setHasLiveCart(!hasLiveCart);
  }
  function defineLiveCartStatus(newValue: boolean) {
    setHasLiveCart(newValue);
  }

  return (
    <LiveCartContext.Provider
      value={{ hasLiveCart, changeLiveCartStatus, defineLiveCartStatus }}
    >
      {children}
    </LiveCartContext.Provider>
  );
}
export function useLiveCart() {
  const context = useContext(LiveCartContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
