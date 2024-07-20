
import {
  Tag,
  Users,
  Settings,
  Shirt,
  Footprints,
  Watch,
  Glasses,
  Luggage,
  Home,
  HardHat,
  ListCollapse,
  PencilLine,
  Wrench
} from "lucide-react";
import { useEffect, useState } from "react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const adminMenuList = {
    groupLabel: "Admin Tools",
    menus: [
      {
        href: "/manage-products",
        label: "Manage Products",
        active: pathname.includes("/manage-product"),
        icon: Wrench,
        submenus: []
      },
      {
        href: "/create-product",
        label: "Create Product",
        active: pathname.includes("/create-product"),
        icon: PencilLine,
        submenus: []
      }
    ]
  };

  const baseMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname === "/",
          icon: Home,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Category",
      menus: [
        {
          href: "",
          label: "Clothes",
          active: pathname.includes("/clothes"),
          icon: Shirt,
          submenus: [
            {
              href: "/category?category=clothes&subcategory=shirts",
              label: "Shirts",
              active:
                pathname === "/category?category=clothes&subcategory=shirts"
            },
            {
              href: "/category?category=clothes&subcategory=shorts",
              label: "Shorts",
              active:
                pathname === "/category?category=clothes&subcategory=shorts"
            },
            {
              href: "/category?category=clothes&subcategory=pants",
              label: "Pants",
              active:
                pathname === "/category?category=clothes&subcategory=pants"
            },
            {
              href: "/category?category=clothes&subcategory=jeans",
              label: "Jeans",
              active:
                pathname === "/category?category=clothes&subcategory=jeans"
            },
            {
              href: "/category?category=clothes&subcategory=blazers&suites",
              label: "Blazers and Suites",
              active:
                pathname ===
                "/category?category=clothes&subcategory=blazers&suites"
            },
            {
              href: "/category?category=clothes&subcategory=jackets",
              label: "Jackets",
              active:
                pathname === "/category?category=clothes&subcategory=jackets"
            }
          ]
        },
        {
          href: "",
          label: "Footwear",
          active: pathname.includes("/footwear"),
          icon: Footprints,
          submenus: [
            {
              href: "/category?category=footwear&subcategory=sneakers",
              label: "Sneakers",
              active:
                pathname === "/category?category=footwear&subcategory=sneakers"
            },
            {
              href: "/category?category=footwear&subcategory=boots",
              label: "Boots",
              active:
                pathname === "/category?category=footwear&subcategory=boots"
            },
            {
              href: "/category?category=footwear&subcategory=sandals",
              label: "Sandals",
              active:
                pathname === "/category?category=footwear&subcategory=sandals"
            },
            {
              href: "/category?category=footwear&subcategory=formal shoes",
              label: "Formal Shoes",
              active:
                pathname ===
                "/category?category=footwear&subcategory=formal shoes"
            }
          ]
        },
        {
          href: "",
          label: "Watches",
          active: pathname.includes("/watches"),
          icon: Watch,
          submenus: [
            {
              href: "/category?category=watches&subcategory=analog",
              label: "Analog",
              active:
                pathname === "/category?category=watches&subcategory=analog"
            },
            {
              href: "/category?category=watches&subcategory=digital",
              label: "Digital",
              active:
                pathname === "/category?category=watches&subcategory=digital"
            },
            {
              href: "/category?category=watches&subcategory=smartwatches",
              label: "Smartwatches",
              active:
                pathname ===
                "/category?category=watches&subcategory=smartwatches"
            }
          ]
        },
        {
          href: "",
          label: "Cap",
          active: pathname.includes("/cap"),
          icon: HardHat,
          submenus: [
            {
              href: "/category?category=cap&subcategory=baseball caps",
              label: "Baseball Caps",
              active:
                pathname === "/category?category=cap&subcategory=baseball caps"
            },
            {
              href: "/category?category=cap&subcategory=beanies",
              label: "Beanies",
              active: pathname === "/category?category=cap&subcategory=beanies"
            },
            {
              href: "/category?category=cap&subcategory=snapbacks",
              label: "Snapbacks",
              active:
                pathname === "/category?category=cap&subcategory=snapbacks"
            }
          ]
        },
        {
          href: "",
          label: "Glasses",
          active: pathname.includes("/sunglasses"),
          icon: Glasses,
          submenus: [
            {
              href: "/category?category=glasses&subcategory=sunglasses",
              label: "Sunglasses",
              active:
                pathname === "/category?category=glasses&subcategory=sunglasses"
            },
            {
              href: "/category?category=glasses&subcategory=reading glasses",
              label: "Reading Glasses",
              active:
                pathname ===
                "/category?category=glasses&subcategory=reading glasses"
            },
            {
              href: "/category?category=glasses&subcategory=contact lenses",
              label: "Contact Lenses",
              active:
                pathname ===
                "/category?category=glasses&subcategory=contact lenses"
            }
          ]
        },

      ]
    }
  ];


  return baseMenuList;
}
