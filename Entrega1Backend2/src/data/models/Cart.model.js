import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  state: { type: String, enum: ["reserved", "paid", "delivered"], default: "reserved" },
});

export default model("Cart", cartSchema);
