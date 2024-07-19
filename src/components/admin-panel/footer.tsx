import React from "react";
import { MapPin, Phone, Mail, ArrowUp01, ArrowUp, Bold, AlignEndHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-select";

const footerData: any = [
  {
    section: "POPULAR CATEGORIES",
    items: ["Street Comfort", "Shoes", "Pants", "Analog watches", "Watches"]
  },
  {
    section: "PRODUCTS",
    items: [
      "New Products",
      "Best Sales",
      "Contact Us",
    ]
  },
  {
    section: "CONTACT",
    items: [
      {
        type: "address",
        text: "denmark physical address",
        icon: MapPin
      },
      {
        type: "phone",
        text: "+2347035226775",
        icon: Phone
      },
      {
        type: "email",
        text: "denmarkmultibuzltd.com",
        icon: Mail
      }
    ]
  }
];

const brandDirectory = [
  {
    category: "FASHION",
    items: ["T-Shirt", "Shirts", "Shorts & Jeans", "Jacket", "Innerwear"]
  },
  {
    category: "FOOTWEAR",
    items: [
      "Sport",
      "Formal",
      "Boots",
      "Casual",
      "Cowboy Shoes",
      "Safety Shoes",
      "Party Shoes",
      "Branded",
      "Firstcopy",
      "Long Shoes"
    ]
  },
  {
    category: "Others",
    items: ["Glasses", "Watch", "Bag", "Cap", "Perfume"]
  }
];

export function Footer() {
  return (
    <footer className="  mt-16 px-10 dark:bg-neutral-900 border-t rounded-t-md border-opacity-10  ">
      <div className="">
        <div className=" flex flex-col py-4 md:py-10">

          <h1 className="font-bold pl-3 text-yellow-500">Brand Category</h1>
          {brandDirectory.map((category, index) => (
            <div key={index}>
              <ul className="flex items-center flex-wrap mr-6">
                <h2 className="text-lg font-bold mb-2 pl-3 mr-10">
                  {category.category} :
                </h2>
                {category.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-r my-4 px-3 border-neutral-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className=" mx-auto border-t py-4 md:py-10 border-opacity-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {footerData.map((section: any, index: number) => (
            <div key={index} className="pt-4">
              <div className="flex mt-3 drop-shadow-lg font-bold flex-col">
                <h2 className="text-lg font-bold mb-2">
                  {section.section}
                </h2>
                <div className="border-b border-b-yellow-400 w-28 mt-2 mb-6"></div>
              </div>
              {section.items.map((item: any, idx: any) => (
                <div key={idx} className="py-2 flex ">
                  {section.section === "CONTACT" &&
                    typeof item !== "string" ? (
                    <div className="flex  gap-4 my-2">
                      <item.icon className="w-6 h-6 mr-2" />
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <span>{item}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-center py-4 md:py-10 border-t border-opacity-15 ">
          <p className="text-sm text-gray-600">
            Copyright © Denmark Multibiz ltd All Rights Reserved.
          </p>
        </div>
      </div>

      {/* </DrawerContent> */}
      {/* </Drawer> */}
    </footer>
  );
}
