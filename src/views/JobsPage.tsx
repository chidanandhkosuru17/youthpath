import React, { useState } from 'react';
import { JobListing, SavedJob, UserProfile } from '../types';
import { Search, MapPin, Building2, Briefcase, Bookmark, ExternalLink, Filter, CheckCircle2, AlertCircle, Info, Sparkles, Bell, Mail } from 'lucide-react';
import { JobAlertModal } from '../components/JobAlertModal';

interface JobsPageProps {
  jobs: JobListing[];
  savedJobs: SavedJob[];
  user?: UserProfile;
  onSaveJob: (jobId: string) => void;
  onRemoveSavedJob: (savedJobId: string) => void;
  isLiveProviderActive: boolean;
  providerNotice: string;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobs,
  savedJobs,
  user,
  onSaveJob,
  onRemoveSavedJob,
  isLiveProviderActive,
  providerNotice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [fresherOnly, setFresherOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobListing | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const locations = [
    'All Locations',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Mumbai',
    'Delhi NCR',
    'Chennai',
    'Kolkata',
    'Remote',
  ];

  const workModes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const employmentTypes = ['All', 'Full-time', 'Internship', 'Fresher'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      selectedLocation === 'All Locations' ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      (selectedLocation === 'Remote' && job.isRemote);

    const matchesWorkMode =
      selectedWorkMode === 'All' || job.workMode.toLowerCase() === selectedWorkMode.toLowerCase();

    const matchesType =
      selectedType === 'All' || job.employmentType.toLowerCase() === selectedType.toLowerCase();

    const matchesFresher = !fresherOnly || job.isFresherFriendly;

    return matchesSearch && matchesLocation && matchesWorkMode && matchesType && matchesFresher;
  });

  const isJobSaved = (jobId: string) => savedJobs.some((sj) => sj.job.id === jobId);

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>India Job Discovery Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Early-Career Opportunities
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Verified fresher jobs, graduate trainee programs, and paid internships across India. Direct links to employer careers portals.
            </p>
          </div>

          {/* Toggle between All, Saved, and Daily Alerts */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Openings ({filteredJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'saved'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Jobs ({savedJobs.length})</span>
              </button>
            </div>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Configure Daily Email Job Alerts"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
              <span>Daily Job Alerts</span>
            </button>
          </div>
        </div>

        {/* Daily Job Alert Announcement Card */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                Daily Email Alert System Active
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                We automatically scan newly verified openings in our database and send a personalized daily digest matching your target roles.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAlertModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition self-start sm:self-auto shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Manage Daily Alerts</span>
          </button>
        </div>

        {/* Live Provider Status Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{providerNotice}</span>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0 hidden sm:inline-block">
            {isLiveProviderActive ? 'Live Adzuna API Active' : 'Verified India Catalog'}
          </span>
        </div>

        {activeTab === 'all' ? (
          <>
            {/* Search & Filter Controls */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs mb-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Search query */}
                <div className="md:col-span-2 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by job title, company, or skills (e.g. React, SQL, Python)..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  />
                </div>

                {/* Location Select */}
                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Work Mode Select */}
                <div>
                  <select
                    value={selectedWorkMode}
                    onChange={(e) => setSelectedWorkMode(e.target.value)}
                    className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {workModes.map((wm) => (
                      <option key={wm} value={wm}>
                        Work Mode: {wm}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Pills & Fresher Checkbox */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs text-slate-400 font-medium mr-1">Type:</span>
                  {employmentTypes.map((et) => (
                    <button
                      key={et}
                      onClick={() => setSelectedType(et)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition ${
                        selectedType === et
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {et}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fresherOnly}
                    onChange={(e) => setFresherOnly(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                  />
                  <span>Fresher & 0-Experience Only</span>
                </label>
              </div>
            </div>

            {/* Job Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => {
                const saved = isJobSaved(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Top tags */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                            {job.employmentType}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {job.workMode}
                          </span>
                        </div>
                        <button
                          onClick={() => onSaveJob(job.id)}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            saved
                              ? 'bg-teal-50 text-teal-600'
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                          }`}
                          title={saved ? 'Saved' : 'Save Job'}
                        >
                          <Bookmark className={`w-4 h-4 ${saved ? 'fill-teal-600' : ''}`} />
                        </button>
                      </div>

                      {/* Title & Company */}
                      <h3
                        onClick={() => setSelectedJobForDetail(job)}
                        className="text-base font-bold text-slate-900 hover:text-teal-600 transition cursor-pointer line-clamp-1"
                      >
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 mb-3">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-800">{job.company}</span>
                        <span className="text-slate-300">•</span>
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </div>

                      {/* Package & Experience */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg mb-3 text-xs">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">Compensation</div>
                          <div className="font-bold text-teal-700">{job.salaryText}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">Eligibility</div>
                          <div className="font-medium text-slate-700 truncate">{job.experienceRequired}</div>
                        </div>
                      </div>

                      {/* Description excerpt */}
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Verified: {job.source}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedJobForDetail(job)}
                          className="text-slate-600 hover:text-slate-900 font-semibold px-2 py-1 cursor-pointer"
                        >
                          Details
                        </button>
                        <a
                          href={job.applicationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredJobs.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No jobs match the current filters</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing the search query or switching location to "All Locations".
                </p>
              </div>
            )}
          </>
        ) : (
          /* Saved Jobs Tab */
          <div className="space-y-4">
            {savedJobs.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No saved jobs yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click the bookmark icon on any job card to save it for easy review.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobs.map((sj) => (
                  <div key={sj.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700">
                          {sj.status}
                        </span>
                        <button
                          onClick={() => onRemoveSavedJob(sj.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{sj.job.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">{sj.job.company} • {sj.job.location}</p>
                      <div className="text-xs font-semibold text-teal-700 bg-slate-50 p-2 rounded mb-3">
                        {sj.job.salaryText}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Saved on {new Date(sj.savedAt).toLocaleDateString()}
                      </span>
                      <a
                        href={sj.job.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Job Detail Modal */}
        {selectedJobForDetail && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {selectedJobForDetail.employmentType}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {selectedJobForDetail.title}
                  </h3>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                    <span className="font-semibold">{selectedJobForDetail.company}</span>
                    <span>•</span>
                    <span>{selectedJobForDetail.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJobForDetail(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl text-xs">
                <div>
                  <div className="text-slate-400 font-semibold text-[10px]">Salary / Stipend</div>
                  <div className="font-bold text-teal-700 text-sm">{selectedJobForDetail.salaryText}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold text-[10px]">Work Mode</div>
                  <div className="font-semibold text-slate-800 text-sm">{selectedJobForDetail.workMode}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 mb-1.5">Job Overview</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedJobForDetail.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 mb-1.5">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobForDetail.skills.map((s, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-[11px] text-teal-900 leading-relaxed">
                <strong>Application Advisory:</strong> This role is verified from {selectedJobForDetail.source}. Always verify requirements and submit your application directly on the official employer portal.
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedJobForDetail(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
                <a
                  href={selectedJobForDetail.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Daily Job Alert Modal */}
        <JobAlertModal
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
          user={user || {
            id: 'usr_default_01',
            name: 'Aarav Sharma',
            email: 'kosuruchidanandh@gmail.com',
            technicalSkills: [],
            softSkills: [],
            workExperience: [],
            projects: [],
            certifications: [],
            languages: [],
            preferredRoles: [],
            preferredLocations: [],
            preferredWorkMode: 'any',
            preferredEmploymentType: 'any',
            learningGoals: []
          }}
          availableJobs={jobs}
        />
      </div>
    </div>
  );
};
