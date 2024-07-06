import { useCartStore } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "zustand";

const ProductItem = ({ imageUrl, title, price, subCategory, category, blurImage, _id }: any) => {
  const router = useRouter();
  const { addToCart, cartItems, } = useStore(useCartStore, (state) => state);
  console.log(category, subCategory)
  const handleCardClick = () => {
    router.push(`/productdetail/${[_id]}`);
  };
  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  const addToCartHanler = (product: any) => {
    addToCart(product)
  };

  const blurdata = `data:image/jpeg;base64,${blurImage}`;

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-md  max-w-[300px] p-2 md:p-4 relative group">
      <div onClick={handleCardClick} className="overflow-hidden cursor-pointer  rounded-md relative h-[10rem] lg:h-[13rem]">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          blurDataURL={blurdata}
          placeholder="blur"
          className={cn("object-cover w-full h-full  rounded-md transition-transform group-hover:scale-125")}
        />
      </div>
      <div className="mt-4">
        <h2 onClick={handleCardClick} className="hover:text-yellow-500 dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300">
          {title}
        </h2>
        <div className="relative flex items-center justify-between h-full">
          <h2 className="text-pink-500 dark:text-pink-300 py-2">
            {subCategory || category}
          </h2>
          <div onClick={() => addToCartHanler({ imageUrl, title, price, blurImage, _id })} className="bg-secondary/80 shadow cursor-pointer text-yellow-400 hover:text-foreground rounded-full absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ShoppingCartIcon size={18} className="" />
          </div>
        </div>
        <p className="text-gray-800 dark:text-neutral-200">
          Price: &#8358; {price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
