import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/providers/auth-provider";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import {
  AlignJustify,
  ClipboardList,
  Home,
  ShoppingCart,
  SquarePen,
  Store,
  User,
} from "lucide-react";
import { UserButton } from "./user-button";
import { AuthButton } from "./auth-button";
import { useLiveCart } from "@/providers/live-cart-provider";

export function MainSideBar() {
  const { hasLiveCart } = useLiveCart();
  const { loggedInUser } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className=" sm:hidden" variant="naked">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className=" min-w-48 w-1/2 md:w-96">
        <SheetHeader>
          <div className=" flex flex-col gap-2 items-center ">
            <div className=" border rounded-full border-primary">
              {loggedInUser ? <UserButton /> : <AuthButton />}
            </div>

            <SheetTitle>
              Hello{" "}
              <span className=" underline decoration-primary">
                {loggedInUser ? loggedInUser.username : "Guest"}
              </span>{" "}
              !
            </SheetTitle>
          </div>
          <SheetDescription>
            Fill the SheetDescription with appropriate text
          </SheetDescription>
        </SheetHeader>
        <div className=" flex flex-col mt-8">
          <Link
            to="/"
            className=" flex gap-4 py-4 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
          >
            <Home />
            <span>Home Page</span>
          </Link>
          <Separator />
          <Link
            to="/products"
            className=" flex items-center gap-4 py-4 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
          >
            <Store size={20} strokeWidth={1} />
            <span>Products</span>
          </Link>
          <Separator />
          <Link
            to="/cart"
            className=" items-center flex gap-4 py-4 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart size={20} strokeWidth={1} />
            <span>Cart</span>
          </Link>
          {hasLiveCart && (
            <Link to="liveCart">
              <div className=" items-center flex gap-3 py-4 hover:bg-primary/10 text-muted-foreground hover:text-foreground">
                <div className=" relative hidden xs:block w-fit">
                  <ClipboardList strokeWidth={1} />
                  <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 animate-pulse rounded-full"></div>
                </div>
                <p>Live Cart</p>
              </div>
            </Link>
          )}
          {loggedInUser ? (
            ""
          ) : (
            <>
              <Separator />
              <Link
                to="/auth/login"
                className=" flex gap-4 py-4 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
              >
                <User />
                <span>{loggedInUser ? "Profile" : "Login"}</span>
              </Link>

              <Separator />

              <Separator />
              <Link
                to="/auth/register"
                className=" items-center flex gap-4 py-4 hover:bg-primary/10 text-muted-foreground hover:text-foreground"
              >
                <SquarePen size={20} strokeWidth={1} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default MainSideBar;
