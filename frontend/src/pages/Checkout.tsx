import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckIcon,
  BellIcon,
  CreditCard,
  ChevronRight,
  CircleDollarSignIcon,
  DollarSign,
  PiggyBank,
  Leaf,
} from "lucide-react";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCreateOrderMutation } from "@/services/orderService";
import { useRegisterMutation } from "@/services/authService";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetUsersQuery } from "@/services/userService";

const Checkout = () => {
  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);
  const { token, user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const [create] = useCreateOrderMutation();
  const paymentMethods = [
    {
      id: "magic-card",
      name: "Magic Card",
      icon: <CreditCard className="mr-2" />,
    },
    {
      id: "bern-saving",
      name: "Bern's Saving",
      icon: <PiggyBank className="mr-2" />,
    },
    {
      id: "leaf",
      name: "Leaf",
      icon: <Leaf className="mr-2" />,
    },
  ];
  const [pay, setPay] = useState({
    id: "",
    name: "",
    icon: <></>,
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    address: "",
    isAdmin: false,
    isSeller: false,
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  const { data: users } = useGetUsersQuery();

  const lastUserId = users && users.length > 0 ? users[users.length - 1].id : null;
  const displayUserId = lastUserId ?? 0;

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

  const handleRegister = async () => {
    try {
      await register(registerForm).unwrap;
    } catch (err) {
      console.error(err);
      console.error(error);
    }
  };

  const handleOrder = async () => {
    try {
      await create({ buyerId: user?.id || displayUserId + 1, payment: pay.name, cartItems: items });
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async () => {
    console.log("p");
    if (!token) {
      await handleRegister();
    }
    await handleOrder();
  };

  return (
    <>
      <h1>Checkout Session</h1>
      <div className="flex justify-between md:flex-row flex-col gap-10">
        <div className="flex-1">
          <Table className="-z-10 mb-5">
            {/* <TableCaption>Detail Order</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2} className="w-[100px]">
                  item
                </TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell colSpan={2} className="font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell>{totalQuantity}</TableCell>
                <TableCell className="text-right">${totalPrice}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {!token && (
            <div>
              <h2 className="text-2xl text-center mb-3">
                Checkout while Registering Account or
                <Link to="/login" className="text-2xl text-center ml-2">
                  Login here
                </Link>
              </h2>
              <div>
                <form className="grid gap-4">
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
                        // value={registerForm.isSeller}
                        checked={registerForm.isSeller}
                        // onChange={handleCheckboxChange}
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
                </form>
              </div>
            </div>
          )}
        </div>

        <Card className="md:w-96 h-fit">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Please check the details again before paying</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Dialog>
              <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:cursor-pointer">
                  {pay.id !== "" ? pay.icon : <DollarSign />}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {pay.id == "" ? "Choose Payment method" : pay.name}{" "}
                    </p>
                    {pay.id !== "" && (
                      <p className="text-sm text-muted-foreground">Click to change</p>
                    )}
                  </div>
                  <ChevronRight />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                  <DialogTitle>Choose Payment</DialogTitle>
                </DialogHeader>
                <div className="grid items-center gap-4 py-8">
                  {/* <div className="flex items-center space-x-4 rounded-md border p-4 hover:cursor-pointer"></div> */}
                  {paymentMethods.map((payment, index) => (
                    <DialogClose asChild key={index}>
                      <Button
                        onClick={() => {
                          setPay(payment);
                        }}
                        className="py-5"
                      >
                        {payment.icon}
                        {payment.name}
                      </Button>
                    </DialogClose>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            {/* <div>Credit card</div> */}
          </CardContent>
          <CardFooter className="flex-col">
            {pay.id === "" && <p className="text-sm text-muted-foreground">click choose payment</p>}
            <Button
              onClick={() => handlePayment()}
              disabled={pay.id === "" ? true : false}
              className="w-full"
            >
              Pay
              <DollarSign className="ml-2 h-4 w-4" />
              {totalPrice}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Checkout;
