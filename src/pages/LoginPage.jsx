// pages/LoginPage.jsx — Real MongoDB Auth (Login + Signup)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Globe, ChevronDown, Check, Eye, EyeOff } from 'lucide-react';
import Omniconnect from '../components/ui/Omniconnect';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LANGUAGES = ['English', 'Español', 'Português', 'Deutsch', 'Français'];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // Form mode toggle
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const isSignup = mode === 'signup';

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Language
  const [selectedLang, setSelectedLang] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!email.trim()) { toast.error('Please enter your email'); return; }
    if (!password.trim()) { toast.error('Please enter your password'); return; }
    if (isSignup && !name.trim()) { toast.error('Please enter your name'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      let loggedInUser;
      if (isSignup) {
        loggedInUser = await signup({ name: name.trim(), email: email.trim(), password });
        toast.success(`Welcome to OmniConnect, ${name.split(' ')[0]}! 🎉`);
      } else {
        loggedInUser = await login({ email: email.trim(), password });
        toast.success(`Welcome back, ${loggedInUser.name.split(' ')[0]}! 👋`);
      }

      const userKey = loggedInUser?.email || loggedInUser?._id || email.trim();
      const hasCompletedOnboarding = localStorage.getItem(`onboarding_${userKey}`);
      if (!hasCompletedOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } catch (err) {
      toast.error(err.message || (isSignup ? 'Signup failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isSignup ? 'login' : 'signup');
    setName('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="w-full px-5 sm:px-12 py-5 flex items-center justify-between border-b border-slate-100">
        <span className="text-[24px] sm:text-[28px] font-black tracking-tight text-black">
          OmniConnect
        </span>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Language selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-black transition-colors cursor-pointer"
            >
              <Globe size={16} className="stroke-[1.75]" />
              <span className="hidden sm:inline">{selectedLang}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => { setSelectedLang(lang); setShowLangMenu(false); }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <Check size={13} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toggle login/signup */}
          <button
            type="button"
            onClick={switchMode}
            className="rounded-full border-[1.5px] border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff]/5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            {isSignup ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left: Illustration + Heading */}
          <div className="flex flex-col items-center justify-center text-center">
            <Omniconnect className="w-40 h-40 sm:w-52 sm:h-52 animate-fade-in" />
            <h1 className="text-[30px] sm:text-[42px] font-black text-black tracking-tight mt-5 leading-tight">
              {isSignup ? 'Create account' : 'Welcome back'}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              {isSignup
                ? 'Join thousands of creators on OmniConnect'
                : "Let's get you signed in"}
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-full max-w-[370px] mx-auto md:mx-0">
              <form onSubmit={handleSubmit} className="w-full space-y-4">

                {/* Name field (signup only) */}
                {isSignup && (
                  <div>
                    <label htmlFor="name-input" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        autoComplete="name"
                        required={isSignup}
                        className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="email-input" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password-input" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    Password
                    {!isSignup && (
                      <span className="ml-2 text-[10px] text-slate-400 font-normal">(min 6 characters)</span>
                    )}
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isSignup ? 'Create a strong password' : 'Enter your password'}
                      autoComplete={isSignup ? 'new-password' : 'current-password'}
                      required
                      className="w-full rounded-lg border border-slate-300 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0066ff] hover:bg-[#0055d4] active:bg-[#0047b3] text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-sm transition-all cursor-pointer disabled:opacity-70 mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-5">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase absolute">
                  {isSignup ? 'Already have an account?' : 'New to OmniConnect?'}
                </span>
              </div>

              {/* Switch mode */}
              <button
                type="button"
                onClick={switchMode}
                className="w-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-lg text-sm transition-all cursor-pointer"
              >
                {isSignup ? 'Sign in to existing account' : 'Create a free account'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-12 py-6 flex items-center justify-center md:justify-end">
        <div className="flex items-center gap-4 text-xs text-[#0066ff]">
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
            Terms of Service
          </a>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
