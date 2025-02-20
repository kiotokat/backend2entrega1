import { Schema, model } from "mongoose";

const userSchema = new Schema({
  photo: { type: String, default: "/default-user.png" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
});

export default model("User", userSchema);
