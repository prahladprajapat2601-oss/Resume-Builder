# 🚀 AI Resume Builder

An AI-powered Resume Builder that helps users create, edit, and manage professional resumes with real-time AI enhancements, Redis caching, and per-resume AI rate limiting.

---

## ✨ Features

### 📄 Resume Management
- Create, edit, and delete resumes
- Multiple resume sections:
  - Personal Information
  - Professional Summary
  - Experience
  - Education
  - Projects
  - Skills
- Public resume sharing
- Resume preview
- PDF download

---

### 🤖 AI Powered Features

- AI-generated Professional Summary
- AI-enhanced Job Descriptions
- Resume Parsing using AI
- Google Gemini Integration

---

### ⚡ Redis Features

#### ✅ AI Response Caching
- AI generated summaries are cached in Redis.
- Prevents repeated API calls for the same prompt.
- Improves response time and reduces AI API usage.

#### ✅ Resume Caching
- Frequently accessed resumes are cached.
- Cache is automatically invalidated when:
  - Resume is updated
  - Resume is deleted

#### ✅ Per Resume AI Rate Limiting
Each resume has its own AI request quota.

Example:

```
User A
├── Resume A → 4 AI Requests / 10 minutes
├── Resume B → 4 AI Requests / 10 minutes
└── Resume C → 4 AI Requests / 10 minutes
```

Implemented using Redis:

```
ai-limit:<userId>:<resumeId>
```

Redis TTL automatically resets the limit after **10 minutes**.

---

## 🛠 Tech Stack

### Frontend

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- ImageKit
- Redis

### AI

- Google Gemini API

---

# 📂 Project Structure

```
Resume_builder
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── app
│   └── configs
│
├── server
│   ├── Controllers
│   ├── Routes
│   ├── Models
│   ├── Middlewares
│   ├── Configs
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/<your-username>/Resume_builder.git
```

```
cd Resume_builder
```

---

## 2. Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

## 3. Create Environment Variables

Inside **server/.env**

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

GOOGLE_API_KEY=your_gemini_api_key

OPENAI_MODEL=gemini-2.5-flash

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url

REDIS_URL=redis://localhost:6379
```

---

## 4. Start Redis

If installed locally:

```bash
redis-server
```

Verify Redis:

```bash
redis-cli ping
```

Output

```
PONG
```

---

## 5. Start Backend

```bash
cd server
npm start
```

Runs on

```
http://localhost:3000
```

---

## 6. Start Frontend

```bash
cd client
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🗄 Redis Keys Used

### Resume Cache

```
resume:<userId>:<resumeId>
```

---

### Public Resume

```
public-resume:<resumeId>
```

---

### AI Summary Cache

```
ai:summary:<SHA256_HASH>
```

---

### AI Rate Limit

```
ai-limit:<userId>:<resumeId>
```

Example

```
ai-limit:
6a7246a6ef07de9e48a650f8:
6a739d35ef07de9e48a650f9
```

---

# 📈 API Endpoints

## Resume

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/resumes/create` | Create Resume |
| PUT | `/api/resumes/update` | Update Resume |
| DELETE | `/api/resumes/delete/:resumeId` | Delete Resume |
| GET | `/api/resumes/get/:resumeId` | Get Resume |
| GET | `/api/resumes/public/:resumeId` | Public Resume |

---

## AI

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/ai/enhanced-pro-sum` | AI Summary |
| POST | `/api/ai/enhanced-job-desc` | AI Job Description |
| POST | `/api/ai/upload-resume` | Parse Resume |
| GET | `/api/ai/limit` | Remaining AI Requests |

---

# 🔒 AI Rate Limiting

Each resume gets

```
4 AI Requests
```

within

```
10 Minutes
```

Response Headers

```
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

Example

```
Limit : 4

Remaining : 2

Reset : 385 seconds
```

---


# 👨‍💻 Author

**Prahlad**

GitHub:
https://github.com/<prahladprajapat2601-oss>

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
