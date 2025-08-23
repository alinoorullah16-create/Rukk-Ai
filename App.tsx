import React, { useState, useEffect, useCallback } from 'react';
import type { Message } from './types';
import { Sender } from './types';
import { generateResponse } from './services/geminiService';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResearchMode, setIsResearchMode] = useState<boolean>(false);

  // Load chat history from localStorage on initial render
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages && savedMessages.length > 2) { // >2 to avoid empty array "[]"
        setMessages(JSON.parse(savedMessages));
      } else {
        // Initialize with a welcome message if no history
        setTimeout(() => {
          setMessages([
            {
              id: crypto.randomUUID(),
              text: "Hello! I'm Rukk Bot, your AI assistant. How can I help you today?",
              sender: Sender.Bot,
            },
          ]);
        }, 500);
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
        // Fallback to welcome message
        setMessages([
          {
            id: crypto.randomUUID(),
            text: "Hello! I'm Rukk Bot, your AI assistant. How can I help you today?",
            sender: Sender.Bot,
          },
        ]);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const handleNewChat = useCallback(() => {
    localStorage.removeItem('chatHistory');
    setMessages([
      {
        id: crypto.randomUUID(),
        text: "Hello! I'm Rukk Bot. Starting a new chat! What's on your mind?",
        sender: Sender.Bot,
      },
    ]);
  }, []);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputText,
      sender: Sender.User,
    };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
      const response = await generateResponse(currentMessages, isResearchMode);
      
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: response.text,
        sender: Sender.Bot,
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(
          (chunk: any) => ({
            uri: chunk.web.uri,
            title: chunk.web.title,
          })
        ),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: Sender.Bot,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isResearchMode]);

  return (
    <div className="text-white flex items-center justify-center h-dvh">
      <div id="chat-container" className="flex flex-col w-full h-full bg-gray-800 sm:max-w-2xl sm:max-h-[700px] sm:rounded-2xl sm:shadow-2xl sm:border border-gray-700">
        <ChatHeader onNewChat={handleNewChat} />
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          isResearchMode={isResearchMode}
          onResearchModeChange={setIsResearchMode}
        />
      </div>
    </div>
  );
};

export default App;