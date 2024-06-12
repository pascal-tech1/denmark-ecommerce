"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { FaUser, FaUsers, FaUsersGear } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  BiBookContent,
  BiHistory,
  BiInfoCircle,
  BiMessage,
} from "react-icons/bi";
import { CiSaveDown1, CiSettings } from "react-icons/ci";
import { RiBookReadLine, RiUserFollowFill } from "react-icons/ri";
import {
  MdAdminPanelSettings,
  MdCategory,
  MdOutlineArrowDropDown,
  MdOutlineCreate,
} from "react-icons/md";
import { GiShadowFollower } from "react-icons/gi";
import { BsEye } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";

const NavigationMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sideBarItems = {
    children: [
      {
        title: "Home",
        icon: LuLayoutDashboard,
      },
      {
        title: "Profile",
        icon: FaUser,
        children: [
          {
            title: "details",
            icon: BiInfoCircle,
          },
          {
            title: "message",
            icon: BiMessage,
          },
          {
            title: "views",
            icon: BsEye,
          },
        ],
      },
      {
        title: "Post",
        icon: BiBookContent,
        children: [
          {
            title: "my posts",
            icon: CiSettings,
          },
          {
            title: "create",
            icon: MdOutlineCreate,
          },
          {
            title: "history",
            icon: BiHistory,
          },
          {
            title: "saved",
            icon: CiSaveDown1,
          },
        ],
      },
      {
        title: "Follows",
        icon: GiShadowFollower,
        children: [
          {
            title: "followers",
            icon: FaUsers,
          },
          {
            title: "following",
            icon: RiUserFollowFill,
          },
        ],
      },
    ],
  };

  const AdminObject = {
    title: "Admin",
    icon: MdAdminPanelSettings,
    children: [
      {
        title: "all users",
        icon: FaUsersGear,
      },
      {
        title: "category",
        icon: MdCategory,
      },
      {
        title: "all posts",
        icon: RiBookReadLine,
      },
    ],
  };

  sideBarItems.children.push(AdminObject);

  return (
    <nav className="">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex gap-4   items-center">
            <div className="hidden md:block">
              <div className=" flex items-baseline gap-10 py-6">
                {sideBarItems.children.map((entry) => (
                  <div key={entry.title} className="relative group">
                    <Link
                      href={entry.children ? "#" : `/${entry.title}`}
                      passHref
                      legacyBehavior
                    >
                      <a className=" rounded-md  font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        {entry.title}
                      </a>
                    </Link>
                    {entry.children && (
                      <div className="absolute left-0 z-10 hidden mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 group-hover:block">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {entry.children.map((child) => (
                            <Link
                              key={child.title}
                              href={`/${entry.title}-${child.title}`}
                              passHref
                              legacyBehavior
                            >
                              <a
                                className="block px-4 py-2  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                                role="menuitem"
                              >
                                {child.title}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-800 mr-6 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <HiMenu className="block h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-10 bg-white dark:bg-gray-800 shadow">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sideBarItems.children.map((entry) => (
              <div key={entry.title}>
                <Link
                  href={entry.children ? "#" : `/${entry.title}`}
                  passHref
                  legacyBehavior
                >
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    {entry.title}
                  </a>
                </Link>
                {entry.children && (
                  <div className="ml-4">
                    {entry.children.map((child) => (
                      <Link
                        key={child.title}
                        href={`/${entry.title}-${child.title}`}
                        passHref
                        legacyBehavior
                      >
                        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                          {child.title}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
