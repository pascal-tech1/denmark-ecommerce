"use client";
import React, { useState, useEffect, useRef } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, Phone, SearchIcon, ShoppingCartIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { useStore } from "zustand";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/use-cart";

export function Navbar() {
  const [value, setValue] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { cartItems } = useStore(useCartStore, (state) => state);

  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    // Construct the URL
    const url = `/category?query=${value}`;
    router.push(url);
  };
  const onClear = () => {
    setValue("");
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  useEffect(() => {
    if (isSearch) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSearch]);

  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="w-full bg-gray-800 text-white overflow-hidden relative">
          <div
            className="whitespace-nowrap py-2 px-4 animate-marquee "
            onMouseEnter={(e) => e.currentTarget.classList.add("paused")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("paused")}
          >
            <span className="mr-4 text-yellow-600">
              Welcome to DenmarkMultibuz Ltd!
            </span>
            <a
              href="https://wa.me/+2349095606300"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center justify-center text-green-600  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fff"
                  d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
                ></path>
                <path
                  fill="#fff"
                  d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
                ></path>
                <path
                  fill="#cfd8dc"
                  d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
                ></path>
                <path
                  fill="#40c351"
                  d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
                ></path>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
                  clipRule="evenodd"
                ></path>
              </svg>
              +2349095606300
            </a>
            <span className="flex gap-2 items-center justify-center ">
              <span>
                <Phone size={14} />
              </span>
              09046779214
            </span>
            <a
              href="mailto:admin@example.com"
              className="flex gap-2 items-center    justify-center"
            >
              <Mail size={14} />
              denmarkmultibuzlimited@gmail.com
            </a>
          </div>
        </div>

        <div className="mx-4 sm:mx-8 flex justify-around gap-4 h-14 items-center">
          <div>
            <SheetMenu />
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setIsSearch(!isSearch)}
            className={cn(
              isSearch ? "hidden" : "inline-block",
              "rounded-l-none bg-transparent md:hidden"
            )}
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
          <div ref={searchRef} className="flex-1">
            <form
              onSubmit={onSubmit}
              className="relative w-full flex items-center"
            >
              <Input
                ref={inputRef}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                placeholder="Search product name"
                className={cn(
                  isSearch ? "w-full opacity-100" : "w-0 opacity-0",
                  "transition-all duration-300 ease-in-out md:w-full md:opacity-100 rounded-r-none focus-visible:ring-0 bg-white rounded-2xl dark:bg-opacity-25 bg-opacity-20 dark:backdrop-blur-md backdrop-blur-md focus-visible:ring-transparent focus-visible:ring-offset-0 dark:bg-neutral-900"
                )}
              />
              {value && (
                <X
                  className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                  onClick={onClear}
                />
              )}
            </form>
          </div>
          <div
            className={cn(
              isSearch ? "hidden" : "flex",
              "items-center space-x-4"
            )}
          >
            <Link href="/cart" className="relative">
              <div className="absolute left-2 -top-3 text-yellow-400 animate-slideUp">
                <h1 className=" text-sm font-bold"> {cartItems.length}</h1>
              </div>
              <ShoppingCartIcon />
            </Link>
            <div>
              <SignedOut>
                <Button variant={"secondary"}>
                  <Link href="/sign-in">Login</Link>
                </Button>
              </SignedOut>
            </div>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className={cn(isSearch ? "hidden" : "hidden md:flex")}>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
