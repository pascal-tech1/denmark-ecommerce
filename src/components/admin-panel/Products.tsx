import React from "react";
import ProductItem from "./ProductItem";

const Products = ({ images }: any) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]   md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 h-max  rounded-lg">
      {images.map((image: any, index: number) => (
        <ProductItem
          key={index}
          image={image.src}
          description={image.description}
          price={image.price}
          category={image.category}
        />
      ))}
    </div>
  );
};

export default Products;
