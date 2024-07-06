import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonImage } from "../ui/skeletonImage"

export function SkeletonCard() {
    return (
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-2 md:p-4 relative group">
            <div className="overflow-hidden animate-pulse cursor-pointer rounded-md relative h-52">
                <SkeletonImage className=" h-48 flex justify-center items-center" />
                {/* <Skeleton className="object-cover w-full h-full rounded-md transition-transform group-hover:scale-125" /> */}
            </div>
            <div className="">
                <div className="hover:text-yellow-500 dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300">
                    <Skeleton />
                </div>
                <div className="relative flex flex-col items-start justify-between h-full">
                    <div className="text-pink-500 dark:text-pink-300 py-2">
                        <Skeleton className="h-3 w-[140px]" />
                    </div>
                    <div className="text-pink-500 dark:text-pink-300 py-2">
                        <Skeleton className="h-3 w-[110px]" />
                    </div>
                </div>
                <div className="text-gray-800 dark:text-neutral-200">
                    <Skeleton className="h-3 w-[100px]" />
                </div>
            </div>
        </div>
    )
}