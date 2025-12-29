import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/User.ts"; 
import validate from "../middlewares/validate.ts"; 
import { createUserSchema, updateUserSchema } from "../validations/user.update.schema.ts"
import type { Request, Response } from "express";

const router = Router();

// CREATE
router.post("/", validate(createUserSchema), async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// READ ALL
router.get("/", async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// READ ONE
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// UPDATE
router.put("/:id", validate(updateUserSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedUser) return res.status(404).json({ message: "User not found" });

  res.json(updatedUser);
});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted" });
});

export default router;
