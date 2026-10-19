import React, { useState } from 'react';
import { CareerTrack } from '../types';
import { api } from '../services/api';
import { Search, Sparkles, Compass, IndianRupee, BookOpen, CheckCircle, ArrowRight, X, Loader2, Award, Briefcase, GraduationCap } from 'lucide-react';

interface CareersPageProps {
  careerTracks: CareerTrack[];
  onSelectTrackForSkills?: (trackId: string) => void;
  onNavigateToInterviews?: (roleTitle: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({
  careerTracks,
  onSelectTrackForSkills,
  onNavigateToInterviews,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCareer, setActiveCareer] = useState<CareerTrack | null>(null);

  // AI Questionnaire modal state
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiEducation, setAiEducation] = useState('B.Tech / BCA / Engineering');
  const [aiInterests, setAiInterests] = useState('Problem solving, web apps, building tools');
  const [aiSkills, setAiSkills] = useState('Basic JavaScript, HTML/CSS, Python');
  const [aiWorkType, setAiWorkType] = useState('Hybrid or Remote in India');
  const [aiGoals, setAiGoals] = useState('Secure a software or data role as a 2026 fresher');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[] | null>(null);
  const [aiError, setAiError] = useState('');

  const categories = ['All', 'Tech', 'Data & AI', 'Design & Creative', 'Business & Marketing', 'Finance', 'Operations & Support'];

  const filteredCareers = careerTracks.filter((track) => {
    const matchesCategory = selectedCategory === 'All' || track.category === selectedCategory;
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.requiredSkills.core.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleGenerateAIRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiError('');
    try {
      const res = await api.getCareerRecommendations({
        education: aiEducation,
        interests: aiInterests,
        skills: aiSkills,
        preferredWorkType: aiWorkType,
        goals: aiGoals,
      });
      if (res.recommendations && res.recommendations.length > 0) {
        setAiRecommendations(res.recommendations);
      } else {
        setAiError('Could not parse recommendations from the AI response. Please try again.');
      }
    } catch (err: any) {
      setAiError(err.message || 'Failed to generate recommendations. Please ensure server API keys are set.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>India Career Guidance & Roadmaps</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Career Pathways
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Discover entry-level roles, required industry skills, step-by-step learning roadmaps, and verified fresher salary packages in India.
            </p>
          </div>

          {/* AI Career Matcher CTA */}
          <button
            onClick={() => setShowAIModal(true)}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 text-sm shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 fill-teal-100" />
            <span>AI Career Matcher</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers by title, skills (e.g. React, SQL, Figma, Python), or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-md hover:border-teal-200 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {track.category}
                  </span>
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {track.salaryRangeIndia.fresherLPA}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition mb-2">
                  {track.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {track.overview}
                </p>

                {/* Core skills tags */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Core Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {track.requiredSkills.core.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {track.requiredSkills.core.length > 4 && (
                      <span className="text-[11px] text-slate-400 self-center">
                        +{track.requiredSkills.core.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {track.roadmap.length} Milestone Roadmap
                </span>
                <button
                  onClick={() => setActiveCareer(track)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No career tracks match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting the filter category or search keywords.</p>
          </div>
        )}
      </div>

      {/* Detailed Career Modal */}
      {activeCareer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white sticky top-0 z-10 flex items-start justify-between border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  {activeCareer.category} Career Track
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {activeCareer.title}
                </h2>
                <p className="text-xs text-slate-300 mt-1">{activeCareer.tagline}</p>
              </div>
              <button
                onClick={() => setActiveCareer(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Overview & Salary Grid */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Role Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeCareer.overview}
                </p>
              </div>

              {/* Salary in India */}
              <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4" />
                  Salary Benchmarks in India (Annual LPA)
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center mb-2">
                  <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                    <div className="text-[11px] text-slate-500">Fresher (0-1 yr)</div>
                    <div className="font-bold text-sm text-teal-700">{activeCareer.salaryRangeIndia.fresherLPA}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                    <div className="text-[11px] text-slate-500">Mid-Level (3-5 yrs)</div>
                    <div className="font-bold text-sm text-slate-800">{activeCareer.salaryRangeIndia.midLPA}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                    <div className="text-[11px] text-slate-500">Senior (6+ yrs)</div>
                    <div className="font-bold text-sm text-slate-800">{activeCareer.salaryRangeIndia.seniorLPA}</div>
                  </div>
                </div>
                <p className="text-[11px] text-teal-900/80 italic">{activeCareer.salaryRangeIndia.notes}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Day-to-Day Responsibilities</h4>
                <ul className="space-y-1.5">
                  {activeCareer.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills breakdown */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Skills Required</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Core Technologies: </span>
                    <span className="text-slate-600">{activeCareer.requiredSkills.core.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Good to Have: </span>
                    <span className="text-slate-600">{activeCareer.requiredSkills.goodToHave.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Soft Skills: </span>
                    <span className="text-slate-600">{activeCareer.requiredSkills.soft.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Learning Roadmap */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  Step-by-Step Learning Roadmap
                </h4>
                <div className="space-y-3">
                  {activeCareer.roadmap.map((step) => (
                    <div key={step.step} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                        <span>Phase {step.step}: {step.title}</span>
                        <span className="text-teal-700 font-semibold">{step.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {step.topics.map((t, i) => (
                          <span key={i} className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Starter Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h5 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    Recommended Certifications
                  </h5>
                  <ul className="space-y-2 text-xs">
                    {activeCareer.certifications.map((cert, i) => (
                      <li key={i} className="border-b border-slate-200/60 pb-1.5 last:border-none">
                        <div className="font-semibold text-slate-800">{cert.name}</div>
                        <div className="text-[11px] text-slate-500 flex justify-between">
                          <span>{cert.issuer}</span>
                          <span className="text-teal-700 font-medium">{cert.type}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h5 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                    Starter Portfolio Projects
                  </h5>
                  <ul className="space-y-2 text-xs">
                    {activeCareer.starterProjects.map((p, i) => (
                      <li key={i} className="border-b border-slate-200/60 pb-1.5 last:border-none">
                        <div className="font-semibold text-slate-800">{p.name}</div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{p.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setActiveCareer(null)}
                  className="px-4 py-2 border border-slate-200 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Close
                </button>
                <div className="flex items-center gap-2">
                  {onNavigateToInterviews && (
                    <button
                      onClick={() => {
                        onNavigateToInterviews(activeCareer.title);
                        setActiveCareer(null);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
                    >
                      Practice Mock Interview for this Role
                    </button>
                  )}
                  {onSelectTrackForSkills && (
                    <button
                      onClick={() => {
                        onSelectTrackForSkills(activeCareer.id);
                        setActiveCareer(null);
                      }}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg"
                    >
                      View Learning Resources
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Career Matcher Questionnaire Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in duration-200">
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">AI Career Matcher</h3>
                  <p className="text-xs text-teal-300">Personalized Indian Job Market Recommendations</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAIModal(false);
                  setAiRecommendations(null);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!aiRecommendations ? (
                <form onSubmit={handleGenerateAIRecommendations} className="space-y-4">
                  {aiError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100">
                      {aiError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Education & Degree / Major
                    </label>
                    <input
                      type="text"
                      value={aiEducation}
                      onChange={(e) => setAiEducation(e.target.value)}
                      placeholder="e.g. B.Tech CSE, BCA, B.Com, B.Sc Mathematics"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Interests & Preferred Work
                    </label>
                    <input
                      type="text"
                      value={aiInterests}
                      onChange={(e) => setAiInterests(e.target.value)}
                      placeholder="e.g. Building websites, analyzing business numbers, design, sales"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Skills
                    </label>
                    <input
                      type="text"
                      value={aiSkills}
                      onChange={(e) => setAiSkills(e.target.value)}
                      placeholder="e.g. JavaScript, Excel, Python, English Communication"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Location & Mode Preference in India
                    </label>
                    <input
                      type="text"
                      value={aiWorkType}
                      onChange={(e) => setAiWorkType(e.target.value)}
                      placeholder="e.g. Hybrid in Bengaluru/Pune or Remote across India"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Career Goals
                    </label>
                    <textarea
                      rows={2}
                      value={aiGoals}
                      onChange={(e) => setAiGoals(e.target.value)}
                      placeholder="e.g. Land a fresher job in 6 months with good growth prospects"
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Consulting Gemini AI Career Advisor...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Career Recommendations</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">
                      Recommended Career Tracks for You:
                    </span>
                    <button
                      onClick={() => setAiRecommendations(null)}
                      className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Modify Answers
                    </button>
                  </div>

                  {aiRecommendations.map((rec: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                            {rec.category || 'Career Track'}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm mt-1">{rec.title}</h4>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                          {rec.matchScore || 90}% Match
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{rec.whyFit}</p>

                      <div className="text-[11px] bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                        <div>
                          <span className="font-semibold text-slate-800">Expected Fresher Package: </span>
                          <span className="text-teal-700 font-bold">{rec.fresherSalaryIndia}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Skills to Build: </span>
                          <span className="text-slate-600">{Array.isArray(rec.skillsToDevelop) ? rec.skillsToDevelop.join(', ') : rec.skillsToDevelop}</span>
                        </div>
                        {rec.starterStep && (
                          <div>
                            <span className="font-semibold text-slate-800">First Action: </span>
                            <span className="text-slate-600">{rec.starterStep}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setShowAIModal(false);
                      setAiRecommendations(null);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-lg"
                  >
                    Done Exploring Recommendations
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
