const { z } = require("zod");

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  age: z.number().int().positive().optional(),
});

module.exports = { updateUserSchema };
