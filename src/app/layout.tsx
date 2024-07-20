import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";


const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Denmark Single Product Page",
  description:
    "just found this wonderfull product available on denmarkmulbizltd.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "https://www.denmarkmultibuzltd.com/productdetail/669837055c645243fae405cc",
    title: "title in openGraph",
    description:
      " accessories, and more, all with free shipping.",
    type: "website",
    images:
    {
      url: 'https://www.denmarkmultibuzltd.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdztt3ldiy%2Fimage%2Fupload%2Fv1721251502%2FWhatsApp_Image_2024-07-09_at_4.50.59_AM_snpybj.jpg&w=640&q=75',
      width: 1200,
      height: 630,
      alt: "Men's Fashion Store"
    }

  },

  // export const metadata: Metadata = {
  //   metadataBase: new URL(
  //     process.env.APP_URL
  //       ? `${process.env.APP_URL}`
  //       : process.env.VERCEL_URL
  //         ? `https://${process.env.VERCEL_URL}`
  //         : `http://localhost:${process.env.PORT || 3000}`
  //   ),
  //   title: "Men's Fashion Store",
  //   description:
  //     "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping.",
  //   alternates: {
  //     canonical: "/"
  //   },
  //   openGraph: {
  //     url: "/",
  //     title: "Denmark Men's Fashion Store",
  //     description:
  //       "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping.",
  //     type: "website",
  //     images: [
  //       {
  //         url: "https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75",
  //         width: 1200,
  //         height: 630,
  //         alt: "Men's Fashion Store"
  //       }
  //     ]
  //   },
  //   twitter: {
  //     card: "summary_large_image",
  //     title: "Men's Fashion Store",
  //     description:
  //       "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping.",
  //     images: [
  //       {
  //         url: "https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75",
  //         alt: "Men's Fashion Store"
  //       }
  //     ]
  //   }
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
