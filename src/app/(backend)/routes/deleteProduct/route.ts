import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../config/MongoDbConfig";
import Product from "../../models/Product";


export const DELETE = async (req: NextRequest) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return new NextResponse(JSON.stringify({ message: "Product ID is required" }), { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Product deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
};
