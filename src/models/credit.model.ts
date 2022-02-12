import { Schema, model } from "mongoose";
const CreditSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "What is your email?"],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },

    name: { type: String, required: true },
    phone: {
      type: String,
      unique: true,
      required: [true, "What is your contact number?"],
    },
    creditType: {
      type: String,
      unique: true,
      required: [true, "What is credit type?"],
    },
    value: {
      type: Number,
      required: [true, "What is the amount of the morgage ?"],
    },
  },
  { timestamps: true }
);

CreditSchema.path("email").validate(function (email: string) {
  const emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email); // Assuming email has a text attribute
}, "The e-mail field cannot be empty or with out email structure.");

export const CreditModel = model("Credit", CreditSchema);
