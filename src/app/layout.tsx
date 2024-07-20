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
    "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Men's Fashion Store",
    description:
      "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping.",
    type: "website",
    images: [
      {
        url: "https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "Men's Fashion Store"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Men's Fashion Store",
    description:
      "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping.",
    images: [
      {
        url: "/images/twitter-card.jpg",
        alt: "Men's Fashion Store"
      }
    ]
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
          <AdminPanelLayout>


            {children}
          </AdminPanelLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
