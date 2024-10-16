import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { CartItem } from "@/features/cart/cartTypes";
import { useAppDispatch } from "@/app/hooks";
import { addItem } from "@/features/cart/cartSlice";

import { useToast } from "@/hooks/use-toast";

interface ProductProps {
  id: number;
  title: string;
  store: string;
  price: number;
  stock: number;
}

const Shop = () => {
  const products = [
    {
      id: 1,
      title: "Wireless Mouse",
      price: 29.99,
      store: "Tech Store",
      stock: 100,
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      price: 89.99,
      store: "Gaming Gear Shop",
      stock: 50,
    },
    {
      id: 3,
      title: "Noise-Cancelling Headphones",
      price: 199.99,
      store: "Audio World",
      stock: 30,
    },
    {
      id: 4,
      title: "4K Monitor",
      price: 399.99,
      store: "Electronics Hub",
      stock: 20,
    },
    {
      id: 5,
      title: "Portable Charger",
      price: 24.99,
      store: "Gadgets Unlimited",
      stock: 200,
    },
    {
      id: 6,
      title: "Smartphone",
      price: 999.99,
      store: "Mobile Planet",
      stock: 15,
    },
    {
      id: 7,
      title: "Laptop Stand",
      price: 49.99,
      store: "Office Supplies",
      stock: 120,
    },
    {
      id: 8,
      title: "Smartwatch",
      price: 149.99,
      store: "Wearable Tech",
      stock: 80,
    },
    {
      id: 9,
      title: "Tablet",
      price: 299.99,
      store: "Tech Warehouse",
      stock: 60,
    },
    {
      id: 10,
      title: "Bluetooth Speaker",
      price: 79.99,
      store: "Sound Haven",
      stock: 40,
    },
    {
      id: 11,
      title: "External Hard Drive",
      price: 109.99,
      store: "Storage Solutions",
      stock: 25,
    },
    {
      id: 12,
      title: "Fitness Tracker",
      price: 59.99,
      store: "Fit Gear",
      stock: 150,
    },
    {
      id: 13,
      title: "Gaming Chair",
      price: 259.99,
      store: "Pro Gaming Gear",
      stock: 10,
    },
    {
      id: 14,
      title: "LED Desk Lamp",
      price: 39.99,
      store: "Home Office Essentials",
      stock: 90,
    },
    {
      id: 15,
      title: "Webcam",
      price: 69.99,
      store: "Online Solutions",
      stock: 75,
    },
  ];

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const handleAddToCart = (cart: ProductProps) => {
    const item: CartItem = {
      title: cart.title,
      id: cart.id,
      price: cart.price,
      quantity: 1,
      store: cart.store,
    };
    dispatch(addItem(item));
  };

  // console.log(products);

  return (
    <>
      <div className="flex-wrap flex gap-5 mt-5 justify-center items-center">
        {products.map((item, i) => (
          <Card className="h-max" key={i}>
            <CardHeader>
              <div className="h-72 w-72 bg-slate-600"></div>
            </CardHeader>
            <CardContent className="text-left -mt-4">
              <p className="text-xl mb-1">{item.title}</p>
              <CardTitle>${item.price}</CardTitle>
              <CardDescription>[ ] {item.store}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  handleAddToCart(item);
                  toast({
                    title: `SUCCESS ADD ${item.title} TO CART`,
                  });
                }}
              >
                Add to Cart +
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Shop;
