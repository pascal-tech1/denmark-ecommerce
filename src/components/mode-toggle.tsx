"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Laptop } from "lucide-react";
import { cn } from "@/lib/utils";


export function ModeToggle() {

  const { setTheme, theme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon />;
      case 'dark':
        return <MoonIcon />;
      case 'system':
      default:
        return <Laptop />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
      default:
        return 'System';
    }
  };
  return (

    <div className=" ">
      <div className="hidden md:flex items-center gap-4 border border-yellow-400 border-opacity-20 bg-[#eeecec] dark:bg-neutral-900 p-1 px-2 rounded-xl">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                className={cn(theme === "light" ? "text-yellow-400" : " bg-red-200", "rounded-full w-8 h-8 bg-background")}
                variant="outline"
                size="icon"
                onClick={() => setTheme("light")}
              >
                <SunIcon />
                <TooltipContent side="bottom">Light Mode</TooltipContent>
              </Button>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip delayDuration={100}>

            <TooltipTrigger asChild>
              <Button
                className={cn(theme === "dark" ? "text-yellow-200" : " bg-red-200", "rounded-full w-8 h-8 bg-background")}
                variant="outline"
                size="icon"
                onClick={() => setTheme("dark")}
              >

                <MoonIcon />
                <TooltipContent side="bottom">Dark Mode</TooltipContent>
              </Button>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip delayDuration={100}>

            <TooltipTrigger asChild>
              <Button
                className={cn(theme === "system" ? "text-yellow-400" : " bg-red-200", "rounded-full w-8 h-8 bg-background")}
                variant="outline"
                size="icon"
                onClick={() => setTheme("system")}
              >
                <Laptop className="w-[1.2rem] h-[1.2rem]" />
                <TooltipContent side="bottom">System Mode</TooltipContent>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>


      </div>
      <div className=" md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 items-center">
              {getThemeIcon()}
              {getThemeLabel()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Toggle Theme Mode</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem onClick={() => setTheme('light')} value="light" className="flex gap-4">
                <SunIcon /> Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setTheme('dark')} value="dark" className="flex gap-4">
                <MoonIcon /> Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setTheme('system')} value="system" className="flex gap-4">
                <Laptop /> System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
