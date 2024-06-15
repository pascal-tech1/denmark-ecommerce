import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SideProducts = ({
  images,
  heading
}: {
  images: { src: StaticImageData; description: string; price: number }[];
  heading: string;
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/productdetail/90');
  };

  return (
    <div className="flex flex-col border dark:border-neutral-800 p-4 rounded-lg  ">
      <div className=" flex items-center text-center mt-3  drop-shadow-lg font-bold flex-col">
        {heading}
        <div className=" border-b  border-b-yellow-400 w-28 pt-2 "></div>
      </div>
      {images.slice(0, 4).map((image, index) => (
        <div
          key={index}
          className="w-full group py-2 px-2 flex gap-3 justify-self-start items-center"
        >
          <div onClick={handleCardClick} className="bg-gray-300 overflow-hidden cursor-pointer rounded-md flex-shrink-0">
            <Image
              src={image.src}
              alt={image.description}
              className="object-cover  group-hover:scale-105 rounded-md w-[4rem] h-[4rem]"
            />
          </div>
          <div className=" flex-1  flex flex-col gap-3 ">
            <h2 onClick={handleCardClick} className="text-sm  hover:text-yellow-500 dark:hover:text-yellow-100 cursor-pointer transition-transform duration-300">{image.description}</h2>
            <p className="text-sm text-gray-800 dark:text-neutral-400">
              Price: &#8358; {image.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideProducts;
