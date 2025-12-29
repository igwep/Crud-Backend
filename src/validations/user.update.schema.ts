import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  age: z.number().int().positive().optional(),
});

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});