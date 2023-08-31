import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
const userSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    photo: { type: String, ref: "File" },
    name: { type: String },
    auth: { type: String, ref: "Auth", required: true },
    role: { type: String, required: true, default: "user" },
    acceptPolicity: { type: Boolean, required: true, default: false },
    contactNumber: { type: String, required: true },
    documentId: {
      type: Number,
    },
    friendsAndFamily: [{ type: String, ref: "User" }],
    policyHistory: [
      {
        version: { type: String, required: true },
        acceptedDate: { type: Date, required: true, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = model("User", userSchema);

export { User, userSchema };
