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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useStore } from "zustand";
import { useCartStore } from "@/hooks/use-cart";

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const [showFeatures, setShowFeatures] = useState(false);
    const { addToCart, updateQuantity, } = useStore(useCartStore, (state) => state);
    const router = useRouter()
    const { isPending, error, data } = useQuery({
        queryKey: [id],
        queryFn: () => axios(`/routes/fetchSingleProduct?productId=${id}`).then(res => res.data),
    });

    useEffect(() => {
        const handleResize = () => {
            const topDiv = document.querySelector(".top-div") as HTMLElement | null;
            if (topDiv) {
                setShowFeatures(topDiv.offsetWidth >= 940);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAddToCart = () => {
        console.log(data?.product?._id)
        addToCart({ imageUrl: data?.product?.imageUrl, title: data?.product?.title, _id: data?.product?._id, price: data?.product?.price, blurImage: data?.product?.blurImage })
        updateQuantity(data?.product?._id, quantity)
    };

    const handleCheckout = () => {
        addToCart({ imageUrl: data?.product?.imageUrl, title: data?.product?.title, _id: data?.product?._id, price: data?.product?.price, blurImage: data?.product?.blurImage })
        router.push('/cart');
        updateQuantity(data?.product?._id, quantity)
    };

    if (isPending) {
        return <h1>Loading...</h1>;
    }


    return (
        <ContentLayout title="Product Detail">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Product</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-center mt-6 items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                <div className="lg:p-12">
                    <div
                        className={cn(
                            showFeatures ? "flex-row" : "flex-col",
                            "top-div relative rounded-lg flex gap-12"
                        )}
                    >
                        <div
                            className={cn(
                                showFeatures && "max-w-[700px] relative",
                                "h-full w-full border rounded-lg border-opacity-20"
                            )}
                        >
                            <Image
                                src={data?.product?.imageUrl}
                                alt={data?.product?.title}
                                height={400}
                                width={400}
                                blurDataURL={`data:image/jpeg;base64,${data?.product?.blurImage}`}
                                placeholder="blur"
                                className="object-cover h-full w-full rounded-md transition-transform group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="flex flex-col my-2 gap-6">
                            <h1 className="text-2xl">{data?.product?.title}</h1>
                            <h2 className="text-lg font-semibold">
                                &#8358; {data?.product?.price}
                            </h2>
                            <div>
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
                            <div className="flex gap-6">
                                <Button
                                    variant="default"
                                    onClick={handleAddToCart}
                                    className="bg-yellow-300 rounded-md"
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCheckout}
                                    className="border border-yellow-300 rounded-md"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-gray-700 dark:text-gray-400 max-w-[900px]">
                        <h3 className="text-xl font-semibold mb-2">Description</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data?.product.description
                            }}
                        />
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">More Products</h3>
                        <div className="">{/* <Products images={imageData} /> */}</div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
};

export default ProductDetail;
