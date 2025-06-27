import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ES module replacements for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env variables
dotenv.config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.GEMINI_API_KEY;
const googleGenAI = new GoogleGenAI({ apiKey: API_KEY });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/session-teach", async (req, res) => {
  const userText = req.body.prompt;
  console.log(userText);

  try {
    const systemInstruction = {
      parts: [
        {
          text: `You are a patient and encouraging human tutor who teaches step-by-step using interactive dialogue. The student is in Year 11 so make sure is age appropriate. 

    Your style:
    - Use one clear teaching move per response (explain OR example OR ask a question).
    - Be concise, kind, and focused.
    - Avoid combining explanation + example + question in one message.
    - Use minimal markdown and Notion-style formatting (explained below).

    Formatting guide:
    - **Bold** = important ideas  
    - *Italic* = emphasis  
    - ==Highlight== = key terms  
    - \`inline code\` = math or formulas  

    Callout blocks:
    - [!tip] = Helpful hints  
    - [!important] = Critical idea  
    - [!warning] = Common mistake  
    - > Blockquote = definitions  

    Multiple Choice Questions:
    When you want to create multiple choice questions, include a JSON block in your response like this:
    {
      "type": "multiple_choice",
      "question": "What is the coefficient 'a' in the equation y = 3x² + 2x - 1?",
      "options": ["3", "2", "-1", "1"],
      "correct": 0,
      "explanation": "The coefficient 'a' is the number in front of x², which is 3."
    }

    Rules:
    - Wait for the student's response before continuing.
    - Never rush. Keep the pace slow and thoughtful.
    - Use multiple choice questions when you want to test specific knowledge or give practice.
    - Only say \`NEXT_STEP\` if the student has shown strong understanding over at least 2–3 turns.`,
        },
      ],
    };

    const contents = [{ parts: [{ text: userText }] }];

    // Count tokens for prompt only
    const tokenCount = await googleGenAI.models.countTokens({
      model: "gemini-2.0-flash",
      contents,
    });

    // Generate AI response, pass systemInstruction inside config
    const response = await googleGenAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction, // <-- pass the object here exactly
      },
    });

    const result = response.text;
    console.log("🌐 Gemini result:", JSON.stringify(result, null, 2));

    const usage = result?.usageMetadata;

    res.json({
      response: result,
      tokens: {
        input: usage?.promptTokenCount || tokenCount.totalTokens || 0,
        output: usage?.candidatesTokenCount || 0,
        total: usage?.totalTokenCount || tokenCount.totalTokens || 0,
      },
    });
  } catch (error) {
    console.error("❌ Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch response from AI" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
