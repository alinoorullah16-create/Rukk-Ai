import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  const wrapperClasses = `flex flex-col items-end gap-2 max-w-md md:max-w-lg message-fade-in ${
    isUser ? 'self-end' : 'self-start'
  }`;

  const bubbleWrapperClasses = `flex items-end gap-2 ${ isUser ? 'flex-row-reverse' : '' }`;

  const bubbleClasses = `p-3 rounded-2xl ${
    isUser
      ? 'bg-blue-600 text-white rounded-br-none'
      : 'bg-gray-700 text-gray-200 rounded-bl-none'
  }`;

  return (
    <div className={wrapperClasses}>
      <div className={bubbleWrapperClasses}>
        <div className={bubbleClasses}>
          {message.text}
        </div>
      </div>
      {message.sources && message.sources.length > 0 && (
        <div className="mt-2 w-full text-xs text-gray-400 self-start border-t border-gray-600 pt-2">
            <h4 className="font-semibold mb-1">Sources:</h4>
            <ul className="space-y-1 list-inside list-disc">
                {message.sources.map((source, index) => (
                    <li key={index} className="truncate">
                        <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                            title={source.title}
                        >
                            {source.title || new URL(source.uri).hostname}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(MessageBubble);