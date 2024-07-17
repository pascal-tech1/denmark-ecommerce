import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SideProducts from "./SideProducts";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PriceRangeSelector = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("highest price"); // State for selected radio group
  const minPriceLimit = 1;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


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

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update the parameters with the new values

    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);
    params.set("selectedSort", selectedSort);

    // Construct the new URL with the updated parameters
    const url = `${pathname}?${params.toString()}`;

    // Use replace instead of push to avoid duplicating entries in history
    router.replace(url);
  };

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="pl-4">
        <div className="flex flex-col gap-4">
          <h1 className="mt-4 mb-2 font-bold">Filter By Price</h1>
          <div className="flex items-start">
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Min"
              min={minPriceLimit}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-center mx-1"
            />
            <span className="mx-2">-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Max"
              min={minPriceLimit}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-center mx-1"
            />
          </div>
        </div>

        <div>
          <h1 className="mt-6 mb-2 font-bold">Sort</h1>

          <RadioGroup value={selectedSort} onValueChange={handleSortChange}>
            <div className="flex items-center space-x-2 text-lg">
              <RadioGroupItem value="highest price" id="r1" />
              <Label htmlFor="r1" className="text-base">
                Highest price
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lowest price" id="r2" />
              <Label htmlFor="r2" className="text-base">
                Lowest Price
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most popular" id="r3" />
              <Label htmlFor="r3" className="text-base">
                Popularity
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          variant={"default"}
          type="submit"
          className="mt-2 bg-yellow-500 self-start text-white rounded-large hover:bg-yellow-600"
        >
          Apply
        </Button>
      </form>
      <SideProducts heading="Street Comformts" />

    </div>
  );
};

export default PriceRangeSelector;
