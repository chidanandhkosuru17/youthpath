import React, { useState } from 'react';
import { X, User, Mail, Lock, CheckCircle2, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';
import { authService } from '../services/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
  currentProfile: UserProfile;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentProfile,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [fullName, setFullName] = useState(currentProfile.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mode === 'forgot') {
      setLoading(true);
      try {
        await authService.resetPassword(email.trim());
        setSuccessNotice('Password reset link sent! Check your email inbox.');
      } catch (err: any) {
        setError(err.message || 'Failed to send password reset email.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    if (mode === 'signup') {
      try {
        const data = await authService.signUp(email.trim(), password, fullName.trim() || 'YouthPath Student');

        if (data.session) {
          // Direct login without mandatory confirmation
          const newProfile: UserProfile = {
            ...currentProfile,
            id: data.user?.id || currentProfile.id,
            name: fullName.trim() || 'YouthPath Student',
            email: email.trim(),
          };
          onSuccess(newProfile);
          onClose();
        } else {
          // Confirmation email sent
          setSuccessNotice(
            'Account created successfully in Supabase! If email confirmation is enabled in your project, check your inbox to verify your account.'
          );
        }
      } catch (err: any) {
        setError(err.message || 'Failed to sign up in Supabase.');
      } finally {
        setLoading(false);
      }
    } else {
      // Login mode
      try {
        const data = await authService.signIn(email.trim(), password);

        const authenticatedProfile: UserProfile = {
          ...currentProfile,
          id: data.user.id,
          name: data.user.user_metadata?.full_name || fullName.trim() || email.split('@')[0],
          email: data.user.email || email.trim(),
        };

        onSuccess(authenticatedProfile);
        onClose();
      } catch (err: any) {
        setError(err.message || 'Invalid email or password. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDemoSignIn = () => {
    onSuccess(currentProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {mode === 'signup'
                ? 'Create Your YouthPath Account'
                : mode === 'forgot'
                ? 'Reset Your Password'
                : 'Sign In to YouthPath'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Powered by Supabase Authentication
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {successNotice && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-100 leading-relaxed">
              {successNotice}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@college.edu.in"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setError('');
                        setSuccessNotice('');
                      }}
                      className="text-[11px] text-teal-600 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>
                  {mode === 'signup'
                    ? 'Sign Up with Supabase'
                    : mode === 'forgot'
                    ? 'Send Reset Link'
                    : 'Sign In with Supabase'}
                </span>
              )}
            </button>
          </form>

          {/* Quick Demo Sign-in */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <button
              onClick={handleDemoSignIn}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Or Explore as Demo Student (Aarav Sharma)</span>
            </button>
          </div>

          <div className="mt-4 text-center space-y-1">
            {mode === 'login' && (
              <p className="text-xs text-slate-600">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setSuccessNotice('');
                  }}
                  className="text-teal-600 hover:underline font-semibold cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p className="text-xs text-slate-600">
                Already registered in Supabase?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccessNotice('');
                  }}
                  className="text-teal-600 hover:underline font-semibold cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p className="text-xs text-slate-600">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccessNotice('');
                  }}
                  className="text-teal-600 hover:underline font-semibold cursor-pointer"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
