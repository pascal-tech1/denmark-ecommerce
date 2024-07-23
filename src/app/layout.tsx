import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

// export const metadata: Metadata = {
//   metadataBase: new URL(
//     process.env.APP_URL
//       ? `${process.env.APP_URL}`
//       : process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}`
//       : `http://localhost:${process.env.PORT || 3000}`
//   ),
//   title: "All types of Men's Fashions ",
//   description:
//     "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in Nigeria, Ekiti, Ado Ekiti, Lagos, Port Harcourt, Abuja, Enugu, delivering nationwide.",
//   alternates: {
//     canonical: "/"
//   },
//   openGraph: {
//     url: "/",
//     title: "Men's Fashion Store",
//     description:
//       "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in Nigeria, Ekiti, Ado Ekiti.",
//     type: "website",
//     images: {
//       url: "https://ucarecdn.com/6d6f99f7-f783-4768-8504-40f889527280/thumnail.png",
//       width: 1200,
//       height: 630,
//       alt: "Men's Fashion Store"
//     }
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Men's Fashion Store",
//     description:
//       "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in Nigeria, Ekiti, Ado Ekiti.",
//     images: {
//       url: "https://ucarecdn.com/6d6f99f7-f783-4768-8504-40f889527280/thumnail.png",
//       width: 1200,
//       height: 630,
//       alt: "Men's Fashion Store"
//     }
//   }
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Mens Fashion Store</title>
        <meta
          name="description"
          content="Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in Nigeria, Ekiti, Ado Ekiti."
        />

        <meta property="og:url" content="https://www.denmarkmultibuzltd.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Men's Fashion Store" />
        <meta
          property="og:description"
          content="Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in Nigeria, Ekiti, Ado Ekiti."
        />
        <meta
          property="og:image"
          content="https://cdn-user-public.veed.io/animatedProjectThumbnails/040c767f-cab2-4715-962a-919e7d4c0557.gif"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="denmarkmultibuzltd.com" />
        <meta
          property="twitter:url"
          content="https://www.denmarkmultibuzltd.com"
        />
        <meta name="twitter:title" content="Men's Fashion Store" />
        <meta
          name="twitter:description"
          content="Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in Nigeria, Ekiti, Ado Ekiti."
        />
        <meta
          name="twitter:image"
          content="https://cdn-user-public.veed.io/animatedProjectThumbnails/040c767f-cab2-4715-962a-919e7d4c0557.gif"
        />
      </Head>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>{children}</AdminPanelLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
