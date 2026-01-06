import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: { role: IUser["role"] }; // "user" | "admin"
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
