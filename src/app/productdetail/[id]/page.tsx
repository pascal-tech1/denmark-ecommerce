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
    title: "Denmark single Product page",
    description:
      "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in nigeria, ekiti, Ado ekiti, lagos, Portharcourt, Abuja, enugu delivering nation wide.",
    alternates: {
      canonical: "/"
    },
    openGraph: {
      url: "/",
      title: "denmark single product page",
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
      title: "denmark single product page",
      description:
        "Discover the latest in men's fashion at our online store. Shop a wide range of clothing, accessories, and more, all with free shipping in nigeria ekiti Ado ekiti.",
      images: {
        url: "https://ucarecdn.com/6d6f99f7-f783-4768-8504-40f889527280/thumnail.png",
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
