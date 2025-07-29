// insertAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const insertAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: "admin@travelmate.com" });

    if (existing) {
      console.log("✅ Admin already exists");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // hash manually

    await User.collection.insertOne({
      email: "admin@travelmate.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin inserted without using pre('save')");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting admin:", error);
    process.exit(1);
  }
};

insertAdmin();
