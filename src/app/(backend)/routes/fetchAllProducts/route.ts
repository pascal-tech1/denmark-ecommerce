import { connectDB } from "../../config/MongoDbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const subCategory = searchParams.get("subcategory");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const selectedSort = searchParams.get("selectedSort");

    // Create a filter object
    const filter: any = {};
    console.log("searchParams", searchParams.toString());
    console.log(
      "searchParams",
      query,
      subCategory,
      category,
      maxPrice,
      minPrice,
      selectedSort
    );

    if (category) {
      filter.category = { $regex: new RegExp(category as string, "i") }; // Case-insensitive search
    }

    if (subCategory) {
      filter.subCategory = { $regex: new RegExp(subCategory as string, "i") };
    }

    // Full-text search if query is provided
    if (query) {
      filter.$text = { $search: query };
    }

    // Price filtering
    if (minPrice) {
      console.log("im inside minPrice", minPrice);
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      console.log("im inside maxPrice", maxPrice);
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    console.log("filter", filter);

    // Sorting
    let sort: any = {};
    if (selectedSort === "highest price") {
      sort.price = -1;
    } else if (selectedSort === "lowest price") {
      sort.price = 1;
    } else if (selectedSort === "most popular") {
      sort.numView = -1; // Assuming there is a 'popularity' field
    }

    const allProducts = await Product.find(filter)
      .select(["-description", "-user"])
      .sort(sort);

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        allProducts
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
