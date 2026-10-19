import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CAREER_TRACKS } from './src/data/careersData.js';
import { INITIAL_JOBS } from './src/data/jobsData.js';
import { INITIAL_LEARNING_ITEMS } from './src/data/learningData.js';
import { UserProfile, SavedJob, ResumeData, InterviewSession, FeedbackSubmission, NotificationItem, JobSubscription } from './src/types/index.js';
import { supabaseService } from './src/services/supabaseServer.js';
import { aiFallbackAdvisor } from './src/services/aiFallbackAdvisor.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Storage Directory & Persistence File
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DBStore {
  profile: UserProfile;
  savedJobs: SavedJob[];
  resumes: ResumeData[];
  interviewSessions: InterviewSession[];
  learningProgress: string[]; // completed item IDs
  notifications: NotificationItem[];
  feedback: FeedbackSubmission[];
  jobSubscriptions?: JobSubscription[];
}

const defaultProfile: UserProfile = {
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
  softSkills: ['Analytical Thinking', 'Team Collaboration', 'Fast Learner', 'Problem Solving'],
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

const defaultNotifications: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'usr_default_01',
    title: 'Welcome to YouthPath!',
    message: 'Explore 14+ Indian career tracks, take our AI interview simulator, and discover verified early-career jobs.',
    type: 'system',
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'notif-02',
    userId: 'usr_default_01',
    title: 'Fresher Opportunities in Bengaluru',
    message: 'New early-career roles matching your skills have been verified in Karnataka and Remote.',
    type: 'job',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    linkUrl: '/jobs'
  }
];

let db: DBStore = {
  profile: defaultProfile,
  savedJobs: [],
  resumes: [
    {
      id: 'res-default-01',
      userId: 'usr_default_01',
      title: 'Software Engineer Resume (2026 Fresher)',
      template: 'modern',
      personalInfo: {
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@example.in',
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
        linkedinUrl: 'https://linkedin.com/in/aarav-sharma-demo',
        githubUrl: 'https://github.com/aarav-sharma',
        portfolioUrl: 'https://aaravsharma.dev'
      },
      summary: 'Motivated Computer Science graduate (Class of 2026) with solid foundations in JavaScript, React, and Python. Experienced in building responsive full-stack web applications and collaborating in agile team sprints during internships.',
      education: [
        {
          id: 'edu-01',
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
          id: 'exp-01',
          company: 'TechNovate Labs India',
          role: 'Frontend Web Development Intern',
          location: 'Bengaluru, India',
          startDate: 'May 2025',
          endDate: 'July 2025',
          isCurrent: false,
          bullets: [
            'Engineered 8+ reusable, responsive UI components in React and Tailwind CSS for client dashboard.',
            'Collaborated with backend engineers to consume RESTful endpoints, reducing page load latency by 18%.',
            'Participated in daily standups and code reviews following standard Git version control workflows.'
          ]
        }
      ],
      projects: [
        {
          id: 'proj-01',
          title: 'Campus Career & Internship Tracker',
          technologies: 'React, TypeScript, Tailwind CSS, LocalStorage',
          link: 'https://github.com/aarav-sharma/campus-tracker',
          bullets: [
            'Created an ATS-friendly application tracker utilized by 150+ campus batchmates.',
            'Implemented interactive filtering by application status, company tier, and follow-up deadlines.'
          ]
        }
      ],
      skills: {
        technical: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Python', 'SQL (PostgreSQL)', 'HTML5/CSS3'],
        tools: ['Git & GitHub', 'VS Code', 'Postman', 'Figma', 'Linux'],
        soft: ['Problem Solving', 'Structured Communication', 'Continuous Learning', 'Teamwork']
      },
      certifications: [
        {
          id: 'cert-01',
          name: 'Full Stack Web Development Certification',
          issuer: 'FreeCodeCamp',
          date: '2025'
        }
      ],
      updatedAt: new Date().toISOString()
    }
  ],
  interviewSessions: [],
  learningProgress: ['learn-01'],
  notifications: defaultNotifications,
  feedback: []
};

// Load saved data if present
if (fs.existsSync(DB_FILE)) {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    db = { ...db, ...parsed };
  } catch (err) {
    console.error('Failed to parse store.json, using default data:', err);
  }
}

const saveDB = () => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save to store.json:', err);
  }
};

