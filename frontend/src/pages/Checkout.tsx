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

import { Link } from "react-router-dom";
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

const Checkout = () => {
  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);

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
          <div>
            <h2 className="text-2xl text-center mb-3">
              Checkout while Registering Account or{" "}
              <Link to="" className="text-2xl text-center">
                Login
              </Link>
            </h2>

            <div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Max" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Robinson" required />
                </div>
              </div>
            </div>
          </div>
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
          <CardFooter>
            <Button className="w-full">
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
