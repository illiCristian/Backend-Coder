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
    documents: {
      type: [
        {
          name: { type: String, required: true },
          reference: { type: String, required: true },
        },
      ],
      default: [],
    },
    last_connection: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      require: true,
      enums: ["completo", "incompleto", "pendiente"],
      default: "pendiente",
    },
    avatar: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model(collection, userSchema);

export default userModel;
