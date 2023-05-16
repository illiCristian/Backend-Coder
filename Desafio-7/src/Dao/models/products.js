import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const collection = "products";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["pantalones", "remeras", "zapatos", "camisas", "test"],
    },
    status: {
      type: Boolean,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "https://via.placeholder.com/150",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
schema.plugin(mongoosePaginate);
const productModel = mongoose.model(collection, schema);

export default productModel;
