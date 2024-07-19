

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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className=" flex gap-2 items-center">
          Filter <Filter size={15} />
        </Button>
      </SheetTrigger>
      <ScrollArea>
        <SheetContent className=" h-screen overflow-y-auto">
          <PriceRangeSelector />
          <SheetFooter className=" mt-4">
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </ScrollArea>
    </Sheet>
  );
}