// --- API ROUTES ---

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  const supabaseStatus = await supabaseService.testConnection();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    adzunaConfigured: Boolean(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY),
    supabase: {
      configured: supabaseService.isConfigured(),
      projectName: 'youthpath',
      projectId: 'eylvjfcnljhoanaxiyqk',
      connected: supabaseStatus.connected,
      message: supabaseStatus.message
    }
  });
});

// Supabase Status
app.get('/api/supabase/status', async (req: Request, res: Response) => {
  const status = await supabaseService.testConnection();
  res.json({
    configured: supabaseService.isConfigured(),
    projectName: 'youthpath',
    projectId: 'eylvjfcnljhoanaxiyqk',
    ...status
  });
});

// Profile
app.get('/api/profile', (req: Request, res: Response) => {
  res.json(db.profile);
});

app.put('/api/profile', (req: Request, res: Response) => {
  try {
    db.profile = { ...db.profile, ...req.body };
    saveDB();
    supabaseService.syncProfile(db.profile).catch((err) => console.warn('Supabase profile sync notice:', err));
    res.json({ success: true, profile: db.profile });
  } catch (error) {
    res.status(500).json({ error: { code: 'SAVE_FAILED', message: 'Could not update profile.' } });
  }
});

// Careers
app.get('/api/careers', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let tracks = [...CAREER_TRACKS];

  if (category && category !== 'All') {
    tracks = tracks.filter(t => t.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    tracks = tracks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.overview.toLowerCase().includes(q) ||
      t.requiredSkills.core.some(s => s.toLowerCase().includes(q))
    );
  }

  res.json({ count: tracks.length, careers: tracks });
});

app.get('/api/careers/:id', (req: Request, res: Response) => {
  const career = CAREER_TRACKS.find(c => c.id === req.params.id);
  if (!career) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Career track not found.' } });
  }
  res.json(career);
});

