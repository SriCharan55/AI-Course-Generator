// configs/AiModel.jsx

import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const modelName = 'gemini-2.5-pro';
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

async function callGemini(userPrompt) {
  const safePrompt = `
Respond ONLY with pure JSON. Do not add explanation, markdown, or comments.
${userPrompt}
  `.trim();

  try {
    const res = await genAI.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: safePrompt }] }],
      generationConfig,
    });

    const raw = res.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseErr) {
      console.warn("⚠️ Gemini didn't return valid JSON. Raw output:", cleaned);
      throw new Error("Gemini output is not valid JSON.");
    }
  } catch (err) {
    console.error("❌ Gemini Error:", err);
    throw err;
  }
}

export async function generateChapterContent_AI(topic, chapter) {
  // FIXED PROMPT - ensures single chapter response
  const prompt = `
Create detailed content for this chapter only:
Topic: ${topic}
Chapter: ${chapter}

Return in this JSON format:
{
  "chapter": "Chapter Name",
  "details": [
    {
      "title": "Topic Title",
      "explanation": "Detailed explanation",
      "Code Example": "Code in <precode> format (if applicable)"
    }
  ]
}

Important:
- Return only ONE chapter object
- Use "details" for the array of topics
- Omit the chapter field if not applicable
- Never include "undefined" chapters
- Never return an array of chapters
  `.trim();

  return await callGemini(prompt);
}

// Keep these unchanged
export const generateCourseLayout_AI = callGemini;
export const generateChapterDetails_AI = callGemini;



