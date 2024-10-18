import { Button } from "@/components/ui/button";

import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, Package2, FishSymbol } from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return (
    <header className="z-10 sticky top-0 flex w-full h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <FishSymbol className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          to={"/"}
          className={
            location.pathname == "/"
              ? "hover:text-muted-foreground"
              : "transition-colors text-foreground hover:text-muted-foreground"
          }
        >
          Home
        </Link>

        <Link
          to="/products"
          className={
            location.pathname == "/products"
              ? "hover:text-muted-foreground"
              : "transition-colors hover:text-blue text-foreground"
          }
        >
          Products
        </Link>
        {!!(user?.isAdmin || user?.isSeller) && (
          <Link
            to={"/dashboard/"}
            className={
              location.pathname !== "/dashboard"
                ? "text-foreground"
                : "transition-colors hover:text-foreground"
            }
          >
            Dashboard
          </Link>
        )}
        {user && (
          <Link
            to="/transactions"
            className={
              location.pathname == "/transactions"
                ? "hover:text-muted-foreground"
                : "transition-colors hover:text-blue text-foreground"
            }
          >
            Transaction
          </Link>
        )}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold">
              <FishSymbol className="h-6 w-6" />
              <span className="sr-only">Djorro Inc</span>
            </a>
            {(user?.isAdmin || user?.isSeller) && (
              <Link
                to={"/dashboard/"}
                className="text-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            )}
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Orders
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Products
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Customers
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Analytics
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <Link className="flex gap-2" to={"/cart"}>
          <ShoppingCart />
          <p className="font-semibold">{totalQuantity}</p>
        </Link>

        <ProfileMenu />
      </div>
    </header>
  );
};

export default Navbar;
