import { response } from "express";
import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import redisClient from "../configs/redis.js";
import fs from "fs";

// Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({ userId, title });

    // return success message
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // delete resume
    await Resume.findOneAndDelete({ userId, _id: resumeId });
    await redisClient.del(`resume:${userId}:${resumeId}`);
    await redisClient.del(`public-resume:${resumeId}`);

    console.log(" Resume cache deleted");


    // return success message
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller for getting user resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const cacheKey = `resume:${userId}:${resumeId}`;

    // Check Redis first
    const cachedResume = await redisClient.get(cacheKey);

    if (cachedResume) {
      console.log(" Resume served from Redis");
      res.set("X-Cache", "REDIS");

      return res.status(200).json({
        resume: JSON.parse(cachedResume),
      });
    }

    console.log(" Resume served from MongoDB");
    res.set("X-Cache", "MONGODB");

    const resume = await Resume.findOne({
      userId,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // Store in Redis for 1 hour
    await redisClient.setEx(
      cacheKey,
      3600,
      JSON.stringify(resume)
    );

    return res.status(200).json({ resume });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// Controller for getting resume by id public
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const cacheKey = `public-resume:${resumeId}`;

    // Check Redis first
    const cachedResume = await redisClient.get(cacheKey);

    if (cachedResume) {
      console.log(" Public Resume served from Redis");

      return res.status(200).json({
        resume: JSON.parse(cachedResume),
      });
    }

    console.log(" Public Resume served from MongoDB");

    // Get resume from MongoDB
    const resume = await Resume.findOne({
      public: true,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // Store in Redis for 1 hour
    await redisClient.setEx(
      cacheKey,
      3600,
      JSON.stringify(resume)
    );

    return res.status(200).json({ resume });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;


    const image = req.file;

    let resumeDataCopy;
    if (typeof resumeData === "string") {
      resumeDataCopy = await JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path)
      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: 'user-resume',
        transformation: {
          pre: 'w-300 ,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : ' ')
        }
      })

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { returnDocument: "after" }
    );
    // Remove old cache
    await redisClient.del(`resume:${userId}:${resumeId}`);
    await redisClient.del(`public-resume:${resumeId}`);

    console.log("Redis Cache Cleared");

    // return success message and updated resume
    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//cache aside in used here 
