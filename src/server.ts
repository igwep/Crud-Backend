import "dotenv/config";
import express, { type Application } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.ts"; 
import { errorHandler } from "./middlewares/errorHandler.ts";
import authRoutes from "./routes/authRoutes.ts";

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);


app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/crudDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.error(err));

  
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
