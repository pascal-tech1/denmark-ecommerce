import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Import the ShoppingCartIcon from your icon library

const ProductItem = ({ image, description, price, category }: any) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/productdetail/90');
  };
  const addToCart = () => {
    console.log('item added successfully')
  }

  return (
    <div
      className="border border-neutral-200 dark:border-neutral-800 rounded-md p-4  relative group"

    >
      <div onClick={handleCardClick} className="overflow-hidden cursor-pointer rounded-md">
        <Image
          src={image}
          alt={description}
          className="object-cover w-full h-fit rounded-md transition-transform duration-300 group-hover:scale-125"
        />
      </div>
      <div className="mt-4">
        <h2 onClick={handleCardClick} className=" hover:text-yellow-500 dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300">{description}</h2>
        <div className=" relative flex items-center h-full justify-between">
          <h2 className="text-pink-500 dark:text-pink-300 py-2">{category}</h2>
          <div onClick={addToCart} className=" bg-secondary/80 shadow cursor-pointer text-yellow-400 hover:text-foreground rounded-full absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ShoppingCartIcon size={18} className=" " />
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
