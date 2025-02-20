import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, default: "/default-product.png" },
  category: { type: String, default: "General" },
  price: { type: Number, default: 1 },
  stock: { type: Number, default: 1 },
});

export default model("Product", productSchema);
