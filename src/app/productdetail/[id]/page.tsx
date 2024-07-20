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
    url: "https://www.denmarkmultibuzltd.com/productdetail/669837055c645243fae405cc",
    title: "title in openGraph",
    description:
      " accessories, and more, all with free shipping.",
    type: "website",
    images: [
      {
        url: 'https://www.denmarkmultibuzltd.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdztt3ldiy%2Fimage%2Fupload%2Fv1721251502%2FWhatsApp_Image_2024-07-09_at_4.50.59_AM_snpybj.jpg&w=640&q=75',
        width: 300,
        height: 300,
        alt: "Men's Fashion Store"
      }]

  },

};

export default function ProductDetailPage() {
  return (

    <div>
      <ProductDetail />
    </div>
  );
}
