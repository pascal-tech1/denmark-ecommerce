import { connectDB } from "../../config/MongoDbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";

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
    const page = parseInt(searchParams.get("cursor") as string);
    const limit = parseInt(searchParams.get("limit") || "10");
    const heading = searchParams.get("heading")


    const matchStage: any = {};
    if (category) matchStage.category = { $regex: new RegExp(category, "i") };
    if (subCategory) matchStage.subCategory = { $regex: new RegExp(subCategory, "i") };
    if (query) matchStage.$text = { $search: query };
    if (minPrice) matchStage.price = { ...matchStage.price, $gte: Number(minPrice) };
    if (maxPrice) matchStage.price = { ...matchStage.price, $lte: Number(maxPrice) };

    const sortStage: any = {};
    if (selectedSort === "highest price") sortStage.price = -1;
    else if (selectedSort === "lowest price") sortStage.price = 1;
    else if (selectedSort === "most popular" || heading == "Best Sellers") sortStage.numView = -1;
    else if (heading === "New Products") sortStage.updatedAt = -1
    else sortStage._id = 1; // Default sort by _id to ensure there's always a sort key
    const skip = (page) * limit;

    const aggregationPipeline = [
      { $match: matchStage },
      { $sort: sortStage },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: "$user" },
      { $project: { description: 0, "user.password": 0 } },
      { $skip: skip },
      { $limit: limit + 1 },
    ];

    const allProducts = await Product.aggregate(aggregationPipeline);

    const hasNextPage = allProducts.length > limit;
    const productsToSend = hasNextPage ? allProducts.slice(0, limit) : allProducts;
    const nextCursor = hasNextPage ? page + 1 : null;

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products: productsToSend,
        nextCursor,
        totalProducts: await Product.countDocuments(matchStage),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
