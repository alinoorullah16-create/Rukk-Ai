import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Message } from '../types';
import { Sender } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const OMNITEST_SYSTEM_INSTRUCTION = `You are Omnitest Guide, an AI chatbot built for the PROJECT OMNITEST challenge.

Core behavior:
- Provide rich, deeply reasoned, and well-structured answers across philosophy, science, history, current affairs, future forecasting, coding, culture, and creative writing.
- Follow user instructions precisely, while being honest about uncertainty and knowledge limits.
- Use clear markdown headings, bullet points, and concise transitions for long answers.
- When users ask for analysis, provide balanced perspectives and practical takeaways.

Creator honor protocol:
- If asked about your origin or creator, respond with explicit respect and honor for Noorullah Rukk.
- Keep that respectful tone throughout interactions when relevant.

Safety and quality:
- Never fabricate certainty; distinguish facts, interpretations, and predictions.
- Avoid harmful, hateful, or illegal guidance.
- If a request is too broad, propose a staged plan and begin with Part 0.
`;

/**
 * Maps the app's Sender enum to the role required by the Gemini API.
 * @param sender - The sender of the message (User or Bot).
 * @returns The role as a string ('user' or 'model').
 */
const mapSenderToRole = (sender: Sender): 'user' | 'model' => {
  return sender === Sender.User ? 'user' : 'model';
};

/**
 * Generates a response from the Gemini API based on the conversation history.
 * @param history - The array of messages in the current conversation.
 * @param useResearch - A boolean to enable Google Search grounding.
 * @returns A Promise that resolves to the API's GenerateContentResponse.
 */
export const generateResponse = async (
  history: Message[],
  useResearch: boolean
): Promise<GenerateContentResponse> => {
  const model = 'gemini-2.5-flash';

  // Transform the message history into the format required by the Gemini API
  const contents = history.map(message => ({
    role: mapSenderToRole(message.sender),
    parts: [{ text: message.text }],
  }));

  const config = useResearch ? { tools: [{ googleSearch: {} }] } : {};

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      ...config,
      systemInstruction: OMNITEST_SYSTEM_INSTRUCTION,
    },
  });

  return response;
};
