import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData, resumeId, }) => {
  useEffect(() => {
    console.log("ProfessionalSummaryForm resumeId =", resumeId);
  }, [resumeId]);

  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(null);

  const fetchLimit = async () => {
    if (!resumeId || !token) return;

    try {
      const response = await api.get("/api/ai/limit", {
        params: { resumeId },
        headers: {
          Authorization: token,
        },
      });

      console.log("Limit Response:", response.data);

      setRemainingRequests(response.data.remaining);
    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err);
    }
  };

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary "${data}"`;

      const response = await api.post(
        "/api/ai/enhanced-pro-sum",
        {
          userContent: prompt,
          resumeId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Response Headers:", response.headers);

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));

      setIsEnhanced(true);

      const remaining = Number(
        response.headers["x-ratelimit-remaining"]
      );

      console.log("Remaining from Header:", remaining);

      if (!isNaN(remaining)) {
        setRemainingRequests(remaining);
      }

      // Refresh the value from Redis
      await fetchLimit();

      toast.success(`AI Enhanced (${remaining} requests left)`);
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error(
          `AI limit reached. Try again in ${error.response.data.resetIn} seconds`
        );
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    console.log("resumeId:", resumeId);
    console.log("token:", token);

    if (resumeId && token) {
      fetchLimit();
    }
  }, [resumeId, token]);

  useEffect(() => {
    console.log("remainingRequests =", remainingRequests);
  }, [remainingRequests]);


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          disabled={
            isGenerating ||
            remainingRequests === null ||
            remainingRequests === 0
          }
          onClick={generateSummary}
          className={`flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors ${remainingRequests === null || remainingRequests === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {remainingRequests === null
                ? "Loading..."
                : remainingRequests === 0
                  ? "Limit Reached"
                  : isEnhanced
                    ? `✓ Enhanced (${remainingRequests} left)`
                    : `AI Enhance (${remainingRequests} left)`}
            </>
          )}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => {
            onChange(e.target.value);
            setIsEnhanced(false);
          }}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compilling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;