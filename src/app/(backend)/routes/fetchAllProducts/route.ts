// src/pages/api/login.ts

import { connectDB } from "../../config/MongoDbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // Extract the category query parameter from the request
    const { searchParams } = new URL(req.url);
    const subCategory = searchParams.get("subcategory");
    const category = searchParams.get("category");

    // Create a filter object
    const filter: any = {};
    if (category) {
      filter.subCategory = { $regex: new RegExp(subCategory as string, "i") };
      filter.category = { $regex: new RegExp(category, "i") }; // Case-insensitive search
    }
    console.log("filter", filter);
    const allProducts = await Product.find(filter).select([
      "-description",
      "-user"
    ]);

    return NextResponse.json(
      {
        message: "product fetched successfully",
        allProducts
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
