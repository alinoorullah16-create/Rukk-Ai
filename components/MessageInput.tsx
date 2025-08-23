import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isResearchMode: boolean;
  onResearchModeChange: (isResearch: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading, isResearchMode, onResearchModeChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <footer className="p-4 bg-gray-800/60 backdrop-blur-sm sm:rounded-b-2xl border-t border-gray-700 flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex items-center bg-gray-700 rounded-xl p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Rukk Bot anything..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none px-3"
          disabled={isLoading}
          aria-label="Ask Rukk Bot anything"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-3 text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
       <div className="flex items-center justify-end pt-2 pr-2">
          <label htmlFor="research-toggle" className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm text-gray-300">Research</span>
              <div className="relative">
                  <input 
                      id="research-toggle" 
                      type="checkbox" 
                      className="sr-only" 
                      checked={isResearchMode}
                      onChange={(e) => onResearchModeChange(e.target.checked)}
                      disabled={isLoading}
                  />
                  <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isResearchMode ? 'translate-x-4' : ''}`}></div>
              </div>
          </label>
      </div>
    </footer>
  );
};

export default React.memo(MessageInput);