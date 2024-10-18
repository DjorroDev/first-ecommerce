import { useAppSelector } from "@/app/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetOrdersBySellerIdQuery } from "@/services/orderService";
import { Order } from "@/types";
import { Item } from "@radix-ui/react-dropdown-menu";

const Orders = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: orders } = useGetOrdersBySellerIdQuery(user?.id || 0);

  //   const orders: Order[] = data.orders;

  console.log(orders);
  return (
    <>
      <h1>ORDERS</h1>
      {orders?.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle>Order number {order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            {order.items.map((item) => (
              <Card>
                <CardHeader>
                  <CardTitle>Product Id {item.itemId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </CardContent>
                <CardFooter>
                  <p>SubTotal: ${item.subTotal}</p>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
          <CardFooter>
            <p className="text-xl font-bold">Total Sale order: ${order.total}</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default Orders;
