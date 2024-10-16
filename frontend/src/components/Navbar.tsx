import { Button } from "@/components/ui/button";

import { Link, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, ShoppingCart, Menu, Package2 } from "lucide-react";

import { useAppSelector } from "@/app/hooks";

const Navbar = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center">
        <header className="z-10 sticky top-0 flex w-full h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <Link
              to={"/"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to={"/dashboard/"}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Products
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Customers
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Analytics
            </a>
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
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </a>
                <a href="#" className="hover:text-foreground">
                  Dashboard
                </a>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="default" className="rounded-full bg-white">
                  <CircleUser className="" />
                  {/* <p>A</p> */}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/login"}>
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="gap-4 p-4 md:gap-8 md:p-8 w-full max-w-[1280px]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Navbar;
