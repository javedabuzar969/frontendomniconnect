// pages/ConnectFacebookPage.jsx — Dynamic Meta Facebook Page Connection Flow
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, RefreshCw, HelpCircle, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { MessengerIllustration } from '../components/ui/ChannelIllustrations';
import { MessengerBrandIcon, InstagramIcon } from '../components/ui/Icons';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';

// ─── Confetti config: 70 particles matching Manychat reference ───────────────
const COLORS = [
  '#0066ff', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#ea580c', '#1e293b', '#f43f5e',
  '#84cc16', '#a855f7', '#fbbf24', '#34d399', '#60a5fa',
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

// ─── Pricing Plans Data with OmniConnect Branding ───────────────────────────
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
    features: [
      { text: '2 channels', icons: true },
      { text: 'Basic automations (up to 4 active automations)' },
      { text: '1 user', info: true },
      { text: 'Basic unified Inbox', info: true },
      { text: 'Self-serve Support', info: true },
      { text: 'OmniConnect branding', info: true },
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
    annuallyDiscount: '18% off',
    annuallyTotal: '$168',
    features: [
      { text: '2 channels', icons: true },
      { text: 'Unlimited custom automations' },
      { text: '2 users', info: true },
      { text: 'Basic Inbox + organization and reminders', info: true },
      { text: 'Email Support', info: true },
      { text: 'No OmniConnect branding', info: true },
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
      { text: 'No OmniConnect branding', info: true },
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
      { text: 'No OmniConnect branding', info: true },
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
      { text: 'No OmniConnect branding', info: true },
    ],
  },
];

