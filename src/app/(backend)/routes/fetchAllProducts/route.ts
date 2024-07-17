import { connectDB } from "../../config/MongoDbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";
import User from "../../models/User";
import { isValidObjectId } from "mongoose";
import { ObjectId } from 'mongodb';

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const minPrice = searchParams.get("minPrice")?.trim();
    const maxPrice = searchParams.get("maxPrice")?.trim();
    const selectedSort = searchParams.get("selectedSort")?.trim();
    const query = searchParams.get("query")?.trim();
    const subCategory = searchParams.get("subcategory")?.trim();
    const category = searchParams.get("category")?.trim();
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "3");
    console.log("console", cursor, limit, minPrice, maxPrice, selectedSort, query, subCategory, category);

    const filter: any = {};

    if (category) {
      filter.category = { $regex: new RegExp(category as string, "i") };
    }

    if (subCategory) {
      filter.subCategory = { $regex: new RegExp(subCategory as string, "i") };
    }

    if (query) {
      filter.$text = { $search: query };
    }

    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    let sort: any = {};

    if (selectedSort === "highest price") {
      sort.price = -1;
    } else if (selectedSort === "lowest price") {
      sort.price = 1;
    } else if (selectedSort === "most popular") {
      sort.numView = -1;
    }


    if (cursor && cursor.length > 8) {
      filter._id = { $gt: new ObjectId(cursor.trim()) };
    }

    await User.find({});

    // Count the total number of matching products

    const totalProducts = await Product.countDocuments(filter);

    const allProducts = await Product.find(filter)
      .populate({
        path: "user",
        select: "first_name",
      })
      .select(["-description"])
      .sort(sort)
      .limit(limit + 1);


    const hasNextPage = allProducts.length > limit;
    const productsToSend = hasNextPage ? allProducts.slice(0, -1) : allProducts;
    const nextCursor = hasNextPage ? productsToSend[productsToSend.length - 1]._id : null;

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products: productsToSend,
        nextCursor,
        totalProducts, // Include total count in the response
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
