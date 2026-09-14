// pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ExternalLink,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';
import { TikTokIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';

export default function HomePage() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const onUpgradeClick = outletContext?.onUpgradeClick || (() => {});

  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800">
      {/* Top Header Title Bar: Home with User Greeting */}
      <div className="px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {firstName ? `Welcome back, ${firstName}! 👋` : 'Home'}
          </h1>
          {user && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              {user.workspace || 'Workspace'} • <span className="text-slate-400">{user.email}</span>
            </p>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1400px] px-4 sm:px-8 lg:px-12 py-3 space-y-6 sm:space-y-8 pb-16">
        
        {/* Promo Announcement Banner: TikTok × Manychat matching Screenshot 1 */}
        {!bannerDismissed && (
          <div className="relative bg-[#161616] text-white rounded-2xl p-4 sm:py-5 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 shadow-xs transition-all animate-fade-in">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              {/* TikTok Badge */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black border border-neutral-800 flex items-center justify-center shrink-0 shadow-inner">
                <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base md:text-[17px] text-white tracking-tight flex items-center gap-2">
                  TikTok × OmniConnect. Now we&apos;re talking
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-0.5 truncate">
                  Discover new opportunities for your audience in TikTok
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => {
                  toast.success('Redirecting to TikTok Integration');
                  navigate('/settings?tab=tiktok');
                }}
                className="px-4 sm:px-5 py-2 bg-[#2dd4bf] hover:bg-[#14b8a6] text-slate-950 rounded-full font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Discover</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>

              <button
                onClick={() => setBannerDismissed(true)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-md transition-colors cursor-pointer"
                title="Dismiss banner"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Greeting Section matching Screenshot 1 */}
        <div className="pt-2">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-slate-900 tracking-tight leading-none">
            Hello, {firstName}!
          </h2>
          <div className="flex items-center gap-2.5 mt-2.5 text-sm">
            <span className="text-slate-600 font-normal">1 connected channel</span>
            <button
              onClick={() => navigate('/automation')}
              className="text-[#0066ff] hover:underline font-semibold cursor-pointer"
            >
              See Insights
            </button>
          </div>
        </div>

        {/* Section: Start here matching Screenshot 1 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Start here</h3>
            <button
              onClick={() => navigate('/automation')}
              className="text-[#0066ff] hover:underline text-sm font-semibold cursor-pointer"
            >
              Explore all Templates
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Lead magnet */}
            <div
              onClick={() => navigate('/automation')}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between min-h-[118px] gap-3 transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
            >
              <div className="font-semibold text-slate-800 text-[14.5px] leading-snug group-hover:text-blue-600 transition-colors">
                Capture customer data with a lead magnet
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                {/* Flow Builder Icon */}
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="12" r="3" />
                  <path d="M6 9v6M9 6h3a6 6 0 0 1 6 6M9 18h3a6 6 0 0 0 6-6" />
                </svg>
                <span className="text-xs text-slate-500 font-medium">Flow Builder</span>
              </div>
            </div>

            {/* Card 2: Quiz leads */}
            <div
              onClick={onUpgradeClick}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between min-h-[118px] gap-3 transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
            >
              <div className="font-semibold text-slate-800 text-[14.5px] leading-snug group-hover:text-blue-600 transition-colors">
                Use a quiz to qualify leads
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="12" r="3" />
                    <path d="M6 9v6M9 6h3a6 6 0 0 1 6 6M9 18h3a6 6 0 0 0 6-6" />
                  </svg>
                  <span className="text-xs text-slate-500 font-medium">Flow Builder</span>
                </div>
                <span className="px-2.5 py-1 bg-[#0066ff] text-white text-[10px] font-extrabold rounded tracking-wider">
                  UPGRADE
                </span>
              </div>
            </div>

            {/* Card 3: Ambassador program */}
            <div
              onClick={onUpgradeClick}
              className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between min-h-[118px] gap-3 transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
            >
              <div className="font-semibold text-slate-800 text-[14.5px] leading-snug group-hover:text-blue-600 transition-colors">
                Create ambassador program
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="12" r="3" />
                    <path d="M6 9v6M9 6h3a6 6 0 0 1 6 6M9 18h3a6 6 0 0 0 6-6" />
                  </svg>
                  <span className="text-xs text-slate-500 font-medium">Flow Builder</span>
                </div>
                <span className="px-2.5 py-1 bg-[#0066ff] text-white text-[10px] font-extrabold rounded tracking-wider">
                  UPGRADE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Your next best moves - all done! matching Screenshot 1 & 2 */}
        <div className="space-y-4 pt-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your next best moves - all done!</h3>
            <p className="text-slate-500 text-sm mt-1">
              Love the energy, stay inspired by other Creators using OmniConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Open Community */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col group">
              {/* Graphic Banner Matching Screenshot 1 */}
              <div className="h-48 relative bg-[#ea580c] overflow-hidden flex items-center justify-center">
                {/* Orange/Red Checkered Pattern on the left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#fb923c]">
                  <div className="absolute left-0 top-0 bottom-0 w-28 grid grid-cols-2 grid-rows-5 gap-1.5 p-2.5 opacity-90">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${i % 2 === 0 ? 'bg-[#c2410c]' : 'bg-[#fdba74]'} rounded-xs`}
                      />
                    ))}
                  </div>
                </div>

                {/* Creator with framing hands gesture */}
                <div className="relative z-10 w-full h-full flex items-center justify-center pl-14">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                    alt="Creator community"
                    className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <a
                    href="https://manychat.com/community"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0066ff] font-bold text-[15px] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Open Community</span>
                    <ExternalLink size={14} strokeWidth={2.5} />
                  </a>
                  <p className="text-slate-500 text-xs sm:text-[13px] mt-1 leading-normal">
                    Get inspired and network with Creators like you
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Open the Blog */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col group">
              {/* Graphic Banner Matching Screenshot 1 */}
              <div className="h-48 relative bg-[#10b981] overflow-hidden flex items-center justify-center">
                {/* Green grid and circular pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#86efac] via-[#4ade80] to-[#22c55e]">
                  {/* Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #166534 1px, transparent 1px), linear-gradient(to bottom, #166534 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Abstract circular green shapes */}
                  <div className="absolute right-2 top-3 w-32 h-32 rounded-full bg-[#15803d]/40 blur-xs" />
                  <div className="absolute right-12 bottom-2 w-20 h-20 rounded-full bg-[#84cc16]/50" />
                </div>

                {/* Creators Photos Composition */}
                <div className="relative z-10 w-full h-full flex items-center justify-around px-5">
                  {/* Coffee drinker creator circle */}
                  <div className="w-24 h-24 rounded-full border-2 border-white/90 overflow-hidden shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&fit=crop"
                      alt="Blog Creator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Smiling redhead creator circle */}
                  <div className="w-28 h-28 rounded-full border-2 border-white/90 overflow-hidden shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&fit=crop"
                      alt="Blog Creator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <a
                    href="https://manychat.com/blog"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0066ff] font-bold text-[15px] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Open the Blog</span>
                    <ExternalLink size={14} strokeWidth={2.5} />
                  </a>
                  <p className="text-slate-500 text-xs sm:text-[13px] mt-1 leading-normal">
                    Discover how Creators use automation
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Go to YouTube */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col group">
              {/* Graphic Banner Matching Screenshot 1 */}
              <div className="h-48 relative bg-[#e9d5ff] overflow-hidden flex items-center justify-center">
                {/* Purple grid background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f3e8ff] via-[#e9d5ff] to-[#d8b4fe]">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #7e22ce 1px, transparent 1px), linear-gradient(to bottom, #7e22ce 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Checkerboard square in corner */}
                  <div className="absolute left-4 top-3 w-16 h-16 rounded-xl bg-[#c026d3]/20 border border-[#c026d3]/30" />
                </div>

                {/* YouTube Video Thumbnails Overlay */}
                <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    {/* Big curved white arrow */}
                    <div className="w-14 h-11 flex items-center justify-center">
                      <svg viewBox="0 0 50 40" fill="none" className="w-11 h-9 text-white drop-shadow-md">
                        <path
                          d="M10 25 C15 10, 25 8, 38 12 L32 6 M38 12 L34 18"
                          stroke="white"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* "What is OmniConnect?" Card */}
                    <div className="bg-white/95 rounded-lg px-3 py-1.5 shadow-md border border-purple-200 text-left transform rotate-2 group-hover:rotate-0 transition-transform">
                      <span className="text-[11px] font-black text-blue-600 block leading-tight">
                        What is OmniConnect?
                      </span>
                    </div>

                    {/* Creator Face cutout */}
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop"
                        alt="Creator"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Lower Video Badges */}
                  <div className="flex items-end justify-between gap-2 pt-1">
                    {/* "Zero -> 20K" Card */}
                    <div className="bg-black/90 text-white rounded-lg px-3 py-1.5 shadow-md text-[11px] font-bold flex items-center gap-1.5">
                      <span className="text-yellow-400">Zero</span>
                      <span className="text-emerald-400 font-extrabold">➔ 20K</span>
                      <span className="text-[10px] text-neutral-300">Data</span>
                    </div>

                    {/* Spreadsheets Icon */}
                    <div className="w-8 h-8 rounded-lg bg-[#0f9d58] text-white flex items-center justify-center font-black text-[11px] shadow-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H5v-4h5v4zm0-6H5V7h5v4zm7 6h-5v-4h5v4zm0-6h-5V7h5v4z"/>
                      </svg>
                    </div>

                    {/* Small creator portrait */}
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop"
                        alt="Creator"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <a
                    href="https://www.youtube.com/@Manychat"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0066ff] font-bold text-[15px] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Go to YouTube</span>
                    <ExternalLink size={14} strokeWidth={2.5} />
                  </a>
                  <p className="text-slate-500 text-xs sm:text-[13px] mt-1 leading-normal">
                    Find answers to all your OmniConnect questions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Your last 7 days matching Screenshot 2 */}
        <div className="space-y-4 pt-2 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your last 7 days</h3>
              <p className="text-slate-500 text-sm mt-0.5">
                How your automation&apos;s doing, updated Sep 4
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shadow-2xs cursor-pointer"
                title="Previous"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setCarouselIndex(carouselIndex + 1)}
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                title="Next"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Engagement winners */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between min-h-[112px] gap-3">
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">Engagement winners</div>
                <p className="text-slate-400 text-xs sm:text-[12.5px] leading-relaxed max-w-[190px]">
                  Checking who loves you the most...check back soon
                </p>
              </div>

              {/* Overlapping blurred avatar circles matching Screenshot 2 */}
              <div className="flex -space-x-3 overflow-hidden pl-2 shrink-0">
                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-xs filter blur-[0.6px] bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&fit=crop"
                    alt="winner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-xs filter blur-[0.6px] bg-slate-300">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&fit=crop"
                    alt="winner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-xs filter blur-[0.6px] bg-slate-400">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&fit=crop"
                    alt="winner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Time saved */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between min-h-[112px] gap-3">
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">Time saved</div>
                <p className="text-slate-400 text-xs sm:text-[12.5px] leading-relaxed max-w-[200px]">
                  No data. Launch an automation and check back in 24h
                </p>
                <button
                  onClick={() => navigate('/automation')}
                  className="text-[#0066ff] hover:underline font-semibold text-xs pt-1 block cursor-pointer"
                >
                  Explore templates
                </button>
              </div>

              {/* Hourglass Illustration matching Screenshot 2 */}
              <div className="w-14 h-16 flex items-center justify-center shrink-0">
                <svg className="w-12 h-14 drop-shadow-2xs" viewBox="0 0 44 52" fill="none">
                  {/* Top & Bottom Bars */}
                  <rect x="6" y="4" width="32" height="3" rx="1.5" fill="#94a3b8" />
                  <rect x="6" y="45" width="32" height="3" rx="1.5" fill="#94a3b8" />
                  {/* Glass Outline */}
                  <path
                    d="M10 7 C10 18, 19 22, 22 26 C19 30, 10 34, 10 45 L34 45 C34 34, 25 30, 22 26 C25 22, 34 18, 34 7 Z"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                  />
                  {/* Sand Top & Bottom */}
                  <path d="M14 12 Q22 17 30 12 L32 8 L12 8 Z" fill="#94a3b8" opacity="0.7" />
                  <path d="M16 43 Q22 36 28 43 Z" fill="#64748b" />
                  {/* Flowing sand stream */}
                  <line x1="22" y1="26" x2="22" y2="39" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>

            {/* Card 3: Leads collected */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between min-h-[112px] gap-3">
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">Leads collected</div>
                <p className="text-slate-400 text-xs sm:text-[12.5px] leading-relaxed max-w-[200px]">
                  No data. Automate lead collection and check back in 24h
                </p>
                <button
                  onClick={() => navigate('/automation')}
                  className="text-[#0066ff] hover:underline font-semibold text-xs pt-1 block cursor-pointer"
                >
                  Explore templates
                </button>
              </div>

              {/* PHONE and EMAIL Badges matching Screenshot 2 */}
              <div className="flex flex-row sm:flex-col gap-2 items-start sm:items-end shrink-0 pl-0 sm:pl-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-2xs text-[11px] font-bold tracking-wider">
                  <Phone size={12} className="text-slate-500" strokeWidth={2.2} />
                  <span>PHONE</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-2xs text-[11px] font-bold tracking-wider">
                  <Mail size={12} className="text-slate-500" strokeWidth={2.2} />
                  <span>EMAIL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
