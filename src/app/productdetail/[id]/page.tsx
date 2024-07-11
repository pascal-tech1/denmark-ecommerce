"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import Link from "next/link";
import Products from "@/components/admin-panel/Products";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductDetail = () => {

  const [quantity, setQuantity] = useState(1);
  const pathname = usePathname();  // Use the usePathname hook to get the current path
  const searchParams = useSearchParams(); // Use the useSearchParams hook to get query parameters if any

  // Extract the id from the pathname
  const id = pathname.split("/").pop();
  console.log(id)
  const [showFeatures, setShowFeatures] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: [id],
    queryFn: () => axios(`/routes/fetchSingleProduct?productId=${id}`)
  })


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





  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${data?.data?.product?.title} to cart`);
  };

  const handleCheckout = () => {
    console.log(`Added ${quantity} of ${data?.data?.product?.title} to cart`);

    console.log("Proceeding to checkout");
  };
  if (isPending) {
    return <h1>loading</h1>
  }

  return (
    <ContentLayout title="Sign Up">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Register</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex  justify-center mt-6 items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] ">

        <div className="lg:p-12 ">
          <div className={cn(showFeatures ? " flex-row" : "flex-col", "relative rounded-lg h-[500px] flex gap-12 ")}>
            <div className={cn(showFeatures && " max-w-[700px] relative ", " h-full w-full border rounded-lg border-yellow-400 border-opacity-20 ")}>

              <Image
                src={data?.data?.product?.imageUrl}
                alt={data?.data?.product?.title}
                layout="fill"
                blurDataURL={`data:image/jpeg;base64,${data?.data?.product?.blurImage}`}
                placeholder="blur"
                className={cn("object-cover h-full w-full  rounded-md transition-transform group-hover:scale-125")}
              />
            </div>
            <div className="flex flex-col  my-2 gap-6">
              <h1 className=" text-2xl   ">
                {data?.data?.product?.title}
              </h1>
              <h2 className=" text-lg font-semibold ">
                &#8358; {data?.data?.product?.price}
              </h2>
              <div className="">
                <label className="block">
                  Quantity:
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="ml-2 w-16 px-2 py-1 border rounded-md"
                  />
                </label>
              </div>
              <div className=" flex gap-6  ">
                <Button
                  variant={"default"}
                  onClick={handleAddToCart}
                  className=" bg-yellow-300  rounded-md "
                >
                  Add to Cart
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleCheckout}
                  className=" border border-yellow-300  rounded-md  min-[1024px]:mt-0  "
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 text-gray-700 dark:text-gray-400 max-w-[900px]">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <div
              className=" "
              dangerouslySetInnerHTML={{ __html: data?.data?.product.description }}
            />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">More Products</h3>
            <div className="">
              {/* <Products images={imageData} /> */}
            </div>
          </div>
        </div>
      </div>



    </ContentLayout>
  );
};

export default ProductDetail;
