
import React, { useState, useEffect, useRef } from 'react';
import { askDevAssistant } from '../services/aiService';
import MarkdownRenderer from './MarkdownRenderer';
import { XIcon } from './icons/FeedbackIcons';

interface AIDevAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const AIDevAssistantModal: React.FC<AIDevAssistantModalProps> = ({ isOpen, onClose, context }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'ai', content: "Hello! I'm your AI Dev Assistant. How can I help you with this topic?" }
      ]);
      setInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages: Message[] = [...messages, userMessage, { role: 'ai', content: '' }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const history = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const prompt = `
      You are a friendly and helpful Java AI Dev Assistant for beginners.
      Keep your answers concise, clear, and encouraging. Use markdown for formatting.

      Here is the context of the lesson the user is on:
      ---
      ${context}
      ---
      
      Here is the conversation history:
      ---
      ${history}
      ---

      The user's new question is: "${input}"
    `;

    try {
      const stream = await askDevAssistant(prompt);
      let currentAIResponse = '';
      for await (const chunk of stream) {
        currentAIResponse += chunk.text;
        setMessages(prevMessages => {
          const updated = [...prevMessages];
          updated[updated.length - 1] = { role: 'ai', content: currentAIResponse };
          return updated;
        });
      }
    } catch (error) {
       setMessages(prevMessages => {
          const updated = [...prevMessages];
          updated[updated.length - 1] = { role: 'ai', content: "Sorry, I encountered an error. Please try again." };
          return updated;
        });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-base-100 dark:bg-base-200-dark w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-base-300 dark:border-base-300-dark">
          <h2 className="text-xl font-bold text-primary dark:text-blue-300">AI Dev Assistant</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-base-300 dark:hover:bg-base-300-dark">
            <XIcon className="h-6 w-6 text-content-200 dark:text-content-200-dark" />
          </button>
        </header>

        <main ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-base-300 dark:bg-base-300-dark'}`}>
                {msg.role === 'ai' && msg.content === '' ? (
                  <div className="flex items-center space-x-2">
                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                ) : (
                  <MarkdownRenderer content={msg.content} />
                )}
              </div>
            </div>
          ))}
        </main>

        <footer className="p-4 border-t border-base-300 dark:border-base-300-dark">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full px-4 py-2 border border-base-300 dark:border-base-300-dark rounded-full focus:ring-2 focus:ring-secondary focus:outline-none bg-base-100 dark:bg-base-100-dark"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-secondary text-white font-semibold rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AIDevAssistantModal;
