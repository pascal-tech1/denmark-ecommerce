import { NextApiRequest, NextApiResponse } from "next";

import User from "../../models/User";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../config/MongoDbConfig";

export const POST = async (request: NextRequest) => {
  // await clientPromise;
  const reqBody = await request.json();

  await connectDB();
  const { firstName, lastName, email, password, phoneNumber } = reqBody;
  console.log(reqBody);
  // finding if user exist in mongoDb database using the mongodb findOne method

  const userExist = await User.findOne({ email });
  if (userExist) {
    return NextResponse.json(
      {
        message: "User already exists, try a different email"
      },
      { status: 401 }
    );
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    });
    return NextResponse.json(
      {
        status: "success",
        message: "Account created successfully",
        userEmail: user.email
      },
      { status: 201 }
    );
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
