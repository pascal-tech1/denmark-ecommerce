"use client";
import { useEffect, useState } from "react";
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
import Banner from "@/components/admin-panel/banner";
import Products from "@/components/admin-panel/Products";
import { imageData } from "@/hooks/data";
import { useSearchParams } from "next/navigation";
import PriceRangeSelector from "@/components/admin-panel/PriceRangeSelector";
import { cn } from "@/lib/utils";
import { CategorySheet } from "@/components/admin-panel/categorySheet";


export default function CategoryPage() {
  const images = imageData
  const [showFeatures, setShowFeatures] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const [categoryState, setCategoryState] = useState<string | undefined>(
    undefined
  );
  const [subcategoryState, setSubcategoryState] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setCategoryState(category || "");
    setSubcategoryState(subcategory || "");
  }, [category, subcategory]);

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

  return (
    <ContentLayout title={subcategoryState || categoryState}>
      <div className=" flex items-center flex-wrap ">
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
                <Link href={`/category?category=${categoryState}`}>{categoryState}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subcategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className={cn(showFeatures ? "hidden  " : "items-center ml-auto")}>
          <CategorySheet images={images} />
        </div>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-11 gap-12 mt-6 pr-2 top-div dark:text-gray-400 ">
        <div
          className={cn(
            showFeatures
              ? "col-start-1 col-span-7"
              : "col-start-1 col-span-full"
          )}
        >
          <Products images={images} />
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
              <PriceRangeSelector images={images} />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
