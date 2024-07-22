"use client";
import { useCartStore } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Edit, Ellipsis, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { Button } from "../ui/button";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import ShareButton from "./shareButton";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { uptimizeCloudinaryImage } from "@/hooks/imageCloudinaryOptimizer";
import { useUser } from "@clerk/nextjs";

const ProductItem = ({
  imageUrl,
  title,
  price,
  subCategory,
  category,
  blurImage,
  _id
}: any) => {
  const router = useRouter();
  const { addToCart, cartItems } = useStore(useCartStore, (state) => state);
  const { toast } = useToast();
  const [optimizedImageUrl, setOptimizedImageUrl] = useState(imageUrl);

  const handleCardClick = () => {
    router.push(`/productdetail/${_id}`);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const fetchOptimizedImage = async () => {
      try {
        const optimizedUrl = await uptimizeCloudinaryImage(
          "q_auto,f_auto,w_300",
          imageUrl
        );
        setOptimizedImageUrl(optimizedUrl);
      } catch (error) {
        console.error("Failed to optimize image:", error);
      }
    };

    fetchOptimizedImage();
  }, [imageUrl]);
  console.log(imageUrl);
  const addToCartHandler = (product: any) => {
    addToCart(product);
    toast({
      description: "Product added to cart successfully"
    });
  };

  const blurdata = `data:image/jpeg;base64,${blurImage}`;

  const { isSignedIn, user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      if (user.publicMetadata.admin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [isSignedIn, user]);

  return (
    <div className="flex flex-col gap-4 justify-between max-w-[300px] p-2 md:p-4 relative group">
      <div
        onClick={handleCardClick}
        className="overflow-hidden cursor-pointer rounded-md relative h-[10rem]"
      >
        <Image
          src={optimizedImageUrl}
          alt={title}
          layout="fill"
          blurDataURL={blurdata}
          placeholder="blur"
          className={cn(
            "object-cover w-full h-full rounded-md transition-transform group-hover:scale-125"
          )}
        />
      </div>
      <div>
        <h2
          onClick={handleCardClick}
          className="dark:text-neutral-200  mb-2 hover:text-yellow-500 dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300 truncate whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {title}
        </h2>

        <div className=" flex justify-between items-center">
          <p className="text-gray-800 font-bold dark:text-neutral-200">
            &#8358; {price}
          </p>
          <ShareButton
            title={`${title}`}
            text="Check out this wonderful product"
            url={`/productdetail/${_id}`}
          />
          {isAdmin && (
            <Link href={`/create-product?id=${_id}`}>
              <Button variant={"outline"} className="">
                <Edit size={18} />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Button
        onClick={() =>
          addToCartHandler({ imageUrl, title, price, blurImage, _id })
        }
        variant={"ghost"}
        className="bg-accent hover:bg-background text-accent-foreground border border-opacity-30 border-yellow-700 whitespace-nowrap"
      >
        <ShoppingCartIcon size={18} className="mr-4" />
        <p>Add to Cart</p>
      </Button>
    </div>
  );
};

export default ProductItem;
