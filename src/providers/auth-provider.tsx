import { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import api from "@/lib/api";
import { RegisterFormValues } from "@/pages/register-page";
import { LoginFormValues as LoginCredentials } from "@/pages/login-page";
import { socket } from "@/services/sockets";
import { useLiveCart } from "./live-cart-provider";
import { IBrandProduct } from "@/types/product.types";

export interface LoggedInUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  currentCart: {
    productId: string;
    productName: string;
    quantity: number;
    productPrices: IBrandProduct[];
  }[];
}

interface AuthContextType {
  loggedInUser: LoggedInUser | null | undefined;
  login: (user: LoginCredentials) => Promise<void>;
  register: (user: RegisterCredentials) => Promise<void>;
  logout: () => void;
  setLoggedInUser: React.Dispatch<
    React.SetStateAction<LoggedInUser | null | undefined>
  >;
}

type RegisterCredentials = Omit<RegisterFormValues, "confirmPassword">;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<
    LoggedInUser | null | undefined
  >(undefined);
  // const { liveCart } = useLiveCart();
  const [token, setToken] = useLocalStorage<string | null>("jwt-shopify", null);

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/loggedInUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        socket.emit("login", response.data._id);
        console.log("login");

        setLoggedInUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    // defineLiveCartStatus(false);
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(cred: LoginCredentials) {
    try {
      const response = await api.post("/auth/login", cred);
      console.log(response.data);

      setToken(response.data.token);
      // setLoggedInUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function register(cred: RegisterCredentials) {
    try {
      await api.post("/auth/register", cred);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ loggedInUser, login, register, logout, setLoggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
