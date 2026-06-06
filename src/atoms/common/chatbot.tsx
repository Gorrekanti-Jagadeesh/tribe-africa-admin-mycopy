import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane, faTimes, faRobot } from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const INITIAL_MESSAGES: Message[] = [{ id: 1, text: 'Hi, how can I help you?', sender: 'bot' }];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Placeholder bot reply — replace with AI integration later
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: 'Thanks for your message! Our team will get back to you soon.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="relative flex flex-col items-end">
      {/* Drop-up chat window */}
      {isOpen && (
        <div
          className="absolute bottom-full mb-3 right-0 w-[300px] rounded-[10px] overflow-hidden shadow-2xl border border-brand-orange flex flex-col bg-white"
          style={{ height: '420px' }}
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faRobot} className="text-white text-base" />
            </div>
            <div className="flex-1">
              <p className="font-poppins font-semibold text-sm text-black leading-tight">ChatBot</p>
              <p className="font-poppins text-xs text-green-500 leading-tight">● Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-sm" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mb-0.5">
                    <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
                  </div>
                )}
                <div
                  className={`max-w-[200px] px-3 py-2 rounded-[10px] font-poppins text-sm leading-snug ${
                    msg.sender === 'user'
                      ? 'bg-brand-orange text-white rounded-br-none'
                      : 'bg-white text-black shadow-sm rounded-bl-none border border-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-gray-200 bg-white px-3 py-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your question..."
              className="flex-1 font-poppins text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              onClick={sendMessage}
              className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center hover:bg-[#E05A00] transition-colors shrink-0"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-brand-orange text-white font-poppins font-semibold text-sm px-4 py-3 rounded-[10px] hover:bg-[#E05A00] transition-colors shadow-lg"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
        </div>
        <span className="hidden md:block">Ask me anything !</span>
      </button>
    </div>
  );
};

export default Chatbot;
