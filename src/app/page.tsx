
"use client"
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Banner from "@/components/admin-panel/banner";

import { cn } from "@/lib/utils";
import Products from "@/components/admin-panel/Products";

import { useQuery } from "@tanstack/react-query";

import { CategorySuggestion, CategorySuggestionSheet } from "@/components/admin-panel/categorySuggestionSheet";
import { useState, useEffect } from 'react';


export default function DashboardPage() {
  const [showFeatures, setShowFeatures] = useState(false);


  const { isPending: featuredProductIsPending, error: featuredProductError, data: featuredProductData } = useQuery({
    queryKey: ['featuredProduct'],
    queryFn: () =>
      fetch("/routes/fetchAllProducts").then((res) =>
        res.json(),
      ),
  })







  useEffect(() => {
    const handleResize = () => {
      const topDiv = document.querySelector(".top-div") as HTMLElement | null;
      if (topDiv) {
        setShowFeatures(topDiv.offsetWidth >= 1024);
      }
    };

    // Initialize the check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);








  return (
    <ContentLayout title="Home">
      <Banner />
      <div className=" pt-5">
        <div className={cn(showFeatures ? "hidden  " : "items-center mb-4 ")}>
          <CategorySuggestionSheet />
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-11 gap-16  justify-between place-content-around  pr-2 top-div dark:text-gray-400 ">

          <div
            className={cn(
              showFeatures
                ? "col-start-1 col-span-7"
                : "col-start-1 col-span-full ", ""
            )}
          >
            <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />
            <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />
            <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />
          </div>
          <div
            className={cn(
              showFeatures
                ? "inline-block col-start-8  dark:bg-neutral-900 rounded-lg shadow-md  col-span-full flex, flex-col gap-6"
                : "hidden"
            )}
          >
            <div className="sticky top-16 left-0 flex rounded-lg flex-col gap-4">
              <div className=" p-3">
                <div className="sticky top-16 left-0 flex rounded-lg flex-col gap-4">
                  <CategorySuggestion />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