export default function ConnectFacebookPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Step: 1 = Page list, 2 = Pricing, 3 = Confetti Success
  const [step, setStep] = useState(1);
  const [billing, setBilling] = useState('annually');

  // Real Meta Integration State
  const [oauthState, setOauthState] = useState(null);
  const [hasAuthorized, setHasAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectingId, setConnectingId] = useState(null);

  // Dynamic real pages fetched from Meta
  const [availablePages, setAvailablePages] = useState([]);
  const [connectedPages, setConnectedPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  // ─── 1. Load initial data & check OAuth state on mount ─────────────────────
  useEffect(() => {
    const urlState = searchParams.get('state');
    if (urlState) {
      setOauthState(urlState);
      setHasAuthorized(true);
      fetchPages(urlState);
    } else {
      loadConnectedPages();
    }
  }, [searchParams]);

  // ─── 2. Listen for Meta OAuth Popup Callback ──────────────────────────────
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data?.type === 'META_AUTH_SUCCESS') {
        const state = event.data.state;
        if (state) {
          setOauthState(state);
          setHasAuthorized(true);
          toast.success('🎉 Facebook account authorized! Fetching your Pages...');
          await fetchPages(state);
        }
      } else if (event.data?.type === 'META_AUTH_ERROR') {
        toast.error('Facebook authorization was cancelled or denied.');
        setLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Fetch already connected pages from DB
  const loadConnectedPages = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/integrations/facebook/pages');
      if (res.data?.success) {
        const connected = res.data.connectedPages || [];
        setConnectedPages(connected);
        if (connected.length > 0) {
          setHasAuthorized(true);
          setAvailablePages(connected);
        }
      }
    } catch (err) {
      console.warn('[Facebook] Initial load:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch real Facebook Pages from Meta API for the current authorized session
  const fetchPages = async (state) => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/integrations/facebook/pages', {
        params: { state },
      });
      if (res.data?.success) {
        const pages = res.data.availablePages || res.data.pages || [];
        const connected = res.data.connectedPages || [];
        setAvailablePages(pages);
        setConnectedPages(connected);
        if (pages.length > 0 || connected.length > 0) {
          setHasAuthorized(true);
        }
      }
    } catch (err) {
      console.error('[Facebook] Fetch pages error:', err.message);
      toast.error('Could not load Facebook Pages. Please reconnect.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Launch Meta OAuth Dialog in Popup ────────────────────────────────────
  const handleLaunchMetaLogin = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/integrations/facebook/oauth/start', {
        headers: { Accept: 'application/json' },
        params: { format: 'json' },
      });

      if (!res.data?.success || !res.data?.oauthUrl) {
        throw new Error(res.data?.error || 'Failed to generate Meta OAuth URL');
      }

      const { oauthUrl, state } = res.data;
      setOauthState(state);

      const width = 640;
      const height = 750;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        oauthUrl,
        'MetaOAuthPopup',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
      );

      if (!popup || popup.closed) {
        window.location.href = oauthUrl;
      }
    } catch (err) {
      toast.error('Could not start Facebook login: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ─── Connect Selected Real Page ───────────────────────────────────────────
  const handleConnectPage = async (page) => {
    setConnectingId(page.id);
    try {
      const res = await apiClient.post('/api/integrations/facebook/connect-page', {
        pageId: page.id,
        state: oauthState,
      });

      if (res.data?.success) {
        setSelectedPage(page);
        // Save to localStorage for instant UI state
        try {
          localStorage.setItem('omni_facebook_connected', 'true');
          localStorage.setItem('omni_facebook_page', page.name);
          localStorage.setItem('omni_facebook_page_id', page.id);
        } catch {}

        toast.success(`🎉 "${page.name}" connected!`);
        // Advance to Step 2: Pricing
        setStep(2);
      } else {
        throw new Error(res.data?.error || 'Failed to connect page');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Could not connect this Facebook Page.');
    } finally {
      setConnectingId(null);
    }
  };

  // ─── Step 2 → 3: Select Plan ──────────────────────────────────────────────
  const handleSelectPlan = (planName) => {
    setStep(3);
  };

  // ─── Step 3: Let's Start ──────────────────────────────────────────────────
  const handleFinish = () => {
    toast.success(`🎉 ${selectedPage?.name || 'Facebook Page'} is now active!`);
    navigate('/settings?tab=messenger');
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 — Connect Facebook Page (Exact Layout matching Reference)
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 1) return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col animate-fade-in font-sans">
      <div className="flex-1 flex min-h-screen">

        {/* LEFT COLUMN: Grey panel with OmniConnect brand + illustration */}
        <div className="hidden lg:flex lg:w-[420px] xl:w-[460px] shrink-0 bg-[#f4f4f4] flex-col justify-between p-12 xl:p-16 border-r border-slate-200/60">
          {/* OmniConnect Brand Logo */}
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">OmniConnect</span>
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

        {/* Mobile Header (< lg) */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <span className="text-xl font-black text-slate-900">OmniConnect</span>
          <button onClick={() => navigate('/settings?tab=messenger')} className="text-[#0066ff] text-sm font-semibold flex items-center gap-1 cursor-pointer">
            <ChevronLeft size={15} /> Back
          </button>
        </div>

        {/* RIGHT COLUMN: Dynamic Real Pages List */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-10 mt-14 lg:mt-0">
          <div className="w-full max-w-[540px]">

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
                <RefreshCw size={28} className="animate-spin text-[#0066ff]" />
                <p className="text-sm text-slate-600 font-medium">
                  Connecting to Meta and loading your Facebook Pages...
                </p>
              </div>
            ) : !hasAuthorized ? (
              /* State A: User needs to log in to Facebook first */
              <div className="space-y-6 py-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Link Your Facebook Account
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Log in with Meta to discover and connect the Facebook Pages you manage. Only your authorized Pages will be displayed.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <ShieldCheck size={16} className="text-[#0066ff] shrink-0" />
                    <span>Official Meta Authorization</span>
                  </div>
                  <p>
                    OmniConnect connects via Meta’s secure OAuth API. Your credentials stay strictly with Meta.
                  </p>
                </div>

                <div>
                  <button
                    onClick={handleLaunchMetaLogin}
                    disabled={loading}
                    className="w-full py-3 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold rounded-xl text-sm transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                    <span>Continue with Facebook</span>
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-400">
                    You will be able to select which Page(s) to connect on the next screen.
                  </p>
                </div>
              </div>
            ) : availablePages.length === 0 ? (
              /* State B: Authorized but 0 Pages found on Meta */
              <div className="space-y-6 py-6 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                  <UserCheck size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    No Facebook Pages Found
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    We could not find any Facebook Pages where your logged-in Meta account is an Admin.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={handleLaunchMetaLogin}
                    className="px-5 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    Switch Facebook Account
                  </button>
                  <button
                    onClick={() => window.open('https://www.facebook.com/pages/create', '_blank')}
                    className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    Create a Facebook Page
                  </button>
                </div>
              </div>
            ) : (
              /* State C: Real Facebook Pages Found! */
              <div className="animate-fade-in">
                <p className="text-base sm:text-lg font-semibold text-slate-900 mb-6">
                  We found {availablePages.length} Facebook Page{availablePages.length > 1 ? 's' : ''} managed by you.
                </p>

                {/* Real Dynamic Pages List */}
                <div className="divide-y divide-slate-100 border-t border-b border-slate-100 max-h-[460px] overflow-y-auto">
                  {availablePages.map((p) => {
                    const isConnected = p.connected || connectedPages.some((cp) => cp.pageId === p.id || cp.id === p.id);
                    return (
                      <div key={p.id} className="py-4 sm:py-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Page Avatar: Real Picture or Initial */}
                          {p.picture ? (
                            <img
                              src={p.picture}
                              alt={p.name}
                              className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-lg shrink-0 shadow-2xs">
                              {p.name?.charAt(0)?.toUpperCase() || 'P'}
                            </div>
                          )}

                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                              {p.name}
                            </h4>
                            {p.category && (
                              <p className="text-xs text-slate-400 truncate mt-0.5">
                                {p.category}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Connect Button */}
                        <div>
                          {isConnected ? (
                            <button
                              disabled
                              className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-400 font-semibold rounded-lg text-xs sm:text-sm cursor-not-allowed shadow-2xs"
                            >
                              Connected
                            </button>
                          ) : (
                            <button
                              onClick={() => handleConnectPage(p)}
                              disabled={connectingId === p.id}
                              className="px-6 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold rounded-lg text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-75"
                            >
                              {connectingId === p.id ? (
                                <>
                                  <RefreshCw size={14} className="animate-spin" />
                                  <span>Connecting…</span>
                                </>
                              ) : (
                                <span>Connect</span>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Helper Links matching Reference */}
                <div className="flex items-center gap-5 text-xs sm:text-sm text-[#0066ff] font-medium flex-wrap mt-6 pt-1">
                  <button
                    onClick={() => toast('Make sure your Facebook account has admin full control over the Page.')}
                    className="hover:underline cursor-pointer"
                  >
                    I can&apos;t see the Page I want
                  </button>
                  <button
                    onClick={() => window.open('https://www.facebook.com/pages/create', '_blank')}
                    className="hover:underline cursor-pointer"
                  >
                    Create new Page
                  </button>
                  <button
                    onClick={() => fetchPages(oauthState)}
                    className="hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw size={12} />
                    <span>Refresh Page list</span>
                  </button>
                  <button
                    onClick={handleLaunchMetaLogin}
                    className="hover:underline cursor-pointer text-slate-500"
                  >
                    Switch Account
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2 — Pricing / Plan Selection (OmniConnect Branding)
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 2) return (
    <div className="min-h-screen bg-[#faf5ff]/40 py-10 px-4 sm:px-6 flex flex-col items-center animate-fade-in overflow-y-auto font-sans">
      
      {/* OmniConnect Branding Heading */}
      <div className="text-center mb-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
          1M+ Creators love OmniConnect. Now it&apos;s your turn.
        </h1>

        {/* Monthly / Annually Toggle matching Reference */}
        <div className="inline-flex items-center p-1 bg-purple-100/80 rounded-full text-xs font-semibold shadow-inner">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
              billing === 'monthly'
                ? 'bg-white text-slate-900 shadow font-bold'
                : 'text-purple-700 hover:text-purple-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annually')}
            className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
              billing === 'annually'
                ? 'bg-[#7c3aed] text-white shadow font-bold'
                : 'text-purple-700 hover:text-purple-900'
            }`}
          >
            Annually (up to 30% off)
          </button>
        </div>
      </div>

      {/* 5 Plan Cards Grid */}
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
              {plan.featured && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                  <span className="px-3.5 py-1 bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="text-center pt-1 pb-3">
                <h3 className={`font-extrabold text-lg flex items-center justify-center gap-1 ${plan.featured ? 'text-[#7c3aed]' : 'text-slate-900'}`}>
                  <span>{plan.name}</span>
                  {plan.nameAI && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">+AI</span>
                  )}
                </h3>
                <p className="text-slate-500 text-xs mt-1 min-h-[32px] leading-snug">{plan.tagline}</p>

                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900">${price}</span>
                  {price > 0 && (
                    <div className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">
                      per month{discount ? ` (${discount})` : ''}<br />
                      {total ? `Annually at ${total}` : ''}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-bold text-slate-800">
                  <span>{plan.contacts}</span>
                  <span className="font-normal text-slate-500">Active Contacts/mo</span>
                  <HelpCircle size={11} className="text-slate-400" />
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-sm mb-4 ${plan.btnClass}`}
              >
                {plan.btnLabel}
              </button>

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

      <div className="text-center text-xs text-slate-500 pb-6">
        Need a deep dive?{' '}
        <button onClick={() => toast('Plan comparison guide for OmniConnect')} className="text-[#0066ff] hover:underline font-semibold cursor-pointer">
          View plan comparison table
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3 — Congratulations + Falling Confetti Animation (OmniConnect)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full bg-[#f7f7f7] flex flex-col items-center justify-center p-6 overflow-hidden animate-fade-in font-sans">

      {/* Top-left OmniConnect logo */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20">
        <span className="text-2xl font-black text-slate-900 tracking-tight">OmniConnect</span>
      </div>

      {/* Confetti particles falling across full screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {CONFETTI.map((p) => (
          <ConfettiParticle key={p.id} p={p} />
        ))}
      </div>

      {/* Central Congratulations Box with Real Selected Page */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-sm">
        {/* Real Page Avatar */}
        {selectedPage?.picture ? (
          <img
            src={selectedPage.picture}
            alt={selectedPage.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-200/80 border-2 border-slate-300/60 flex items-center justify-center shadow-sm">
            <span className="text-3xl font-bold text-slate-600">
              {selectedPage?.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        )}

        {/* Dynamic Heading with Real Page Name */}
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">
          Congratulations,<br />
          <span className="text-[#0066ff]">{selectedPage?.name || 'Your Facebook Page'}</span> is connected!
        </h1>

        {/* Let's Start CTA Button */}
        <button
          onClick={handleFinish}
          className="mt-2 px-10 py-3 bg-[#0066ff] hover:bg-[#0052cc] active:scale-95 text-white font-semibold rounded-lg text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
        >
          <span>Let&apos;s Start</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
