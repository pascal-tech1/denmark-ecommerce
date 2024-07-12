// src/pages/api/login.ts

import { connectDB } from "../../config/MongoDbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // Extract the category query parameter from the request
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const product = await Product.findById(productId).select("-user");

    if (product) {
      product.numView = (product.numView || 0) + 1;
      await product.save();
    }

    return NextResponse.json(
      {
        message: "Product fetched successfully",
        product
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
