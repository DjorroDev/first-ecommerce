import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Edit, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/services/productService";
import { useAppSelector } from "@/app/hooks";
import { Textarea } from "../ui/textarea";
import { ProductProps } from "./UserProps";
import {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/userService";
import { Checkbox } from "../ui/checkbox";

const UpdateProduct: React.FC<ProductProps> = ({ id }) => {
  const { data: user } = useGetUserByIdQuery(id);
  const [update, { error }] = useUpdateUserMutation();
  const [open, setOpen] = useState<boolean>(false);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    address: "",
    isAdmin: false,
    isSeller: false,
  });

  // trigger on render once to autofill
  useEffect(() => {
    if (user) {
      setRegisterForm({
        name: user.name,
        email: user.email,
        username: user.username,
        password: "",
        address: user.address,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update({ id: id, body: registerForm }).unwrap;

      setOpen(false);
      setRegisterForm({
        name: "",
        email: "",
        username: "",
        password: "",
        address: "",
        isAdmin: false,
        isSeller: false,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit" asChild>
        <Button size="sm" className="h-10 w-fit gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sm:whitespace-nowrap">Edit User</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Update password is a must</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={registerForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="johnDoe / JohnStore"
              value={registerForm.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={registerForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Roles">Roles</Label>
            <div className="flex gap-2">
              <Checkbox
                id="isSeller"
                name="isSeller"
                checked={registerForm.isSeller}
                onCheckedChange={(checked) =>
                  handleCheckboxChange({
                    target: {
                      name: "isSeller",
                      checked,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <Label htmlFor="isSeller">Seller</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="isAdmin"
                name="isAdmin"
                checked={registerForm.isAdmin}
                onCheckedChange={(checked) =>
                  handleCheckboxChange({
                    target: {
                      name: "isAdmin",
                      checked,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <Label htmlFor="isAdmin">Admin</Label>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={registerForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Your address"
              value={registerForm.address}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">error</p>}

          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
