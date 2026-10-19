import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eylvjfcnljhoanaxiyqk.supabase.co';
const supabaseKey = 'sb_publishable_NRHs6f8IJEZNJF_pyxAmnA_MXtFx_SB';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const authService = {
  // Sign Up with Email and Password
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  },

  // Sign In with Email and Password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  // Sign Out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  // Get Current Session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return null;
    }
    return data.session;
  },

  // Get Current User
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return null;
    }
    return data.user;
  },

  // Send Password Reset Email
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      throw error;
    }

    return data;
  },
};
