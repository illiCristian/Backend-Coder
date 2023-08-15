import mongoose from "mongoose";

const collection = "User";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      trim: true,
      type: String,
    },
    last_name: {
      trim: true,
      type: String,
    },
    email: {
      trim: true,
      type: String,
      unique: true,
    },
    password: String,
    age: { type: Number },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    role: {
      type: String,
      trim: true,
      default: "user",
      enum: ["user", "admin", "premium"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model(collection, userSchema);

export default userModel;
