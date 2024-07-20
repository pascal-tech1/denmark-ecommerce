import ProductDetail from "@/components/admin-panel/productDetailComp";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
    url: "/",
    title: "title in openGraph",
    description:
      " accessories, and more, all with free shipping.",
    type: "website",
    images: [
      {
        url: `https://denmark-ecommerce.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75`,
        width: 1200,
        height: 630,
        alt: "Men's Fashion Store"
      }
    ]
  },

};

export default function ProductDetailPage() {
  return (

    <div>
      <ProductDetail />
    </div>
  );
}
