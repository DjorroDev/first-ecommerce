import { useAppSelector } from "@/app/hooks";
import CreateProduct from "@/components/product/CreateProduct";
import DeleteProduct from "@/components/product/DeleteProduct";
import UpdateProduct from "@/components/product/UpdateProduct";
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
import { useGetProductBySellerIdQuery, useGetProductsQuery } from "@/services/productService";

const Products = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: products, error, isLoading } = useGetProductBySellerIdQuery(user?.id || 0);

  const url = import.meta.env.VITE_IMG_URL;

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Manage your products</CardDescription>
        <CreateProduct />
      </CardHeader>
      <CardContent>
        {products?.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[200px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="product"
                        className="aspect-square rounded-md object-cover"
                        height="128"
                        src={`${url}${product.image}`}
                        width="128"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.created_at}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-col md:flex-row items-center flex-auto">
                        <UpdateProduct id={product.id} />
                        <DeleteProduct id={product.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="h-56">No products yet</div>
        )}
      </CardContent>
    </Card>
  );
};

export default Products;
