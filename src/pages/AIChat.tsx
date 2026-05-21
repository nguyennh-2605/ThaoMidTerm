import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Info, Bot, Mic, Send, Clock, Wallet, Users, Bus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

interface Message {
  id: number;
  type: 'user' | 'bot' | 'greeting';
  text: string;
  timestamp?: string;
  routes?: RouteOption[];
  suggestions?: string[];
  isStreaming?: boolean;
}

interface RouteOption {
  number: string;
  badge: string;
  badgeColor: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  price: string;
  status: string;
  statusColor: string;
  arrival: string;
  walkTime?: string;
  transfer?: string;
}

// Mock response data - giống như trong ảnh
const mockRoutes: RouteOption[] = [
  {
    number: '32',
    badge: '1',
    badgeColor: 'bg-teal-600',
    name: 'Bus 32',
    from: 'FTU (Cổng chính)',
    to: 'AEON Mall Long Biên',
    duration: '27 phút',
    price: '9.000đ',
    status: 'Khá đông',
    statusColor: 'text-orange-500',
    arrival: 'Xe sắp đến: 3 phút nữa tại trạm FTU',
    walkTime: 'Đi bộ 4 phút'
  },
  {
    number: '08',
    badge: '2',
    badgeColor: 'bg-teal-600',
    name: 'Bus 08',
    from: 'Trạm FTU',
    to: 'AEON Mall Long Biên',
    duration: '35 phút',
    price: '9.000đ',
    status: 'Thoáng hơn',
    statusColor: 'text-teal-500',
    arrival: 'Xe sắp đến: 7 phút nữa tại trạm FTU',
    walkTime: 'Đi bộ 6 phút'
  },
  {
    number: '2A + 43',
    badge: '3',
    badgeColor: 'bg-teal-600',
    name: 'Metro 2A',
    from: 'Ga Phạm Văn Đồng',
    to: 'AEON Mall Long Biên',
    duration: '40 phút',
    price: '9.000đ',
    status: 'Rất thoáng',
    statusColor: 'text-teal-600',
    arrival: 'Tàu sắp đến: 5 phút nữa tại ga Phạm Văn Đồng',
    transfer: 'Bus 43',
    walkTime: '3 phút'
  }
];

const mockSuggestions = [
  'Xe nào ít đông nhất?',
  'Rẻ nhất?',
  'Đi về buổi tối thì sao?'
];

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: Date.now(),
      type: 'greeting',
      text: 'Xin chào! 👋\n\nMình là AI Bus Buddy\n\nMình có thể giúp bạn tìm tuyến xe, gợi ý lộ trình, cập nhật giao thông và nhiều hơn nữa!'
    };
    setMessages([greeting]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    // Simulate AI thinking (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsThinking(false);

    // Bot response with streaming effect
    const botResponse: Message = {
      id: Date.now() + 1,
      type: 'bot',
      text: 'Từ FTU đến Aeon Mall Long Biên\nmình gợi ý cho bạn 3 lựa chọn tối ưu nhé:',
      routes: mockRoutes,
      suggestions: mockSuggestions,
      isStreaming: true
    };

    setMessages(prev => [...prev, botResponse]);

    // After streaming, show suggestions
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botResponse.id ? { ...msg, isStreaming: false } : msg
        )
      );
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  return (
    <Layout showBottomNav={true}>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-800">AI Bus Buddy</h1>
            <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              BETA
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-16">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.type === 'greeting' && (
                  <div className="flex gap-3 items-start">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-teal-200"
                    >
                      <Bot className="w-7 h-7 text-teal-600" />
                    </motion.div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%]">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                )}

                {message.type === 'user' && (
                  <div className="flex justify-end">
                    <div className="bg-teal-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-[10px] text-teal-100 mt-1 flex items-center justify-end gap-1">
                        {message.timestamp} ✓✓
                      </p>
                    </div>
                  </div>
                )}

                {message.type === 'bot' && (
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start">
                      <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                          <StreamingText text={message.text} isStreaming={message.isStreaming} />
                        </div>

                        {/* Route Options */}
                        {message.routes && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-3 space-y-3"
                          >
                            {message.routes.map((route, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.2 }}
                                onClick={() => {
                                  if (route.number === '08') {
                                    navigate('/payment');
                                  }
                                }}
                                className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${route.number === '08' ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  <div className={`w-8 h-8 ${route.badgeColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                    {route.badge}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      {route.transfer ? (
                                        <>
                                          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                            Metro 2A
                                          </span>
                                          <span className="text-gray-400">→</span>
                                          <Bus className="w-4 h-4 text-gray-600" />
                                          <span className="text-xs font-bold text-gray-700">{route.transfer}</span>
                                        </>
                                      ) : (
                                        <>
                                          <Bus className="w-4 h-4 text-gray-600" />
                                          <span className="text-sm font-bold text-gray-800">{route.name}</span>
                                        </>
                                      )}
                                      {route.walkTime && (
                                        <>
                                          <span className="text-gray-400 text-xs">→</span>
                                          <span className="text-xs text-gray-500">🚶 {route.walkTime}</span>
                                        </>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">
                                      {route.from} → {route.to}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs">
                                      <span className="flex items-center gap-1 text-gray-600">
                                        <Clock className="w-3.5 h-3.5" /> {route.duration}
                                      </span>
                                      <span className="flex items-center gap-1 text-gray-600">
                                        <Wallet className="w-3.5 h-3.5" /> {route.price}
                                      </span>
                                      <span className={`flex items-center gap-1 font-medium ${route.statusColor}`}>
                                        <Users className="w-3.5 h-3.5" /> {route.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-teal-50 rounded-lg px-3 py-2">
                                  <p className="text-xs text-teal-700 font-medium">{route.arrival}</p>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}

                        {/* Suggestion from Buddy */}
                        {message.routes && !message.isStreaming && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="mt-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100"
                          >
                            <p className="text-xs text-gray-700 leading-relaxed">
                              💡 <span className="font-bold">Gợi ý từ Buddy:</span> Nếu bạn muốn ít đông và thoải mái hơn, Bus 08 hoặc Metro 2A + 43 là lựa chọn tốt nhất nhé!
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {new Date().toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </p>
                          </motion.div>
                        )}

                        {/* Quick Suggestions */}
                        {message.suggestions && !message.isStreaming && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                            className="mt-3 flex flex-wrap gap-2"
                          >
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-2 rounded-full hover:bg-gray-50 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking Indicator */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 items-center"
            >
              <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-teal-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <ThinkingAnimation />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 fixed bottom-18 left-0 right-0 z-20">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Bạn muốn đi đâu?"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button className="text-gray-400 hover:text-gray-600">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Streaming Text Component
function StreamingText({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, isStreaming]);

  return (
    <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
      {displayedText}
      {isStreaming && displayedText.length < text.length && (
        <span className="inline-block w-1 h-4 bg-gray-800 ml-0.5 animate-pulse" />
      )}
    </p>
  );
}

// Thinking Animation with Lightning Effect
function ThinkingAnimation() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium relative overflow-hidden">
        <span className="relative z-10">Đang suy nghĩ</span>
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-teal-600 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
}
