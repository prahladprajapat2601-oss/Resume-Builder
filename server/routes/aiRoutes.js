import express from "express";
import protect from "../middlewares/authMiddleware.js";
import aiRateLimit from "../middlewares/aiRateLimit.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
  getAiLimit,
} from "../Controllers/aiController.js";

const aiRouter = express.Router();
aiRouter.get("/limit", protect, getAiLimit);
aiRouter.post("/enhanced-pro-sum", protect,aiRateLimit, enhanceProfessionalSummary);
aiRouter.post("/enhanced-job-desc", protect, aiRateLimit, enhanceJobDescription);
aiRouter.post("/upload-resume", protect, aiRateLimit, uploadResume);
console.log("AI Routes Loaded");

export default aiRouter;