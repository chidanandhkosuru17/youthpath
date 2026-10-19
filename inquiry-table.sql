-- YouthPath Inquiry Form Database Table for Supabase
-- Copy and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/eylvjfcnljhoanaxiyqk/sql

-- 1. Create the inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Platform Usability',
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New', -- 'New', 'In Review', 'Resolved'
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create index for faster querying by date and email
CREATE INDEX IF NOT EXISTS idx_inquiries_submitted_at ON public.inquiries (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries (email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Set up security policies allowing public submissions and read access
-- Allow anyone to submit an inquiry from the website
CREATE POLICY "Allow public insert into inquiries"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Allow inquiries to be viewed
CREATE POLICY "Allow select on inquiries"
ON public.inquiries
FOR SELECT
USING (true);

-- Also support feedback table alias if needed
CREATE TABLE IF NOT EXISTS public.feedback (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Platform Usability',
  rating INTEGER DEFAULT 5,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert into feedback"
ON public.feedback
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow select on feedback"
ON public.feedback
FOR SELECT
USING (true);
