import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Personal Data Protection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mt-1">Last updated: October 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            YouthPath collects user-provided profile information such as your name, email, education level, technical skills, and career preferences. We store saved jobs, customized resumes, and practice interview sessions to deliver personalized employment support.
          </p>
          <p>
            We do not collect sensitive government identification numbers (Aadhaar, PAN), financial passwords, or unnecessary biometric identifiers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. How Information is Used</h2>
          <p>
            Your information is used solely to provide career guidance, ATS resume formatting, turn-by-turn mock interview evaluations, and personalized job recommendations. We do not sell or monetize personal student resumes to third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Artificial Intelligence Processing</h2>
          <p>
            When you use our AI Career Matcher, Resume Polish, or Mock Interview Simulator, your inputs are processed securely through the server-side Google Gemini API. Your private credentials are never exposed in browser bundles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Data Deletion & Rights</h2>
          <p>
            Users maintain full ownership over their resumes and profile data. You can edit or delete your saved resumes, interview history, and account profile at any time directly from the dashboard.
          </p>
        </section>
      </div>
    </div>
  );
};
