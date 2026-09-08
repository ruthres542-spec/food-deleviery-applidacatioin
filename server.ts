import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI Client lazily/safely for server usage
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Route: Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Food Delivery Application",
    task: "Data Alcott Systems Internship Task JV-EC-002",
    timestamp: new Date().toISOString()
  });
});

// API Route: AI Craving Assistant & Smart Meal Recommendation
app.post("/api/ai/craving-recommendation", async (req, res) => {
  try {
    const { cravingPrompt, isVegetarian, budgetMax, selectedCuisine } = req.body;

    if (!cravingPrompt || typeof cravingPrompt !== "string") {
      return res.status(400).json({ error: "cravingPrompt is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Smart Fallback when GEMINI_API_KEY is not set
      return res.json({
        recommendationTitle: "Chef's Handpicked Recommendation",
        summary: `Based on your craving for "${cravingPrompt}", here are top items freshly prepared from our popular partner kitchens.`,
        suggestedDishNames: [
          "Chicken Tikka Masala",
          "Double Truffle Smash Burger",
          "Truffle Mushroom Fettuccine",
          "Ahi Tuna Crunch Poke Bowl"
        ],
        aiTip: "Pair with a cold beverage like Mango Lassi or Cold Pressed Juice for the ultimate feast!"
      });
    }

    const systemPrompt = `You are a friendly, expert AI Food Concierge for a premium food delivery app.
A user will describe their current food cravings, dietary constraints, or mood.
Analyze their request and respond with JSON matching the specified schema.
Recommend 2 to 4 appetizing dish titles that fit their request, along with a warm culinary summary and a pro dining tip.`;

    const userMessage = `User Craving: "${cravingPrompt}"
Constraints:
- Vegetarian Only: ${isVegetarian ? 'YES' : 'NO'}
- Preferred Cuisine: ${selectedCuisine || 'Any'}
- Maximum Budget: ${budgetMax ? `$${budgetMax}` : 'Flexible'}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendationTitle: { type: Type.STRING, description: "A catchy 3-5 word title for the meal match" },
            summary: { type: Type.STRING, description: "A warm, mouth-watering explanation of why these match the craving" },
            suggestedDishNames: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 2 to 4 specific dish names"
            },
            aiTip: { type: Type.STRING, description: "A fun food pairing or ordering advice tip" }
          },
          required: ["recommendationTitle", "summary", "suggestedDishNames", "aiTip"]
        }
      }
    });

    const resultText = response.text || "{}";
    const parsedData = JSON.parse(resultText);
    return res.json(parsedData);
  } catch (err: any) {
    console.error("Gemini AI Craving Error:", err);
    return res.json({
      recommendationTitle: "Delicious Craving Match",
      summary: "Here are flavorful picks customized to satisfy your appetite today!",
      suggestedDishNames: ["Chicken Tikka Masala", "Pizza Margherita DOC", "Hyderabadi Dum Biryani"],
      aiTip: "Don't forget to use promo code SWIGGY50 at checkout!"
    });
  }
});

// API Route: Generate Dish Description / Review Summary
app.post("/api/ai/describe-dish", async (req, res) => {
  try {
    const { dishName, cuisine } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({ description: `Delicious ${dishName} cooked fresh with premium ingredients and authentic spices.` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Write a mouth-watering, concise 2-sentence menu description for a ${cuisine || 'gourmet'} dish named "${dishName}".`,
      config: {
        systemInstruction: "You write enticing menu copy for a high-end food delivery app."
      }
    });

    return res.json({ description: response.text?.trim() });
  } catch (err) {
    return res.json({ description: `Freshly crafted gourmet ${req.body.dishName || 'specialty'} made to order.` });
  }
});

async function startServer() {
  // Vite middleware for dev or static files for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Food Delivery Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
