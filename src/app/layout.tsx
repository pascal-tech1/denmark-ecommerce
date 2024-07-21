import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Men's Fashion Store",
  description:
    "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in nigeria ekiti Ado ekiti.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Men's Fashion Store",
    description:
      "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in nigeria ekiti Ado ekiti.",
    type: "website",
    images: {
      url: "/src/images/bannerone.png",
      width: 1200,
      height: 630,
      alt: "Men's Fashion Store"
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "Men's Fashion Store",
    description:
      "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in nigeria ekiti Ado ekiti.",
    images: {
      url: "/src/images/bannerone.png",
      alt: "Men's Fashion Store"
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>{children}</AdminPanelLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
