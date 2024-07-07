"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageData } from "@/hooks/data";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Banner from "@/components/admin-panel/banner";
import SideProducts from "@/components/admin-panel/SideProducts";
import { cn } from "@/lib/utils";
import Products from "@/components/admin-panel/Products";
import useSendPostRequest from "@/hooks/useSignUp";
import useFetchData from "@/hooks/sendGetRequest";
import { useQuery } from "@tanstack/react-query";
import { CategorySheet } from "@/components/admin-panel/categorySheet";
import { CategorySuggestion, CategorySuggestionSheet } from "@/components/admin-panel/categorySuggestionSheet";

export default function DashboardPage() {
  const [showFeatures, setShowFeatures] = useState(false);
  const images = imageData;


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
      <div>
        <div className={cn(showFeatures ? "hidden  " : "items-center mb-4 ")}>
          <CategorySuggestionSheet />
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-11 gap-12 pr-2 top-div dark:text-gray-400 ">

          <div
            className={cn(
              showFeatures
                ? "col-start-1 col-span-7"
                : "col-start-1 col-span-full"
            )}
          >
            <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />
            <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />
            <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />
          </div>
          <div
            className={cn(
              showFeatures
                ? "inline-block col-start-8 col-span-full flex, flex-col gap-6"
                : "hidden"
            )}
          >
            <div className="sticky top-16 left-0 flex  rounded-lg flex-col gap-4">
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
