import { GetMenuList } from "@/lib/menu-list";

export function subcategoryToCategoryMap(submenuLabel: string): string {
    const menuList = GetMenuList("/");
    console.log(menuList)
    for (const group of menuList) {
        for (const menu of group.menus) {
            if (menu.label === submenuLabel) {
                return submenuLabel; // The passed string is a parent label itself
            }
            for (const submenu of menu.submenus) {
                if (submenu.label === submenuLabel) {
                    return menu.label; // Return the parent label
                }
            }
        }
    }

    return "Label not found"; // If the label is not found in the menu list
} 