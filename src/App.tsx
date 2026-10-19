import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GeminiCareerAssistantPage } from './views/GeminiCareerAssistantPage';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './views/LandingPage';
import { CareersPage } from './views/CareersPage';
import { JobsPage } from './views/JobsPage';
import { SkillHubPage } from './views/SkillHubPage';
import { InterviewPrepPage } from './views/InterviewPrepPage';
import { ResumeBuilderPage } from './views/ResumeBuilderPage';
import { DashboardPage } from './views/DashboardPage';
import { AboutPage } from './views/AboutPage';
import { FeedbackPage } from './views/FeedbackPage';
import { PrivacyPolicyPage } from './views/PrivacyPolicyPage';
import { TermsPage } from './views/TermsPage';
import { api } from './services/api';
import { authService, supabase } from './services/supabaseClient';
import { CareerTrack, JobListing, SavedJob, ResumeData, InterviewSession, LearningItem, UserProfile, NotificationItem } from './types';
import { CAREER_TRACKS } from './data/careersData';
import { INITIAL_JOBS } from './data/jobsData';
import { INITIAL_LEARNING_ITEMS } from './data/learningData';

const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr_default_01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.in',
  phone: '+91 98765 43210',
  location: 'Bengaluru, Karnataka',
  state: 'Karnataka',
  city: 'Bengaluru',
  educationLevel: 'Bachelor of Technology',
  degree: 'B.Tech in Computer Science',
  specialization: 'Information Technology',
  graduationYear: 2026,
  technicalSkills: ['JavaScript', 'React.js', 'Python', 'SQL', 'Git', 'Tailwind CSS'],
  softSkills: ['Analytical Thinking', 'Team Collaboration', 'Fast Learner'],
  workExperience: [
    {
      title: 'Web Development Intern',
      company: 'TechNovate Labs India',
      duration: 'May 2025 - Jul 2025 (3 Months)',
      description: 'Assisted in developing reusable React UI components and connected front-end pages to REST endpoints.'
    }
  ],
  projects: [
    {
      title: 'Student Career & Internship Tracker',
      description: 'Built a responsive dashboard to track campus applications and deadlines using React and Tailwind.',
      technologies: ['React', 'JavaScript', 'Tailwind CSS'],
      link: 'https://github.com/aarav-sharma/campus-tracker'
    }
  ],
  certifications: [
    {
      title: 'Full Stack Web Development Certification',
      issuer: 'FreeCodeCamp',
      year: '2025'
    }
  ],
  languages: ['English', 'Hindi', 'Kannada'],
  preferredRoles: ['Frontend Developer', 'Full Stack Developer', 'Junior Software Engineer'],
  preferredLocations: ['Bengaluru', 'Hyderabad', 'Pune', 'Remote'],
  preferredWorkMode: 'hybrid',
  preferredEmploymentType: 'full-time',
  learningGoals: ['Master TypeScript and Node.js backend architecture', 'Ace technical coding interviews']
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [careerTracks, setCareerTracks] = useState<CareerTrack[]>(CAREER_TRACKS);
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [learningItems, setLearningItems] = useState<LearningItem[]>(INITIAL_LEARNING_ITEMS);
  const [completedSkillIds, setCompletedSkillIds] = useState<string[]>(['learn-01']);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [interviewHistory, setInterviewHistory] = useState<InterviewSession[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLiveProviderActive, setIsLiveProviderActive] = useState(false);
  const [providerNotice, setProviderNotice] = useState('Showing verified early-career Indian job database.');

  // UI Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [prefilledInterviewRole, setPrefilledInterviewRole] = useState<string | undefined>(undefined);
  const [selectedTrackForSkills, setSelectedTrackForSkills] = useState<string | undefined>(undefined);

  // Initial Load from API & Supabase Session check
  useEffect(() => {
    loadInitialData();

    // Check existing Supabase session
    authService.getSession().then((session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUser((prev) => ({
          ...(prev || {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'YouthPath Student',
            email: session.user.email || '',
            technicalSkills: ['JavaScript', 'React', 'SQL'],
            softSkills: ['Problem Solving', 'Communication'],
            workExperience: [],
            projects: [],
            certifications: [],
            languages: ['English', 'Hindi'],
            preferredRoles: ['Junior Software Engineer'],
            preferredLocations: ['Bengaluru', 'Remote'],
            preferredWorkMode: 'any',
            preferredEmploymentType: 'any',
            learningGoals: [],
          }),
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || prev?.name || 'YouthPath Student',
        }));
      }
    });

    // Listen for Supabase auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const loadInitialData = async () => {
    try {
      // Profile
      const profile = await api.getProfile().catch(() => null);
      if (profile) setUser(profile);

      // Careers
      const careersRes = await api.getCareers().catch(() => ({ careers: CAREER_TRACKS }));
      if (careersRes?.careers) setCareerTracks(careersRes.careers);

      // Jobs
      const jobsRes = await api.getJobs().catch(() => ({
        jobs: INITIAL_JOBS,
        isLiveProviderActive: false,
        providerStatusNotice: 'Verified Indian early-career job database.'
      }));
      if (jobsRes?.jobs) {
        setJobs(jobsRes.jobs);
        setIsLiveProviderActive(jobsRes.isLiveProviderActive);
        setProviderNotice(jobsRes.providerStatusNotice);
      }

      // Saved Jobs
      const savedRes = await api.getSavedJobs().catch(() => ({ savedJobs: [] }));
      if (savedRes?.savedJobs) setSavedJobs(savedRes.savedJobs);

      // Learning
      const learnRes = await api.getLearningResources().catch(() => ({ resources: INITIAL_LEARNING_ITEMS }));
      if (learnRes?.resources) setLearningItems(learnRes.resources);

      const progressRes = await api.getLearningProgress().catch(() => ({ completedItemIds: ['learn-01'] }));
      if (progressRes?.completedItemIds) setCompletedSkillIds(progressRes.completedItemIds);

      // Resumes
      const resRes = await api.getResumes().catch(() => ({ resumes: [] }));
      if (resRes?.resumes) setResumes(resRes.resumes);

      // Interviews
      const intRes = await api.getInterviewHistory().catch(() => ({ sessions: [] }));
      if (intRes?.sessions) setInterviewHistory(intRes.sessions);

      // Notifications
      const notifRes = await api.getNotifications().catch(() => ({ notifications: [] }));
      if (notifRes?.notifications) setNotifications(notifRes.notifications);
    } catch (err) {
      console.warn('Initial data load warning:', err);
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveJob = async (jobId: string) => {
    try {
      const res = await api.saveJob(jobId);
      if (res.savedJob) {
        setSavedJobs(prev => {
          const exists = prev.some(sj => sj.job.id === jobId);
          if (exists) return prev;
          return [res.savedJob, ...prev];
        });
      }
    } catch (err) {
      console.error('Failed to save job:', err);
    }
  };

  const handleRemoveSavedJob = async (id: string) => {
    try {
      await api.deleteSavedJob(id);
      setSavedJobs(prev => prev.filter(sj => sj.id !== id && sj.job.id !== id));
    } catch (err) {
      console.error('Failed to remove saved job:', err);
    }
  };

  const handleToggleLearningProgress = async (itemId: string) => {
    try {
      const res = await api.toggleLearningProgress(itemId);
      if (res.completedItemIds) {
        setCompletedSkillIds(res.completedItemIds);
      }
    } catch (err) {
      console.error('Failed to toggle progress:', err);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    try {
      const res = await api.markNotificationRead(id);
      if (res.notifications) setNotifications(res.notifications);
    } catch (err) {
      console.error('Failed to update notification:', err);
    }
  };

  const handleSaveResume = (updated: ResumeData) => {
    setResumes(prev => {
      const idx = prev.findIndex(r => r.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });
  };

  const handleNavigateToInterviews = (roleTitle: string) => {
    setPrefilledInterviewRole(roleTitle);
    handleTabChange('interviews');
  };

  const handleSelectTrackForSkills = (trackId: string) => {
    setSelectedTrackForSkills(trackId);
    handleTabChange('skills');
  };

  // Fallback default resume if empty
  const activeResume: ResumeData = resumes[0] || {
    id: 'res-default-01',
    userId: user?.id || 'usr_default_01',
    title: 'Fresher Resume',
    template: 'modern',
    personalInfo: {
      fullName: user?.name || 'Aarav Sharma',
      email: user?.email || 'aarav.sharma@example.in',
      phone: user?.phone || '+91 98765 43210',
      location: user?.location || 'Bengaluru, India',
      linkedinUrl: 'https://linkedin.com/in/aarav-sharma',
      githubUrl: 'https://github.com/aarav-sharma'
    },
    summary: 'Motivated Computer Science graduate (Class of 2026) with solid foundations in JavaScript, React, and Python. Experienced in building responsive full-stack web applications during internships.',
    education: [
      {
        id: 'edu-1',
        institution: 'Visvesvaraya Technological University (VTU)',
        degree: 'Bachelor of Technology (B.Tech)',
        fieldOfStudy: 'Computer Science and Engineering',
        startYear: '2022',
        endYear: '2026',
        grade: '8.4 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'TechNovate Labs India',
        role: 'Frontend Web Development Intern',
        location: 'Bengaluru, India',
        startDate: 'May 2025',
        endDate: 'July 2025',
        isCurrent: false,
        bullets: [
          'Engineered 8+ reusable, responsive UI components in React and Tailwind CSS.',
          'Collaborated with backend team to integrate REST endpoints, improving load time by 18%.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Campus Career & Internship Tracker',
        technologies: 'React, TypeScript, Tailwind CSS',
        link: 'https://github.com/aarav-sharma/campus-tracker',
        bullets: [
          'Created an ATS-friendly application tracker utilized by 150+ campus batchmates.',
          'Implemented interactive filtering by application status and deadline alerts.'
        ]
      }
    ],
    skills: {
      technical: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Python', 'SQL (PostgreSQL)'],
      tools: ['Git & GitHub', 'VS Code', 'Postman', 'Figma', 'Linux'],
      soft: ['Problem Solving', 'Structured Communication', 'Continuous Learning']
    },
    certifications: [
      {
        id: 'cert-1',
        name: 'Full Stack Web Development Certification',
        issuer: 'FreeCodeCamp',
        date: '2025'
      }
    ],
    updatedAt: new Date().toISOString()
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setIsAuthenticated(false);
      handleTabChange('landing');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Navbar matching screenshot */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        notifications={notifications}
        onMarkRead={handleMarkNotificationRead}
        user={user}
        isAuthenticated={isAuthenticated}
        onOpenAuth={(mode) => {
          setAuthMode(mode || 'login');
          setIsAuthOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      {/* 2. Main View Body */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onNavigate={handleTabChange}
            onSelectTrack={(trackId) => {
              setSelectedTrackForSkills(trackId);
              handleTabChange('careers');
            }}
            featuredJobs={jobs}
            careerTracks={careerTracks}
            onSaveJob={handleSaveJob}
            savedJobIds={savedJobs.map(sj => sj.job.id)}
          />
        )}

        {currentTab === 'careers' && (
          <CareersPage
            careerTracks={careerTracks}
            onSelectTrackForSkills={handleSelectTrackForSkills}
            onNavigateToInterviews={handleNavigateToInterviews}
          />
        )}

        {currentTab === 'jobs' && (
          <JobsPage
            jobs={jobs}
            savedJobs={savedJobs}
            user={user}
            onSaveJob={handleSaveJob}
            onRemoveSavedJob={handleRemoveSavedJob}
            isLiveProviderActive={isLiveProviderActive}
            providerNotice={providerNotice}
          />
        )}

        {currentTab === 'gemini' && (
          <GeminiCareerAssistantPage
            user={user}
            onNavigate={handleTabChange}
          />
        )}

        {currentTab === 'skills' && (
          <SkillHubPage
            learningItems={learningItems}
            completedItemIds={completedSkillIds}
            onToggleProgress={handleToggleLearningProgress}
            selectedTrackId={selectedTrackForSkills}
          />
        )}

        {currentTab === 'interviews' && (
          <InterviewPrepPage
            initialRole={prefilledInterviewRole}
          />
        )}

        {currentTab === 'resume' && (
          <ResumeBuilderPage
            initialResume={activeResume}
            onSaveResume={handleSaveResume}
          />
        )}

        {currentTab === 'dashboard' && user && (
          <DashboardPage
            user={user}
            savedJobs={savedJobs}
            resumes={resumes}
            interviewHistory={interviewHistory}
            completedSkillCount={completedSkillIds.length}
            onNavigate={handleTabChange}
            onUpdateProfile={(updated) => setUser(updated)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigate={handleTabChange} />
        )}

        {currentTab === 'feedback' && (
          <FeedbackPage />
        )}

        {currentTab === 'privacy' && (
          <PrivacyPolicyPage />
        )}

        {currentTab === 'terms' && (
          <TermsPage />
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleTabChange} />

      {/* 4. Auth & Demo Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          setIsAuthenticated(true);
          handleTabChange('dashboard');
        }}
        currentProfile={user}
      />
    </div>
  );
}
