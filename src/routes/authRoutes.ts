import { Router } from "express";
import { register, login,forgotPassword, resetPassword } from "../controllers/auth.controller"; // adjust path if needed
import validate from "../middlewares/validate";
import { registerUserSchema, loginUserSchema } from "../validations/user.update.schema";
import { authLimiter } from "../middlewares/rateLimiter";

const router = Router();

// Register endpoint
router.post("/register", validate(registerUserSchema), register);

// Login endpoint
router.post("/login", validate(loginUserSchema), login);

router.post("/login", authLimiter, login);
router.post("/forgot-password", authLimiter, forgotPassword);


export default router;
