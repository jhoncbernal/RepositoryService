import mongoose, { model, Document } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
const { isEmail } = validator;
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export interface IAuthDocument extends Document {
  email: string;
  password?: string;
  provider: "local" | "google" | "facebook";
  providerId?: string;
  enabled: boolean;
  isVerified: boolean;
  isOnline: boolean;
  otpCode?: string;
  comparePasswords(password: string): boolean;
}

const authSchema = new Schema<IAuthDocument>({
  _id: { type: String, default: uuidv4 },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: "Invalid email format",
    },
  },

  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
    default: "local",
  },
  password: {
    type: String,
    required: function (this: IAuthDocument) {
      return this.provider === "local";
    },
  },
  providerId: {
    type: String,
    required: function (this: IAuthDocument) {
      return this.provider !== "local";
    },
  },
  enabled: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  otpCode: { type: String },
});

authSchema.methods.toJSON = function (this: IAuthDocument) {
  const auth = this.toObject();
  delete auth.password;
  delete auth.__v;
  delete auth.otpCode;
  return auth;
};

authSchema.methods.comparePasswords = function (
  this: IAuthDocument,
  password: string
) {
  if (!this.password) throw new Error("Password is not set for this user.");
  return bcrypt.compareSync(password, this.password);
};

authSchema.pre("save", function (this: IAuthDocument, next: Function) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password!, SALT_ROUNDS);
  }
  next();
});

const Auth = model<IAuthDocument>("Auth", authSchema);
export { Auth, authSchema };
