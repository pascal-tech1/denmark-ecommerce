import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import PriceRangeSelector from "./PriceRangeSelector";
import { ScrollArea } from "../ui/scroll-area";
import { Filter } from "lucide-react";

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
          <PriceRangeSelector images={images} />
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
