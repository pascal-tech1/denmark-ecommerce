import React from "react";
import ProductItem from "./ProductItem";

import { SkeletonCard } from "./productLoadingSkeleton";


const Products = ({ products, isMutating, error }: any) => {
  // const isMutating = true
  console.log(isMutating)
  const SkeletonLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  console.log(error)

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]   md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max  rounded-lg">
      {error && <h1 className=" ml-10">failed to fetch Products try again </h1>}
      {isMutating ? SkeletonLength.map((_, index) => <SkeletonCard key={index} />) : products?.map((product: any, index: number) => (
        <ProductItem
          key={index}
          {...product}
        />
      ))}
    </div>
  );
};

export default Products;
