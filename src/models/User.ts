import mongoose, { Document, Schema, Model } from "mongoose";

// TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  age?: number; // age is optional
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Create model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
