
import React, { ReactNode, useState } from "react";
;
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getMenuList } from "@/lib/menu-list";
import { ScrollArea } from "../ui/scroll-area";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,

  SheetFooter,

  SheetTrigger
} from "../ui/sheet";
import { Button } from "../ui/button";

export function CategorySheet({ images }: any) {


  const searchParams = useSearchParams();
  const maxPriceParam = searchParams?.get("maxPrice");
  const minPriceParam = searchParams?.get("minPrice");
  const selectedSortParam = searchParams?.get("selectedSort");
  const selectedCategoryParam = searchParams?.get("category");

  const [minPrice, setMinPrice] = useState(minPriceParam || "");
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || "");
  const [selectedSort, setSelectedSort] = useState(selectedSortParam || "");
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryParam || "");

  const minPriceLimit = 1;
  const router = useRouter();
  const pathname = usePathname();

  const handleMinPriceChange = (e: any) => {
    const value = e.target.value;
    if (value >= minPriceLimit || value === "") {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e: any) => {
    const value = e.target.value;
    if (value >= minPriceLimit || value === "") {
      setMaxPrice(value);
    }
  };

  const handleSortChange = (value: any) => {
    setSelectedSort(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);
    params.set("selectedSort", selectedSort);
    params.set("category", selectedCategory);

    const url = `${pathname}?${params.toString()}`;
    router.replace(url);
  };



  return (
    <Sheet >
      <div className=" relative">
        <SheetTrigger asChild className=" fixed z-50  -mt-[13px] border-yellow-600 border-opacity-20">
          <Button variant="outline" className=" flex gap-2 items-center">
            Filter <Filter size={15} />
          </Button>
        </SheetTrigger>
      </div>
      <ScrollArea className="">
        <SheetContent className="h-screen overflow-y-auto  bg-neutral-50 dark:bg-neutral-900">
          <div className="flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="pl-4 relative">
              <div className="flex flex-col gap-4">
                <h1 className="mt-4 mb-2 font-bold">Filter By Price</h1>
                <div className="flex items-start flex-wrap">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="Min"
                    min={minPriceLimit}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-center mx-1"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="Max"
                    min={minPriceLimit}
                    className="w-24 px-2  py-1 border border-gray-300 rounded text-center mx-1"
                  />
                </div>
              </div>

              <div>
                <h1 className="mt-6 mb-2 font-bold">Sort</h1>
                <RadioGroup value={selectedSort} onValueChange={handleSortChange}>
                  <div className="flex items-center space-x-2 text-lg">
                    <RadioGroupItem value="highest price" id="r1" />
                    <Label htmlFor="r1" className="text-base">Highest price</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lowest price" id="r2" />
                    <Label htmlFor="r2" className="text-base">Lowest Price</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="most popular" id="r3" />
                    <Label htmlFor="r3" className="text-base">Popularity</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h1 className="mt-6 mb-2 font-bold">Category</h1>
                <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange}>
                  <div key={"allProduct"} className="flex items-center space-x-3">
                    <RadioGroupItem value={""} id={"allProduct"} />
                    <Label htmlFor={"allProduct"} className="text-base">All Product</Label>
                  </div>
                  {getMenuList("")
                    .filter((group) => group.groupLabel === "Category")
                    .map((group) =>
                      group.menus.map((menu) => (
                        <div key={menu.label} className="flex items-center space-x-3">
                          <RadioGroupItem value={menu.label} id={menu.label} />
                          <Label htmlFor={menu.label} className="text-base">{menu.label}</Label>
                        </div>
                      ))
                    )}
                </RadioGroup>
              </div>
              <SheetClose >

                <Button
                  variant={"default"}
                  type="submit"
                  className="mt-2 bg-yellow-500 self-start text-white rounded-large hover:bg-yellow-600"
                >
                  Apply
                </Button>
              </SheetClose>




            </form>
          </div>
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}
