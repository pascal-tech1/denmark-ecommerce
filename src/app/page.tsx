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

  const { isPending: newProductIsPending, error: newProductError, data: newProductData } = useQuery({
    queryKey: ['newProduct'],
    queryFn: () =>
      fetch("/routes/fetchAllProducts").then((res) =>
        res.json(),
      ),
  })
  const { isPending: bestSellerProductIsPending, error: bestSellerProductError, data: bestSellerProductData } = useQuery({
    queryKey: ['bestSellerProduct'],
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
      <div className="grid grid-cols-2 md:grid-cols-11 gap-12 mt-8 pr-2 top-div dark:text-gray-400 ">
        <div
          className={cn(
            showFeatures ? "inline-block col-start-1 col-span-3" : "hidden",
            "flex, flex-col gap-6"
          )}
        >
          <div className="sticky top-16 left-0 flex rounded-lg flex-col gap-4">
            <SideProducts images={bestSellerProductData?.allProducts || []} heading="Best Sellers" isMutating={bestSellerProductIsPending} error={bestSellerProductError} />
            <SideProducts images={newProductData?.allProducts || []} heading="New Products" isMutating={newProductIsPending} error={newProductError} />
          </div>
        </div>

        <div
          className={cn(
            "col-span-full",
            showFeatures ? "col-start-4" : "col-start-1"
          )}
        >
          <div className="flex items-center text-center mt-3 drop-shadow-lg font-bold flex-col">
            Featured Products
            <div className="border-b border-b-yellow-400 w-28 mt-2 mb-6"></div>
          </div>

          <Products products={featuredProductData?.allProducts || []} isMutating={featuredProductIsPending} error={featuredProductError} />


        </div>
      </div>
    </ContentLayout>
  );
}
