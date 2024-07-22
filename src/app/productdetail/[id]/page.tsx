import ProductDetail from "@/components/admin-panel/productDetailComp";
import { Metadata } from "next";

export default async function ProductDetailPage({ params }: any) {
  const metadata: Metadata = {
    metadataBase: new URL(
      process.env.APP_URL
        ? `${process.env.APP_URL}`
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`
    ),
    title: "Product detail",
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
        url: "https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75",
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
        url: "https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "Men's Fashion Store"
      }
    }
  };
  return (
    <div>
      <ProductDetail />
    </div>
  );
}
