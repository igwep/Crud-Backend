// middlewares/rateLimiter.ts

import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: {
    message: "Too many attempts. Try again later.",
  },
});
