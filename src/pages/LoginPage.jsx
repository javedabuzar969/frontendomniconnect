// pages/LoginPage.jsx — Multi-Tenant SaaS Auth with Google Login & English Error Handling
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Globe, ChevronDown, Check, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Omniconnect from '../components/ui/Omniconnect';
import { GoogleBrandIcon } from '../components/ui/Icons';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LANGUAGES = ['English', 'Español', 'Português', 'Deutsch', 'Français'];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle } = useAuth();

  // Form mode toggle
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const isSignup = mode === 'signup';

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Field-level error messages
  const [errors, setErrors] = useState({});

  // Language
  const [selectedLang, setSelectedLang] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Clear specific error on input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email || errors.general) {
      setErrors((prev) => ({ ...prev, email: null, general: null }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password || errors.general) {
      setErrors((prev) => ({ ...prev, password: null, general: null }));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrors({});
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Google Auth Error:', err);
      const errMsg = err.message || 'Google sign-in was cancelled or failed. Please try again.';
      setErrors({ general: errMsg });
      toast.error(errMsg);
      setGoogleLoading(false);
    }
  };

  // Email/Password Submit Handler
  const handleSubmit = async (e) => {
    e?.preventDefault();
    const newErrors = {};

    // Validate email
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    // Validate name on signup
    if (isSignup && !name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      let loggedInUser;
      if (isSignup) {
        loggedInUser = await signup({ name: name.trim(), email: trimmedEmail, password });
        toast.success(`Welcome to OmniConnect, ${(name.trim().split(' ')[0]) || 'User'}! 🎉`);
      } else {
        loggedInUser = await login({ email: trimmedEmail, password });
        toast.success(`Welcome back, ${(loggedInUser.name?.split(' ')[0]) || 'User'}! 👋`);
      }

      const userKey = loggedInUser?.email || loggedInUser?._id || trimmedEmail;
      const hasCompletedOnboarding = localStorage.getItem(`onboarding_${userKey}`);
      if (!hasCompletedOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } catch (err) {
      const rawError = err.message || '';
      let displayError = rawError;

      if (rawError.includes('Incorrect password') || rawError.includes('Invalid email or password') || rawError.includes('password')) {
        displayError = 'Incorrect password. Please try again.';
        setErrors({ password: displayError, general: displayError });
      } else if (rawError.includes('No account found') || rawError.includes('User not found')) {
        displayError = 'No account found with this email. Please create an account.';
        setErrors({ email: displayError, general: displayError });
      } else if (rawError.includes('already exists')) {
        displayError = 'An account with this email already exists. Please sign in.';
        setErrors({ email: displayError, general: displayError });
      } else {
        displayError = rawError || (isSignup ? 'Signup failed. Please try again.' : 'Login failed. Please try again.');
        setErrors({ general: displayError });
      }

      toast.error(displayError);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isSignup ? 'login' : 'signup');
    setName('');
    setPassword('');
    setErrors({});
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
                ? 'Join OmniConnect to manage your clients in an isolated workspace'
                : "Sign in to access your private dashboard and chats"}
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-full max-w-[370px] mx-auto md:mx-0">

              {/* General Error Banner */}
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700 animate-fade-in">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Continue with Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                className="w-full border border-slate-300 hover:border-slate-400 hover:bg-slate-50/80 active:bg-slate-100 text-slate-800 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 text-sm shadow-xs transition-all cursor-pointer disabled:opacity-60 mb-4 bg-white"
              >
                {googleLoading ? (
                  <span className="w-4 h-4 border-2 border-slate-400 border-t-[#4285F4] rounded-full animate-spin" />
                ) : (
                  <>
                    <GoogleBrandIcon className="w-4 h-4 shrink-0" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Or divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase absolute">
                  OR WITH EMAIL
                </span>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>

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
                        onChange={handleNameChange}
                        placeholder="John Smith"
                        autoComplete="name"
                        required={isSignup}
                        className={`w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all bg-white ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-300 focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} className="inline shrink-0" />
                        {errors.name}
                      </p>
                    )}
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
                      onChange={handleEmailChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className={`w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all bg-white ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-300 focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} className="inline shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password-input" className="block text-xs sm:text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (min 6 characters)
                    </span>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder={isSignup ? 'Create a strong password' : 'Enter your password'}
                      autoComplete={isSignup ? 'new-password' : 'current-password'}
                      required
                      className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all bg-white ${
                        errors.password
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-300 focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} className="inline shrink-0" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
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
      <footer className="w-full px-6 sm:px-12 py-6 flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs text-slate-400">
          © {new Date().getFullYear()} OmniConnect. All rights reserved.
        </span>
        <div className="flex items-center gap-4 text-xs text-[#0066ff]">
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/data-deletion" className="hover:underline text-slate-500 hover:text-slate-700">
            Data Deletion
          </Link>
        </div>
      </footer>
    </div>
  );
}
