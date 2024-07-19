import React from "react";
import { DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator } from "../ui/dropdown-menu";

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




export const renderCategoryItems = (groupLabel: string, menus: Menu[]) => {
    return (
        <>
            {menus.map((menu) => (
                <React.Fragment key={menu.label}>
                    <>
                        <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>
                        {menu.submenus.length === 0 && (
                            <DropdownMenuRadioItem value={menu.label}>
                                {menu.label}
                            </DropdownMenuRadioItem>
                        )}
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
                </React.Fragment>
            ))}
        </>
    );
};