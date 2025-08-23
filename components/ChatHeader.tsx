import React from 'react';

interface ChatHeaderProps {
  onNewChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm p-4 sm:rounded-t-2xl border-b border-gray-700 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Rukk Bot</h1>
            <p className="text-sm text-green-400">● Online</p>
          </div>
        </div>
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="Start new chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>
    </header>
  );
};

export default React.memo(ChatHeader);