"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Delete,
  Loader2,
  LoaderIcon,
  MoreHorizontal,
  Trash
} from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Product, columns } from "./components/columns";
import { DataTablePagination } from "./components/data-table-pagination";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function AllProducts() {
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    data: fetchData,
    isSuccess
  } = useQuery({
    queryKey: ["AllProductTable"], // Ensure sorting and columnFilters are dependencies
    queryFn: () =>
      fetch("/routes/fetchAllProductAdmin").then((res) => res.json())
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Product[]>([]);
  const [isDeletingAll, setIsDeletingAll] = React.useState(false);
  React.useEffect(() => {
    if (isSuccess && fetchData) {
      setData(fetchData.allProducts);
    }
  }, [isSuccess, fetchData]);
  const { toast } = useToast();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const handleDeleteAll = async (allSelected: string[]) => {
    if (allSelected.length === 0) {
      toast({
        description: "select Products to delete",
        variant: "destructive"
      });
      return;
    }
    try {
      setIsDeletingAll(true);
      const response = await axios.delete("/routes/deleteProduct", {
        data: { productIds: allSelected }
      });

      if (response.data.message === "Selected Products deleted successfully") {
        setData((prevData) =>
          prevData.filter((product) => !allSelected.includes(product._id))
        );
        setRowSelection({});
        setIsDeletingAll(false);
        toast({
          description: "Product deleted Successfully"
        });
        return "success";
      }
    } catch (error) {
      setIsDeletingAll(false);
      if (allSelected.length !== 0)
        toast({
          description: "Failed to delete Product",
          variant: "destructive"
        });
      return "failed";
    }
  };

  return (
    <ContentLayout title="manage products">
      <div className="w-full">
        <div className="flex gap-6 items-center py-4">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Button
            variant={"outline"}
            disabled={isDeletingAll}
            onClick={() =>
              handleDeleteAll(
                table
                  .getSelectedRowModel()
                  .rows.map((selectedRows) => selectedRows.original._id)
              )
            }
          >
            {isDeletingAll && (
              <Loader2 className=" text-center h-6 w-6 animate-spin" />
            )}
            <Trash className=" text-red-700" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="dark:bg-neutral-900 bg-neutral-100"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center flex items-center justify-center"
                  >
                    {isPending ? (
                      <Loader2 className=" text-center h-6 w-6 animate-spin" />
                    ) : (
                      <h1>No results</h1>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className=" py-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </ContentLayout>
  );
}
