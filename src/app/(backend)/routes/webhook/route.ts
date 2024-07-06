// pages/api/webhooks/user.js
import getRawBody from "raw-body";
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/User";
import { WebhookEvent } from "@clerk/nextjs/server";
import { connectDB } from "../../config/MongoDbConfig";

//   await connectDB();

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();
  console.log(payload);
  console.log("payload", payload);
  switch (payload.type) {
    case "user.created":
      await handleUserCreated(payload.data);
      break;
    case "user.updated":
      await handleUserUpdated(payload.data);
      break;
    case "user.deleted":
      await handleUserDeleted(payload.data);
      break;
    default:
      console.log("Unhandled event type:", payload.type);
  }

  return NextResponse.json({ received: true });
}

const handleUserCreated = async (user: any) => {
  console.log("user", user.email_addresses[0].email_address);
  await User.create({
    clerk_id: user.id,
    last_name: user.last_name,
    image_url: user.image_url,
    first_name: user.first_name,
    profile_image_url: user.profile_image_url,
    email_addresses: user.email_addresses[0].email_address,
    external_accounts: user.external_accounts.email_address,
    isAdmin: false
  });
};

const handleUserUpdated = async (user: any) => {
  const dbUser = await User.findOne({ clerk_id: user.id });
  if (dbUser) {
    image_url: user.image_url,
      (dbUser.last_name = user.last_name),
      (dbUser.first_name = user.first_name),
      (dbUser.profile_image_url = user.profile_image_url),
      (dbUser.email_addresses = user.email_addresses[0].email_address),
      (dbUser.external_accounts = user.external_accounts.email_address),
      await dbUser.save();
  }
};

const handleUserDeleted = async (user: any) => {
  await User.findOneAndDelete({ clerk_id: user.id });
};
