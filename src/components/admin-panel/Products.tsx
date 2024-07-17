import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

import { SkeletonCard } from "./productLoadingSkeleton";
import useFetchAllProductPaginated from "@/hooks/useFetchAllProductPaginated";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from 'react-infinite-scroll-component';


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
    console.log("console", minPrice, maxPrice, selectedSort, query, subcategory, category);
    console.log("page param", pageParam)
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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]   md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max  rounded-lg">
      {error && <h1 className=" ml-10">failed to fetch Products try again </h1>}
      {isPending ? SkeletonLength.map((_, index) => <SkeletonCard key={index} />) : <InfiniteScroll
        className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]   md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max  rounded-lg"
        dataLength={data?.pages[0].totalProducts} //This is important field to render the next data
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No More Product</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this?.refresh}
        // pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {data?.pages[0].products && data.pages.map((products: any, index: number) => {


          return products.products.map((product: any, index: number) => {

            return < div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]   md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max  rounded-lg" >
              <ProductItem
                key={product._id}
                {...product}
              />
            </div>
          })
        })}
      </InfiniteScroll>}
    </div >
  );
};

export default Products;
