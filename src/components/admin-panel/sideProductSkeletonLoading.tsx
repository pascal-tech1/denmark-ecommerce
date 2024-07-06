
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { SkeletonImage } from "../ui/skeletonImage";

const SideProductSkeletonLoading = ({ heading }: { heading: string; }) => {
    const SkeletonLength = [1, 2, 3, 4]
    return (
        <div className="flex flex-col border dark:border-neutral-800 p-4 rounded-lg">
            <div className="flex items-center text-center mt-3 drop-shadow-lg font-bold flex-col">
                {heading}
                <div className="border-b w-28 pt-2"></div>
            </div>
            {SkeletonLength.map((image, index) => (
                <div
                    key={index}
                    className="w-full group py-2 px-2 flex gap-6 items-center"
                >
                    <div

                        className="relative  overflow-hidden cursor-pointer rounded-md flex-shrink-0"
                    >
                        <SkeletonImage className=" w-16 h-16 flex items-center justify-center" />
                    </div>
                    <div className=" flex flex-col gap-2 justify-between ">
                        <div

                            className=" hover:text-yellow-500 self-start items-start dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300"
                        >
                            <Skeleton className=" w-[140PX] h-4" />
                        </div>
                        <div className=" whitespace-nowrap text-gray-800 dark:text-neutral-400">
                            <Skeleton className=" w-[100PX] h-4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export { SideProductSkeletonLoading };
