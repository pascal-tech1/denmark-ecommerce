import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Shirt,
  Footprints,
  Watch,
  GraduationCap,
  Glasses,
  Luggage,
  Home
} from "lucide-react";

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
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Home",
          active: pathname.includes("/home"),
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
              href: "/shirts",
              label: "Shirts",
              active: pathname === "/shirts"
            },
            {
              href: "/shorts",
              label: "Shorts",
              active: pathname === "/shorts"
            },
            {
              href: "/pants",
              label: "Pants",
              active: pathname === "/pants"
            },
            {
              href: "/jeans",
              label: "Jeans",
              active: pathname === "/jeans"
            },
            {
              href: "blazers&suites",
              label: "blazers and suites",
              active: pathname === "/blazers&suites"
            },
            {
              href: "jackets",
              label: "Jackets",
              active: pathname === "/jackets"
            }
          ]
        },
        {
          href: "/footwear",
          label: "FootWear",
          active: pathname.includes("/footwear"),
          icon: Footprints,
          submenus: []
        },
        {
          href: "/watches",
          label: "Watches",
          active: pathname.includes("/watches"),
          icon: Watch,
          submenus: []
        },
        {
          href: "/cap",
          label: "Cap",
          active: pathname.includes("/cap"),
          icon: GraduationCap,
          submenus: []
        },
        {
          href: "/sunglasses",
          label: "Sunglasses",
          active: pathname.includes("/sunglasses"),
          icon: Glasses,
          submenus: []
        },
        {
          href: "/bags",
          label: "Bags",
          active: pathname.includes("/bags"),
          icon: Luggage,
          submenus: []
        },
        {
          href: "/others",
          label: "Others",
          active: pathname.includes("/others"),
          icon: Luggage,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users Profile",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
