/* common/gemini.js
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY not set');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function callGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

*/
// common/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function callGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro"   // ✅ FREE TIER MODEL
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (err) {
    return `Gemini Error: ${err.message}`;
  }
}
