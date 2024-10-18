import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full bg-white">
          <CircleUser className="" />
          {/* <p>A</p> */}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated && <DropdownMenuLabel>Hi, {user?.name}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        {isAuthenticated ? (
          <>
            {" "}
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link to={"/logout"}>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </Link>
          </>
        ) : (
          <Link to={"/login"}>
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
