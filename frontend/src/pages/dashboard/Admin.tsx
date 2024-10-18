import { useAppSelector } from "@/app/hooks";
import CreateUser from "@/components/admin/CreateUser";
import DeleteUser from "@/components/admin/DeleteUser";
import UpdateUser from "@/components/admin/UpdateUser";
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
import { useGetUsersQuery } from "@/services/userService";
import { User } from "@/types";

const Admin = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Admin</CardTitle>
        <CardDescription>Manage users</CardDescription>
        <CreateUser />
      </CardHeader>
      <CardContent>
        {users?.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden lg:table-cell">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden lg:table-cell">Username</TableHead>
                <TableHead className="hidden md:table-cell">Admin</TableHead>
                <TableHead className="hidden md:table-cell">Seller</TableHead>
                <TableHead className="hidden lg:table-cell">Address</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: User) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="hidden lg:table-cell">{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{user.username}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={"default"}
                        className={user.isAdmin ? "bg-green-600" : "bg-red-600"}
                      >
                        {user.isAdmin ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={user.isSeller ? "default" : "destructive"}
                        className={user.isSeller ? "bg-green-600" : "bg-red-600"}
                      >
                        {user.isSeller ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.address}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-col items-center flex-auto">
                        <UpdateUser id={user.id} />
                        <DeleteUser id={user.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="h-56">No users yet</div>
        )}
      </CardContent>
    </Card>
  );
};

export default Admin;
