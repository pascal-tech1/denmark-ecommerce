"use client"
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SideProductSkeletonLoading } from "./sideProductSkeletonLoading";
import useFetchAllProductPaginated from "@/hooks/useFetchAllProductPaginated";

const SideProducts = ({ heading }: { heading: string }) => {
  const router = useRouter();

  const {
    data,
    error,
    isPending,

  } = useFetchAllProductPaginated('', 1);
  const handleCardClick = () => {
    router.push("/productdetail/90");
  };
  const SkeletonLength = [1, 2, 3, 4]

  return (
    <div>

      {isPending ? <SideProductSkeletonLoading heading={heading} /> : <div className="flex flex-col gap-4  rounded-lg">
        <div className="flex items-center text-center drop-shadow-lg pt-6 font-bold flex-col">
          {heading}
          <div className="border-b border-b-yellow-400 border-opacity-15 w-28 pt-2"></div>
        </div>
        {data?.pages[0].products.slice(0, 4).map((product: any, index: number) => (
          <div
            key={index}
            className="w-full group py-2 px-2 flex gap-4 items-center"
          >
            <div
              onClick={handleCardClick}
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
                onClick={handleCardClick}
                className=" hover:text-yellow-500 self-start items-start dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300"
              >
                {product.title}
              </h2>
              <p className=" whitespace-nowrap text-gray-800 dark:text-neutral-400">
                Price: &#8358; {product.price}
              </p>
            </div>
          </div>
        ))}
        {error && <h1 className=" ml-10">failed to fetch Products try again </h1>}
      </div>}

    </div>
  );
};

export default SideProducts;
