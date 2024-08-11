// import { Link, NavLink } from "react-router-dom";
// import { ModeToggle } from "./mode-toggle";
// import { AuthButton } from "./auth-button";
// import { UserButton } from "./user-button";
// import { useAuth } from "@/providers/auth-provider";
// import MainSideBar from "./main-sidebar";
// import { ReactNode } from "react";

// export function MainNav() {
//   const { loggedInUser } = useAuth();

//   function TopNavLink(props: { href: string; children: ReactNode }) {
//     const { href, children } = props;
//     return (
//       <NavLink
//         className={({ isActive }) =>
//           isActive ? "text-accent" : "hover:underline decoration-primary"
//         }
//         to={href}
//       >
//         {children}
//       </NavLink>
//     );
//   }

//   return (
//     <header className="sticky top-0 py-2 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b dark: border-b-primary">
//       <div className=" flex justify-between h-14 max-w-screen-2xl items-center px-6">
//         <div className="flex gap-4">
//           <Link
//             to="/"
//             className="uppercase mr-4 flex items-center space-x-2 lg:mr-6 text-lg"
//           >
//             Logo
//           </Link>
//           <nav className="hidden sm:flex items-center gap-4 text-sm lg:gap-6">
//             <TopNavLink href="/products">Products</TopNavLink>
//             <TopNavLink href="/about">About</TopNavLink>
//             <TopNavLink href="/contact">Contact</TopNavLink>
//             <TopNavLink href="/services">Services</TopNavLink>
//             <TopNavLink href="/protected">Protected</TopNavLink>
//           </nav>
//         </div>
//         <div className="flex items-center space-x-2 md:justify-end">
//           <div className=" hidden break-500px:block">
//             {loggedInUser ? <UserButton /> : <AuthButton />}
//           </div>
//           <ModeToggle />
//           <MainSideBar />
//         </div>
//       </div>
//     </header>
//   );
// }

import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { AuthButton } from "./auth-button";
import { UserButton } from "./user-button";
import { useAuth } from "@/providers/auth-provider";
import MainSideBar from "./main-sidebar";
import { ReactNode } from "react";
import CartToggle from "./cart-toggle";

export function MainNav() {
  const { loggedInUser } = useAuth();

  function TopNavLink(props: { href: string; children: ReactNode }) {
    const { href, children } = props;
    return (
      <NavLink
        className={({ isActive }) =>
          `relative overflow-hidden px-2 py-2 group ${
            isActive ? "text-accent" : "text-foreground hover:text-white"
          } transition-colors duration-500 ease-in-out`
        }
        to={href}
      >
        <span className="relative z-10 text-center w-full block">
          {children}
        </span>
        <span className="absolute left-0 bottom-0 w-full h-0 bg-primary transition-all duration-300 ease-in-out group-hover:h-full"></span>
      </NavLink>
    );
  }

  return (
    <header className="sticky top-0 py-2 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:border-b dark:border-b-primary">
      <div className="flex justify-between h-14 max-w-screen-2xl items-center px-6">
        <div className="flex items-center overflow-hidden">
          <Link
            to="/"
            className="uppercase mr-2 sm:mr-4 flex items-center space-x-2 lg:mr-6 text-lg"
          >
            Logo
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-xs sm:text-sm">
            <TopNavLink href="/products">Products</TopNavLink>
            <TopNavLink href="/about">About</TopNavLink>
            <TopNavLink href="/contact">Contact</TopNavLink>
            <TopNavLink href="/services">Services</TopNavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-2 md:justify-end">
          <CartToggle />
          <div className="hidden sm:block">
            {loggedInUser ? <UserButton /> : <AuthButton />}
          </div>

          <ModeToggle />
          <MainSideBar />
        </div>
      </div>
    </header>
  );
}
