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
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useAddProductMutation } from "@/services/productService";
import { useAppSelector } from "@/app/hooks";
import { Textarea } from "../ui/textarea";

const CreateProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [image, setImage] = useState<File | null>();

  const [open, setOpen] = useState<boolean>(false);

  const [create] = useAddProductMutation();
  const { user } = useAppSelector((state) => state.auth);

  const sellerValue = {
    sellerId: "",
    store: "",
  };

  // Because it is typescript, clear the string | undefined types
  if (user?.id !== undefined && user?.username !== undefined) {
    sellerValue.sellerId = user?.id.toString();
    sellerValue.store = user?.username;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handling image require formdata for the file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("sellerId", sellerValue.sellerId);
    formData.append("store", sellerValue.store);
    formData.append("price", price);
    formData.append("stock", stock);
    if (image) {
      formData.append("image", image); // Append image file to formData
    }

    await create(formData).unwrap();
    setOpen(false);
    setTitle("");
    setDesc("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit" asChild>
        <Button size="sm" className="h-10 w-fit gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sm:whitespace-nowrap">Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Create new product in here. Click create when you're done. NOTE: Store name use your
            username
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image of Product
            </Label>
            <Input
              required
              id="image"
              type="file"
              accept="image/*"
              className="col-span-3"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title of product
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="example"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Textarea
              id="desc"
              value={desc}
              placeholder="This is a cutting edge technology device that can change da world"
              className="col-span-3"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={price}
              placeholder="20.00"
              className="col-span-3"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              value={stock}
              className="col-span-3"
              type="number"
              placeholder="10"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
