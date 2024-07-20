"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { useSearchParams } from "next/navigation";
import PriceRangeSelector from "@/components/admin-panel/PriceRangeSelector";
import { cn } from "@/lib/utils";
import { CategorySheet } from "@/components/admin-panel/categorySheet";
import { useQuery } from "@tanstack/react-query";
import Products from "@/components/admin-panel/Products";
import { Footer } from "@/components/admin-panel/footer";

function Searchparam() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const subcategory = searchParams?.get("subcategory");
  const query = searchParams?.get("query");

  const [categoryState, setCategoryState] = useState<string | undefined>(
    category as string
  );

  const [subcategoryState, setSubcategoryState] = useState<string | undefined>(
    subcategory as string
  );
  const [queryState, setQuerytate] = useState<string | undefined>(
    query as string
  );

  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const topDiv = document.querySelector(".top-div") as HTMLElement | null;
      if (topDiv) {
        setShowFeatures(topDiv.offsetWidth >= 940);
      }
    };

    // Initialize the check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCategoryState(category || "");
    setSubcategoryState(subcategory || "");
    setQuerytate(query || "");
  }, [category, subcategory, query]);

  return (
    <ContentLayout title={subcategoryState || categoryState}>
      <div className=" flex items-center flex-wrap  ">
        <Breadcrumb className=" pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category">All Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category?category=${categoryState}`}>
                  {categoryState}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subcategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>{query && `All results matching your query ${query}`}</div>
      <div className=" relative">
        <div className={cn(showFeatures ? "hidden  " : "items-center mb-4   ")}>
          <CategorySheet />
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-11 gap-12 pr-2 top-div dark:text-gray-400 ">
          <div
            className={cn(
              showFeatures
                ? "col-start-1 col-span-7"
                : "col-start-1 col-span-full"
            )}
          >
            <Products />
          </div>
          <div
            className={cn(
              showFeatures
                ? "inline-block col-start-8  col-span-full flex, flex-col gap-6"
                : "hidden"
            )}
          >
            <div className="sticky top-5 left-0 flex overflow-y-auto  h-[85vh] bg-neutral-50 dark:bg-neutral-900 shadow-inner  rounded-lg flex-col gap-4">
              <div className=" p-3">
                <PriceRangeSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ContentLayout>
  );
}

export default function CategoryPage() {
  return (
    <Suspense>
      <Searchparam />
    </Suspense>
  );
}
