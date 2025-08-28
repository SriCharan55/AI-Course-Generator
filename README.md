

# 📘 AI Course Generator

An **AI-powered Course Generator** built with **Next.js, React, Tailwind CSS, Supabase, Drizzle ORM, Neon (PostgreSQL), Gemini AI, YouTube Data API, shadcn/ui, and Clerk authentication**.

This app helps learners of all levels create **personalized, structured courses in under 1 minute** and start learning right away.

---

##  The Challenge in Learning

Many learners face common struggles when preparing to study a new skill or subject:

* 🔍 **Scattered Resources** – Searching   across multiple blogs, Youtube videos, and websites which makes the learning process not efficent and unorganized. 
* ⏳ **Time-Consuming** – Hours are wasted searching instead of learning.
* 🎯 **Unstructured Flow** – No clear path for beginners, intermediates, or advanced learners.
* 📖 **Incomplete Knowledge** – Most content doesn't have detailed explanations, examples, or supporting videos.

As a result, many users gets overwhelmed in their process of learning journey.

---

## ✅ Our Solution – AI Course Generator

With **AI Course Generator**, users can create **personalized, AI-powered courses instantly** with:

* ⚡ **Instant Course Creation** – Build a full course in under 1 minute by selecting category, topic, level, duration, and number of chapters.
* 🤖 **AI-Generated Structure** – Gemini AI generates a clear, topic-based outline with chapters and learning flow.
* 📖 **Comprehensive Content** – Each chapter includes detailed explanations, real-world examples, and code snippets (if applicable).
* 🎥 **Smart Video Integration** – One high-quality YouTube video per chapter is automatically fetched to reinforce learning.
* 📌 **Focused Self-Learning** – Everything needed is in one place, helping users save time and avoid distractions.
* 🗂️ **Interactive Dashboard** – View, manage, and navigate all created courses easily.
* 🔐 **Secure Authentication** – Clerk provides reliable login, sign-up, and account handling.
* 📱 **Fully Responsive** – Optimized for desktop, tablet, and mobile.

---

## 🔄 Workflow

1. **Sign Up / Login** → Secure access using Clerk.
2. **Dashboard** → View and manage all created courses.
3. **Create Course** → Fill quick details:

   * Category (Programming, Health, Creative)
   * Topic & Description
   * Level (Beginner / Intermediate / Advanced)
   * Duration (1 hr, 2 hrs, 3 hrs, >3 hrs)
   * Chapters (e.g., 5)
   * YouTube Video (Yes/No)
4. **Generate Layout** → AI creates the course outline (chapters).
5. **Edit & Finalize** → Update course name, image, or chapter names if needed.
6. **Generate Content** → AI produces detailed chapter content with explanations, examples, and code.

   * Visual loading screen shows while AI works.
7. **Start Learning** → Navigate to `/course/start`:

   * Left Sidebar → Chapter list
   * Right Panel → Chapter content (detailed explanations, examples, code, YouTube video)

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React.js, Tailwind CSS, Custom CSS, shadcn/ui
* **Backend / Database:** Supabase + Drizzle ORM + Neon (PostgreSQL)
* **AI Integration:** Google Gemini API (course layout + content generation)
* **Video Integration:** YouTube Data API (fetches relevant chapter videos)
* **Authentication:** Clerk (secure login & account management)
* **Deployment:**

  * Vercel
 

---

## ⚙️ Environment Variables

Create a `.env.local` file in your project root and include:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_neon_postgres_connection_string
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## 🚀 How to Run Locally

1. **Clone Repo**

```bash
git clone https://github.com/your-username/ai-course-generator.git
cd ai-course-generator
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up Env File** (add your keys in `.env.local`)

4. **Run Dev Server**

```bash
npm run dev
```

5. **Open in Browser** → [http://localhost:3000]
6. 🌐 Deployment

Frontend (Live on Vercel): [https://ai-course-generator-blush.vercel.app/]

GitHub Repository: [https://github.com/SriCharan55/ai-course-generator]

