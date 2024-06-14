"use client";
import Image from "next/image";
import { useState } from "react";
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

const ProductDetail = () => {
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
      <div className="flex justify-center mt-6 items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">

        <div className="lg:p-12 ">
          <div className=" rounded-lg grid grid-cols-1 min-[1024px]:grid-cols-2 gap-6 min-[1024px]:gap-12 max-w-[1200px]">
            <div className="relative w-full border rounded-lg border-yellow-400 border-opacity-20 h-full lg:h-auto">
              <Image
                objectFit="cover"
                src={product.images[1]}
                alt={product.title}
                width={100}
                height={0} // This will be automatically adjusted based on the width
                layout="responsive"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-between  gap-4">
              <h1 className=" text-2xl min-[360px]:text-3xl font-bold ">
                {product.title}
              </h1>
              <h2 className=" text-xl min-[360px]:text-2xl font-semibold ">
                ${product.price}
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
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex gap-4 mt-4 relative w-full h-full lg:h-auto">
              {product.images.map((image, index) => (
                <div key={index} className="">
                  <Image
                    src={image}
                    alt={`${product.title} ${index}`}
                    // This will be automatically adjusted based on the width
                    objectFit="cover"
                    // This will be automatically adjusted based on the width
                    layout="responsive"
                    className="rounded-lg shadow-md"

                  />
                </div>
              ))}
            </div>
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
