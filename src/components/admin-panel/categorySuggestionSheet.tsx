

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
import SideProducts from "./SideProducts";
import { useQuery } from "@tanstack/react-query";

export function CategorySuggestionSheet() {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className=" flex gap-2 items-center">
                    More Suggestions <Filter size={15} />
                </Button>
            </SheetTrigger>
            <ScrollArea>
                <SheetContent className=" h-screen overflow-y-auto flex flex-col items-center ">
                    <SideProducts heading="Best Sellers" />
                    <SideProducts heading="New Products" />
                    <SheetFooter className=" justify-self-end  self-end">
                        <SheetClose asChild>
                            <Button >close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </ScrollArea>
        </Sheet>
    );
}

export function CategorySuggestion() {

    return <div>
        <SideProducts heading="Best Sellers" />
        <SideProducts heading="New Products" />
    </div>

}