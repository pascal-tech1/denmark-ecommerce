

import PriceRangeSelector from "./PriceRangeSelector";
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
  return (
    <Sheet >
      <div className=" relative">
        <SheetTrigger asChild className="">
          <Button variant="outline" className=" flex gap-2 items-center">
            Filter <Filter size={15} />
          </Button>
        </SheetTrigger>
      </div>
      <ScrollArea className="">
        <SheetContent className="h-screen overflow-y-auto  bg-neutral-50 dark:bg-neutral-900">
          <PriceRangeSelector />
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}
