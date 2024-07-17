import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
  clerk_id: string;
  image_url: string;
  last_name: string;
  first_name: string;
  profile_image_url: string;
  email_addresses: string;
  external_accounts: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    clerk_id: { type: String, required: true },
    image_url: { type: String, required: true },
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    profile_image_url: { type: String, required: true },
    email_addresses: { type: String, required: true }, // email_addresses should be an array of strings
    external_accounts: { type: String }, // external_accounts as a string array
    isAdmin: { type: Boolean }
  },
  {
    timestamps: true
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
