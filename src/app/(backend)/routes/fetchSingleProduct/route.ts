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

    console.log("productid:", productId);
    const product = await Product.findById(productId).select("-user");

    return NextResponse.json(
      {
        message: "product fetched successfully",
        product
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
