import React from 'react';
import { TrendingUp, Mail, Shield, FileCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-sm">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Youth<span className="text-teal-400">Path</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-4">
              Discover Your Skills. Build Your Future.
            </p>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              An India-focused employment support system and career guidance platform for college students, fresh graduates, and first-time job seekers across urban and regional India.
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-teal-400">
                <Shield className="w-3.5 h-3.5" />
                Verified Opportunities
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-teal-400">
                <FileCheck className="w-3.5 h-3.5" />
                ATS Standard
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition cursor-pointer">
                  Explore Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-teal-400 transition cursor-pointer">
                  Find Jobs in India
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-teal-400 transition cursor-pointer">
                  Skill Hub & Certifications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interviews')} className="hover:text-teal-400 transition cursor-pointer">
                  AI Mock Interviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-teal-400 transition cursor-pointer">
                  ATS Resume Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Careers Covered */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Top Career Tracks</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition cursor-pointer">
                  Full Stack Web Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition cursor-pointer">
                  Data Analytics & BI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition cursor-pointer">
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition cursor-pointer">
                  Financial Analysis & Banking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-teal-400 transition cursor-pointer">
                  UI/UX Product Design
                </button>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">Information</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition cursor-pointer">
                  About YouthPath
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('feedback')} className="hover:text-teal-400 transition cursor-pointer">
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-teal-400 transition cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-teal-400 transition cursor-pointer">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} YouthPath. All rights reserved. Designed for Indian students and job seekers.</p>
          <div className="flex items-center gap-6">
            <span>India Standard Time (IST)</span>
            <span>Default Currency: INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
