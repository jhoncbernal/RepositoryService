import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "What is your email?"],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },

    name: { type: String, required: [true, "What is your name?"] },
    phone: {
      type: Number,
      unique: true,
      required: [true, "What is your contact number?"],
    },
    company: { type: String, required: [true, "What is your company name?"] },
  },
  { timestamps: true }
);

UserSchema.path("email").validate(function (email: string) {
  const emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email); // Assuming email has a text attribute
}, "The e-mail field cannot be empty or with out email structure.");

export const User = model("User", UserSchema);
