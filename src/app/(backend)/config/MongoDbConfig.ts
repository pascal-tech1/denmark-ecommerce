const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      minPoolSize: 2,
      maxPoolSize: 10
    });
    console.log("MongoDB connected");
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
