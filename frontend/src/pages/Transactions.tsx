import { useAppSelector } from "@/app/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTransactionsByBuyerIdQuery } from "@/services/orderService";

const Transactions = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: transactions } = useGetTransactionsByBuyerIdQuery(user?.id || 1);
  console.log(transactions);
  return (
    <>
      {transactions?.map((trans) => (
        <Card key={trans.id}>
          <CardHeader>
            <CardTitle>Transaction number {trans.id}</CardTitle>
            {/* <CardDescription>at </CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Pay with: {trans.payment}</p>
          </CardContent>
          <CardFooter>
            <p className="font-bold">Total: ${trans.total}</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default Transactions;
