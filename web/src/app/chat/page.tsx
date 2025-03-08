'use client';

import { Header } from '@/components/Header';
import { useEffect, useState, useRef } from 'react';

interface Message {
  user: string;
  text: string;
  action: string;
  role: 'user' | 'assistant';  // Added role for UI rendering
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/message', {
        method: 'POST',
      });

      const result: Message[] = await res.json();
      // Convert existing messages to include role
      const formattedMessages = result.map(msg => ({
        ...msg,
        role: msg.user === 'User' ? 'user' : 'assistant',
      })) as Message[];
      setMessages(formattedMessages);
    };

    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      user: 'User',
      text: input.trim(),
      action: 'send',
      role: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Here you would make your API call
    // For now using a mock response
    try {
      // Replace this with your actual API call
      const mockResponse: Message = {
        user: 'Assistant',
        text: 'This is a mock response. Connect to your backend to get real responses.',
        action: 'reply',
        role: 'assistant'
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, mockResponse]);
      }, 500);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Header />
      <main className='flex flex-col h-[calc(100vh-64px)]'> {/* Adjust height based on your header */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-800 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className='p-4 border-t border-neutral-800'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='flex-1 bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Type your message...'
            />
            <button 
              type='submit'
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Chat;
