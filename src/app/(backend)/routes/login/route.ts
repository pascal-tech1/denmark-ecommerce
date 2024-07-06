// src/pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import bcryptjs from "bcryptjs";
import User from "../../models/User";

import { connectDB } from "../../config/MongoDbConfig";
import { generateToken } from "../../utils/token";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  console.log("after connect to db");
  const reqBody = await req.json();
  const { email, password } = reqBody;
  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());
    console.log(token);

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600 // Cookie expiration time in seconds
    });
    return response;
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
