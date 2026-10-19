import React, { useState } from 'react';
import { TrendingUp, Bell, Menu, X, Check, User, ArrowRight, LogOut, LayoutDashboard, Bookmark, FileText, LogIn } from 'lucide-react';
import { NotificationItem, UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  notifications,
  onMarkRead,
  user,
  isAuthenticated,
  onOpenAuth,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navLinks = [
    { id: 'careers', label: 'Explore Careers' },
    { id: 'jobs', label: 'Find Jobs' },
    { id: 'skills', label: 'Skill Hub' },
    { id: 'interviews', label: 'Mock Interviews' },
    { id: 'resume', label: 'Resume Builder' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo matching screenshot */}
        <button
          onClick={() => {
            setCurrentTab('landing');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-slate-900">Youth</span>
            <span className="text-teal-600">Path</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentTab(link.id)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentTab === link.id
                  ? 'text-teal-600 font-semibold'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Right Actions: Notifications + Sign In right beside it + Join Button */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-4 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">Live Alerts</span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2.5">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No notifications yet</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => onMarkRead(n.id)}
                        className={`p-2.5 rounded-lg text-left transition text-xs cursor-pointer ${
                          n.isRead
                            ? 'bg-slate-50 text-slate-600'
                            : 'bg-teal-50/60 border border-teal-100/80 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between font-medium mb-1">
                          <span className="text-slate-900">{n.title}</span>
                          {!n.isRead && (
                            <span className="inline-block w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-slate-600 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sign In button right beside notification option */}
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="text-sm font-semibold text-slate-700 hover:text-teal-600 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition border border-slate-200/90 shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-slate-500" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-4.5 py-2 rounded-lg transition shadow-sm hover:shadow-teal-600/20 active:scale-[0.98] cursor-pointer"
              >
                Join YouthPath
              </button>
            </>
          ) : (
            /* User profile dropdown if authenticated */
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:border-teal-200 bg-white transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="max-w-[110px] truncate text-slate-800 font-semibold">
                    {user?.name ? user.name.split(' ')[0] : 'Profile'}
                  </span>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentTab('dashboard');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('resume');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Resume Studio</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('jobs');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>Saved Opportunities</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        onSignOut();
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out (Supabase)</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition shadow-sm cursor-pointer ${
                  currentTab === 'dashboard' ? 'ring-2 ring-teal-500/30' : ''
                }`}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu and Top-Right Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile notification bell */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 relative cursor-pointer rounded-lg hover:bg-slate-50"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
            )}
          </button>

          {/* Mobile Sign In button right beside notification bell */}
          {!isAuthenticated ? (
            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1.5 rounded-lg border border-teal-200"
            >
              {user?.name ? user.name.split(' ')[0] : 'Profile'}
            </button>
          )}

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer rounded-lg hover:bg-slate-50"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentTab === link.id
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setCurrentTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-slate-700 font-medium hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-teal-600" />
                  <span>Student Profile & Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg text-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-slate-700 border border-slate-200 font-medium py-2.5 rounded-lg text-center text-sm flex items-center justify-center gap-2 hover:bg-slate-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-teal-600 text-white font-medium py-2.5 rounded-lg text-center text-sm shadow-sm hover:bg-teal-700"
                >
                  Join YouthPath
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
