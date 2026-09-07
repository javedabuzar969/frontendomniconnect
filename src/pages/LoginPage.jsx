// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Globe, ChevronDown, Check } from 'lucide-react';
import Omniconnect from '../components/ui/Omniconnect';
import toast from 'react-hot-toast';

const LANGUAGES = ['English', 'Español', 'Português', 'Deutsch', 'Français', 'Italiano'];

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('mrsmith@gmail.com');
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleSignIn = async (e) => {
    e?.preventDefault();
    if (!email || !email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // Simulate auth / dev mode sign in
      await new Promise((r) => setTimeout(r, 450));
      sessionStorage.setItem('__ag_jwt', 'mock_token_dev');
      sessionStorage.setItem('__user_email', email);
      toast.success('Welcome back to OmniConnect! 👋');
      navigate('/home');
    } catch (err) {
      toast.error('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = (provider) => {
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('__ag_jwt', 'mock_token_dev');
      sessionStorage.setItem('__user_email', `user@${provider.toLowerCase()}.com`);
      toast.success(`Signed in with ${provider}! 👋`);
      navigate('/home');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <header className="w-full px-6 sm:px-12 py-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center select-none group">
          <span className="text-[26px] sm:text-[28px] font-black tracking-tight text-black font-sans leading-none">
            OmniConnect
          </span>
        </Link>

        {/* Right Nav: Language Selector & Get Started Free */}
        <div className="flex items-center gap-6">
          {/* Language dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-800 hover:text-black transition-colors cursor-pointer py-1"
            >
              <Globe size={18} className="text-slate-700 stroke-[1.75]" />
              <span>{selectedLang}</span>
              <ChevronDown size={14} className="text-slate-500 ml-0.5" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 animate-slide-up">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-between cursor-pointer"
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <Check size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GET STARTED FREE Button */}
          <button
            type="button"
            onClick={() => handleSignIn()}
            className="rounded-full border-[1.5px] border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff]/5 px-5 py-2 text-xs font-bold tracking-wider uppercase transition-colors select-none cursor-pointer"
          >
            GET STARTED FREE
          </button>
        </div>
      </header>

      {/* Main Content: 2-Column Split */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-6 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Mascot Illustration + Welcome Back */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Waving Checkered Hand Illustration */}
            <Omniconnect className="w-44 h-44 sm:w-52 sm:h-52 animate-fade-in" />

            {/* Heading */}
            <h1 className="text-[34px] sm:text-[42px] font-black text-black tracking-tight mt-6 leading-tight">
              Welcome back
            </h1>

            {/* Subheading */}
            <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
              Let's get you signed in
            </p>
          </div>

          {/* Right Column: Sign In Form Box */}
          <div className="flex flex-col items-center md:items-start justify-center w-full">
            <div className="w-full max-w-[370px] mx-auto md:mx-0">
              <form onSubmit={handleSignIn} className="w-full">
                {/* Email Label + LAST USED Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor="email-input" className="text-xs sm:text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <span className="bg-[#0066ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                    LAST USED
                  </span>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mrsmith@gmail.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all bg-white"
                  />
                </div>

                {/* Subtext */}
                <p className="text-xs text-slate-500 mt-2 mb-4 font-normal">
                  We'll email you a one-time link to sign in.
                </p>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0066ff] hover:bg-[#0055d4] active:bg-[#0047b3] text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Mail size={16} className="stroke-[2]" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider: OR SIGN IN WITH */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase absolute">
                  OR SIGN IN WITH
                </span>
              </div>

              {/* Social Login Options */}
              <div className="grid grid-cols-4 gap-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialSignIn('Google')}
                  title="Sign in with Google"
                  className="h-10 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.6 0 13s.6 4.7 1.6 6.6l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.8 7.4 23 12 23z"
                    />
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleSocialSignIn('Facebook')}
                  title="Sign in with Facebook"
                  className="h-10 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                >
                  <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                {/* Telegram */}
                <button
                  type="button"
                  onClick={() => handleSocialSignIn('Telegram')}
                  title="Sign in with Telegram"
                  className="h-10 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.458 0 .661-.21.917-.46l2.203-2.14 4.582 3.385c.844.466 1.452.226 1.663-.782l3.005-14.156c.308-1.233-.472-1.793-1.468-1.327z"
                      fill="#24A1DE"
                    />
                  </svg>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  onClick={() => handleSocialSignIn('Apple')}
                  title="Sign in with Apple"
                  className="h-10 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs group"
                >
                  <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73 1.01.08 2.02-.48 2.64-1.23z" />
                  </svg>
                </button>
              </div>

              {/* Sign up prompt */}
              <div className="text-center mt-6">
                <span className="text-xs text-slate-700">New to OmniConnect? </span>
                <button
                  type="button"
                  onClick={() => handleSignIn()}
                  className="text-xs text-[#0066ff] font-medium hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 sm:px-12 py-8 flex items-center justify-center md:justify-end">
        <div className="flex items-center gap-4 text-xs text-[#0066ff]">
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline transition-colors">
            Terms of Service
          </a>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline transition-colors">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
