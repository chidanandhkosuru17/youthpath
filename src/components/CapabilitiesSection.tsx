import React from 'react';
import { Compass, Briefcase, Mic, FileText, BookOpen, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CapabilitiesSectionProps {
  onNavigate: (tab: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      id: 'careers',
      icon: Compass,
      title: 'Career Exploration & Roadmaps',
      description: 'Explore 14+ Indian career profiles across Tech, Data, Business, and Finance. Understand role day-to-day, fresher salary ranges (LPA), and step-by-step learning roadmaps.',
      highlights: ['Realistic fresher salary benchmarks in INR', 'Free & NPTEL course recommendations', 'Beginner portfolio project ideas'],
      actionLabel: 'Explore Tracks'
    },
    {
      id: 'jobs',
      icon: Briefcase,
      title: 'Verified Early-Career Jobs',
      description: 'Discover genuine fresher jobs, internships, and apprenticeships across major Indian tech hubs like Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR, and Remote.',
      highlights: ['Fresher-friendly & internship filters', 'Direct verified company portal links', 'Transparent stipend and LPA packages'],
      actionLabel: 'Find Opportunities'
    },
    {
      id: 'interviews',
      icon: Mic,
      title: 'AI Mock Interview Simulator',
      description: 'Practice interactive role-specific interviews with Gemini. Receive immediate turn-by-turn evaluations, scoring, strengths, improvement tips, and model answers.',
      highlights: ['Turn-by-turn answer evaluation', 'Technical, HR, and behavioral pools', 'End-of-session comprehensive scorecard'],
      actionLabel: 'Start Practice'
    },
    {
      id: 'resume',
      icon: FileText,
      title: 'ATS-Compliant Resume Builder',
      description: 'Create clean, recruiter-approved resumes tailored for Indian campus placements and lateral hiring. Export to print-ready PDF with one click.',
      highlights: ['One-click Gemini AI bullet enhancement', 'Live preview across multiple templates', 'Print & save as PDF formatted for A4'],
      actionLabel: 'Build Resume'
    },
    {
      id: 'skills',
      icon: BookOpen,
      title: 'Curated Skill Hub',
      description: 'Follow organized learning checklists featuring official docs, Harvard CS50, NPTEL SWAYAM, and FreeCodeCamp. Track your skill mastery persistently.',
      highlights: ['Free Government of India & MOOC certifications', 'Interactive progress tracking', 'Skill checklists by job role'],
      actionLabel: 'View Skill Hub'
    },
    {
      id: 'chat',
      icon: Bot,
      title: '24/7 AI Career Assistant',
      description: 'Ask questions about Indian career choices, resume wording, interview strategies, salary negotiations, or overcoming campus placement anxiety.',
      highlights: ['Context-aware conversational guidance', 'Pragmatic advice for Indian students', 'Available anywhere via quick drawer'],
      actionLabel: 'Ask Assistant'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching screenshot */}
        <div className="max-w-3xl">
          <span className="text-teal-600 font-bold text-xs uppercase tracking-wider block mb-2">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Designed for Every Step of the Transition from Campus to Career
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            From discovering which field aligns with your interests to acing interviews and negotiating your first offer letter, YouthPath gives you verified tools and AI guidance.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-200 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition duration-200">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {item.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onNavigate(item.id)}
                  className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-teal-600 group-hover:text-teal-700 cursor-pointer"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
