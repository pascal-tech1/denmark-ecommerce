import PriceRangeSelector from "./PriceRangeSelector";
import { ScrollArea } from "../ui/scroll-area";
import { Filter, ShieldQuestion } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger
} from "../ui/sheet";
import { Button } from "../ui/button";
import SideProducts from "./SideProducts";
import { useQuery } from "@tanstack/react-query";

export function CategorySuggestionSheet() {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" fixed  border-yellow-600 border-opacity-20  -mt-4 z-50 "
      >
        <Button variant="outline" size={"lg"} className="  gap-2 items-center">
          Trending products <ShieldQuestion size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent className=" h-screen overflow-y-auto ml-2">
        <ScrollArea>
          <SideProducts heading="Best Sellers" />
          <SideProducts heading="New Products" />
          <SheetFooter className=" justify-self-end  self-end">
            <SheetClose asChild>
              <Button>close</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export function CategorySuggestion() {
  return (
    <div>
      <SideProducts heading="Best Sellers" />
      <SideProducts heading="New Products" />
    </div>
  );
}
