// pages/ConnectFacebookPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RefreshCw, HelpCircle } from 'lucide-react';
import { MessengerIllustration } from '../components/ui/ChannelIllustrations';
import { MessengerBrandIcon, InstagramIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';

// ─── Confetti config: 70 pieces matching Screenshot 3 ─────────────────────────
const COLORS = [
  '#0066ff','#f59e0b','#10b981','#ef4444','#8b5cf6',
  '#ec4899','#06b6d4','#ea580c','#1e293b','#f43f5e',
  '#84cc16','#a855f7','#fbbf24','#34d399','#60a5fa',
];
const SHAPES = ['rect', 'wide', 'circle', 'dot'];

const CONFETTI = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  color: COLORS[i % COLORS.length],
  shape: SHAPES[i % SHAPES.length],
  left: `${(i * 14.3 + (i % 7) * 3.7) % 98}%`,
  size: 5 + (i % 10) * 1.5,
  fallDuration: `${3.5 + (i % 5) * 0.7}s`,
  swayDuration: `${2 + (i % 4) * 0.5}s`,
  delay: `${(i % 12) * 0.25}s`,
  initialRotate: (i * 53) % 360,
}));

// ─── Confetti Particle Component ─────────────────────────────────────────────
function ConfettiParticle({ p }) {
  const isWide = p.shape === 'wide';
  const isCircle = p.shape === 'circle';
  const isDot = p.shape === 'dot';

  const width = isDot ? p.size * 0.8 : isWide ? p.size * 2.5 : p.size;
  const height = isDot ? p.size * 0.8 : isWide ? p.size * 0.6 : p.shape === 'rect' ? p.size * 2 : p.size;
  const borderRadius = isCircle || isDot ? '9999px' : '2px';

  return (
    <div
      className="confetti-piece"
      style={{
        left: p.left,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: p.color,
        borderRadius,
        opacity: 0.88,
        animationDuration: `${p.fallDuration}, ${p.swayDuration}`,
        animationDelay: `${p.delay}, ${p.delay}`,
        transform: `rotate(${p.initialRotate}deg)`,
      }}
    />
  );
}

