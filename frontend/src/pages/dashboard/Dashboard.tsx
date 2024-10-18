import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExitIcon } from "@radix-ui/react-icons";

import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Welcome in dashboard</CardTitle>
        <CardDescription>Click the navigation on the side</CardDescription>
      </CardHeader>
      <CardContent>
        <Link to={"/"}>
          <Button className="w-fit m-5">
            <ExitIcon className="mr-2 rotate-180" /> Exit Dashboard
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
