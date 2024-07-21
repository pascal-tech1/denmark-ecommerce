import { Footer } from "@/components/admin-panel/footer";
import ProductDetail from "@/components/admin-panel/productDetailComp";
import ProductsList from "@/components/admin-panel/Products";

// Dummy function to simulate fetching product data
async function fetchProductData(productId: string) {
  // Replace this with your actual data fetching logic
  return {
    title: "Product Title",
    description: "Detailed view of the product",
    imageUrl: "/src/images/bannerone.png" // Replace with dynamic URL
  };
}

export async function generateMetadata({ params }: any) {
  const { productId } = params;
  const productData = await fetchProductData(productId);

  return {
    title: productData.title,
    description: productData.description,
    openGraph: {
      title: productData.title,
      description: productData.description,
      images: [
        {
          url: productData.imageUrl,
          width: 800,
          height: 600,
          alt: "Product Image"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: productData.title,
      description: productData.description,
      images: [productData.imageUrl]
    }
  };
}

export default async function ProductDetailPage({ params }: any) {
  return (
    <div>
      <ProductDetail />
    </div>
  );
}