// AI Career Recommendations
app.post('/api/career-recommendations', async (req: Request, res: Response) => {
  const { education, interests, skills, preferredWorkType, goals } = req.body;

  try {
    if (process.env.GEMINI_API_KEY) {
      const prompt = `You are YouthPath's career counselor specialized in the Indian employment landscape for students and fresh graduates.
Based on the user's questionnaire, recommend 3 highly suitable career paths tailored to the Indian job market.

User Profile:
- Education / Degree: ${education || 'Undergraduate'}
- Key Interests: ${interests || 'Technology and problem solving'}
- Existing Skills: ${skills || 'Basic programming, communication'}
- Preferred Work Mode: ${preferredWorkType || 'Flexible'}
- Career Goals: ${goals || 'Find a high-growth career track in India'}

Provide a structured JSON output with an array named "recommendations" where each object has:
- "title": (Career path name, e.g. Full Stack Web Development)
- "category": (Tech, Data & AI, Design & Creative, Business & Marketing, Finance, Operations)
- "matchScore": (percentage number between 75 and 98)
- "whyFit": (2-3 concise sentences explaining why this fits their profile in India)
- "matchingSkills": (array of strings from their input)
- "skillsToDevelop": (array of 3-4 key industry skills to build)
- "fresherSalaryIndia": (realistic LPA range e.g. "₹4.5 - ₹8.0 LPA")
- "starterStep": (immediate concrete action to take this week)
- "suggestedProject": (one beginner project idea relevant to India)

Return valid JSON only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const raw = response.text || '{}';
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.recommendations) && parsed.recommendations.length > 0) {
        return res.json(parsed);
      }
    }
  } catch (error: any) {
    console.warn('Gemini career recommendation notice (using built-in advisor):', error.message);
  }

  // Fallback to domain advisor
  const fallbackRecs = aiFallbackAdvisor.getCareerRecommendations(education, interests, skills);
  res.json({ recommendations: fallbackRecs });
});

// Jobs
app.get('/api/jobs', async (req: Request, res: Response) => {
  const { q, location, workMode, employmentType, fresherOnly, page = '1' } = req.query;

  let results = [...INITIAL_JOBS];

  if (q) {
    const queryStr = (q as string).toLowerCase();
    results = results.filter(j =>
      j.title.toLowerCase().includes(queryStr) ||
      j.company.toLowerCase().includes(queryStr) ||
      j.skills.some(s => s.toLowerCase().includes(queryStr)) ||
      j.description.toLowerCase().includes(queryStr)
    );
  }

  if (location && location !== 'All Locations') {
    const locStr = (location as string).toLowerCase();
    results = results.filter(j =>
      j.location.toLowerCase().includes(locStr) ||
      j.state.toLowerCase().includes(locStr)
    );
  }

  if (workMode && workMode !== 'All') {
    results = results.filter(j => j.workMode.toLowerCase() === (workMode as string).toLowerCase());
  }

  if (employmentType && employmentType !== 'All') {
    results = results.filter(j => j.employmentType.toLowerCase() === (employmentType as string).toLowerCase());
  }

  if (fresherOnly === 'true') {
    results = results.filter(j => j.isFresherFriendly);
  }

  const isAdzunaConfigured = Boolean(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY);

  res.json({
    total: results.length,
    page: parseInt(page as string, 10),
    isLiveProviderActive: isAdzunaConfigured,
    providerStatusNotice: isAdzunaConfigured
      ? 'Live Adzuna Indian Feed active'
      : 'Showing verified early-career Indian job database. Configure ADZUNA_APP_ID & ADZUNA_APP_KEY in server secrets for supplemental live web feeds.',
    jobs: results
  });
});

app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const job = INITIAL_JOBS.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Job not found.' } });
  }
  res.json(job);
});

// Saved Jobs
app.get('/api/saved-jobs', (req: Request, res: Response) => {
  res.json({ savedJobs: db.savedJobs });
});

app.post('/api/saved-jobs', (req: Request, res: Response) => {
  const { jobId, notes, status } = req.body;
  const targetJob = INITIAL_JOBS.find(j => j.id === jobId);

  if (!targetJob) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Job listing does not exist.' } });
  }

  const existingIndex = db.savedJobs.findIndex(sj => sj.job.id === jobId);
  if (existingIndex >= 0) {
    db.savedJobs[existingIndex].notes = notes || db.savedJobs[existingIndex].notes;
    db.savedJobs[existingIndex].status = status || db.savedJobs[existingIndex].status;
    saveDB();
    return res.json({ success: true, savedJob: db.savedJobs[existingIndex] });
  }

  const newSavedJob: SavedJob = {
    id: `saved_${Date.now()}`,
    userId: db.profile.id,
    job: targetJob,
    savedAt: new Date().toISOString(),
    notes: notes || '',
    status: status || 'Saved'
  };

  db.savedJobs.unshift(newSavedJob);
  saveDB();
  supabaseService.syncSavedJob(newSavedJob).catch((err) => console.warn('Supabase saved_jobs sync notice:', err));
  res.status(201).json({ success: true, savedJob: newSavedJob });
});

app.delete('/api/saved-jobs/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  db.savedJobs = db.savedJobs.filter(sj => sj.id !== id && sj.job.id !== id);
  saveDB();
  supabaseService.deleteSavedJob(id).catch((err) => console.warn('Supabase deleteSavedJob notice:', err));
  res.json({ success: true, message: 'Saved job removed.' });
});

// Resumes
app.get('/api/resumes', (req: Request, res: Response) => {
  res.json({ resumes: db.resumes });
});

app.get('/api/resumes/:id', (req: Request, res: Response) => {
  const resume = db.resumes.find(r => r.id === req.params.id);
  if (!resume) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Resume not found.' } });
  }
  res.json(resume);
});

app.post('/api/resumes', (req: Request, res: Response) => {
  const newResume: ResumeData = {
    id: `res_${Date.now()}`,
    userId: db.profile.id,
    title: req.body.title || 'My Professional Resume',
    template: req.body.template || 'modern',
    personalInfo: req.body.personalInfo || {
      fullName: db.profile.name,
      email: db.profile.email,
      phone: db.profile.phone || '',
      location: db.profile.location || ''
    },
    summary: req.body.summary || '',
    education: req.body.education || [],
    experience: req.body.experience || [],
    projects: req.body.projects || [],
    skills: req.body.skills || { technical: [], tools: [], soft: [] },
    certifications: req.body.certifications || [],
    updatedAt: new Date().toISOString()
  };

  db.resumes.push(newResume);
  saveDB();
  supabaseService.syncResume(newResume).catch((err) => console.warn('Supabase resume sync notice:', err));
  res.status(201).json(newResume);
});

app.put('/api/resumes/:id', (req: Request, res: Response) => {
  const index = db.resumes.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Resume not found.' } });
  }

  db.resumes[index] = {
    ...db.resumes[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDB();
  supabaseService.syncResume(db.resumes[index]).catch((err) => console.warn('Supabase resume sync notice:', err));
  res.json(db.resumes[index]);
});

app.delete('/api/resumes/:id', (req: Request, res: Response) => {
  db.resumes = db.resumes.filter(r => r.id !== req.params.id);
  saveDB();
  supabaseService.deleteResume(req.params.id).catch((err) => console.warn('Supabase deleteResume notice:', err));
  res.json({ success: true, message: 'Resume deleted.' });
});

// AI Resume Polish & Bullet Enhancer
app.post('/api/resumes/ai-improve', async (req: Request, res: Response) => {
  const { type, content, targetRole } = req.body;

  try {
    if (process.env.GEMINI_API_KEY) {
      let prompt = '';
      if (type === 'summary') {
        prompt = `You are a professional ATS resume expert for the Indian hiring market.
Rewrite and elevate the following student/fresher resume summary to be crisp, impactful, action-oriented, and ATS-friendly for a "${targetRole || 'Software / Technology'}" position.
Original summary: "${content}"
Provide a JSON object with:
- "improved": (The refined 2-3 sentence summary)
- "keyStrengthsHighlighted": (Array of 3 highlighted qualities)
- "atsKeywordsAdded": (Array of 3-4 keywords added)
Return valid JSON only.`;
      } else {
        prompt = `You are an ATS resume bullet point specialist for technical and business freshers in India.
Rewrite the following project/experience bullet points using the Google XYZ formula ("Accomplished [X], as measured by [Y], by doing [Z]") with active power verbs. Do NOT fabricate fake numbers or degrees.
Input bullet points: "${content}"
Target role: "${targetRole || 'Early Career / Fresher'}"
Provide a JSON object with:
- "improvedBullets": (Array of improved bullet strings)
- "feedback": (Brief explanation of improvements made)
Return valid JSON only.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.improved || parsed.improvedBullets) {
        return res.json(parsed);
      }
    }
  } catch (error: any) {
    console.warn('AI resume polish notice (using built-in advisor):', error.message);
  }

  // Fallback to domain resume advisor
  const fallbackResult = aiFallbackAdvisor.improveResume(type, content, targetRole);
  res.json(fallbackResult);
});

