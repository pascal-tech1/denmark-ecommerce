import React, { Suspense, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { SkeletonCard } from "./productLoadingSkeleton";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Loader2 } from "lucide-react";

export default function ProductsList() {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <Products />
    </Suspense>
  );
}

const SkeletonLoading = () => {
  const SkeletonLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max rounded-lg">
      {SkeletonLength.map((_, index) => (
        <div key={index} className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max rounded-lg">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};

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
  const [queryState, setQueryState] = useState<string | undefined>(
    query as string
  );

  useEffect(() => {
    setCategoryState(category || "");
    setSubcategoryState(subcategory || "");
    setQueryState(query || "");
  }, [category, subcategory, query, minPrice, maxPrice, selectedSort]);

  const fetchProjects = async ({ pageParam }: { pageParam: any }) => {
    const res = await fetch(
      `/routes/fetchAllProducts?category=${category || ""}&subcategory=${subcategory || ""}&query=${query || ""}&maxPrice=${maxPrice || ""}&minPrice=${minPrice || ""}&selectedSort=${selectedSort || ""}&cursor=${pageParam}`
    );
    return res.json();
  };

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
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 0,
  });

  const SkeletonLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] t-10 md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max rounded-lg">
      {error && <h1 className="ml-10">Failed to fetch products, try again.</h1>}
      
      {isPending && SkeletonLength.map((_, index) => <SkeletonCard key={index} />)}
      
      {isSuccess && data?.pages[0]?.products?.length === 0 && (
        <h1 className="ml-10">No products found.</h1>
      )}

      {isSuccess && data?.pages[0]?.products?.length > 0 && (
        <InfiniteScroll
          className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-4 h-max rounded-lg"
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={
    
              {SkeletonLength.map((_, index) => (
                <SkeletonCard key={index} />
              ))}
           
          }
        >
          {data.pages.map((page, pageIndex) =>
            page.products.map((product: any, productIndex: any) => (
              <ProductItem key={product._id} {...product} />
            ))
          )}
          {!hasNextPage && isSuccess && data?.pages[0]?.products?.length > 0 && (
            <h1 className="ml-10">No more products.</h1>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};
