import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model(collection, schema);

export default cartModel;
