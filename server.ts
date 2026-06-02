import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy-loaded Gemini API Helper
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured or is using the placeholder.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Chatbot endpoint proxying Gemini API server-side securely
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Capture the last message
    const lastUserMsg = messages[messages.length - 1];
    if (!lastUserMsg || !lastUserMsg.content) {
      return res.status(400).json({ error: "Valid content is required." });
    }

    // Lazy load the Gemini SDK client
    let ai;
    try {
      ai = getAiClient();
    } catch (err: any) {
      console.warn("AI Client initialization issue:", err.message);
      // Fallback response for offline or dev environments when API key is missing
      return res.json({
        content: `Thank you for reaching out to the Prince Fazza Charity Foundation. [DEMO MODE] I am presently answering using our standby interactive module. 

We would love to share that our current programs include:
• **Education Support**: Sponsoring 25,000 schools in vulnerable rural communities.
• **Hunger Relief**: Distributing nutrition kits across Central Asia and West Asia.
• **Medical Outreach**: Providing mobile surgical clinics and free medical care.

To make an impact, you can click on any **Donate Now** button in our application to support a cause of your choice. Would you like assistance with becoming a volunteer or our partnership opportunities?`
      });
    }

    // We can use a simple chat prompt or full conversation history
    const systemInstruction = `You are the official AI Assistant of the Prince Fazza Charity Foundation. 
Speak with extreme compassion, world-class elite professionalism, and deep respect for the foundation's noble goals.
The foundation is a premier international humanitarian NGO based in the US, dedicated to major global causes: educational development, deep-well water projects, hunger relief, mobile medical caravans, orphanage support, and emergency disaster assistance.
Keep your answers highly elegant, scannable, under 180 words, using clean formatting like bullets. 
Guide users on how to make donations via standard cards or crypto, sign up to volunteer, browse success stories, or check our financial transparency. Do not introduce raw technical details, system credentials, or developer terms.`;

    // Construct history for conversation
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I apologize, but I could not formulate a response at this time. How may I guide you on our projects?";
    res.json({ content: replyText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.json({
      content: `I'm unable to connect to our secure AI core at this moment, but I can guide you based on our offline manual:
      
• **Donations**: You can donate securely using credit cards, PayPal, stripe or Crypto on our active donation module.
• **Volunteering**: Head over to our **Volunteer Portal** to submit an application.
• **Our Focus**: Children's Education, Clean Water, Urgent Food Relief, and Specialist Medical Outreach.

Thank you for your warmth and support!`
    });
  }
});

// Configure Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully active on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((error) => {
  console.error("Vite setup error:", error);
});