// Mock Interviews: Start session
app.post('/api/interviews/start', async (req: Request, res: Response) => {
  try {
    const { role, category, difficulty } = req.body;

    let questionsList: any[] = [];

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are an experienced technical and HR interviewer conducting a job interview for an Indian company (such as TCS, Infosys, Flipkart, PhonePe, or Zoho).
Generate 4 realistic interview questions for:
- Role: ${role || 'Junior Software Engineer'}
- Category: ${category || 'Technical'}
- Level: ${difficulty || 'Entry-Level / Fresher'}

Return a JSON object with an array named "questions", each having:
- "id": string (e.g. "q1", "q2")
- "questionText": string
- "category": string

Keep the questions realistic, practical, and conversational. Return JSON only.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });

        const parsed = JSON.parse(response.text || '{}');
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          questionsList = parsed.questions;
        }
      } catch (e) {
        console.warn('Gemini question generation failed, using standard interview pool:', e);
      }
    }

    if (questionsList.length === 0) {
      questionsList = [
        {
          id: 'q1',
          questionText: `Tell me about yourself, your background in ${role || 'engineering'}, and why you are interested in this career path in India?`,
          category: 'Introduction & Motivation'
        },
        {
          id: 'q2',
          questionText: 'Can you walk me through a technical challenge or project obstacle you encountered, and how you debugged or solved it?',
          category: 'Technical Problem Solving'
        },
        {
          id: 'q3',
          questionText: 'How do you handle situations where you receive critical feedback on your work or code from a team lead or peer?',
          category: 'Teamwork & Receptiveness'
        },
        {
          id: 'q4',
          questionText: 'Where do you see yourself technically and professionally in the next 2-3 years, and what skills are you currently learning?',
          category: 'Growth & Career Trajectory'
        }
      ];
    }

    const newSession: InterviewSession = {
      id: `session_${Date.now()}`,
      userId: db.profile.id,
      role: role || 'Junior Software Engineer',
      category: category || 'Technical',
      difficulty: difficulty || 'Entry-Level / Fresher',
      startedAt: new Date().toISOString(),
      questions: questionsList,
      currentQuestionIndex: 0
    };

    db.interviewSessions.unshift(newSession);
    saveDB();

    res.status(201).json(newSession);
  } catch (error) {
    console.error('Interview start error:', error);
    res.status(500).json({ error: { code: 'INTERVIEW_START_FAILED', message: 'Could not initialize interview session.' } });
  }
});

