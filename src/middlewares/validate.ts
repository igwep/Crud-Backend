import type { Request, Response, NextFunction } from "express";
import { type ZodSchema, ZodError } from "zod";

const validate = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.issues, // <-- use issues instead of errors
      });
      return; // make TS happy for void return
    }

    res.status(400).json({
      message: "Validation failed",
      errors: [],
    });
  }
};

export default validate;
