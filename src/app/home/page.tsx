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

import { cn } from "@/lib/utils";
import SideProducts from "@/components/admin-panel/SideProducts";
import { imageData } from "@/hooks/data";

export default function DashboardPage() {
  const [showFeatures, setShowFeatures] = useState(false);
  const images = imageData;
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
  {
    console.log("showfeatrues", showFeatures);
  }
  return (
    <ContentLayout title="Dashboard">
      <Banner />
      <div className="grid  grid-cols-2 md:grid-cols-11 gap-12 mt-8 pr-2 top-div dark:text-gray-400 ">
        <div
          className={cn(
            showFeatures ? "inline-block col-start-1 col-span-3" : "hidden",
            "flex, flex-col gap-6"
          )}
        >
          <div className="sticky top-16 left-0 flex  rounded-lg flex-col gap-4">
            <SideProducts images={images} heading="Best Sellers" />

            <SideProducts images={images} heading="New Products" />
          </div>
        </div>

        <div
          className={cn(
            " col-span-full",
            showFeatures ? "col-start-4" : "col-start-1"
          )}
        >
          <div className=" flex items-center text-center mt-3  drop-shadow-lg font-bold flex-col">
            Featured Products
            <div className=" border-b  border-b-yellow-400 w-28 mt-2 mb-6 "></div>
          </div>
          <Products images={images} />
        </div>
      </div>
    </ContentLayout>
  );
}
