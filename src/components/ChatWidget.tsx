import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Phone } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! Looking for the perfect pair? I can help with sizing or recommendations.", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { 
        text: "Thanks for reaching out! One of our shoe experts will be with you shortly. In the meantime, have you checked our size recommender on the product pages?", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 flex flex-col gap-4 z-40 transition-all duration-200 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
        <a 
          href="tel:+1234567890"
          className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform group relative"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
            Call Now
          </span>
        </a>
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-zinc-100 z-50 flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 48px)', height: '500px' }}
          >
            <div className="bg-zinc-900 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">Pace Support</h3>
                <p className="text-xs text-zinc-300">Typically replies in a few minutes</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white rounded-br-sm' 
                      : 'bg-zinc-200 text-zinc-800 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white border-t border-zinc-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-zinc-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
