"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import image1 from "@/images/bannerone.jpg";
import image2 from "@/images/bannertwo.jpg";
import image3 from "@/images/bannerthree.png";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent from "@/components/demo/placeholder-content";
import Link from "next/link";
import Products from "@/components/admin-panel/Products";
import { imageData } from "@/hooks/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ProductDetail = () => {


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
  // Dummy data
  const product = {
    id: 1,
    title: "Fashionable Dress",
    price: 99.99,
    description:
      "This is a beautiful and fashionable dress perfect for any occasion.",
    images: [image1, image2],
    video: "/videos/dress.mp4",
    recommendations: [
      {
        id: 2,
        title: "Stylish Jacket",
        price: 79.99,
        image: image3
      },
      { id: 3, title: "Casual Shoes", price: 49.99, image: "/images/shoes.jpg" }
    ]
  };
  console.log(showFeatures)
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  const handleCheckout = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);

    console.log("Proceeding to checkout");
  };

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
          <div className={cn(showFeatures ? " flex-row" : "flex-col", " rounded-lg flex gap-12 ")}>
            <div className={cn(showFeatures && " max-w-[700px]", "relative w-full border rounded-lg border-yellow-400 border-opacity-20 ")}>
              <Image
                objectFit="cover"
                src={product.images[1]}
                alt={product.title}

                className="rounded-lg h-full w-full object-cover shadow-md"
              />
            </div>
            <div className="flex flex-col justify-between my-2 gap-4">
              <h1 className=" text-2xl min-[360px]:text-2xl font-bold ">
                {product.title}
              </h1>
              <h2 className=" text-xl min-[360px]:text-2xl font-semibold ">
                &#8358; {product.price}
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
            <p className="">
              Discover the elegance and functionality of our latest product. Designed with the modern user in mind, this product offers an exceptional blend of style and practicality. From the sleek design to the robust features, it is perfect for both everyday use and special occasions.
            </p>
            <div className="flex gap-4 mt-4 relative w-full h-full lg:h-auto">
              <Image
                src={image3}
                alt={product.title}
                objectFit="cover"
                width={400}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <p className=" mt-4">
              Crafted from high-quality materials, this product guarantees durability and longevity. Its innovative design ensures ease of use, making it a favorite among users who value both aesthetics and efficiency. Add this remarkable piece to your collection and experience the perfect fusion of form and function.
            </p>
            <p className=" mt-2">
              Whether you&apos;re looking for a thoughtful gift or a versatile addition to your own lifestyle, this product stands out with its unique features and impeccable design. Don&apos;t miss the opportunity to enhance your daily routine with this outstanding product.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">More Products</h3>
            <div className="">
              <Products images={imageData} />
            </div>
          </div>
        </div>
      </div>



    </ContentLayout>
  );
};

export default ProductDetail;
