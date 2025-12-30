import mongoose, { Document, Schema, Model } from "mongoose";

// TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;          
  role: "user" | "admin";   
  age?: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false, 
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
        resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
    },

    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Create model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
