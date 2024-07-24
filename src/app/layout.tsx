import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Men's Fashions store",

  description:
    "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in nigeria, ekiti, Ado ekiti, lagos, Portharcourt, Abuja, enugu delivering nation wide.",
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
      url: "https://ucarecdn.com/6d6f99f7-f783-4768-8504-40f889527280/thumnail.png",
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
      url: "https://ucarecdn.com/6d6f99f7-f783-4768-8504-40f889527280/thumnail.png",
      width: 1200,
      height: 630,
      alt: "Men's Fashion Store"
    }
  },
  other: {
    name: "google-site-verification",
    content: "3KwE-w0MRMSRzOG9BBHlhdPev9wFzRGKcw8k295OoLk"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta
          name="google-site-verification"
          content="3KwE-w0MRMSRzOG9BBHlhdPev9wFzRGKcw8k295OoLk"
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
