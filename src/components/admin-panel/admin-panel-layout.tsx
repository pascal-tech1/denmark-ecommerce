"use client";

import { useStore } from "zustand";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { Sidebar } from "./sidebar";
import { cn } from "../../lib/utils";
import { Footer } from "./footer";
import { dark } from '@clerk/themes';


import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import {
  ClerkProvider,

} from '@clerk/nextjs'
import { useTheme } from "next-themes";
import { getTheme } from "./getApliedTheme";
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
              "min-h-[calc(100vh_-_56px)]   transition-[margin-left] top-div ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            {/* <div className="relative h-full w-full bg-slate-950">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          </div> */}
            {children}


          </main>
          <footer
            className={cn(
              "transition-[margin-left] relative  ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            {/* <Footer /> */}
          </footer>
        </ClerkProvider >
      </QueryClientProvider>
    </>
  );
}


