
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, isLoading = false }) => {
  return (
    <div className={cn(
      "flex",
      isUser ? "justify-end" : "justify-start",
      "mb-4"
    )}>
      <div className={cn(
        "max-w-[85%] md:max-w-[75%] p-4 rounded-xl shadow-sm",
        isUser ? "message-user" : "message-bot",
        isLoading ? "animate-pulse" : ""
      )}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-travel-teal/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="h-2 w-2 bg-travel-teal/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="h-2 w-2 bg-travel-teal/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
