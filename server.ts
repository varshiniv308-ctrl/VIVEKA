import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure example environment var is populated
if (!process.env.GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not defined. AI features will require config.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const app = express();
const PORT = 3000;

app.use(express.json());

// Multi-language system prompt template helper
const languageNames: Record<string, string> = {
  en: "English",
  kn: "Kannada",
  hi: "Hindi",
  te: "Telugu",
  ta: "Tamil"
};

function detectScriptMatch(text: string, lang: string): boolean {
  if (!text) return true;
  if (lang === "en") return true;

  let regex: RegExp | null = null;
  if (lang === "kn") {
    regex = /[\u0C80-\u0CFF]/;
  } else if (lang === "hi") {
    regex = /[\u0900-\u097F]/;
  } else if (lang === "te") {
    regex = /[\u0C00-\u0C7F]/;
  } else if (lang === "ta") {
    regex = /[\u0B80-\u0BFF]/;
  }

  if (regex) {
    return regex.test(text);
  }
  return true;
}

function getSystemPrompt(lang: string) {
  const targetLang = languageNames[lang] || "English";
  let prompt = `You are VIVEKA's AI master guru and ancient sciences study assistant.
CRITICAL MANDATE: Since the selected language is ${targetLang}, you MUST write ALL questions, options, explanations, responses, and descriptions 100% and exclusively in the ${targetLang} language using its native script (e.g. Kannada script for Kannada, Devanagari script for Hindi, Telugu script for Telugu, Tamil script for Tamil).
You are absolutely forbidden from code-switching, using English words, using English transliterated text, or mixing English with ${targetLang}. All technical, scientific, or historical terms must be translated into proper, elegant ${targetLang}.`;

  if (lang !== "en") {
    prompt += `\nExample check: Make sure that your output contains native ${targetLang} characters (e.g., Kannada, Hindi, Telugu, or Tamil scripts). Generating output in English is considered a total failure and breaks the application. Even if the user message/prompt is in English, your reply/response MUST be completely in ${targetLang}.`;
  }
  
  return prompt;
}

// 1. AI Quiz Generator Endpoint
app.post("/api/gemini/generate-quiz", async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { topic, lang } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const targetLang = lang || "en";
  const targetLangName = languageNames[targetLang] || "English";
  
  let attempts = 0;
  const maxAttempts = 3;
  let quizData: any[] = [];
  let errorMsg = "";

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Generate exactly 10 multiple-choice questions on the topic "${topic}". 
Each question must have exactly 4 options and 1 correct answer (specified as an index 0, 1, 2, or 3). 
Provide a short dynamic explanation for the answer. 
CRITICAL LANGUAGE DIRECTION: Every single word of the questionText, options (all 4 choices), and the explanation MUST be written entirely and exclusively in ${targetLangName} (using its native script). Do not use English names, transliterated characters, or English words. 
Current target language name: ${targetLangName}, code: ${targetLang}.`,
        config: {
          systemInstruction: getSystemPrompt(targetLang),
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionText: {
                  type: Type.STRING,
                  description: `The question text, written entirely and exclusively in ${targetLangName} using its native script.`
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: `Exactly 4 distinct options, each written entirely and exclusively in ${targetLangName} using its native script.`
                },
                correctOptionIndex: {
                  type: Type.INTEGER,
                  description: "The index of the correct option (0-3)."
                },
                explanation: {
                  type: Type.STRING,
                  description: `An elegant short description/explanation of why it is correct, written entirely and exclusively in ${targetLangName} using its native script.`
                }
              },
              required: ["questionText", "options", "correctOptionIndex", "explanation"]
            }
          },
          temperature: 0.8
        }
      });

      const responseText = response.text || "[]";
      // Validate script compatibility
      if (!detectScriptMatch(responseText, targetLang)) {
        console.warn(`[Quiz Retry] Generated text failed script check for ${targetLang}. Attempt ${attempts} of ${maxAttempts}.`);
        continue;
      }

      quizData = JSON.parse(responseText);
      if (Array.isArray(quizData) && quizData.length > 0) {
        // Validation check inside each object to confirm language match extra-securely
        let anyFail = false;
        for (const item of quizData) {
          if (!detectScriptMatch(item.questionText, targetLang) || 
              !detectScriptMatch(item.explanation, targetLang) ||
              item.options.some((opt: string) => !detectScriptMatch(opt, targetLang))) {
            anyFail = true;
            break;
          }
        }
        if (anyFail) {
          console.warn(`[Quiz Retry] Nested objects failed script match in attempt ${attempts}. Regenerating.`);
          continue;
        }

        break; // Success! Break the while loop
      }
    } catch (error: any) {
      console.error(`Quiz generation attempt ${attempts} failed:`, error);
      errorMsg = error.message;
    }
  }

  if (quizData.length > 0) {
    return res.json({ questions: quizData });
  } else {
    return res.status(500).json({ error: errorMsg || `Failed to generate quiz questions in ${targetLangName}` });
  }
});

// 2. AI Answer Explanation Endpoint
app.post("/api/gemini/explain-answer", async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { question, selected, correct, lang } = req.body;
  const targetLang = lang || "en";
  const targetLangName = languageNames[targetLang] || "English";

  let attempts = 0;
  const maxAttempts = 3;
  let explanationText = "";
  let errorMsg = "";

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const prompt = `Question: "${question}"
The user selected option: "${selected}"
The correct option is: "${correct}"

CRITICAL: Provide the explanation entirely and exclusively in the "${targetLangName}" native script. 
Do not use English words, phrases, or characters. Translating all terms into proper "${targetLangName}" is mandatory.
Provide a highly educational, engaging explanation in "${targetLangName}" explaining why the correct option is correct, and if the user made a mistake, help them understand what they overlooked in a kind guru-like tone. Keep it within 3-4 clear sentences.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: getSystemPrompt(targetLang),
          temperature: 0.7
        }
      });

      const text = response.text || "";
      if (!detectScriptMatch(text, targetLang)) {
        console.warn(`[Explain Retry] Explanation failed script check for ${targetLang}. Attempt ${attempts} of ${maxAttempts}.`);
        continue;
      }

      explanationText = text;
      break;
    } catch (error: any) {
      console.error(`Explain answer attempt ${attempts} failed:`, error);
      errorMsg = error.message;
    }
  }

  if (explanationText) {
    return res.json({ explanation: explanationText });
  } else {
    return res.status(500).json({ error: errorMsg || `Failed to generate explanation in ${targetLangName}` });
  }
});

