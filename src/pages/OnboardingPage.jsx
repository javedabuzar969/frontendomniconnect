// src/pages/OnboardingPage.jsx — First-time login onboarding flow matching Manychat screenshots
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Lightbulb,
  Store,
  User,
  DollarSign,
  HelpCircle,
  Dumbbell,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Heart,
  Briefcase,
  TrendingUp,
  Home,
  Building,
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Unicorn Vector Illustration matching Manychat screenshot
 * Cute cream-colored unicorn head with hot-pink mane & horn emerging from a blue checkered water hole
 */
function UnicornIllustration({ className = 'w-40 h-40 sm:w-48 sm:h-48' }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 1. Water Hole (Blue Checkerboard Oval) */}
      <g transform="translate(20, 160)">
        <clipPath id="water-oval-clip">
          <ellipse cx="100" cy="20" rx="90" ry="18" />
        </clipPath>
        <ellipse cx="100" cy="20" rx="90" ry="18" fill="#1e3a8a" />
        <g clipPath="url(#water-oval-clip)">
          {/* Alternating blue squares */}
          <rect x="10" y="0" width="25" height="40" fill="#38bdf8" />
          <rect x="60" y="0" width="25" height="40" fill="#38bdf8" />
          <rect x="110" y="0" width="25" height="40" fill="#38bdf8" />
          <rect x="160" y="0" width="25" height="40" fill="#38bdf8" />
        </g>
        <ellipse cx="100" cy="20" rx="90" ry="18" stroke="#1d4ed8" strokeWidth="2" fill="none" />
      </g>

      {/* 2. Unicorn Figure emerging from hole */}
      <g transform="translate(30, 20)">
        {/* Hot Pink Mane (Back hair tufts) */}
        <path
          d="M60 90 L30 110 L55 125 L25 145 L55 160 L35 180 L80 180 Z"
          fill="#ff00a0"
        />
        <path
          d="M75 55 L45 75 L70 95 L50 115 L78 135 L65 155 L95 165 Z"
          fill="#ff00b8"
        />

        {/* Neck and Head (Cream / Pale yellow) */}
        <path
          d="M80 180 C80 145 85 105 95 85 C105 75 115 72 135 75 C145 78 165 85 170 98 C172 104 168 112 155 115 C145 118 130 115 125 125 C120 135 122 155 125 180 Z"
          fill="#f4eedb"
        />

        {/* Cute Ear */}
        <path d="M102 78 C98 58 108 52 114 55 C118 58 116 70 112 80 Z" fill="#f4eedb" />
        <path d="M105 74 C102 62 108 58 111 60 C113 62 112 70 109 76 Z" fill="#f472b6" />

        {/* Eye */}
        <circle cx="138" cy="95" r="3.5" fill="#334155" />
        <circle cx="137" cy="94" r="1.2" fill="#ffffff" />

        {/* Muzzle / Nostril */}
        <circle cx="164" cy="103" r="1.5" fill="#cbd5e1" />

        {/* Horn (Hot Pink / Magenta) */}
        <path
          d="M126 62 L150 12 L138 60 Z"
          fill="#ff0080"
        />
        {/* Horn ridges */}
        <line x1="130" y1="48" x2="136" y2="45" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="135" y1="35" x2="142" y2="32" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="140" y1="22" x2="146" y2="20" stroke="#f472b6" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);

  // Form selections
  const [accountFor, setAccountFor] = useState('myself'); // 'myself' | 'employer' | 'client'
  const [accountAbout, setAccountAbout] = useState('business'); // 'business' | 'person' | 'other'
  const [businessCategory, setBusinessCategory] = useState('ecommerce');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Step 3 completed -> save onboarding status and go to inbox with connect channel modal
      const userKey = user?.email || user?._id || 'default_user';
      localStorage.setItem(`onboarding_${userKey}`, 'true');
      toast.success('Your workspace is ready! Welcome aboard 🚀');
      navigate('/inbox?connectChannel=true');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans select-none">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        {/* ── Left Column: Logo + Unicorn + Headline ────────────── */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 lg:p-20 flex flex-col justify-between bg-white">
          <div>
            {/* OmniConnect Brand Logo */}
            <h1 className="text-2xl font-black text-black tracking-tight">OmniConnect</h1>

            {/* Illustration */}
            <div className="mt-12 sm:mt-16">
              <UnicornIllustration />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mt-8 sm:mt-10 leading-tight">
              Let's find the right<br />strategy for you
            </h2>

            {/* Subtitle */}
            <p className="text-slate-500 text-xs sm:text-sm mt-3.5 max-w-sm leading-relaxed">
              Tell us a little about your business, so we can match the right marketing approach.
            </p>
          </div>

          {/* Bottom Back Button (only on steps 2 & 3) */}
          <div className="mt-8 pt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-xs font-semibold text-[#0066ff] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>&lt;</span> Back
              </button>
            ) : (
              <div className="h-4" />
            )}
          </div>
        </div>

        {/* ── Right Column: Question & Options ─────────────────── */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 lg:p-20 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-slate-100">
          <div className="max-w-md w-full mx-auto lg:mx-0 pt-4 sm:pt-10">
            {/* ── STEP 1: Who are you setting up this account for? ── */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 mb-6">
                  Who are you setting up this account for?
                </h3>

                {[
                  { id: 'myself', label: 'For myself', icon: <Lightbulb size={18} className="text-slate-600" /> },
                  { id: 'employer', label: 'For my employer', icon: <Store size={18} className="text-slate-600" /> },
                  { id: 'client', label: 'For a client', icon: <User size={18} className="text-slate-600" /> },
                ].map((opt) => {
                  const isSelected = accountFor === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setAccountFor(opt.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#008450] bg-white ring-1 ring-[#008450]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="shrink-0">{opt.icon}</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">{opt.label}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#008450]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#008450]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── STEP 2: Who or what is this account about? ─────── */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 mb-6">
                  Who or what is this account about?
                </h3>

                {[
                  { id: 'business', label: 'A business', icon: <DollarSign size={18} className="text-slate-600" /> },
                  { id: 'person', label: 'A person', icon: <User size={18} className="text-slate-600" /> },
                  { id: 'other', label: 'Other', icon: <HelpCircle size={18} className="text-slate-600" /> },
                ].map((opt) => {
                  const isSelected = accountAbout === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setAccountAbout(opt.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#008450] bg-white ring-1 ring-[#008450]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="shrink-0">{opt.icon}</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">{opt.label}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#008450]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#008450]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── STEP 3: Which category best describes this business? */}
            {step === 3 && (
              <div className="space-y-2.5 animate-fade-in max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
                <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 mb-4 sticky top-0 bg-white pb-2 z-10">
                  Which category best describes this business?
                </h3>

                {[
                  { id: 'health', label: 'Health & Wellness', icon: <Dumbbell size={17} className="text-slate-600" /> },
                  { id: 'coaching', label: 'Coaching / Education', icon: <GraduationCap size={17} className="text-slate-600" /> },
                  { id: 'ecommerce', label: 'E-commerce / Online Store', icon: <ShoppingBag size={17} className="text-slate-600" /> },
                  { id: 'restaurant', label: 'Restaurant / Food Business', icon: <Utensils size={17} className="text-slate-600" /> },
                  { id: 'beauty', label: 'Beauty & Personal Care', icon: <Heart size={17} className="text-slate-600" /> },
                  { id: 'professional', label: 'Professional Services', icon: <Briefcase size={17} className="text-slate-600" /> },
                  { id: 'finance', label: 'Financial Services', icon: <TrendingUp size={17} className="text-slate-600" /> },
                  { id: 'realestate', label: 'Real Estate', icon: <Home size={17} className="text-slate-600" /> },
                  { id: 'local', label: 'Local Business / Services', icon: <Building size={17} className="text-slate-600" /> },
                  { id: 'other', label: 'Other', icon: <HelpCircle size={17} className="text-slate-600" /> },
                ].map((opt) => {
                  const isSelected = businessCategory === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setBusinessCategory(opt.id)}
                      className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#008450] bg-white ring-1 ring-[#008450]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="shrink-0">{opt.icon}</span>
                        <span className="text-xs sm:text-[13px] font-semibold text-slate-800">{opt.label}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#008450]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#008450]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Right: Next Button */}
          <div className="flex justify-end pt-8">
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
