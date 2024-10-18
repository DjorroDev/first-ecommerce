import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { CartItem } from "@/types";
import { useAppDispatch } from "@/app/hooks";
import { addItem } from "@/features/cart/cartSlice";

import { useToast } from "@/hooks/use-toast";
import { useGetProductsQuery } from "@/services/productService";

const Shop = () => {
  const { data: products } = useGetProductsQuery();

  const { toast } = useToast();
  const urlImg = import.meta.env.VITE_IMG_URL;

  const dispatch = useAppDispatch();

  const handleAddToCart = (cart: CartItem) => {
    const item: CartItem = {
      title: cart.title,
      id: cart.id,
      price: cart.price,
      quantity: 1,
      store: cart.store,
      image: urlImg + cart.image,
    };
    dispatch(addItem(item));
  };

  // console.log(products);

  return (
    <>
      <div className="flex-wrap flex gap-5 mt-5 justify-center items-center">
        {products?.map((item, i) => (
          <Card className="h-max" key={i}>
            <CardHeader>
              <img
                src={`http://localhost:3000/uploads/${item.image}`}
                className="w-64 h-64 object-cover bg-slate-600"
              ></img>
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
