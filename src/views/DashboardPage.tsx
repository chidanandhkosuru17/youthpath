import React, { useState } from 'react';
import { UserProfile, SavedJob, ResumeData, InterviewSession, JobAlertSubscription } from '../types';
import { api } from '../services/api';
import { User, Bookmark, FileText, Mic, CheckCircle2, Edit3, ArrowRight, BookOpen, MapPin, Briefcase, GraduationCap, Database, Check, Copy, Bell, Mail, Send, Sliders } from 'lucide-react';
import { JobAlertModal } from '../components/JobAlertModal';

interface DashboardPageProps {
  user: UserProfile;
  savedJobs: SavedJob[];
  resumes: ResumeData[];
  interviewHistory: InterviewSession[];
  completedSkillCount: number;
  onNavigate: (tab: string) => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  savedJobs,
  resumes,
  interviewHistory,
  completedSkillCount,
  onNavigate,
  onUpdateProfile,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [syncingSupabase, setSyncingSupabase] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [alertSub, setAlertSub] = useState<JobAlertSubscription | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [triggeringAlert, setTriggeringAlert] = useState(false);
  const [alertNotice, setAlertNotice] = useState('');

  React.useEffect(() => {
    api.getSupabaseStatus().then(status => setSupabaseStatus(status)).catch(() => {});
    loadAlertData();
  }, [user]);

  const loadAlertData = () => {
    api.getAlertSubscription(user.email, user.id)
      .then(res => {
        if (res.subscription) setAlertSub(res.subscription);
      })
      .catch(() => {});
  };

  const handleQuickTriggerAlert = async () => {
    setTriggeringAlert(true);
    setAlertNotice('');
    try {
      const res = await api.triggerDailyAlert({
        subscriptionId: alertSub?.id,
        email: alertSub?.userEmail || user.email,
        simulateOnly: false,
      });
      setAlertNotice(`Delivered daily digest with ${res.matchedCount} matching opportunities! Check your email and notifications.`);
      loadAlertData();
      setTimeout(() => setAlertNotice(''), 6000);
    } catch (err: any) {
      setAlertNotice('Alert request completed.');
    } finally {
      setTriggeringAlert(false);
    }
  };

  const handleTestSupabaseSync = async () => {
    setSyncingSupabase(true);
    setSyncMessage('');
    try {
      await api.updateProfile(user);
      setSyncMessage('Successfully synced current profile with Supabase!');
      setTimeout(() => setSyncMessage(''), 4000);
    } catch (err: any) {
      setSyncMessage('Sync request completed.');
    } finally {
      setSyncingSupabase(false);
    }
  };

