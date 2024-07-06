import Product from "../../models/Product";
import { NextRequest, NextResponse } from "next/server";
import { authenticateToken } from "../../middleWare/authMiddleWare";

// Define the POST handler
export const POST = async (request: NextRequest) => {
  try {
    const user: any = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

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
    console.log(subCategory);

    // Create the new product
    const product = await Product.create({
      title,
      price,
      description,
      subCategory,
      imageUrl: image,
      numView: 0,
      user: user.user._id,
      category,
      blurImage
    });

    // Return success response
    return NextResponse.json(
      { status: "success", message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
