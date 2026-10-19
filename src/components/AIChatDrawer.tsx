import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, RotateCcw } from 'lucide-react';
import { api } from '../services/api';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Namaste! I am YouthPath\'s AI Career Assistant. How can I help you today? You can ask about career paths in India, resume tips, interview questions, or fresher salaries.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ sender: m.sender, text: m.text }));
      const response = await api.sendAssistantMessage(text.trim(), history);

      const botMsg: Message = {
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: err.message || 'I encountered an error connecting to the career advisor server. Please retry in a few moments.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        sender: 'assistant',
        text: 'Conversation reset. What career topic or job question would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const sampleQuestions = [
    'What skills do IT freshers need in Bengaluru?',
    'How do I write an ATS resume summary?',
    'Explain the STAR method for HR interviews',
    'What is the salary range for Junior Data Analysts in India?'
  ];

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const renderFormattedMessage = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-slate-900 text-sm mt-2 mb-1 border-b border-slate-100 pb-0.5">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1 text-slate-700">
                <span className="text-teal-600 font-bold">•</span>
                <span>{formatBold(trimmed.substring(2))}</span>
              </div>
            );
          }
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-2 border-teal-500 pl-2.5 py-1 my-1 italic bg-teal-50/50 rounded-r text-slate-800 text-xs">
                {formatBold(trimmed.substring(2))}
              </blockquote>
            );
          }
          if (trimmed.startsWith('|')) {
            return (
              <div key={idx} className="font-mono text-[11px] overflow-x-auto py-0.5 text-slate-600">
                {line}
              </div>
            );
          }
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="leading-relaxed">
              {formatBold(line)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button matching screenshot */}
      <button
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-40 bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2.5 rounded-full shadow-lg hover:shadow-teal-600/30 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-sm"
      >
        <Sparkles className="w-4 h-4 text-teal-200 fill-teal-200" />
        <span>AI Career Assistant</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">YouthPath Career AI</h3>
                  <p className="text-[11px] text-teal-300">India Career & Job Guidance</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                      m.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-tr-xs text-xs sm:text-sm whitespace-pre-line'
                        : 'bg-white text-slate-800 border border-slate-200/70 rounded-tl-xs'
                    }`}
                  >
                    {m.sender === 'assistant' ? renderFormattedMessage(m.text) : m.text}
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        m.sender === 'user' ? 'text-teal-100' : 'text-slate-400'
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      U
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center text-xs text-slate-500 py-2">
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-3.5 py-2 rounded-2xl border border-slate-200/70 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                    <span>Analyzing career insights...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="p-3 bg-white border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-500 mb-2">Suggested questions:</p>
                <div className="flex flex-col gap-1.5">
                  {sampleQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-left text-xs bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 p-2 rounded-lg border border-slate-100 transition cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask any career or interview question..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white p-2.5 rounded-lg transition shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-slate-400 mt-2 text-center">
                AI guidance is based on current Indian job trends. Always verify specific company requirements.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
