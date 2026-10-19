import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Bell,
  CheckCircle2,
  Send,
  Eye,
  Sliders,
  History,
  Sparkles,
  MapPin,
  Briefcase,
  AlertCircle,
  Loader2,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Clock,
  Play,
  RefreshCw,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';
import { JobAlertSubscription, JobAlertLog, UserProfile, JobListing, SchedulerConfig, SchedulerExecutionLog } from '../types';
import { api } from '../services/api';

interface JobAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  availableJobs: JobListing[];
}

export const JobAlertModal: React.FC<JobAlertModalProps> = ({
  isOpen,
  onClose,
  user,
  availableJobs,
}) => {
  const [activeTab, setActiveTab] = useState<'preferences' | 'preview' | 'history' | 'scheduler'>('preferences');
  const [subscription, setSubscription] = useState<JobAlertSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [runningScheduler, setRunningScheduler] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Scheduler state
  const [schedulerConfig, setSchedulerConfig] = useState<SchedulerConfig | null>(null);
  const [schedulerLogs, setSchedulerLogs] = useState<SchedulerExecutionLog[]>([]);
  const [activeSubscriberCount, setActiveSubscriberCount] = useState<number>(1);

  // Form states
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<'remote' | 'hybrid' | 'onsite' | 'any'>('any');
  const [employmentType, setEmploymentType] = useState<'full-time' | 'internship' | 'any'>('any');
  const [minSalaryLpa, setMinSalaryLpa] = useState<number>(3.5);

  // Live matches & preview
  const [matches, setMatches] = useState<any[]>([]);
  const [emailPreview, setEmailPreview] = useState<{ subject: string; html: string; to: string } | null>(null);
  const [logs, setLogs] = useState<JobAlertLog[]>([]);

  const availableRolesList = [
    'Frontend Developer',
    'Full Stack Developer',
    'Junior Software Engineer',
    'Data Analyst',
    'Cloud & DevOps Engineer',
    'UI/UX Designer',
    'Cybersecurity Analyst',
    'Product Management Trainee',
    'Financial Analyst',
  ];

  const availableLocationsList = [
    'Remote',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Mumbai',
    'Chennai',
    'Delhi NCR',
    'Gurugram',
    'Noida',
  ];

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, user]);

  const loadData = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const subRes = await api.getAlertSubscription(user.email, user.id);
      if (subRes.subscription) {
        setSubscription(subRes.subscription);
        setEmail(subRes.subscription.userEmail || user.email);
        setIsActive(subRes.subscription.isActive);
        setSelectedRoles(subRes.subscription.targetRoles || ['Frontend Developer', 'Full Stack Developer']);
        setSelectedLocations(subRes.subscription.preferredLocations || ['Bengaluru', 'Remote']);
        setWorkMode(subRes.subscription.workMode || 'any');
        setEmploymentType(subRes.subscription.employmentType || 'any');
        setMinSalaryLpa(subRes.subscription.minSalaryLpa || 3.5);
      }

      // Fetch live matches
      const matchRes = await api.getAlertMatches(user.email, user.id).catch(() => ({ matches: [] }));
      if (matchRes.matches) {
        setMatches(matchRes.matches);
      }

      // Fetch history logs
      const logsRes = await api.getAlertLogs().catch(() => ({ logs: [] }));
      if (logsRes.logs) {
        setLogs(logsRes.logs);
      }
    } catch (err: any) {
      console.warn('Could not load alert subscription data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleToggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address for job alerts.' });
      return;
    }

    if (selectedRoles.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one target role.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const payload: Partial<JobAlertSubscription> = {
        id: subscription?.id,
        userId: user.id,
        userEmail: email.trim(),
        userName: user.name,
        targetRoles: selectedRoles,
        preferredLocations: selectedLocations,
        workMode,
        employmentType,
        minSalaryLpa,
        frequency: 'daily',
        isActive,
      };

      const res = await api.saveAlertSubscription(payload);
      setSubscription(res.subscription);
      setMessage({ type: 'success', text: 'Daily job alert preferences successfully saved and synchronized!' });

      // Refresh matches
      const matchRes = await api.getAlertMatches(email.trim(), user.id);
      if (matchRes.matches) {
        setMatches(matchRes.matches);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save alert preferences.' });
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerDailyNow = async () => {
    setTriggering(true);
    setMessage(null);

    try {
      const res = await api.triggerDailyAlert({
        subscriptionId: subscription?.id,
        email: email.trim() || user.email,
        simulateOnly: false,
      });

      setMessage({
        type: 'success',
        text: `Success! Today's daily job digest (${res.matchedCount} matches) has been sent to ${email.trim() || user.email}. An alert has also been added to your top-right notification bell!`,
      });

      if (res.emailPreview) {
        setEmailPreview(res.emailPreview);
        setActiveTab('preview');
      }

      // Reload logs
      const logsRes = await api.getAlertLogs().catch(() => ({ logs: [] }));
      if (logsRes.logs) {
        setLogs(logsRes.logs);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Could not send daily alert.' });
    } finally {
      setTriggering(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Daily Job Alert Notifications</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Daily Digest
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Automatically delivers fresh early-career openings matching your target roles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'preferences'
                ? 'border-teal-600 text-teal-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Alert Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'preview'
                ? 'border-teal-600 text-teal-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Email Digest Preview ({matches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'history'
                ? 'border-teal-600 text-teal-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Delivery Logs ({logs.length})</span>
          </button>
        </div>

        {/* Alert Notifications / Messages */}
        {message && (
          <div
            className={`m-4 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 leading-relaxed ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
              <p className="text-xs">Loading alert preferences...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: PREFERENCES */}
              {activeTab === 'preferences' && (
                <form onSubmit={handleSavePreferences} className="space-y-6">
                  
                  {/* Status Banner */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          Daily Email Alert Status: {isActive ? 'Active' : 'Paused'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {isActive
                            ? 'Our daily scheduler will match verified postings every morning and send your digest.'
                            : 'Alerts are paused. Toggle to resume receiving daily digests.'}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {/* Delivery Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Delivery Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Daily email digests and in-app notifications will be addressed here.
                    </p>
                  </div>

                  {/* Target Roles */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700">
                        Target Job Roles ({selectedRoles.length} selected)
                      </label>
                      <span className="text-[11px] text-slate-400">Click to select or deselect</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {availableRolesList.map((role) => {
                        const isSelected = selectedRoles.includes(role);
                        return (
                          <button
                            type="button"
                            key={role}
                            onClick={() => handleToggleRole(role)}
                            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{role}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Locations */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700">
                        Preferred Locations ({selectedLocations.length} selected)
                      </label>
                      <span className="text-[11px] text-slate-400">Including Remote flexibility</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {availableLocationsList.map((loc) => {
                        const isSelected = selectedLocations.includes(loc);
                        return (
                          <button
                            type="button"
                            key={loc}
                            onClick={() => handleToggleLocation(loc)}
                            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <MapPin className="w-3 h-3" />
                            <span>{loc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Work Mode & Employment Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Work Mode
                      </label>
                      <select
                        value={workMode}
                        onChange={(e) => setWorkMode(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition cursor-pointer"
                      >
                        <option value="any">Any Work Mode</option>
                        <option value="remote">Remote Only</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="onsite">On-site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Employment Type
                      </label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition cursor-pointer"
                      >
                        <option value="any">Any Employment Type</option>
                        <option value="full-time">Full-time Roles</option>
                        <option value="internship">Internships Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleTriggerDailyNow}
                      disabled={triggering}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer border border-slate-200"
                    >
                      {triggering ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                          <span>Delivering Digest...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-teal-600" />
                          <span>Send Me Today's Alert Now</span>
                        </>
                      )}
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Save Alert Preferences</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: EMAIL DIGEST PREVIEW */}
              {activeTab === 'preview' && (
                <div className="space-y-4">
                  <div className="bg-teal-50 p-3.5 rounded-xl border border-teal-100 flex items-center justify-between gap-3 text-xs text-teal-900">
                    <div>
                      <span className="font-bold">Live Match Engine:</span> Found{' '}
                      <strong>{matches.length} current verified openings</strong> matching your saved criteria.
                    </div>
                    <button
                      onClick={handleTriggerDailyNow}
                      disabled={triggering}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg transition shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>{triggering ? 'Sending...' : 'Deliver to My Email'}</span>
                    </button>
                  </div>

                  {emailPreview ? (
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                      <div className="bg-slate-100 p-3 border-b border-slate-200 text-xs text-slate-700 font-mono flex items-center justify-between">
                        <span><strong>Subject:</strong> {emailPreview.subject}</span>
                        <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">To: {emailPreview.to}</span>
                      </div>
                      <div
                        className="p-4 bg-slate-50 max-h-[500px] overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: emailPreview.html }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-700">Jobs that will be included in your daily email digest:</p>
                      {matches.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                          No jobs currently match your selected roles and locations. Try adding more roles (e.g. Frontend Developer, Full Stack) or selecting Remote.
                        </div>
                      ) : (
                        matches.slice(0, 6).map((job) => (
                          <div
                            key={job.id}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                                  {job.matchScore}% Match
                                </span>
                                <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                              </div>
                              <p className="text-xs text-teal-700 font-semibold">{job.company}</p>
                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                                <span>📍 {job.location}</span>
                                <span>💼 {job.workMode}</span>
                                <span>💰 {job.salary}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 italic">
                                Why it matched: {job.matchReason}
                              </p>
                            </div>

                            <a
                              href={job.applyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition self-start sm:self-auto shrink-0 flex items-center gap-1"
                            >
                              <span>Apply</span>
                              <ExternalLink className="w-3 h-3 text-slate-500" />
                            </a>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: DELIVERY LOGS & HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                    <p className="font-bold">Past Sent Daily Digest Emails</p>
                    <span>{logs.length} Total Deliveries</span>
                  </div>

                  {logs.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                      No daily alert emails dispatched yet. Click <strong>"Send Me Today's Alert Now"</strong> in the preferences tab to generate your first digest!
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="font-bold text-slate-900">{log.subject}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {new Date(log.sentAt).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 gap-2">
                          <span>
                            Delivered to <strong>{log.userEmail}</strong> • <strong>{log.matchedCount} jobs matched</strong>
                          </span>
                          {log.emailHtmlPreview && (
                            <button
                              onClick={() => {
                                setEmailPreview({
                                  to: log.userEmail,
                                  subject: log.subject,
                                  html: log.emailHtmlPreview!,
                                });
                                setActiveTab('preview');
                              }}
                              className="text-teal-600 hover:text-teal-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Email HTML</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between px-6">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Synced with Supabase table <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">job_alert_subscriptions</code></span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
