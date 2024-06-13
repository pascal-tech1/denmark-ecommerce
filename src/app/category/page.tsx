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

import belt from "@/productImages/belt.jpg";
import clothes_1 from "@/productImages/clothes-1.jpg";
import clothes_2 from "@/productImages/clothes-2.jpg";
import clothes_3 from "@/productImages/clothes-3.jpg";
import clothes_4 from "@/productImages/clothes-4.jpg";
import shirt_1 from "@/productImages/shirt-1.jpg";
import shirt_2 from "@/productImages/shirt-2.jpg";
import jacket_1 from "@/productImages/jacket-1.jpg";
import jacket_2 from "@/productImages/jacket-2.jpg";
import jacket_3 from "@/productImages/jacket-3.jpg";
import jacket_4 from "@/productImages/jacket-4.jpg";
import jacket_5 from "@/productImages/jacket-5.jpg";
import jacket_6 from "@/productImages/jacket-6.jpg";
import { cn } from "@/lib/utils";
import SideProducts from "@/components/admin-panel/SideProducts";
import PriceRangeSelector from "@/components/admin-panel/PriceRangeSelector";
import { CategorySheet } from "@/components/admin-panel/categorySheet";
import { useRouter, useSearchParams } from "next/navigation";

const images = [
  {
    src: clothes_1,
    description: "MEN Yarn Fleece Full-Zip Jacket",
    price: 4000,
    category: "clothes"
  },
  {
    src: clothes_2,
    description: "MEN Knitted Jacket",
    price: 3500,
    category: "clothes"
  },
  {
    src: clothes_3,
    description: "MEN Casual Hoodie",
    price: 2500,
    category: "clothes"
  },
  {
    src: clothes_4,
    description: "MEN Slim Fit Jeans",
    price: 3000,
    category: "clothes"
  },
  {
    src: shirt_1,
    description: "MEN Formal Shirt",
    price: 2000,
    category: "clothes"
  },
  {
    src: shirt_2,
    description: "MEN Casual Shirt",
    price: 1800,
    category: "clothes"
  },
  {
    src: jacket_1,
    description: "MEN Leather Jacket",
    price: 8000,
    category: "clothes"
  },
  {
    src: jacket_2,
    description: "MEN Denim Jacket",
    price: 4500,
    category: "clothes"
  },
  {
    src: jacket_3,
    description: "MEN Windbreaker Jacket",
    price: 3500,
    category: "clothes"
  },
  {
    src: jacket_4,
    description: "MEN Bomber Jacket",
    price: 5000,
    category: "clothes"
  },
  {
    src: jacket_5,
    description: "MEN Parka Jacket",
    price: 7000,
    category: "clothes"
  },
  {
    src: jacket_6,
    description: "MEN Wool Coat",
    price: 6000,
    category: "clothes"
  },
  {
    src: belt,
    description: "MEN Leather Belt",
    price: 1500,
    category: "accessories"
  }
];

export default function CategoryPage() {
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
                <Link href="/category?category=clothes">{categoryState}</Link>
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
