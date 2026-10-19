-- YouthPath Daily Job Alert Notification System Schema for Supabase
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/eylvjfcnljhoanaxiyqk/sql

-- 1. Create table for Job Alert Subscriptions & User Preferences
CREATE TABLE IF NOT EXISTS public.job_alert_subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  target_roles JSONB DEFAULT '[]'::jsonb,
  preferred_locations JSONB DEFAULT '[]'::jsonb,
  work_mode TEXT DEFAULT 'any', -- 'remote', 'hybrid', 'onsite', 'any'
  employment_type TEXT DEFAULT 'any', -- 'full-time', 'internship', 'any'
  min_salary_lpa NUMERIC DEFAULT 3.5,
  frequency TEXT DEFAULT 'daily', -- 'daily', 'instant', 'weekly'
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_alert_subs_email ON public.job_alert_subscriptions (user_email);
CREATE INDEX IF NOT EXISTS idx_alert_subs_active ON public.job_alert_subscriptions (is_active);

-- 2. Create table for Job Alert Delivery Logs
CREATE TABLE IF NOT EXISTS public.job_alert_logs (
  id TEXT PRIMARY KEY,
  subscription_id TEXT,
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  matched_count INTEGER DEFAULT 0,
  matched_jobs JSONB DEFAULT '[]'::jsonb,
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'delivered', -- 'delivered', 'sent', 'failed'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index for querying logs by user and date
CREATE INDEX IF NOT EXISTS idx_alert_logs_email ON public.job_alert_logs (user_email);
CREATE INDEX IF NOT EXISTS idx_alert_logs_sent_at ON public.job_alert_logs (sent_at DESC);

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.job_alert_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_alert_logs ENABLE ROW LEVEL SECURITY;

-- 4. Set RLS Policies
CREATE POLICY "Allow public all on job_alert_subscriptions"
ON public.job_alert_subscriptions
FOR ALL
USING (true);

CREATE POLICY "Allow public all on job_alert_logs"
ON public.job_alert_logs
FOR ALL
USING (true);
