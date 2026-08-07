import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";
import redisClient from "../configs/redis.js";
import crypto from "crypto";

// Controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum


export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const cacheKey =
      "ai:summary:" +
      crypto.createHash("sha256").update(userContent).digest("hex");

    const cachedResponse = await redisClient.get(cacheKey);

    if (cachedResponse) {
      console.log("⚡ AI Summary served from Redis");

      console.log("Controller Headers:");
      console.log(res.getHeaders());

      return res.status(200).json({
        enhancedContent: cachedResponse,
      });
    }

    console.log("🤖 AI Summary served from Gemini");

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences while highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return the enhanced text.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    await redisClient.setEx(cacheKey, 3600, enhancedContent);

    console.log("✅ Saved AI Summary to Redis");

    console.log("Controller Headers:");
    console.log(res.getHeaders());

    return res.status(200).json({
      enhancedContent,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
// Controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Redis Cache Key
    const cacheKey = `ai:job:${userContent}`;

    // Check Redis First
    const cachedResponse = await redisClient.get(cacheKey);
    console.log(cacheKey);

    if (cachedResponse) {
      console.log("⚡ Job Description served from Redis");

      return res.status(200).json({
        enhancedContent: cachedResponse,
      });
    }

    console.log("🤖 Job Description served from Gemini");

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only 1-2 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Only return the enhanced text.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent =
      response.choices[0].message.content;

    // Store in Redis
    await redisClient.setEx(
      cacheKey,
      3600,
      enhancedContent
    );

    return res.status(200).json({
      enhancedContent,
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `extract data from this resume: ${resumeText}
    
    Provide data in the following JSON format with no additional text before or after:

    {
        professional_summary: { type: String, default: "" },
        skills: [{ type: String }],
        personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
        },
        experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
        },
        ],
        project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        },
        ],
        education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },
        },
        ],
    }
    `;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    // create new resume in the database
    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// GET: /api/ai/limit
const LIMIT = 4;

const LIMIT = 4;

export const getAiLimit = async (req, res) => {
  try {
    const { resumeId } = req.query;

    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    const key = `ai-limit:${req.userId}:${resumeId}`;

    console.log("\n===== GET AI LIMIT =====");
    console.log("User ID:", req.userId);
    console.log("Resume ID:", resumeId);
    console.log("Redis Key:", key);

    const value = await redisClient.get(key);
    const requests = Number(value || 0);
    const ttl = await redisClient.ttl(key);

    console.log("Redis Value:", value);
    console.log("Requests:", requests);
    console.log("TTL:", ttl);

    return res.status(200).json({
      limit: LIMIT,
      remaining: Math.max(0, LIMIT - requests),
      resetIn: ttl > 0 ? ttl : 0,
    });
  } catch (error) {
    console.error("GET AI LIMIT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};