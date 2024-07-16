import Product from "../../models/Product";
import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "../../middleWare/authMiddleWare";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import User from "../../models/User";
import { connectDB } from "../../config/MongoDbConfig";
// Define the POST handler
export const POST = async (request: NextRequest) => {
  try {
    const loginUser = await currentUser();

    if (loginUser?.privateMetadata?.admin !== true) {
      return NextResponse.json(
        { message: "You are not allowed to perform this operation" },
        { status: 401 }
      );
    }
    connectDB();
    const dbUser = await User.findOne({ clerk_id: loginUser.id });
    console.log(dbUser);
    // Parse the request body
    const reqBody = await request.json();
    const {
      title,
      price,
      description,
      image,
      category,
      blurImage,
      subCategory
    } = reqBody;

    // Create the new product
    await Product.create({
      title,
      price,
      description,
      subCategory,
      imageUrl: image,
      numView: 0,
      user: dbUser._id,
      category,
      blurImage
    });

    // Return success response
    return NextResponse.json(
      { status: "success", message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("error", error);
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
