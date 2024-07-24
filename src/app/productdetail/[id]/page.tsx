import ProductDetail from "@/components/admin-panel/productDetailComp";
import { Metadata } from "next";
import Head from "next/head";

export default async function ProductDetailPage({ params }: any) {
  return (
    <div>
      <Head>
        <meta property="og:image" content="<generated>" />
      </Head>
      <ProductDetail />
    </div>
  );
}