// Mock Interviews: Turn-by-turn answer evaluation
app.post('/api/interviews/:id/answer', async (req: Request, res: Response) => {
  try {
    const { questionIndex, answer } = req.body;
    const session = db.interviewSessions.find(s => s.id === req.params.id);

    if (!session) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Session not found.' } });
    }

    const currentQ = session.questions[questionIndex];
    if (!currentQ) {
      return res.status(400).json({ error: { code: 'INVALID_INDEX', message: 'Invalid question index.' } });
    }

    currentQ.userAnswer = answer;

    let feedback = {
      scoreOutOfTen: 7,
      strengths: ['Clear structure and direct response to the core question', 'Good communication tone'],
      areasToImprove: ['Incorporate specific metrics or concrete project examples to support your point', 'Elaborate more on personal takeaways'],
      sampleBetterAnswer: 'In my final year capstone project, I encountered a similar challenge when optimizing our database queries. Rather than just applying a workaround, I profiled the slow queries using EXPLAIN ANALYZE, identified missing indexes on foreign keys, and reduced API response time by 40%.',
      evaluationSummary: 'Solid response with good articulation. Adding specific numbers and technical details will make your answer stand out to hiring managers.'
    };

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are an expert interviewer evaluating a student/fresher for a ${session.role} position in an Indian tech/business firm.
Question: "${currentQ.questionText}"
Candidate's Answer: "${answer}"

Evaluate the response objectively. Return a JSON object with:
- "scoreOutOfTen": integer between 1 and 10
- "strengths": array of 2-3 genuine strengths
- "areasToImprove": array of 2-3 specific constructive suggestions
- "sampleBetterAnswer": a realistic, high-impact model answer (3-4 sentences) that an early-career candidate could deliver
- "evaluationSummary": 2 sentences summarizing the verdict

Return valid JSON only.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed.scoreOutOfTen) {
          feedback = parsed;
        }
      } catch (err) {
        console.warn('Gemini answer evaluation fallback:', err);
      }
    }

    currentQ.aiFeedback = feedback;
    session.currentQuestionIndex = questionIndex + 1;
    saveDB();

    res.json({
      success: true,
      feedback,
      nextQuestionIndex: session.currentQuestionIndex,
      isFinished: session.currentQuestionIndex >= session.questions.length
    });
  } catch (error) {
    console.error('Answer evaluation error:', error);
    res.status(500).json({ error: { code: 'EVALUATION_FAILED', message: 'Could not evaluate answer.' } });
  }
});

// Mock Interviews: Finish session & get scorecard
app.post('/api/interviews/:id/finish', (req: Request, res: Response) => {
  const session = db.interviewSessions.find(s => s.id === req.params.id);
  if (!session) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Session not found.' } });
  }

  const answered = session.questions.filter(q => q.aiFeedback);
  const avgScore = answered.length > 0
    ? Math.round(answered.reduce((acc, q) => acc + (q.aiFeedback?.scoreOutOfTen || 0), 0) / answered.length * 10)
    : 70;

  session.completedAt = new Date().toISOString();
  session.finalScorecard = {
    overallScore: avgScore,
    communicationScore: Math.min(100, avgScore + 5),
    technicalAccuracyScore: Math.max(50, avgScore - 3),
    readinessRating: avgScore >= 85 ? 'Exceptional' : avgScore >= 70 ? 'Job Ready' : avgScore >= 55 ? 'Developing' : 'Needs Practice',
    strengths: [
      'Articulated ideas with confidence and professional tone',
      'Demonstrated fundamental understanding of core concepts',
      'Honest communication regarding learning curves'
    ],
    recommendations: [
      'Use the STAR method (Situation, Task, Action, Result) consistently for scenario questions',
      'Practice explaining project architecture without relying on slide visuals',
      'Review system design and database fundamentals for product firm rounds'
    ]
  };

  saveDB();
  supabaseService.syncInterviewSession(session).catch((err) => console.warn('Supabase interview sync notice:', err));
  res.json({ success: true, session });
});

