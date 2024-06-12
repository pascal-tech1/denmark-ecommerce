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

export default function DashboardPage() {
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
