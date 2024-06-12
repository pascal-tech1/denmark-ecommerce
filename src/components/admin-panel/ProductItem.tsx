import Image from "next/image";

const ProductItem = ({ image, description, price, category }: any) => {
  return (
    <div className="border border-neutral-200  dark:border-neutral-800 rounded-md p-4 ">
      <Image
        src={image}
        alt={description}
        className="object-cover w-full h-fit rounded-md"
      />
      <div className="mt-4">
        <h2 className="text-pink-500 dark:text-pink-300">{category}</h2>
        <h2 className="">{description}</h2>
        <p className="text-gray-800 dark:text-neutral-200">
          Price: &#8358; {price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
