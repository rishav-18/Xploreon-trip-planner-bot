
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { processUserInput } from '@/utils/chatbotUtils';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm your AI travel planner. Let me help you plan your perfect trip. Where would you like to go?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);
    
    try {
      // Process the message and get a response
      const botResponse = await processUserInput(userMessage, messages);
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px] md:h-[700px]">
      <div className="bg-travel-green text-white p-4">
        <h2 className="text-xl font-semibold">AI Trip Planner</h2>
      </div>
      
      {/* Chat messages area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto chat-container"
      >
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isUser={msg.isUser} 
          />
        ))}
        
        {isLoading && (
          <ChatMessage
            message=""
            isUser={false}
            isLoading={true}
          />
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
            className="bg-travel-green hover:bg-travel-yellow hover:text-travel-dark transition-colors"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
