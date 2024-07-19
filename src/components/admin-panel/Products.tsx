import React, { Suspense, useEffect, useState } from "react";
import ProductItem from "./ProductItem";

import { SkeletonCard } from "./productLoadingSkeleton";
import useFetchAllProductPaginated from "@/hooks/useFetchAllProductPaginated";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from 'react-infinite-scroller'
import { Loader2 } from "lucide-react";

export default function ProductsList() {
  return <Suspense>
    <Products />
  </Suspense>
}

const Products = () => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const subcategory = searchParams?.get("subcategory");
  const query = searchParams?.get("query");
  const maxPrice = searchParams?.get("maxPrice");
  const minPrice = searchParams?.get("minPrice");
  const selectedSort = searchParams?.get("selectedSort");
  const [categoryState, setCategoryState] = useState<string | undefined>(
    category as string
  );
  const [subcategoryState, setSubcategoryState] = useState<string | undefined>(
    subcategory as string
  );
  const [queryState, setQuerytate] = useState<string | undefined>(
    query as string
  );


  const SkeletonLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  useEffect(() => {
    setCategoryState(category || "");
    setSubcategoryState(subcategory || "");
    setQuerytate(query || "");
  }, [category, subcategory, query, minPrice, maxPrice, selectedSort]);
  const fetchProjects = async ({ pageParam }: { pageParam: any }) => {
    console.log(category, subcategory, query, maxPrice, minPrice, selectedSort)
    const res = await fetch(`/routes/fetchAllProducts?category=${category || ""}&subcategory=${subcategory || ""}
            &query=${query || ""}&maxPrice=${maxPrice || ""}&minPrice=${minPrice || ""}
            &selectedSort=${selectedSort || ""}&cursor= ${pageParam}`)
    return res.json()
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ['products', category, subcategory, query, maxPrice, minPrice, selectedSort],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    staleTime: 0,
  })


  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] t-10  md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max  rounded-lg" >
      {error && <h1 className=" ml-10">failed to fetch Products try again </h1>}
      {isPending
        ?
        SkeletonLength.map((_, index) => <SkeletonCard key={index} />)
        :
        <InfiniteScroll
          className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]   md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max  rounded-lg"
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {data?.pages[0].products && data.pages.map((products: any, index: number) => {


            return products.products.map((product: any, index: number) => {

              return <ProductItem
                key={product._id}
                {...product}
              />

            })
          })}
        </InfiniteScroll>}
    </div >
  );
};


