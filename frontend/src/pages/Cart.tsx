import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeItem, updateQuantity, clearCart } from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const products = [
    {
      id: 1,
      title: "Wireless Mouse",
      price: 29.99,
      store: "Tech Store",
    },
    {
      id: 1,
      title: "Mechanical Keyboard",
      price: 89.99,
      store: "Gaming Gear Shop",
    },
    {
      id: 1,
      title: "Noise-Cancelling Headphones",
      price: 199.99,
      store: "Audio World",
    },
    {
      id: 1,
      title: "4K Monitor",
      price: 399.99,
      store: "Electronics Hub",
    },
    {
      id: 1,
      title: "Portable Charger",
      price: 24.99,
      store: "Gadgets Unlimited",
    },
    {
      id: 1,
      title: "Smartphone",
      price: 999.99,
      store: "Mobile Planet",
    },
    {
      id: 1,
      title: "Laptop Stand",
      price: 49.99,
      store: "Office Supplies",
    },
    {
      id: 1,
      title: "Smartwatch",
      price: 149.99,
      store: "Wearable Tech",
    },
    {
      id: 1,
      title: "Tablet",
      price: 299.99,
      store: "Tech Warehouse",
    },
    {
      id: 1,
      title: "Bluetooth Speaker",
      price: 79.99,
      store: "Sound Haven",
    },
    {
      id: 1,
      title: "External Hard Drive",
      price: 109.99,
      store: "Storage Solutions",
    },
    {
      id: 1,
      title: "Fitness Tracker",
      price: 59.99,
      store: "Fit Gear",
    },
    {
      id: 1,
      title: "Gaming Chair",
      price: 259.99,
      store: "Pro Gaming Gear",
    },
    {
      id: 1,
      title: "LED Desk Lamp",
      price: 39.99,
      store: "Home Office Essentials",
    },
    {
      id: 1,
      title: "Webcam",
      price: 69.99,
      store: "Online Solutions",
    },
  ];

  const { toast } = useToast();

  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // const sortItems = items.reverse();

  const handleRemoveItem = (id: number) => {
    toast({
      title: "Success delete from the cart",
    });
    dispatch(removeItem({ id }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // handle quantity in input manual
  // You can't put zero because it will error and resulting updating manual the value kinda stiffle
  // TODO: Update this
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (newQuantity > 0) {
      handleUpdateQuantity(id, newQuantity);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-start items-center gap-2 md:justify-between">
        <div className="flex flex-col gap-2 md:px-24 min-w-px">
          {[...items].reverse().map((item, i) => (
            <Card className="h-max flex md:gap-4" key={i}>
              <CardHeader className="p-3">
                <div className="h-36 w-36 md:h-48 md:w-48 bg-slate-600"></div>
              </CardHeader>
              <CardHeader className="text-left p-3">
                <p className="text-xl mb-1">{item.title}</p>
                <CardTitle>${item.price}</CardTitle>
                <CardDescription>[ ] {item.store}</CardDescription>
                <div className="flex items-center">
                  {item.quantity == 1 ? (
                    <Button
                      variant={"destructive"}
                      className="p-1"
                      onClick={() => handleRemoveItem(item.id)}
                      size={"sm"}
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      className="p-1"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      size={"sm"}
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                  )}
                  <input
                    className="mx-2 p-1 text-center bg-white w-7 border rounded overflow-auto"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                    min={1}
                  />
                  <Button
                    className="p-1"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    size={"sm"}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Card className="py-5 md:sticky top-20 w-64 text-center">
          <CardHeader>
            <p>Total</p>
            <p>{totalQuantity}</p>
          </CardHeader>
          <CardContent>
            <p>Price</p>
            <p>{totalPrice}</p>
          </CardContent>
          <Link to="/checkout">
            <Button>Checkout</Button>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Cart;
