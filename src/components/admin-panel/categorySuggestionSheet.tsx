

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
    const { isPending: newProductIsPending, error: newProductError, data: newProductData } = useQuery({
        queryKey: ['newProduct'],
        queryFn: () =>
            fetch("/routes/fetchAllProducts").then((res) =>
                res.json(),
            ),
    })
    const { isPending: bestSellerProductIsPending, error: bestSellerProductError, data: bestSellerProductData } = useQuery({
        queryKey: ['bestSellerProduct'],
        queryFn: () =>
            fetch("/routes/fetchAllProducts").then((res) =>
                res.json(),
            ),
    })
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className=" flex gap-2 items-center">
                    More Suggestions <Filter size={15} />
                </Button>
            </SheetTrigger>
            <ScrollArea>
                <SheetContent className=" h-screen overflow-y-auto flex flex-col items-center ">
                    <SideProducts images={bestSellerProductData?.allProducts || []} heading="Best Sellers" isMutating={bestSellerProductIsPending} error={bestSellerProductError} />
                    <SideProducts images={newProductData?.allProducts || []} heading="New Products" isMutating={newProductIsPending} error={newProductError} />
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
    const { isPending: newProductIsPending, error: newProductError, data: newProductData } = useQuery({
        queryKey: ['newProduct'],
        queryFn: () =>
            fetch("/routes/fetchAllProducts").then((res) =>
                res.json(),
            ),
    })
    const { isPending: bestSellerProductIsPending, error: bestSellerProductError, data: bestSellerProductData } = useQuery({
        queryKey: ['bestSellerProduct'],
        queryFn: () =>
            fetch("/routes/fetchAllProducts").then((res) =>
                res.json(),
            ),
    })

    return <div>
        <SideProducts images={bestSellerProductData?.allProducts || []} heading="Best Sellers" isMutating={bestSellerProductIsPending} error={bestSellerProductError} />
        <SideProducts images={newProductData?.allProducts || []} heading="New Products" isMutating={newProductIsPending} error={newProductError} />
    </div>

}