app.get('/api/interviews/history', (req: Request, res: Response) => {
  res.json({ sessions: db.interviewSessions });
});

// Learning Hub
app.get('/api/learning-resources', (req: Request, res: Response) => {
  const { trackId, category } = req.query;
  let items = [...INITIAL_LEARNING_ITEMS];

  if (trackId && trackId !== 'all') {
    items = items.filter(i => i.trackId === trackId);
  }

  if (category && category !== 'all') {
    items = items.filter(i => i.category.toLowerCase().includes((category as string).toLowerCase()));
  }

  res.json({ count: items.length, resources: items });
});

app.get('/api/learning-progress', (req: Request, res: Response) => {
  res.json({ completedItemIds: db.learningProgress });
});

app.put('/api/learning-progress/:id', (req: Request, res: Response) => {
  const itemId = req.params.id;
  const isCompleted = db.learningProgress.includes(itemId);

  if (isCompleted) {
    db.learningProgress = db.learningProgress.filter(id => id !== itemId);
  } else {
    db.learningProgress.push(itemId);
  }

  saveDB();
  res.json({ success: true, completedItemIds: db.learningProgress, status: isCompleted ? 'removed' : 'completed' });
});

// AI Career Assistant Chatbot
app.post('/api/assistant/chat', async (req: Request, res: Response) => {
  const { message, conversationHistory } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: { code: 'INVALID_INPUT', message: 'Message cannot be empty.' } });
  }

  // Attempt live Gemini call if API key exists
  if (process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are YouthPath's AI Career Assistant, dedicated to empowering Indian college students, fresh graduates, and early-career job seekers.
Your style is friendly, pragmatic, encouraging, and deeply knowledgeable about the Indian job market (including Bangalore, Hyderabad, Pune, Mumbai, Delhi NCR, and Tier-2 tech hubs).
You provide clear guidance on:
- Career roadmap choices (Full stack, AI/Data, Cloud, Product, Banking/Finance, Design, Sales, etc.)
- Realistic fresher salary expectations in India in INR (₹ LPA or monthly stipend)
- Resume crafting and ATS tips
- Interview preparation tactics (STAR method, coding rounds, HR rounds)
- Genuine learning resources (NPTEL, SWAYAM, Coursera, FreeCodeCamp)

Rules:
- Never fabricate fake job vacancies or guaranteed placement promises.
- Remind users to verify eligibility on official portals.
- Keep answers structured with clean markdown headers and bullet points.
- Do not mention or reference UN Sustainable Development Goals (SDGs).`;

      let contents: any[] = [];

      if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        for (const turn of conversationHistory.slice(-6)) {
          contents.push({
            role: turn.sender === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      if (response.text) {
        return res.json({
          reply: response.text,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error: any) {
      console.warn('Gemini Assistant call notice (falling back to built-in advisor):', error.message);
    }
  }

  // Fallback to built-in domain counselor
  const reply = aiFallbackAdvisor.getAssistantResponse(message);
  res.json({
    reply,
    timestamp: new Date().toISOString()
  });
});

// Notifications
app.get('/api/notifications', (req: Request, res: Response) => {
  res.json({ notifications: db.notifications });
});

app.patch('/api/notifications/:id', (req: Request, res: Response) => {
  const notif = db.notifications.find(n => n.id === req.params.id);
  if (notif) {
    notif.isRead = true;
    saveDB();
  }
  res.json({ success: true, notifications: db.notifications });
});

// Feedback & Contact
app.post('/api/feedback', (req: Request, res: Response) => {
  const { name, email, category, rating, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Name, email, and message are required.' } });
  }

  const newFeedback: FeedbackSubmission = {
    id: `fb_${Date.now()}`,
    userId: db.profile.id,
    name: name.trim(),
    email: email.trim(),
    category: category || 'Platform Usability',
    rating: Number(rating) || 5,
    message: message.trim(),
    submittedAt: new Date().toISOString()
  };

  db.feedback.push(newFeedback);
  saveDB();
  supabaseService.syncFeedback(newFeedback).catch((err) => console.warn('Supabase feedback sync notice:', err));

  res.status(201).json({ success: true, message: 'Thank you for your valuable feedback! Our team reviews every submission.' });
});

// Mount Vite or Serve Static Files
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YouthPath full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
