import mongoose from "mongoose";

const collection = "message";

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model(collection, schema);
export default chatModel;
