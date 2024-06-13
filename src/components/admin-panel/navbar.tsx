"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { SearchIcon, ShoppingCartIcon, X } from "lucide-react";
import { Input } from "../ui/input";

interface NavbarProps {
  title: string;
}

export function Navbar() {
  const [value, setValue] = useState("");
  const user = true;

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!value) return;
    console.log(value);
  };

  const onClear = () => {
    setValue("");
  };
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex   gap-4 h-14 items-center">
        <div>
          <SheetMenu />
        </div>
        <div className=" mx-auto">
          <form
            onSubmit={onSubmit}
            className="relative  w-full lg:w-[500px] justify-center flex items-center"
          >
            <Input
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              placeholder="Search product name"
              className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 w-full dark:bg-neutral-900"
            />
            {value && (
              <X
                className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                onClick={onClear}
              />
            )}
            {/* <Button
              type="submit"
              size="sm"
              variant="secondary"
              className="rounded-l-none"
            >
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button> */}
          </form>
        </div>

        <div className="flex flex-1 items-center space-x-6 justify-end ">
          <ShoppingCartIcon />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