// ─── Pricing Plans Data ───────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Automate, save time, stay connected',
    monthlyPrice: 0,
    annuallyPrice: 0,
    contacts: '25',
    btnLabel: 'Continue with Free',
    btnClass: 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-800',
    featured: false,
    monthlyDiscount: null,
    annuallyTotal: null,
    features: [
      { text: '2 channels', icons: true },
      { text: 'Basic automations (up to 4 active automations)' },
      { text: '1 user', info: true },
      { text: 'Basic unified Inbox', info: true },
      { text: 'Self-serve Support', info: true },
      { text: 'Manychat branding', info: true },
    ],
  },
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Keep fans and community engaged',
    monthlyPrice: 15,
    annuallyPrice: 14,
    contacts: '250',
    btnLabel: 'Try free for 14 days',
    btnClass: 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-800',
    featured: false,
    monthlyDiscount: null,
    annuallyDiscount: '18% off',
    annuallyTotal: '$168',
    features: [
      { text: '2 channels', icons: true },
      { text: 'Unlimited custom automations' },
      { text: '2 users', info: true },
      { text: 'Basic Inbox + organization and reminders', info: true },
      { text: 'Email Support', info: true },
      { text: 'No Manychat branding', info: true },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    nameAI: true,
    tagline: 'The "not a side hustle anymore" plan',
    monthlyPrice: 35,
    annuallyPrice: 29,
    contacts: '2500',
    btnLabel: 'Try free for 14 days',
    btnClass: 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white',
    featured: true,
    annuallyDiscount: '25% off',
    annuallyTotal: '$348',
    features: [
      { text: '3 channels', icons: true },
      { text: 'Advanced automations, Broadcasts and AI-driven convos' },
      { text: '3 users', info: true },
      { text: 'Custom Inbox labels and rules', info: true },
      { text: 'AI', info: true },
      { text: 'Email Support', info: true },
      { text: 'No Manychat branding', info: true },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    nameAI: true,
    tagline: 'Built for business - solo creators or teams',
    monthlyPrice: 92,
    annuallyPrice: 69,
    contacts: '7500',
    btnLabel: 'Get started',
    btnClass: 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-800',
    featured: false,
    annuallyDiscount: '30% off',
    annuallyTotal: '$828',
    features: [
      { text: 'Unlimited channels' },
      { text: 'Advanced automations, Broadcasts and AI-driven convos' },
      { text: '5 users', info: true },
      { text: 'Shared team Inbox and assignments', info: true },
      { text: 'AI', info: true },
      { text: 'Priority Support', info: true },
      { text: 'No Manychat branding', info: true },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    nameAI: true,
    tagline: 'Big boss energy, more advanced tools',
    monthlyPrice: 199,
    annuallyPrice: 139,
    contacts: '25000',
    btnLabel: 'Get started',
    btnClass: 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-800',
    featured: false,
    annuallyDiscount: '30% off',
    annuallyTotal: '$1,668',
    features: [
      { text: 'Unlimited channels' },
      { text: 'Advanced automations, Broadcasts and AI-driven convos' },
      { text: '10 users', info: true },
      { text: 'Shared team Inbox and assignments', info: true },
      { text: 'AI', info: true },
      { text: 'Priority Support', info: true },
      { text: 'No Manychat branding', info: true },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConnectFacebookPage() {
  const navigate = useNavigate();

  // Flow: 1 = page list, 2 = pricing, 3 = success confetti
  const [step, setStep] = useState(1);
  const [connectingId, setConnectingId] = useState(null);
  const [connectedPageName, setConnectedPageName] = useState('Hallwala');
  const [billing, setBilling] = useState('annually'); // 'monthly' | 'annually'

  const [pages, setPages] = useState([
    { id: 'page_orig', name: 'Original Shoe Company', connected: true,  iconType: 'shoe' },
    { id: 'page_hall', name: 'Hallwala',              connected: false, iconType: 'question' },
  ]);

  // ─── Step 1 → 2: Connect a page ──────────────────────────────────────────
  const handleConnect = (page) => {
    setConnectingId(page.id);
    setTimeout(() => {
      setConnectingId(null);
      setConnectedPageName(page.name);
      setPages((prev) => prev.map((p) => p.id === page.id ? { ...p, connected: true } : p));
      setStep(2);
    }, 700);
  };

  // ─── Step 2 → 3: Select a plan ───────────────────────────────────────────
  const handleSelectPlan = (planName) => {
    setStep(3);
  };

  // ─── Step 3: Finish ───────────────────────────────────────────────────────
  const handleFinish = () => {
    try {
      localStorage.setItem('omni_facebook_connected', 'true');
      localStorage.setItem('omni_facebook_page', connectedPageName);
    } catch {}
    toast.success(`🎉 ${connectedPageName} connected!`);
    navigate('/settings?tab=messenger');
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 — Connect Facebook Page (Screenshot 1)
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 1) return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col animate-fade-in">
      {/* Two-column split layout matching Screenshot 1 */}
      <div className="flex-1 flex min-h-screen">

        {/* LEFT: grey panel with logo + illustration + heading */}
        <div className="hidden lg:flex lg:w-[420px] xl:w-[460px] shrink-0 bg-[#f4f4f4] flex-col justify-between p-12 xl:p-16">
          {/* Logo */}
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Manychat</span>
          </div>

          {/* Illustration + Heading */}
          <div className="space-y-6">
            <div className="w-52 h-52">
              <MessengerIllustration className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">
                Connect<br />Facebook Page
              </h1>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-[300px]">
                Follow the instruction to create your first Messenger automation.
              </p>
            </div>
          </div>

          {/* Back button */}
          <div>
            <button
              onClick={() => navigate('/settings?tab=messenger')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066ff] hover:underline cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Mobile logo (shown on small screens) */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
          <span className="text-xl font-black text-slate-900">Manychat</span>
          <button onClick={() => navigate('/settings?tab=messenger')} className="text-[#0066ff] text-sm font-semibold flex items-center gap-1 cursor-pointer">
            <ChevronLeft size={15} /> Back
          </button>
        </div>

        {/* RIGHT: pages list */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 lg:px-20 xl:px-28 py-16 lg:py-10 mt-16 lg:mt-0">
          <div className="w-full max-w-[520px]">

            <p className="text-base sm:text-lg font-semibold text-slate-900 mb-6">
              We found {pages.length} Facebook Pages managed by you.
            </p>

            {/* Pages list */}
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {pages.map((p) => (
                <div key={p.id} className="py-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Avatar */}
                    {p.iconType === 'shoe' ? (
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-1.5 shrink-0 shadow-sm overflow-hidden">
                        <svg className="w-7 h-5 text-slate-700" viewBox="0 0 24 16" fill="currentColor">
                          <path d="M22 10c-1-2-3-4-6-4h-4l-3-3H4c-1 0-2 1-2 2v8c0 1 1 2 2 2h17c1 0 2-1 2-2v-2l-1-1zm-6-2c2 0 4 1 5 2l-3 1-2-3z" />
                        </svg>
                        <span className="text-[6.5px] font-black text-slate-600 tracking-tighter w-full text-center leading-none mt-0.5">ORIGINAL</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-2xl font-bold text-slate-400">?</span>
                      </div>
                    )}
                    <span className="text-sm sm:text-base font-semibold text-slate-900 truncate">{p.name}</span>
                  </div>

                  {/* Action */}
                  {p.connected ? (
                    <button disabled className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-400 font-semibold rounded-lg text-sm cursor-not-allowed">
                      Connected
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(p)}
                      disabled={connectingId === p.id}
                      className="px-7 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer flex items-center gap-2 disabled:opacity-70"
                    >
                      {connectingId === p.id ? (
                        <><RefreshCw size={14} className="animate-spin" /><span>Connecting…</span></>
                      ) : (
                        <span>Connect</span>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Helper links */}
            <div className="flex items-center gap-6 text-sm text-[#0066ff] font-medium flex-wrap mt-6">
              <button onClick={() => toast('Checking permissions with Meta...')} className="hover:underline cursor-pointer">
                I can&apos;t see the Page I want
              </button>
              <button onClick={() => window.open('https://www.facebook.com/pages/create', '_blank')} className="hover:underline cursor-pointer">
                Create new Page
              </button>
              <button onClick={() => toast.success('Page list refreshed')} className="hover:underline cursor-pointer">
                Refresh Page list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2 — Pricing / Plan Selection (Screenshot 2)
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 2) return (
    <div className="min-h-screen bg-[#f5f0ff]/30 py-10 px-4 sm:px-6 flex flex-col items-center animate-fade-in overflow-y-auto">

      {/* Heading */}
      <div className="text-center mb-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
          1M+ Creators love Manychat. Now it&apos;s your turn.
        </h1>

        {/* Monthly / Annually Toggle matching Screenshot 2 */}
        <div className="inline-flex items-center p-1 bg-purple-100/80 rounded-full text-xs font-semibold shadow-inner">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
              billing === 'monthly'
                ? 'bg-white text-slate-900 shadow font-bold'
                : 'text-purple-600 hover:text-purple-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annually')}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
              billing === 'annually'
                ? 'bg-[#7c3aed] text-white shadow font-bold'
                : 'text-purple-600 hover:text-purple-900'
            }`}
          >
            Annually (up to 30% off)
          </button>
        </div>
      </div>

      {/* 5 Plan Cards */}
      <div className="w-full max-w-[1380px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8 items-end">
        {PLANS.map((plan) => {
          const price = billing === 'monthly' ? plan.monthlyPrice : plan.annuallyPrice;
          const discount = billing === 'annually' ? plan.annuallyDiscount : null;
          const total = billing === 'annually' ? plan.annuallyTotal : null;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow ${
                plan.featured
                  ? 'border-2 border-[#7c3aed] -translate-y-1'
                  : 'border border-slate-200'
              }`}
            >
              {/* Most popular badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                  <span className="px-3.5 py-1 bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="text-center pt-1 pb-3">
                <h3 className={`font-extrabold text-lg flex items-center justify-center gap-1 ${plan.featured ? 'text-[#7c3aed]' : 'text-slate-900'}`}>
                  <span>{plan.name}</span>
                  {plan.nameAI && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">+AI</span>
                  )}
                </h3>
                <p className="text-slate-500 text-xs mt-1 min-h-[32px] leading-snug">{plan.tagline}</p>

                {/* Price */}
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900">${price}</span>
                  {price > 0 && (
                    <div className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">
                      per month{discount ? ` (${discount})` : ''}<br />
                      {total ? `Annually at ${total}` : ''}
                    </div>
                  )}
                </div>

                {/* Contacts */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-bold text-slate-800">
                  <span>{plan.contacts}</span>
                  <span className="font-normal text-slate-500">Active Contacts/mo</span>
                  <HelpCircle size={11} className="text-slate-400" />
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-sm mb-4 ${plan.btnClass}`}
              >
                {plan.btnLabel}
              </button>

              {/* Features */}
              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-600 flex-1">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{f.text}</span>
                    {f.icons && (
                      <span className="flex items-center gap-0.5 ml-0.5 mt-0.5">
                        <InstagramIcon className="w-3 h-3" />
                        <MessengerBrandIcon className="w-3 h-3" />
                      </span>
                    )}
                    {f.info && <HelpCircle size={10} className="text-slate-400 shrink-0 mt-0.5" />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom link */}
      <div className="text-center text-xs text-slate-500 pb-6">
        Need a deep dive?{' '}
        <button onClick={() => toast('Opening comparison table...')} className="text-[#0066ff] hover:underline font-semibold cursor-pointer">
          View plan comparison table
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3 — Congratulations + Confetti (Screenshot 3)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full bg-[#f7f7f7] flex flex-col items-center justify-center p-6 overflow-hidden animate-fade-in">

      {/* Top-left logo */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20">
        <span className="text-2xl font-black text-slate-900 tracking-tight">Manychat</span>
      </div>

      {/* Confetti particles — full screen falling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {CONFETTI.map((p) => (
          <ConfettiParticle key={p.id} p={p} />
        ))}
      </div>

      {/* Center success content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-sm">
        {/* Avatar circle */}
        <div className="w-20 h-20 rounded-full bg-slate-200/80 border-2 border-slate-300/60 flex items-center justify-center shadow-sm">
          <span className="text-3xl font-bold text-slate-400">?</span>
        </div>

        {/* Title */}
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">
          Congratulations,<br />
          <span>{connectedPageName}</span> is connected!
        </h1>

        {/* CTA */}
        <button
          onClick={handleFinish}
          className="mt-2 px-10 py-3 bg-[#0066ff] hover:bg-[#0052cc] active:scale-95 text-white font-semibold rounded-lg text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Let&apos;s Start
        </button>
      </div>
    </div>
  );
}
