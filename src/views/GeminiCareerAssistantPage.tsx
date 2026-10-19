import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  Copy,
  Check,
  Compass,
  FileText,
  Mic,
  Briefcase,
  IndianRupee,
  BookOpen,
  ArrowRight,
  Loader2,
  Bot,
  User,
  ShieldCheck,
  Building2,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { UserProfile } from '../types';
import { api } from '../services/api';

interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

interface GeminiCareerAssistantPageProps {
  user: UserProfile;
  onNavigate: (tab: string) => void;
}

export const GeminiCareerAssistantPage: React.FC<GeminiCareerAssistantPageProps> = ({
  user,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_01',
      sender: 'gemini',
      text: `### Namaste ${user.name || 'Student'}! I am your AI Career Assistant.

I am here to help Indian college students, fresh graduates, and early-career job seekers navigate their career paths, prepare for campus placements, and land verified job opportunities.

**How can I assist your career today?**
- **Career Roadmaps:** Customized step-by-step plans for Software Engineering, Cloud, Data, AI, or Finance.
- **Resume & ATS Audit:** Paste your project bullets or bio for instant ATS keyword refinement.
- **Campus Placement Tactics:** Technical rounds, coding problem approaches, and HR behavioral questions.
- **Salary Benchmarks:** Realistic CTC breakdown in ₹ LPA, monthly stipends, and city-wise cost considerations.

Choose one of the quick prompts below or ask me any question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'roadmap' | 'resume' | 'interview' | 'salary'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const promptCategories = [
    {
      id: 'roadmap',
      title: 'Career Roadmaps',
      icon: Compass,
      description: 'Step-by-step role guides',
      prompts: [
        'What skills do IT freshers need for product startups in Bengaluru in 2026?',
        'Create a 90-day learning roadmap to become a Junior Full Stack Developer.',
        'How can a non-CS engineering student transition into Data Analytics in India?',
      ],
    },
    {
      id: 'resume',
      title: 'Resume & ATS Audit',
      icon: FileText,
      description: 'Bullet points & keyword scoring',
      prompts: [
        'How do I rewrite college final-year project bullets using the Google XYZ formula?',
        'What are the most critical ATS keywords for an entry-level React and Node.js resume?',
        'How should I format my fresher resume if my CGPA is below 7.5?',
      ],
    },
    {
      id: 'interview',
      title: 'Interview Preparation',
      icon: Mic,
      description: 'STAR framework & company rounds',
      prompts: [
        'Explain how to answer "Tell me about yourself" for Indian IT campus placements.',
        'What technical DSA topics are asked most frequently in entry-level coding rounds?',
        'How do I answer "What is your biggest weakness" without sounding generic?',
      ],
    },
    {
      id: 'salary',
      title: 'Salary & Compensation',
      icon: IndianRupee,
      description: 'Realistic ₹ LPA benchmarks',
      prompts: [
        'What is the realistic fresher CTC range for Software Engineers across Bengaluru, Hyderabad, and Pune?',
        'What is the typical stipend range for engineering and design interns in India?',
        'Explain the difference between Fixed CTC, Variable Pay, and Joining Bonus in fresher offer letters.',
      ],
    },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        sender: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        text: m.text,
      }));

      const res = await api.sendAssistantMessage(text, history);

      const botMessage: Message = {
        id: `gemini_${Date.now()}`,
        sender: 'gemini',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'gemini',
          text: `I encountered a momentary connection notice: ${err.message || 'Please retry in a moment.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'gemini',
        text: `### Conversation Reset

What career topic, job strategy, or interview question would you like to explore next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-slate-900 text-sm sm:text-base mt-3 mb-1.5 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>{trimmed.replace('### ', '')}</span>
              </h4>
            );
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-slate-700">
                <span className="text-teal-600 font-bold mt-0.5">•</span>
                <span>{formatBold(trimmed.substring(2))}</span>
              </div>
            );
          }
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-3 border-teal-500 pl-3 py-1 my-1.5 italic bg-teal-50/50 rounded-r-lg text-slate-800 text-xs">
                {formatBold(trimmed.substring(2))}
              </blockquote>
            );
          }
          if (trimmed.startsWith('|')) {
            return (
              <div key={idx} className="font-mono text-[11px] overflow-x-auto py-0.5 text-slate-600 bg-slate-50 px-2 rounded">
                {line}
              </div>
            );
          }
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }
          return (
            <p key={idx} className="text-slate-800">
              {formatBold(line)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-50/70 min-h-screen py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-teal-500/10 text-teal-800 border border-teal-200/80 mb-2.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
              <span>AI Career Advisory</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] text-teal-700 font-medium">Smart Employment System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>AI Career Assistant</span>
            </h1>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Real-time strategic career advice, ATS resume audits, company interview tactics, and fresher salary intelligence for India.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => onNavigate('interviews')}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Mic className="w-3.5 h-3.5 text-teal-600" />
              <span>Mock Interview Simulator</span>
            </button>
            <button
              onClick={() => onNavigate('resume')}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>ATS Resume Builder</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Advisory Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {promptCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleSend(cat.prompts[0])}
                className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-300 hover:shadow-xs transition cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-700 transition">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{cat.description}</p>
                <div className="mt-2 text-[10px] text-teal-600 font-semibold flex items-center gap-1">
                  <span>Ask AI Assistant</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Chat Console Window */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[640px] sm:h-[700px]">
          
          {/* Console Header */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 fill-white text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">AI Career Advisory Console</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 hidden sm:inline-block">
                    Active Session
                  </span>
                </div>
                <p className="text-[11px] text-teal-300/90">
                  Dedicated Career Guidance for Indian Students & Freshers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetChat}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                title="Clear and Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Session</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'gemini' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-xs text-xs sm:text-sm whitespace-pre-line'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {m.sender === 'gemini' ? renderFormattedMessage(m.text) : m.text}

                  <div className="flex items-center justify-between border-t border-slate-100/80 pt-2 mt-2.5 text-[10px] text-slate-400 gap-2">
                    <span>
                      {m.sender === 'gemini' ? 'AI Assistant' : user.name || 'You'} • {m.timestamp}
                    </span>

                    {m.sender === 'gemini' && (
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="text-slate-400 hover:text-teal-600 transition flex items-center gap-1 cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center text-xs text-slate-500 py-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-2.5 text-xs text-slate-700">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  <span>AI Assistant is analyzing employment insights and formulating your guidance...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Bar */}
          {messages.length <= 4 && (
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Try:</span>
              </span>
              <button
                onClick={() => handleSend('What skills do IT freshers need for product startups in Bengaluru?')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-200 shrink-0 transition cursor-pointer"
              >
                Bengaluru IT Fresher Skills
              </button>
              <button
                onClick={() => handleSend('How do I rewrite college final-year project bullets using the Google XYZ formula?')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-200 shrink-0 transition cursor-pointer"
              >
                Google XYZ Resume Bullets
              </button>
              <button
                onClick={() => handleSend('Explain how to answer "Tell me about yourself" for Indian IT campus placements.')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-200 shrink-0 transition cursor-pointer"
              >
                Campus Interview "Tell Me About Yourself"
              </button>
              <button
                onClick={() => handleSend('What is the realistic fresher CTC range for Software Engineers across Bengaluru, Hyderabad, and Pune?')}
                className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-200 shrink-0 transition cursor-pointer"
              >
                Tier-1 City Fresher CTCs
              </button>
            </div>
          )}

          {/* Input Console Bar */}
          <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI Assistant any career roadmap, ATS resume, salary, or interview question..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold px-4 sm:px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>AI Career Assistant • Pragmatic guidance for Indian students</span>
              <span className="hidden sm:inline">Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
