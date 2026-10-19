import React from 'react';
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onBuildProfile: () => void;
  onExploreOpportunities: () => void;
  onSelectTrack: (trackId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuildProfile,
  onExploreOpportunities,
  onSelectTrack,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column matching screenshot text */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/90 mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Smart Employment Support System for Youth</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Your Career Journey{' '}
              <span className="text-teal-600 block mt-1">Starts Here.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              YouthPath empowers students, fresh graduates, and early-career seekers to discover
              verified career tracks, master in-demand skills, build professional resumes, and
              practice realistic AI interviews.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onBuildProfile}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3.5 rounded-lg flex items-center gap-2.5 text-sm sm:text-base shadow-sm hover:shadow-teal-600/20 active:scale-[0.98] transition cursor-pointer"
              >
                <span>Build Your Career Profile</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={onExploreOpportunities}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 font-medium px-6 py-3.5 rounded-lg text-sm sm:text-base shadow-2xs transition cursor-pointer"
              >
                Explore Opportunities
              </button>
            </div>

            {/* Stat Counters matching screenshot */}
            <div className="mt-12 pt-8 border-t border-slate-100 w-full grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">14+ Tracks</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5">Tech & Business</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">AI Simulator</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5">Turn-by-turn Feedback</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">Verified Jobs</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5">Early-Career Focus</div>
              </div>
            </div>
          </div>

          {/* Right Column Hero Card matching screenshot */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 aspect-[16/11] sm:aspect-[4/3] group">
              {/* Background realistic image of diverse young Indian students collaborating */}
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Students and young professionals collaborating on career planning in a modern bright setting"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-700 opacity-90"
                loading="eager"
              />

              {/* Bottom Gradient Overlay & Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-6 pt-16 flex flex-col justify-end">
                <div className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
                  EMPOWERING YOUTH
                </div>
                <div className="text-white font-medium text-base sm:text-lg mt-1 leading-snug">
                  Equipping students for the future of work
                </div>
              </div>
            </div>

            {/* Subtle decorative backdrop glow */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
