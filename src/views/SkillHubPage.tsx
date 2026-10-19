import React, { useState } from 'react';
import { LearningItem } from '../types';
import { BookOpen, CheckCircle, Clock, ExternalLink, Award, Sparkles, Filter } from 'lucide-react';

interface SkillHubPageProps {
  learningItems: LearningItem[];
  completedItemIds: string[];
  onToggleProgress: (itemId: string) => void;
  selectedTrackId?: string;
}

export const SkillHubPage: React.FC<SkillHubPageProps> = ({
  learningItems,
  completedItemIds,
  onToggleProgress,
  selectedTrackId,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Web Development', 'Data Science & Analytics', 'Computer Science Fundamentals', 'Deep Learning & AI', 'Cloud Architecture', 'Information Security', 'Finance & Banking', 'Sales & Growth'];

  const filteredItems = learningItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skillsGained.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTrack = !selectedTrackId || selectedTrackId === 'all' || item.trackId === selectedTrackId;
    return matchesCat && matchesSearch && matchesTrack;
  });

  const progressPercentage = learningItems.length > 0
    ? Math.round((completedItemIds.length / learningItems.length) * 100)
    : 0;

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Verified Indian Student Learning Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Skill Hub & Certifications
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Curated free resources, official Government of India SWAYAM/NPTEL portals, and world-class developer courses. Mark items completed to track persistent progress.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs w-full md:w-72 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1.5">
              <span>Overall Completion</span>
              <span className="text-teal-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-500">
              {completedItemIds.length} of {learningItems.length} resources mastered
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs mb-8 space-y-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, provider (e.g. NPTEL, Harvard, AWS), or skill..."
            className="w-full pl-3.5 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-xs capitalize font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
                  activeCategory === c
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCompleted = completedItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-xl border p-5 shadow-2xs transition flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-white border-slate-200/80 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {item.isFree ? '100% Free' : 'Free Audit Available'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-teal-700 mb-2">
                    {item.provider}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{item.estimatedHours} Hours to complete</span>
                    <span>•</span>
                    <span className="capitalize">{item.level}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.skillsGained.map((sg, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {sg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onToggleProgress(item.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
                  >
                    <span>Visit Course</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
