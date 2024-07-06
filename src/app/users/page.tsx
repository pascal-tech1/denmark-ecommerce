"use client";




type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};



import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMenuList } from "@/lib/menu-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DropdownMenuRadioGroupDemo() {
  const [selectedItem, setSelectedItem] = React.useState("");
  const menuList = getMenuList("");

  const renderCategoryItems = (groupLabel: string, menus: Menu[]) => {
    return (
      <>
        <DropdownMenuLabel>{groupLabel}</DropdownMenuLabel>
        {menus.map((menu) => (
          <React.Fragment key={menu.label}>
            {menu.submenus.length > 0 && (
              <>
                <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>
                {menu.submenus.map((submenu) => (
                  <DropdownMenuRadioItem
                    key={submenu.label}
                    value={submenu.label}
                  >
                    {submenu.label}
                  </DropdownMenuRadioItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedItem || "Select an option"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <ScrollArea>
          <DropdownMenuRadioGroup
            value={selectedItem}
            onValueChange={setSelectedItem}
            className=" overflow-y-auto h-[60vh] overflow-x-hidden"
          >
            {menuList
              .filter((group) => group.groupLabel === "Category")
              .map((group) => (
                <React.Fragment key={group.groupLabel}>
                  {renderCategoryItems(group.groupLabel, group.menus)}
                </React.Fragment>
              ))}
          </DropdownMenuRadioGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
