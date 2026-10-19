import React from 'react';
import { TrendingUp, ShieldCheck, Users, Target, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About YouthPath
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover Your Skills. Build Your Future.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Empowering the Next Generation of Indian Professionals
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            YouthPath is an India-focused career guidance and employment support system designed to bridge the gap between academic education and industry expectations. We empower college students, fresh graduates, and first-time job seekers across urban metros as well as Tier-2 and Tier-3 institutions.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Too often, students face conflicting career advice, unverified placement promises, and opaque recruitment processes. YouthPath provides transparent role roadmaps, realistic salary benchmarks in INR (LPA), verified early-career job links, and AI tools for interview practice and resume tailoring.
          </p>
        </div>

        {/* Core Principles */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">
            Our Core Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-teal-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 mb-1.5">No Fabricated Claims</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never invent vacancies, salaries, or guaranteed placement statistics. All career roadmaps and resources are grounded in genuine industry data.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <Target className="w-6 h-6 text-teal-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 mb-1.5">India-First Focus</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored for Indian college graduates, campus placement seasons, INR compensation metrics, and both IT and non-IT career opportunities.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <BookOpen className="w-6 h-6 text-teal-600 mb-3" />
              <h4 className="font-bold text-sm text-slate-900 mb-1.5">Accessible & Open</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Championing free, recognized educational resources like NPTEL SWAYAM, CS50, and open developer documentation to keep learning equitable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6 border-t border-slate-100">
          <button
            onClick={() => onNavigate('careers')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow-sm cursor-pointer"
          >
            Explore Career Tracks
          </button>
        </div>
      </div>
    </div>
  );
};
