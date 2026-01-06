import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface JwtPayload {
  id: string;
  role: IUser["role"];
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Guard against undefined token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown;

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      "role" in decoded
    ) {
      req.user = { id: (decoded as any).id, role: (decoded as any).role };
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
