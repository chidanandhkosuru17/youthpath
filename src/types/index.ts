export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  state?: string;
  city?: string;
  educationLevel?: string;
  degree?: string;
  specialization?: string;
  graduationYear?: number;
  technicalSkills: string[];
  softSkills: string[];
  workExperience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
  }[];
  languages: string[];
  preferredRoles: string[];
  preferredLocations: string[];
  preferredWorkMode: 'remote' | 'hybrid' | 'onsite' | 'any';
  preferredEmploymentType: 'full-time' | 'internship' | 'apprenticeship' | 'part-time' | 'any';
  learningGoals: string[];
}

export interface CareerTrack {
  id: string;
  title: string;
  category: 'Tech' | 'Data & AI' | 'Design & Creative' | 'Business & Marketing' | 'Operations & Support' | 'Finance';
  tagline: string;
  overview: string;
  responsibilities: string[];
  requiredSkills: {
    core: string[];
    goodToHave: string[];
    soft: string[];
  };
  salaryRangeIndia: {
    fresherLPA: string;
    midLPA: string;
    seniorLPA: string;
    notes: string;
  };
  educationGuidance: string;
  roadmap: {
    step: number;
    title: string;
    duration: string;
    topics: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
    type: 'Free' | 'Paid' | 'Government/NPTEL';
    link?: string;
  }[];
  starterProjects: {
    name: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate';
  }[];
  entryLevelTitles: string[];
  interviewTips: string[];
  learningResources: {
    title: string;
    provider: string;
    type: 'Course' | 'Documentation' | 'Video Series' | 'Practice';
    isFree: boolean;
    url: string;
  }[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  state: string;
  isRemote: boolean;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  employmentType: 'Full-time' | 'Internship' | 'Fresher' | 'Apprenticeship';
  experienceRequired: string;
  salaryText: string; // e.g. "₹4.5 - ₹6.5 LPA" or "₹15,000 - ₹25,000/month"
  salaryLPA?: number;
  description: string;
  skills: string[];
  postedDate: string;
  applicationUrl: string;
  source: string; // e.g. "Adzuna Live", "National Career Service", "Official Portal", "LinkedIn", "Naukri"
  isVerified: boolean;
  isFresherFriendly: boolean;
}

export interface SavedJob {
  id: string;
  userId: string;
  job: JobListing;
  savedAt: string;
  notes?: string;
  status: 'Saved' | 'Applied' | 'Interviewing' | 'Archived';
}

export interface ResumeData {
  id: string;
  userId: string;
  title: string;
  template: 'modern' | 'minimal' | 'professional' | 'technical';
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  };
  summary: string;
  education: {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    grade?: string;
  }[];
  experience: {
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    bullets: string[];
  }[];
  projects: {
    id: string;
    title: string;
    technologies: string;
    link?: string;
    bullets: string[];
  }[];
  skills: {
    technical: string[];
    tools: string[];
    soft: string[];
  };
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }[];
  updatedAt: string;
}

export interface InterviewSession {
  id: string;
  userId: string;
  role: string;
  category: 'HR' | 'Technical' | 'Coding' | 'Aptitude' | 'Behavioral';
  difficulty: 'Entry-Level / Fresher' | 'Mid-Level' | 'Advanced';
  startedAt: string;
  completedAt?: string;
  questions: {
    id: string;
    questionText: string;
    category: string;
    userAnswer?: string;
    aiFeedback?: {
      scoreOutOfTen: number;
      strengths: string[];
      areasToImprove: string[];
      sampleBetterAnswer: string;
      evaluationSummary: string;
    };
  }[];
  currentQuestionIndex: number;
  finalScorecard?: {
    overallScore: number;
    communicationScore: number;
    technicalAccuracyScore: number;
    readinessRating: 'Needs Practice' | 'Developing' | 'Job Ready' | 'Exceptional';
    strengths: string[];
    recommendations: string[];
  };
}

export interface LearningItem {
  id: string;
  title: string;
  trackId: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  provider: string;
  type: 'Course' | 'Certification' | 'Tutorial' | 'Practice';
  isFree: boolean;
  estimatedHours: number;
  url: string;
  description: string;
  skillsGained: string[];
}

export interface UserLearningProgress {
  userId: string;
  completedItemIds: string[];
  inProgressItemIds: string[];
  lastUpdated: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'job' | 'interview' | 'resume' | 'learning' | 'system';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface FeedbackSubmission {
  id: string;
  userId?: string;
  name: string;
  email: string;
  category: 'Platform Usability' | 'Career Guidance' | 'Job Discovery' | 'Interview Practice' | 'Resume Builder' | 'Other';
  rating: number;
  message: string;
  submittedAt: string;
}
