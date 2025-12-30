import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/User.ts"; 
import validate from "../middlewares/validate.ts"; 
import { createUserSchema, updateUserSchema } from "../validations/user.update.schema.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { isAdmin } from "../middlewares/role.middleware.ts";
import type { Request, Response } from "express";

const router = Router();

// CREATE - Admin only
router.post("/", auth, isAdmin, validate(createUserSchema), async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// READ ALL - Admin only
router.get("/", auth, isAdmin, async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// READ ONE - Any authenticated user
router.get("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// UPDATE - Admin can update anyone, users can update themselves
router.put("/:id", auth, validate(updateUserSchema), async (req: Request & { user?: { id: string; role: string } }, res: Response) => {
  const { id } = req.params;
  const loggedInUser = req.user;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  // Check authorization
  if (loggedInUser?.role !== "admin" && loggedInUser?.id !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE - Admin only
router.delete("/:id", auth, isAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted" });
});

export default router;
