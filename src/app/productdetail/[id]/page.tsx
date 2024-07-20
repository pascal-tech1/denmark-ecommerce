import ProductDetail from "@/components/admin-panel/productDetailComp";
import type { Metadata } from "next";
import Head from "next/head";



export default function ProductDetailPage() {



  return (

    <div>
      <Head>
        <meta name="msapplication-TileImage" content="https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75" />
        <meta property="og:site_name" content="Pure Surface" />
        <meta property="og:title" content="225 Days of Self Sanitizing Surface from Coronavirus" />
        <meta property="og:description" content="Just 1 time application" />
        <meta property="og:image" itemProp="image" content="https://www.denmarkmultibuzltd.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbannerone.f814d19f.png&w=3840&q=75" />
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:url" content="https://www.denmarkmultibuzltd.com/productdetail/6696e7b51043a84424903d2c" />
      </Head>
      <ProductDetail />
    </div>
  );
}
