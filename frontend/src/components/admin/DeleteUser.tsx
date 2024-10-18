import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { ProductProps } from "./UserProps";
import { useDeleteUserMutation } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";

const DeleteProduct: React.FC<ProductProps> = ({ id }) => {
  const [deleteUser] = useDeleteUserMutation();

  const { toast } = useToast();

  const handleDelete = async () => {
    await deleteUser(id).unwrap();
    toast({ title: "Success Delete" });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-fit gap-1" variant={"destructive"}>
          <Trash2 className="h-3.5 w-3.5" />
          <span className="sm:whitespace-nowrap">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => handleDelete()}
                size="sm"
                className="w-fit gap-1"
                variant={"destructive"}
              >
                <span className="sm:whitespace-nowrap">Delete</span>
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button size="sm" className="w-fit gap-1" variant={"outline"}>
                <span className="sm:whitespace-nowrap">Cancel</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
