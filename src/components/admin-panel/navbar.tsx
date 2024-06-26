"use client";
import React, { useState, useEffect, useRef } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCartIcon, X } from "lucide-react";
import { Input } from "../ui/input";

export function Navbar() {
  const [value, setValue] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    console.log(value);
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
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex justify-around gap-4 h-14 items-center">
        <div>
          <SheetMenu />
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setIsSearch(!isSearch)}
          className={cn(isSearch ? "hidden" : "inline-block", "rounded-l-none bg-transparent md:hidden")}
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
        <div ref={searchRef} className="flex-1">
          <form onSubmit={onSubmit} className="relative w-full flex items-center">
            <Input
              ref={inputRef}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
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
        <div className={cn(isSearch ? "hidden" : "flex", "items-center space-x-4")}>
          <ShoppingCartIcon />
          <UserNav />
        </div>
        <div className={cn(isSearch ? "hidden" : " hidden md:flex")}>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
