import { NextApiResponse } from "next";
import { connectDB } from "../../config/MongoDbConfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    // Create a NextResponse object to delete the token cookie
    const response = NextResponse.json({
      message: "You have successfully logged out"
    });

    // Set the cookie to be deleted
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, // Immediate expiration to delete the cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return response;
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
