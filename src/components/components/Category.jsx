import Image from "next/image";
import bag from "@/images/svg/bag.svg";
import coat from "@/images/svg/coat.svg";

import dress from "@/images/svg/dress.svg";
import glasses from "@/images/svg/glasses.svg";
import hat from "@/images/svg/hat.svg";
import jacket from "@/images/svg/jacket.svg";
import jewelry from "@/images/svg/jewelry.svg";
import perfume from "@/images/svg/perfume.svg";
import shoes from "@/images/svg/shoes.svg";
import shorts from "@/images/svg/shorts.svg";
import watch from "@/images/svg/watch.svg";

const Category = () => {
  const categories = [
    { src: bag, name: "Dress & Frock" },
    { src: coat, name: "Winter Wear" },
    {
      src: watch,
      name: "luxurious watches",
    },
    {
      src: jewelry,
      name: "jewelries",
    },
    {
      src: shorts,
      name: "short & jeans",
    },
    {
      src: glasses,
      name: "glasses & lens",
    },
    {
      src: shorts,
      name: "short & jeans",
    },
    {
      src: jacket,
      name: "jacket wears",
    },
  ];

  return (
    <div className="flex text-sm  justify-between gap-10 w-[90vw] overflow-auto my-6 py-4 mb-10 text-black text-bold">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex gap-10 py-3 px-4 ring-1 rounded-md min-w-fit"
        >
          <div className=" bg-gray-300 min-w-fit max-h-fit dark:bg-gray-800 p-4 rounded-md">
            <Image
              src={category.src}
              alt={category.name}
              width={30}
              height={30}
            />
          </div>
          <div className=" flex flex-col gap-4">
            <div className="">
              <h3 className="  text-gray-900 font-bold dark:text-gray-300">{category.name}</h3>
            </div>
            <a href="#" className=" text-gray-900 dark:text-yellow-200  hover:text-gray-400 transition-all duration-100">
              Show all 
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
