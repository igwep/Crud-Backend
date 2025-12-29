import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/User.ts";
import { AppError } from "../utils/appError.ts";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid user ID", 400));
    }

    // Prevent empty updates
    if (Object.keys(req.body).length === 0) {
      return next(new AppError("No fields to update", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
