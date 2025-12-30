import { Router } from "express";
import { register, login } from "../controllers/auth.controller.ts"; // adjust path if needed
import validate from "../middlewares/validate.ts";
import { registerUserSchema, loginUserSchema } from "../validations/user.update.schema.ts";

const router = Router();

// Register endpoint
router.post("/register", validate(registerUserSchema), register);

// Login endpoint
router.post("/login", validate(loginUserSchema), login);

export default router;
