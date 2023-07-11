import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purcharser: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;
