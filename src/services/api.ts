import { CareerTrack, JobListing, SavedJob, ResumeData, InterviewSession, LearningItem, UserProfile, NotificationItem, FeedbackSubmission } from '../types';

export const api = {
  // Health & Supabase
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  async getSupabaseStatus(): Promise<{ configured: boolean; connected: boolean; projectName: string; projectId: string; message: string }> {
    const res = await fetch('/api/supabase/status');
    if (!res.ok) throw new Error('Failed to fetch Supabase status');
    return res.json();
  },

  // Profile
  async getProfile(): Promise<UserProfile> {
    const res = await fetch('/api/profile');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<{ success: boolean; profile: UserProfile }> {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Careers
  async getCareers(category?: string, search?: string): Promise<{ count: number; careers: CareerTrack[] }> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`/api/careers?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch careers');
    return res.json();
  },

  async getCareerById(id: string): Promise<CareerTrack> {
    const res = await fetch(`/api/careers/${id}`);
    if (!res.ok) throw new Error('Failed to fetch career details');
    return res.json();
  },

  async getCareerRecommendations(data: {
    education: string;
    interests: string;
    skills: string;
    preferredWorkType: string;
    goals: string;
  }) {
    const res = await fetch('/api/career-recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || 'Failed to generate recommendations');
    }
    return res.json();
  },

  // Jobs
  async getJobs(filters?: {
    q?: string;
    location?: string;
    workMode?: string;
    employmentType?: string;
    fresherOnly?: boolean;
    page?: number;
  }): Promise<{
    total: number;
    page: number;
    isLiveProviderActive: boolean;
    providerStatusNotice: string;
    jobs: JobListing[];
  }> {
    const params = new URLSearchParams();
    if (filters?.q) params.append('q', filters.q);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.workMode) params.append('workMode', filters.workMode);
    if (filters?.employmentType) params.append('employmentType', filters.employmentType);
    if (filters?.fresherOnly) params.append('fresherOnly', 'true');
    if (filters?.page) params.append('page', filters.page.toString());

    const res = await fetch(`/api/jobs?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },

  async getJobById(id: string): Promise<JobListing> {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch job');
    return res.json();
  },

  // Saved Jobs
  async getSavedJobs(): Promise<{ savedJobs: SavedJob[] }> {
    const res = await fetch('/api/saved-jobs');
    if (!res.ok) throw new Error('Failed to fetch saved jobs');
    return res.json();
  },

  async saveJob(jobId: string, notes?: string, status?: string): Promise<{ success: boolean; savedJob: SavedJob }> {
    const res = await fetch('/api/saved-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, notes, status }),
    });
    if (!res.ok) throw new Error('Failed to save job');
    return res.json();
  },

  async deleteSavedJob(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/saved-jobs/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove saved job');
    return res.json();
  },

  // Resumes
  async getResumes(): Promise<{ resumes: ResumeData[] }> {
    const res = await fetch('/api/resumes');
    if (!res.ok) throw new Error('Failed to fetch resumes');
    return res.json();
  },

  async getResumeById(id: string): Promise<ResumeData> {
    const res = await fetch(`/api/resumes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch resume');
    return res.json();
  },

  async createResume(resume: Partial<ResumeData>): Promise<ResumeData> {
    const res = await fetch('/api/resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });
    if (!res.ok) throw new Error('Failed to create resume');
    return res.json();
  },

  async updateResume(id: string, resume: Partial<ResumeData>): Promise<ResumeData> {
    const res = await fetch(`/api/resumes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });
    if (!res.ok) throw new Error('Failed to update resume');
    return res.json();
  },

  async deleteResume(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete resume');
    return res.json();
  },

  async aiImproveResume(data: { type: 'summary' | 'bullets'; content: string; targetRole?: string }) {
    const res = await fetch('/api/resumes/ai-improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || 'Failed to improve resume with AI');
    }
    return res.json();
  },

  // Interviews
  async startInterview(data: { role: string; category: string; difficulty: string }): Promise<InterviewSession> {
    const res = await fetch('/api/interviews/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to start interview');
    return res.json();
  },

  async submitInterviewAnswer(sessionId: string, questionIndex: number, answer: string) {
    const res = await fetch(`/api/interviews/${sessionId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionIndex, answer }),
    });
    if (!res.ok) throw new Error('Failed to evaluate answer');
    return res.json();
  },

  async finishInterview(sessionId: string): Promise<{ success: boolean; session: InterviewSession }> {
    const res = await fetch(`/api/interviews/${sessionId}/finish`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to finalize interview');
    return res.json();
  },

  async getInterviewHistory(): Promise<{ sessions: InterviewSession[] }> {
    const res = await fetch('/api/interviews/history');
    if (!res.ok) throw new Error('Failed to fetch interview history');
    return res.json();
  },

  // Learning Hub
  async getLearningResources(trackId?: string, category?: string): Promise<{ count: number; resources: LearningItem[] }> {
    const params = new URLSearchParams();
    if (trackId) params.append('trackId', trackId);
    if (category) params.append('category', category);
    const res = await fetch(`/api/learning-resources?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch learning resources');
    return res.json();
  },

  async getLearningProgress(): Promise<{ completedItemIds: string[] }> {
    const res = await fetch('/api/learning-progress');
    if (!res.ok) throw new Error('Failed to fetch learning progress');
    return res.json();
  },

  async toggleLearningProgress(itemId: string): Promise<{ success: boolean; completedItemIds: string[]; status: string }> {
    const res = await fetch(`/api/learning-progress/${itemId}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to toggle progress');
    return res.json();
  },

  // AI Assistant Chatbot
  async sendAssistantMessage(message: string, conversationHistory: { sender: 'user' | 'assistant'; text: string }[]) {
    const res = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationHistory }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || 'AI assistant is currently busy. Please retry.');
    }
    return res.json();
  },

  // Notifications
  async getNotifications(): Promise<{ notifications: NotificationItem[] }> {
    const res = await fetch('/api/notifications');
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
  },

  async markNotificationRead(id: string): Promise<{ success: boolean; notifications: NotificationItem[] }> {
    const res = await fetch(`/api/notifications/${id}`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to update notification');
    return res.json();
  },

  // Feedback
  async submitFeedback(data: { name: string; email: string; category: string; rating: number; message: string }) {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || 'Failed to submit feedback');
    }
    return res.json();
  }
};
