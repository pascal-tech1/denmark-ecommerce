"use client";

import { useStore } from "zustand";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { Sidebar } from "./sidebar";
import { cn } from "../../lib/utils";
import { dark } from '@clerk/themes';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { useTheme } from "next-themes";
import { getTheme } from "./getApliedTheme";
import { Facebook, Mail, Phone } from "lucide-react";

const queryClient = new QueryClient()

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { setTheme, theme } = useTheme();
  if (!sidebar) return null;

  const themeToPassToClerk = getTheme(theme as string) === "light" ? {} : {
    baseTheme: dark,
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider appearance={themeToPassToClerk}>
          <Sidebar />

          <main
            className={cn(
              "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            {children}
          </main>
          <footer
            className={cn(
              "transition-[margin-left] relative ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
          </footer>
        </ClerkProvider >
      </QueryClientProvider>
     
    </>
  );
}
