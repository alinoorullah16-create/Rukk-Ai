import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Message } from '../types';
import { Sender } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    config,
  });

  return response;
};