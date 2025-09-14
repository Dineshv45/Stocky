import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    const user = new User({ name: "Test User" });
    await user.save();

    console.log("👉 Test user created:", user);
    process.exit();
  })
  .catch(err => console.error(err));
