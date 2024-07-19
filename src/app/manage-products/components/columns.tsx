import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import moment from "moment";
import { DataTablePagination } from "./data-table-pagination";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AlertDialogDel } from "@/components/admin-panel/alartDialog";

export type Product = {
  _id: string;
  title: string;
  subCategory: string;
  numView: number;
  price: number;
  updatedAt: string;
  category: string;
  user: { id: string; first_name: string };
};

const handleDelete = async (id: string) => {
  try {
    const response = await axios.delete(`/routes/deleteProduct?productId=${id}`);
    console.log(response);
    if (response.data.message) return "success";
  } catch (error) {
    console.error("Error deleting product:", error);
    return "failed";
  }
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link href={`/productdetail/${row.original._id}`} className=" min-w-[48rem]">
        {row.getValue("title")}
      </Link>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "numView",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No View
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const numView = parseFloat(row.getValue("numView"));
      return <div className=" ml-6">{numView}</div>;
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user: any = row.getValue("user");
      return <div className=" ml-6">{user.first_name}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = moment(row.getValue("updatedAt"));
      const formattedDate = updatedAt.format("DD MMM, YYYY");
      return <div className="">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" ml-6">{row.getValue("category")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "subCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=" "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sub Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-6">{row.getValue("subCategory") || "----"}</div>
    ),
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const SelectedProduct = row.original;
      const { toast } = useToast();
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const queryClient = useQueryClient();
      const openDialog = () => setIsDialogOpen(true);
      const closeDialog = () => setIsDialogOpen(false);
      const [isDeleted, setIsDeleted] = useState(false);
      isDeleted && queryClient.invalidateQueries({ queryKey: ["AllProductTable"] });


      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted sticky right-0"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <Link href={`/create-product?id=${SelectedProduct._id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(SelectedProduct._id);
                  toast({
                    description: "Product Id copied successfully",
                  });
                  console.log("Product Id copied successfully");
                }}
              >
                Copy id
              </DropdownMenuItem>
              <Link href={`/productdetail/${SelectedProduct._id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={openDialog}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this
                  product and remove the data from the servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const deleted = await handleDelete(SelectedProduct._id);
                    setIsDeleted(deleted === "success" ? true : false);
                    if (deleted === "success") {
                      toast({
                        description: "Product is Deleted successfully",
                      });
                    } else {
                      toast({
                        description: "Error in deleting Product",
                        variant: "destructive",
                      });
                    }
                    closeDialog();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