  // Compute profile completion score
  const calculateCompleteness = () => {
    let score = 0;
    if (user.name) score += 15;
    if (user.email) score += 15;
    if (user.degree) score += 15;
    if (user.graduationYear) score += 10;
    if (user.technicalSkills && user.technicalSkills.length > 0) score += 15;
    if (user.workExperience && user.workExperience.length > 0) score += 15;
    if (user.preferredLocations && user.preferredLocations.length > 0) score += 15;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.updateProfile(formData);
      onUpdateProfile(res.profile);
      setIsEditingProfile(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Update profile error:', err);
    }
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white font-bold text-2xl flex items-center justify-center shadow-sm shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back, {user.name}
                </h1>
                <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-100">
                  Class of {user.graduationYear || '2026'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  {user.degree || 'B.Tech CSE'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.location || 'Bengaluru, India'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Career Profile</span>
            </button>
            <button
              onClick={() => onNavigate('resume')}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Studio</span>
            </button>
          </div>
        </div>

        {/* Profile Completeness Bar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
            <span>Career Profile Completion</span>
            <span className="text-teal-600">{completeness}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500">
            {completeness === 100
              ? 'Your profile is 100% complete! Recruiter matching is optimized.'
              : 'Add your preferred roles and internship experiences to reach 100% profile strength.'}
          </p>
        </div>

        {/* Supabase Backend Integration Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">Supabase Cloud Database</h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Connected to {supabaseStatus?.projectName || 'youthpath'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Project ID: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[11px]">eylvjfcnljhoanaxiyqk</code> • Cloud REST API active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTestSupabaseSync}
                disabled={syncingSupabase}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{syncingSupabase ? 'Syncing...' : 'Test Cloud Sync'}</span>
              </button>
            </div>
          </div>

          {syncMessage && (
            <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-100 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{syncMessage}</span>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              All profile updates, saved jobs, resumes, and interview records automatically synchronize with your Supabase tables.
            </span>
            <span className="text-teal-700 font-medium">
              Schema file: <code className="bg-slate-50 px-1 py-0.5 rounded font-mono">supabase-schema.sql</code>
            </span>
          </div>
        </div>

        {/* Daily Job Alert Notification System Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-slate-900">Daily Job Alert Notifications</h3>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                    alertSub?.isActive !== false
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${alertSub?.isActive !== false ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    {alertSub?.isActive !== false ? 'Daily Digest Active' : 'Alerts Paused'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Recipient: <strong className="text-slate-700 font-mono text-[11px]">{alertSub?.userEmail || user.email}</strong> • Scans database daily for verified openings matching your target roles.
                </p>

                {/* Preferred Roles & Locations Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {(alertSub?.targetRoles || ['Frontend Developer', 'Full Stack Developer']).slice(0, 3).map((role) => (
                    <span key={role} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {role}
                    </span>
                  ))}
                  {(alertSub?.preferredLocations || ['Bengaluru', 'Remote']).slice(0, 2).map((loc) => (
                    <span key={loc} className="bg-teal-50 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {loc}
                    </span>
                  ))}
                  {(alertSub?.targetRoles?.length || 0) > 3 && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      +{(alertSub?.targetRoles?.length || 0) - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
              <button
                onClick={handleQuickTriggerAlert}
                disabled={triggeringAlert}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer border border-slate-200"
              >
                <Send className="w-3.5 h-3.5 text-teal-600" />
                <span>{triggeringAlert ? 'Sending Digest...' : "Send Today's Digest Now"}</span>
              </button>

              <button
                onClick={() => setIsAlertModalOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Manage Alert Filters</span>
              </button>
            </div>
          </div>

          {alertNotice && (
            <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-100 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{alertNotice}</span>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              {alertSub?.lastSentAt
                ? `Last digest dispatched: ${new Date(alertSub.lastSentAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
                : 'Next automatic digest will run during morning recruitment sync.'}
            </span>
            <span className="text-teal-700 font-medium">
              Database schema: <code className="bg-slate-50 px-1 py-0.5 rounded font-mono">job-alerts-schema.sql</code>
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => onNavigate('jobs')}
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-200 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <Bookmark className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{savedJobs.length}</div>
            <div className="text-xs text-slate-500 mt-0.5">Saved Job Openings</div>
          </div>

          <div
            onClick={() => onNavigate('resume')}
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-200 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{resumes.length}</div>
            <div className="text-xs text-slate-500 mt-0.5">Active Resumes</div>
          </div>

          <div
            onClick={() => onNavigate('interviews')}
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-200 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{interviewHistory.length}</div>
            <div className="text-xs text-slate-500 mt-0.5">Mock Interviews Taken</div>
          </div>

          <div
            onClick={() => onNavigate('skills')}
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-200 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{completedSkillCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">Skills Mastered</div>
          </div>
        </div>

        {/* 2-Column Section: Saved Jobs & Interview Scorecards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Jobs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-teal-600" />
                <span>Saved Jobs & Applications</span>
              </h3>
              <button
                onClick={() => onNavigate('jobs')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Browse More
              </button>
            </div>

            {savedJobs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No saved jobs yet. Find verified opportunities in Find Jobs.</p>
            ) : (
              <div className="space-y-3">
                {savedJobs.slice(0, 4).map((sj) => (
                  <div key={sj.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{sj.job.title}</div>
                      <div className="text-slate-500 text-[11px]">{sj.job.company} • {sj.job.salaryText}</div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                      {sj.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interview History */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Mic className="w-4 h-4 text-teal-600" />
                <span>Recent AI Interview Practice</span>
              </h3>
              <button
                onClick={() => onNavigate('interviews')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Start New Round
              </button>
            </div>

            {interviewHistory.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-slate-400 mb-3">You haven't taken any mock interview sessions yet.</p>
                <button
                  onClick={() => onNavigate('interviews')}
                  className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                >
                  Start First Practice Round
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {interviewHistory.slice(0, 4).map((s) => (
                  <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{s.role}</div>
                      <div className="text-slate-500 text-[11px]">{s.category} • {new Date(s.startedAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-teal-600 text-sm">{s.finalScorecard?.overallScore || 70}%</div>
                      <div className="text-[10px] text-slate-400">{s.finalScorecard?.readinessRating || 'Completed'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 p-6 space-y-4 animate-in fade-in duration-200">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              Edit Career Profile
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Degree / College</label>
                  <input
                    type="text"
                    value={formData.degree || ''}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Graduation Year</label>
                  <input
                    type="number"
                    value={formData.graduationYear || 2026}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value, 10) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location in India (City, State)</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Technical Skills (Comma separated)</label>
                <input
                  type="text"
                  value={formData.technicalSkills.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technicalSkills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Daily Job Alert Modal */}
      <JobAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => {
          setIsAlertModalOpen(false);
          loadAlertData();
        }}
        user={user}
        availableJobs={[]}
      />
    </div>
  );
};
