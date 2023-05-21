import mongoose from "mongoose";

const collection = "User";

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model(collection, userSchema);

export default userModel;
