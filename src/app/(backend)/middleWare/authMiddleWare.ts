import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "../config/MongoDbConfig";
import User from "../models/User";
import { verifyToken } from "../utils/token";

export const authenticateToken = async (req: NextRequest) => {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  console.log("token ", token);
  if (!token) {
    console.log("im inside no token");
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    console.log("inside try catch");
    const decoded: any = verifyToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
      console.log("im inside not user");
      return NextResponse.error();
    }
    console.log("end of auth");
    return { user };
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
};
