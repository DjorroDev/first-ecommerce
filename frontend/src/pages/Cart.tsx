import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeItem, updateQuantity, clearCart } from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
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
      <div className="grid md:grid-cols-3 md:grid-rows-1 gap-5 md:gap-2 items-center md:items-start justify-center">
        <div className="flex flex-col col-span-1 md:col-span-2 gap-2 min-w-px">
          {[...items].reverse().map((item, i) => (
            <Card className="h-max flex md:gap-4" key={i}>
              <CardHeader className="p-3">
                <img src={item.image} className="h-36 w-36 md:h-48 md:w-48 bg-slate-600"></img>
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
        <Card className="py-5 md:sticky top-20 w-full text-center">
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
