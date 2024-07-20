"use client"
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SideProductSkeletonLoading } from "./sideProductSkeletonLoading";
import useFetchAllProductPaginated from "@/hooks/useFetchAllProductPaginated";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const SideProducts = ({ heading }: { heading: string }) => {
  const router = useRouter();


  const handleCardClick = (_id: string) => {
    router.push(`/productdetail/${_id}`);
  };



  const {
    data,
    error,
    isPending,

  } = useInfiniteQuery({
    queryKey: ['sidePrducts', heading],
    queryFn: ({ pageParam }: { pageParam: any }) => fetch(`/routes/fetchAllProducts?cursor=${pageParam}&limit=4&heading=${heading}`).then((res) => res.json()),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    staleTime: 0,
  })



  return (
    <div>

      {isPending ? <SideProductSkeletonLoading heading={heading} /> : <div className="flex flex-col gap-4 justify-center rounded-lg">
        <div className="flex items-center text-center drop-shadow-lg pt-6 font-bold flex-col">
          {heading}
          <div className="border-b border-b-yellow-400 border-opacity-15 w-28 pt-2"></div>
        </div>
        <div className="">
          {data?.pages[0]?.products?.map((product: any, index: number) => (
            <div
              key={index}
              className="w-full group py-4 px-2 flex gap-4 items-center"
            >
              <div
                onClick={() => handleCardClick(product._id)}
                className="relative bg-gray-300 overflow-hidden cursor-pointer rounded-md h-16 w-16 flex-shrink-0"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  layout="fill"
                  blurDataURL={`data:image/jpeg;base64,${product.blurImage}`}
                  placeholder="blur"
                  className="object-cover group-hover:scale-105 rounded-md"
                />
              </div>
              <div className=" flex flex-col gap-2 justify-between ">
                <h2
                  onClick={() => handleCardClick(product._id)}
                  className=" hover:text-yellow-500 self-start items-start dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300 truncate whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {product.title}
                </h2>
                <p className=" whitespace-nowrap text-gray-800 dark:text-neutral-400">
                  Price: &#8358; {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        {error && <h1 className=" ml-10">failed to fetch Products try again </h1>}
      </div>}

    </div>
  );
};

export default SideProducts;
