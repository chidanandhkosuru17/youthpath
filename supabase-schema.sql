-- YouthPath Supabase Database Schema
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/eylvjfcnljhoanaxiyqk/sql)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  state TEXT,
  city TEXT,
  education_level TEXT,
  degree TEXT,
  specialization TEXT,
  graduation_year INTEGER,
  technical_skills JSONB DEFAULT '[]'::jsonb,
  soft_skills JSONB DEFAULT '[]'::jsonb,
  work_experience JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  preferred_roles JSONB DEFAULT '[]'::jsonb,
  preferred_locations JSONB DEFAULT '[]'::jsonb,
  preferred_work_mode TEXT DEFAULT 'any',
  preferred_employment_type TEXT DEFAULT 'any',
  learning_goals JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Saved Jobs Table
CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  job_data JSONB NOT NULL,
  status TEXT DEFAULT 'Saved',
  notes TEXT DEFAULT '',
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Resumes Table
CREATE TABLE IF NOT EXISTS public.resumes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  template TEXT DEFAULT 'modern',
  personal_info JSONB NOT NULL,
  summary TEXT DEFAULT '',
  education JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '{"technical":[],"tools":[],"soft":[]}'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Interview Sessions Table
CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  completed_at TIMESTAMP WITH TIME ZONE,
  questions JSONB DEFAULT '[]'::jsonb,
  final_scorecard JSONB
);

-- 5. Learning Progress Table
CREATE TABLE IF NOT EXISTS public.learning_progress (
  user_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (user_id, item_id)
);

-- 6. Feedback Submissions Table
CREATE TABLE IF NOT EXISTS public.feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  rating INTEGER NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) & Public Policies for YouthPath App
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Allow public select saved_jobs" ON public.saved_jobs FOR SELECT USING (true);
CREATE POLICY "Allow public insert saved_jobs" ON public.saved_jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete saved_jobs" ON public.saved_jobs FOR DELETE USING (true);
CREATE POLICY "Allow public update saved_jobs" ON public.saved_jobs FOR UPDATE USING (true);

CREATE POLICY "Allow public all resumes" ON public.resumes FOR ALL USING (true);
CREATE POLICY "Allow public all interview_sessions" ON public.interview_sessions FOR ALL USING (true);
CREATE POLICY "Allow public all learning_progress" ON public.learning_progress FOR ALL USING (true);
CREATE POLICY "Allow public all feedback" ON public.feedback FOR ALL USING (true);
