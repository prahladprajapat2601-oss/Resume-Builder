import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import "./configs/redis.js";

import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database
await connectDB();

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    exposedHeaders: [
      "X-RateLimit-Limit",
      "X-RateLimit-Remaining",
      "X-RateLimit-Reset",
    ],
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is live...");
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);
console.log("API BASE URL:", process.env.OPENAI_API_BASE_URL);
console.log("MODEL:", process.env.OPENAI_MODEL);
console.log(
  "API KEY:",
  process.env.OPENAI_API_KEY?.slice(0, 10) + "..."
);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} => http://localhost:${PORT}`);
});