import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { CareerTrack, JobListing } from '../types';
import { ArrowRight, CheckCircle2, MapPin, IndianRupee, Briefcase, GraduationCap, Sparkles, Building2 } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onSelectTrack: (trackId: string) => void;
  featuredJobs: JobListing[];
  careerTracks: CareerTrack[];
  onSaveJob: (jobId: string) => void;
  savedJobIds: string[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectTrack,
  featuredJobs,
  careerTracks,
  onSaveJob,
  savedJobIds,
}) => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section matching screenshot */}
      <HeroSection
        onBuildProfile={() => onNavigate('dashboard')}
        onExploreOpportunities={() => onNavigate('jobs')}
        onSelectTrack={onSelectTrack}
      />

      {/* 2. Capabilities Section matching screenshot */}
      <CapabilitiesSection onNavigate={onNavigate} />

      {/* 3. Three-Step How YouthPath Works */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-wider block mb-2">
              SIMPLE 3-STEP JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How YouthPath Accelerates Your Employment
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              A transparent, structured system created specifically for students and early-career job seekers across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/70 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-base mb-6 shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Discover Your Career Track
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Take our AI-guided assessment or explore 14+ Indian career profiles. Learn exact entry-level responsibilities, realistic fresher salaries in INR (LPA), and required skills.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/70 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-base mb-6 shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Build Skills & Prepare Resumes
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Complete free NPTEL/SWAYAM and open-source learning paths. Build an ATS-friendly resume with instant AI enhancement and practice turn-by-turn AI mock interviews.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/70 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-base mb-6 shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Apply to Verified Opportunities
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Search genuine fresher positions, internships, and apprenticeships across Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR, and remote roles with verified company URLs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Early Career Jobs Preview */}
      <section className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-teal-600 font-bold text-xs uppercase tracking-wider block mb-2">
                VERIFIED INDIAN OPPORTUNITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Early-Career Openings & Internships
              </h2>
            </div>
            <button
              onClick={() => onNavigate('jobs')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
            >
              <span>View All Job Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                      {job.employmentType}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {job.workMode}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 mb-3">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800">{job.company}</span>
                    <span className="text-slate-300">•</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg mb-4 text-xs font-semibold text-slate-800 flex items-center justify-between">
                    <span>Package:</span>
                    <span className="text-teal-700">{job.salaryText}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Source: {job.source}
                  </span>
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
                  >
                    <span>Apply on Portal</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Start Crafting Your Career Trajectory Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of Indian students and fresh graduates exploring verified career roadmaps, perfecting ATS resumes, and gaining interview confidence with YouthPath.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('careers')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3.5 rounded-lg text-sm sm:text-base transition shadow-sm cursor-pointer"
            >
              Explore Career Tracks
            </button>
            <button
              onClick={() => onNavigate('interviews')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium px-6 py-3.5 rounded-lg text-sm sm:text-base transition cursor-pointer"
            >
              Try AI Mock Interview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
