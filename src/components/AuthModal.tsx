import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, CheckCircle2, ArrowRight, Loader2, KeyRound, AlertCircle, LogIn, UserPlus } from 'lucide-react';
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
  const [fullName, setFullName] = useState(currentProfile?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Sync mode when modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setSuccessNotice('');
      if (currentProfile?.name) {
        setFullName(currentProfile.name);
      }
    }
  }, [isOpen, initialMode, currentProfile]);

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
        setSuccessNotice('Password reset link sent! Please check your email inbox.');
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
          // Direct login (instant confirmation)
          const newProfile: UserProfile = {
            ...currentProfile,
            id: data.user?.id || currentProfile.id,
            name: fullName.trim() || 'YouthPath Student',
            email: email.trim(),
          };
          onSuccess(newProfile);
          onClose();
        } else {
          setSuccessNotice(
            'Account registered successfully! If email verification is required, please check your inbox to confirm your account, then sign in.'
          );
        }
      } catch (err: any) {
        const msg = err.message || '';
        if (msg.toLowerCase().includes('already registered')) {
          setError('An account with this email already exists. Please click "Sign In" above to log in.');
        } else {
          setError(msg || 'Failed to complete registration. Please try again.');
        }
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
        const msg = err.message || '';
        if (msg.toLowerCase().includes('invalid login credentials')) {
          setError(
            'Invalid email or password. If you haven\'t created an account yet, click the "Create Account" tab above to sign up.'
          );
        } else if (msg.toLowerCase().includes('email not confirmed')) {
          setError('Your email has not been confirmed yet. Please verify your email inbox or check your Supabase project settings.');
        } else {
          setError(msg || 'Could not sign in. Please verify your credentials.');
        }
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              {mode === 'signup'
                ? 'Create Student Account'
                : mode === 'forgot'
                ? 'Reset Password'
                : 'Sign In to YouthPath'}
            </h3>
            <p className="text-xs text-teal-300 mt-0.5">
              Secure Career Profile & Applications Access
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
              setSuccessNotice('');
            }}
            className={`py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              mode === 'login'
                ? 'border-teal-600 text-teal-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError('');
              setSuccessNotice('');
            }}
            className={`py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              mode === 'signup'
                ? 'border-teal-600 text-teal-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successNotice && (
            <div className="mb-4 p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-start gap-2 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successNotice}</span>
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
                  <span>
                    {mode === 'signup'
                      ? 'Creating Account...'
                      : mode === 'forgot'
                      ? 'Sending Link...'
                      : 'Signing In...'}
                  </span>
                </>
              ) : (
                <span>
                  {mode === 'signup'
                    ? 'Register'
                    : mode === 'forgot'
                    ? 'Send Reset Link'
                    : 'Sign In'}
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

          <div className="mt-4 text-center">
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setSuccessNotice('');
                }}
                className="text-xs text-teal-600 hover:underline font-semibold cursor-pointer"
              >
                Back to Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
