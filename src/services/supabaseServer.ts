import { createClient } from '@supabase/supabase-js';
import { UserProfile, SavedJob, ResumeData, InterviewSession, FeedbackSubmission } from '../types';

const rawUrl = process.env.SUPABASE_URL || 'https://eylvjfcnljhoanaxiyqk.supabase.co';
// Strip trailing /rest/v1 or /rest/v1/ so supabase-js forms correct endpoint URLs
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_NRHs6f8IJEZNJF_pyxAmnA_MXtFx_SB';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

export const supabaseService = {
  isConfigured: () => Boolean(supabaseUrl && supabaseKey),

  async testConnection(): Promise<{ connected: boolean; message: string }> {
    try {
      // Perform a lightweight probe query
      const { data, error } = await supabase.from('profiles').select('id').limit(1);
      if (error) {
        if (error.code === '42P01') {
          return {
            connected: true,
            message: 'Connected to Supabase project youthpath. Tables need to be initialized using supabase-schema.sql.'
          };
        }
        return { connected: false, message: error.message };
      }
      return { connected: true, message: 'Connected to Supabase project youthpath successfully.' };
    } catch (err: any) {
      return { connected: false, message: err.message || 'Connection failed' };
    }
  },

  // Profile Sync
  async syncProfile(profile: UserProfile): Promise<boolean> {
    try {
      const payload = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone || null,
        location: profile.location || null,
        state: profile.state || null,
        city: profile.city || null,
        education_level: profile.educationLevel || null,
        degree: profile.degree || null,
        specialization: profile.specialization || null,
        graduation_year: profile.graduationYear || null,
        technical_skills: profile.technicalSkills || [],
        soft_skills: profile.softSkills || [],
        work_experience: profile.workExperience || [],
        projects: profile.projects || [],
        certifications: profile.certifications || [],
        languages: profile.languages || [],
        preferred_roles: profile.preferredRoles || [],
        preferred_locations: profile.preferredLocations || [],
        preferred_work_mode: profile.preferredWorkMode || 'any',
        preferred_employment_type: profile.preferredEmploymentType || 'any',
        learning_goals: profile.learningGoals || [],
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(payload);
      if (error) {
        console.warn('Supabase profile sync notice (table may need schema migration):', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      console.warn('Supabase syncProfile error:', e.message);
      return false;
    }
  },

  // Saved Jobs Sync
  async syncSavedJob(savedJob: SavedJob): Promise<boolean> {
    try {
      const payload = {
        id: savedJob.id,
        user_id: savedJob.userId,
        job_data: savedJob.job,
        status: savedJob.status,
        notes: savedJob.notes || '',
        saved_at: savedJob.savedAt,
      };

      const { error } = await supabase.from('saved_jobs').upsert(payload);
      if (error) {
        console.warn('Supabase saved_jobs sync notice:', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      console.warn('Supabase syncSavedJob error:', e.message);
      return false;
    }
  },

  async deleteSavedJob(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('saved_jobs').delete().eq('id', id);
      if (error) {
        console.warn('Supabase deleteSavedJob notice:', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      return false;
    }
  },

  // Resumes Sync
  async syncResume(resume: ResumeData): Promise<boolean> {
    try {
      const payload = {
        id: resume.id,
        user_id: resume.userId,
        title: resume.title,
        template: resume.template,
        personal_info: resume.personalInfo,
        summary: resume.summary,
        education: resume.education,
        experience: resume.experience,
        projects: resume.projects,
        skills: resume.skills,
        certifications: resume.certifications,
        updated_at: resume.updatedAt,
      };

      const { error } = await supabase.from('resumes').upsert(payload);
      if (error) {
        console.warn('Supabase resumes sync notice:', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      console.warn('Supabase syncResume error:', e.message);
      return false;
    }
  },

  async deleteResume(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('resumes').delete().eq('id', id);
      if (error) return false;
      return true;
    } catch {
      return false;
    }
  },

  // Interview Sessions Sync
  async syncInterviewSession(session: InterviewSession): Promise<boolean> {
    try {
      const payload = {
        id: session.id,
        user_id: session.userId,
        role: session.role,
        category: session.category,
        difficulty: session.difficulty,
        started_at: session.startedAt,
        completed_at: session.completedAt || null,
        questions: session.questions,
        final_scorecard: session.finalScorecard || null,
      };

      const { error } = await supabase.from('interview_sessions').upsert(payload);
      if (error) {
        console.warn('Supabase interview_sessions sync notice:', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      return false;
    }
  },

  // Inquiry & Feedback Sync
  async syncFeedback(fb: FeedbackSubmission): Promise<boolean> {
    try {
      const payload = {
        id: fb.id,
        user_id: fb.userId || null,
        name: fb.name,
        email: fb.email,
        category: fb.category,
        rating: fb.rating,
        message: fb.message,
        submitted_at: fb.submittedAt,
      };

      // Try inserting into 'inquiries' first
      const { error: inqError } = await supabase.from('inquiries').insert(payload);
      if (inqError) {
        // Also try inserting into 'feedback' table
        const { error: fbError } = await supabase.from('feedback').insert(payload);
        if (fbError) {
          console.warn('Supabase inquiry sync notice:', inqError.message);
          return false;
        }
      }
      return true;
    } catch (e: any) {
      return false;
    }
  },
};