// 3. AI Study Assistant Chat Endpoint
app.post("/api/gemini/study-chat", async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { message, history, lang } = req.body;
  const targetLang = lang || "en";
  const targetLangName = languageNames[targetLang] || "English";

  let attempts = 0;
  const maxAttempts = 3;
  let assistantResponse = "";
  let errorMsg = "";

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const formattedHistory = (history || []).map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      }));

      const currentPromptText = `${message}\n\n[MANDATORY SYSTEM DIRECTIVE: You must respond to this entirely and exclusively in the ${targetLangName} language/script. Never use English words or characters in your response.]`;
      const contents = [...formattedHistory, { role: "user", parts: [{ text: currentPromptText }] }];

      const systemInstruction = `${getSystemPrompt(targetLang)}
You are a friendly Study Mentor at VIVEKA. Be concise, highly educational, encouraging, and clear.
You specialize in: Science, Mathematics, Technology, History, Geography, Bhagavad Gita, Upanishads, Vedic sciences, and general knowledge.
Support the user's quest for ultimate wisdom and clear their doubts completely. Keep answers readable for mobile screens.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.8
        }
      });

      const text = response.text || "";
      if (!detectScriptMatch(text, targetLang)) {
        console.warn(`[Chat Retry] Chat response failed script check for ${targetLang}. Attempt ${attempts} of ${maxAttempts}.`);
        continue;
      }

      assistantResponse = text;
      break;
    } catch (error: any) {
      console.error(`Study Chat attempt ${attempts} failed:`, error);
      errorMsg = error.message;
    }
  }

  if (assistantResponse) {
    return res.json({ response: assistantResponse });
  } else {
    return res.status(500).json({ error: errorMsg || `Failed to generate chat response in ${targetLangName}` });
  }
});

// Cache store for daily challenges to guarantee the exact same daily question is delivered per date/difficulty/language
const dailyChallengesCache = new Map<string, any>();

// 4. Daily AI Challenges Endpoint
app.post("/api/gemini/daily-challenge", async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { difficulty, lang, date } = req.body;
  const targetLang = lang || "en";
  const targetLangName = languageNames[targetLang] || "English";
  const diff = difficulty || "Medium";
  const todayKey = `${date || new Date().toDateString()}_${diff}_${targetLang}`;

  // Check memory cache first
  if (dailyChallengesCache.has(todayKey)) {
    console.log(`[Daily Challenge Cache Hit] Serving cached question for key: ${todayKey}`);
    return res.json({ challenge: dailyChallengesCache.get(todayKey) });
  }

  let attempts = 0;
  const maxAttempts = 3;
  let challengeObj: any = null;
  let errorMsg = "";

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const prompt = `Generate a single unique, fascinating, and high-quality trivia challenge of difficulty level "${diff}" on a topic from ancient wisdom, culture, geography, science, mathematics or history for the date "${date}". Ensure it acts as a premium intellectual daily test.
CRITICAL LANGUAGE DIRECTION: Every field (title, questionText, options, explanation) MUST be written entirely and exclusively in the "${targetLangName}" script/language.
You must ensure 100% language consistency. Do not output any English characters or words. Translate everything natively into "${targetLangName}" script.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: getSystemPrompt(targetLang),
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: `Intriguing title of the daily challenge, written entirely in ${targetLangName}.` },
              questionText: { type: Type.STRING, description: `The challenge trivia question, written entirely in ${targetLangName}.` },
              options: { type: Type.ARRAY, items: { type: Type.STRING }, description: `Exactly 4 options, each written entirely in ${targetLangName}.` },
              correctOptionIndex: { type: Type.INTEGER, description: "Correct answer index (0-3)" },
              explanation: { type: Type.STRING, description: `Short explanation of the solution, written entirely in ${targetLangName}.` }
            },
            required: ["title", "questionText", "options", "correctOptionIndex", "explanation"]
          },
          temperature: 0.9
        }
      });

      const responseText = response.text || "{}";
      if (!detectScriptMatch(responseText, targetLang)) {
        console.warn(`[Daily Challenge Retry] Challenge failed script check for ${targetLang}. Attempt ${attempts} of ${maxAttempts}.`);
        continue;
      }

      const challenge = JSON.parse(responseText);
      if (challenge && challenge.questionText) {
        if (!detectScriptMatch(challenge.questionText, targetLang) ||
            !detectScriptMatch(challenge.title, targetLang) ||
            !detectScriptMatch(challenge.explanation, targetLang) ||
            challenge.options.some((opt: string) => !detectScriptMatch(opt, targetLang))) {
          console.warn(`[Daily Challenge Retry] Nested fields failed script check. Retrying.`);
          continue;
        }

        challengeObj = challenge;
        break;
      }
    } catch (error: any) {
      console.error(`Daily challenge attempt ${attempts} failed:`, error);
      errorMsg = error.message;
    }
  }

  if (challengeObj) {
    // Store in cache for subsequent hits today
    dailyChallengesCache.set(todayKey, challengeObj);
    return res.json({ challenge: challengeObj });
  } else {
    return res.status(500).json({ error: errorMsg || `Failed to generate daily challenge in ${targetLangName}` });
  }
});

// Mount Vite middleware for development or setup static files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VIVEKA Server] listening securely on port http://localhost:${PORT}`);
  });
}

startServer();
