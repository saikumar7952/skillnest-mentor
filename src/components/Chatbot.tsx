
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, RefreshCw, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your SkillNest assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const messagesToSend = messages.concat(userMessage)
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(({ role, content }) => ({ role, content }));

      const { data, error } = await supabase.functions.invoke('ai-chatbot', {
        body: { messages: messagesToSend },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      toast.error('Failed to get a response. Please try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hi there! I\'m your SkillNest assistant. How can I help you today?'
    }]);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-gray-700 rotate-90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Bot className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl transition-all duration-300 overflow-hidden flex flex-col",
          "w-80 sm:w-96 border border-border",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Chat header */}
        <div className="p-3 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-medium">SkillNest Assistant</h3>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-white hover:bg-primary/90"
            onClick={resetChat}
            title="Reset chat"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 max-h-[350px]">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.role === 'user'
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
                <div 
                  className="text-sm prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: message.content
                      .replace(/\n/g, '<br/>')
                      .replace(/```([a-z]*)([\s\S]*?)```/g, (_, lang, code) => 
                        `<div class="bg-gray-800 text-gray-100 p-2 rounded-md my-2 overflow-x-auto font-mono text-xs"><div class="flex justify-between items-center mb-1"><span class="text-xs text-gray-400">${lang || 'code'}</span></div>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`)
                  }}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs font-medium">Assistant</span>
                </div>
                <div className="flex space-x-1 items-center">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t p-3 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
