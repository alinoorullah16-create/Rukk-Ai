import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2 self-start message-fade-in">
      <div className="p-3 rounded-2xl bg-gray-700 rounded-bl-none flex items-center space-x-1">
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      </div>
    </div>
  );
};

export default React.memo(TypingIndicator);