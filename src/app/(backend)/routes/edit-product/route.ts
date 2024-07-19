import Product from "../../models/Product";
import { NextRequest, NextResponse } from "next/server";
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

        await connectDB();
        const dbUser = await User.findOne({ clerk_id: loginUser.id });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("productId")?.trim();
        console.log(id, dbUser)
        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
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

        // Update the product
        product.title = title || product.title;
        product.price = price || product.price;
        product.description = description || product.description;
        product.imageUrl = image || product.imageUrl;
        product.category = category || product.category;
        product.blurImage = blurImage || product.blurImage;
        product.subCategory = subCategory || product.subCategory;
        product.user = dbUser._id

        await product.save();

        // Return success response
        return NextResponse.json(
            { status: "success", message: "Product updated successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.log("error", error);
        // Handle errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
