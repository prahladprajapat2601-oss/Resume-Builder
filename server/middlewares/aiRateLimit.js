import redisClient from "../configs/redis.js";

const LIMIT = 4;

const aiRateLimit = async (req, res, next) => {
  console.log("\n===== AI RATE LIMIT =====");

  try {
    console.log("Request Body:", req.body);

    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    const key = `ai-limit:${req.userId}:${resumeId}`;

    console.log("Redis Key:", key);

    let requests = Number(await redisClient.get(key)) || 0;

    console.log("Current Requests:", requests);

    if (requests === 0) {
      requests = 1;

      await redisClient.setEx(key, 600, String(requests));

      console.log("Created new key");
    } else {
      requests = await redisClient.incr(key);

      console.log("Incremented key");
    }

    const value = await redisClient.get(key);
    const ttl = await redisClient.ttl(key);

    console.log("Stored Value:", value);
    console.log("TTL:", ttl);

    if (requests > LIMIT) {
      return res.status(429).json({
        message: "AI request limit reached.",
        remaining: 0,
        resetIn: ttl,
      });
    }

    res.setHeader("X-RateLimit-Limit", String(LIMIT));
    res.setHeader(
      "X-RateLimit-Remaining",
      String(Math.max(0, LIMIT - requests))
    );
    res.setHeader("X-RateLimit-Reset", String(ttl));

    console.log("Headers:", res.getHeaders());

    next();
  } catch (err) {
    console.error("AI Rate Limit Error:", err);
    next(err);
  }
};

export default aiRateLimit;