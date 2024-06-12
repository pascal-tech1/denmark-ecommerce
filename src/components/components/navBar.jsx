"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { SearchIcon, X } from "lucide-react";

import logo from "@/images/logo.png";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Clapperboard } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";
import Theme from "@/components/ui/theme";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const NavBar = () => {
  const [value, setValue] = useState("");
  const user = true;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!value) return;
    console.log(value);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <div className="w-full h-22 z-[49]  mt-2  ">
      <nav className="px-4 lg:px-10 border-b  py-1">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
              <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-1 mr-2 shrink-0 lg:mr-0 lg:shrink">
                <Image src={logo} alt="denmarkLogo" height="120" width="120" />
              </div>
              <div className={cn("hidden lg:block", font.className)}>
                <p className="text-muted-foreground">Let&apos;s shop!</p>
              </div>
            </div>
          </Link>
          <div className="z-[100]">
            <Theme />
          </div>
          <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            {!user && <Button size="sm">Login</Button>}
            {!!user && (
              <div className="flex items-center gap-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary"
                  asChild
                >
                  <Link href={`name}`}>
                    <Clapperboard className="h-5 w-5 lg:mr-2" />
                    <span className="hidden lg:block">Dashboard</span>
                  </Link>
                </Button>
                <Button />
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="px-4 lg:px-10 pb-4 pt-1 flex justify-between items-center w-full sticky top-10 z-50 ">
        <NavigationMenu />
        <form
          onSubmit={onSubmit}
          className="relative w-full lg:w-[400px] flex items-center"
        >
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search product name"
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          {value && (
            <X
              className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
              onClick={onClear}
            />
          )}
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="rounded-l-none"
          >
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
