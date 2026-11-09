// pages/ConnectFacebookPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Check,
  RefreshCw,
  ExternalLink,
  HelpCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { MessengerIllustration } from '../components/ui/ChannelIllustrations';
import { MessengerBrandIcon, InstagramIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';

// Confetti pieces matching Screenshot 4
const CONFETTI_PIECES = Array.from({ length: 65 }).map((_, i) => {
  const colors = [
    '#0066ff',
    '#f59e0b',
    '#10b981',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#ea580c',
    '#1e293b',
    '#f43f5e',
    '#84cc16',
  ];
  const shapes = ['rect', 'square', 'circle', 'ribbon'];
  const shape = shapes[i % shapes.length];
  const color = colors[i % colors.length];
  const top = `${(i * 17) % 95}%`;
  const left = `${(i * 23 + (i % 7) * 11) % 96}%`;
  const size = 6 + (i % 8) * 2;
  const rotate = `${(i * 47) % 360}deg`;
  const delay = `${(i % 10) * 0.2}s`;

  return { id: i, shape, color, top, left, size, rotate, delay };
});

export default function ConnectFacebookPage() {
  const navigate = useNavigate();

  // Flow Steps:
  // 1: Connect Facebook Page (Screenshot 2)
  // 2: Pricing / Plan Selection (Screenshot 3)
  // 3: Congratulations Screen (Screenshot 4)
  const [step, setStep] = useState(1);
  const [connectingPage, setConnectingPage] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('annually'); // 'monthly' | 'annually'
  const [connectedPageName, setConnectedPageName] = useState('Hallwala');

  // Available Pages (Matching Screenshot 2)
  const [pagesList, setPagesList] = useState([
    {
      id: 'page_orig_shoe',
      name: 'Original Shoe Company',
      connected: true,
      iconType: 'shoe',
    },
    {
      id: 'page_hallwala',
      name: 'Hallwala',
      connected: false,
      iconType: 'question',
    },
  ]);

  // Handle Connecting "Hallwala" (Transition from Step 1 to Step 2)
  const handleConnectPage = (page) => {
    setConnectingPage(page.id);
    setTimeout(() => {
      setConnectingPage(null);
      setConnectedPageName(page.name);
      setPagesList((prev) =>
        prev.map((p) => (p.id === page.id ? { ...p, connected: true } : p))
      );
      // Advance to Step 2 (Pricing Screen)
      setStep(2);
    }, 600);
  };

  // Handle Plan Selection (Transition from Step 2 to Step 3)
  const handleSelectPlan = (planName) => {
    toast.success(`Selected plan: ${planName}`);
    setStep(3);
  };

  // Handle "Let's Start" from Congratulations Screen
  const handleFinishConnection = () => {
    try {
      localStorage.setItem('omni_facebook_connected', 'true');
      localStorage.setItem('omni_facebook_page', connectedPageName);
    } catch (e) {
      console.warn(e);
    }
    toast.success(`🎉 ${connectedPageName} is successfully connected!`);
    navigate('/settings?tab=messenger');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* STEP 1: CONNECT FACEBOOK PAGE (Matching Screenshot 2)         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 animate-fade-in">
          {/* Top Logo */}
          <div className="mb-4">
            <span className="text-2xl font-black text-slate-900 tracking-tight">Manychat</span>
          </div>

          {/* Main Two-Column Split Layout matching Screenshot 2 */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-6xl w-full mx-auto py-6">
            
            {/* Left Column: Graphic & Heading */}
            <div className="lg:col-span-5 flex flex-col items-start space-y-6">
              {/* Illustration matching Screenshot 2 */}
              <div className="w-56 h-56 -ml-4">
                <MessengerIllustration className="w-full h-full" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Connect<br />Facebook Page
                </h1>
                <p className="text-sm text-slate-500 mt-3 max-w-sm leading-relaxed">
                  Follow the instruction to create your first Messenger automation.
                </p>
              </div>
            </div>

            {/* Right Column: Managed Pages List */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                  We found {pagesList.length} Facebook Pages managed by you.
                </h2>
              </div>

              {/* Pages List Box */}
              <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                {pagesList.map((p) => (
                  <div
                    key={p.id}
                    className="py-5 flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Page Avatar / Icon matching Screenshot 2 */}
                      {p.iconType === 'shoe' ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-1.5 shrink-0 shadow-2xs">
                          {/* Sneaker silhouette */}
                          <svg className="w-7 h-5 text-slate-800" viewBox="0 0 24 16" fill="currentColor">
                            <path d="M22 10c-1-2-3-4-6-4h-4l-3-3H4c-1 0-2 1-2 2v8c0 1 1 2 2 2h17c1 0 2-1 2-2v-2l-1-1zm-6-2c2 0 4 1 5 2l-3 1-2-3z" />
                          </svg>
                          <span className="text-[7px] font-bold text-slate-600 tracking-tighter truncate w-full text-center">
                            ORIGINAL
                          </span>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl shrink-0 shadow-2xs">
                          <span>?</span>
                        </div>
                      )}

                      <span className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                        {p.name}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div>
                      {p.connected ? (
                        <button
                          disabled
                          className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-400 font-semibold rounded-lg text-xs sm:text-sm cursor-not-allowed shadow-2xs"
                        >
                          Connected
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConnectPage(p)}
                          disabled={connectingPage === p.id}
                          className="px-6 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold rounded-lg text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2"
                        >
                          {connectingPage === p.id ? (
                            <>
                              <RefreshCw size={14} className="animate-spin" />
                              <span>Connecting...</span>
                            </>
                          ) : (
                            <span>Connect</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Helper Links matching Screenshot 2 */}
              <div className="flex items-center gap-6 text-xs sm:text-sm text-[#0066ff] font-medium flex-wrap pt-2">
                <button
                  onClick={() => toast('Checking permissions with Meta...')}
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
                  onClick={() => toast.success('Page list refreshed')}
                  className="hover:underline cursor-pointer"
                >
                  Refresh Page list
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Back Button matching Screenshot 2 */}
          <div className="pt-6">
            <button
              onClick={() => navigate('/settings?tab=messenger')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0066ff] hover:underline cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STEP 2: PRICING & PLAN SELECTION (Matching Screenshot 3)      */}
      {/* ───────────────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="min-h-screen bg-[#faf5ff]/40 py-10 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center animate-fade-in">
          
          {/* Heading */}
          <div className="text-center space-y-4 max-w-2xl mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight">
              1M+ Creators love Manychat. Now it&apos;s your turn.
            </h1>

            {/* Toggle: Monthly | Annually (up to 30% off) matching Screenshot 3 */}
            <div className="inline-flex items-center p-1 bg-purple-100/70 rounded-full text-xs font-semibold">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-purple-700 hover:text-purple-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annually')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  billingPeriod === 'annually'
                    ? 'bg-[#7c3aed] text-white shadow-2xs font-bold'
                    : 'text-purple-700 hover:text-purple-900'
                }`}
              >
                Annually (up to 30% off)
              </button>
            </div>
          </div>

          {/* 5 Plan Cards Grid matching Screenshot 3 */}
          <div className="w-full max-w-[1360px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-8 items-stretch">
            
            {/* Card 1: Free */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="text-center pb-2">
                  <h3 className="font-bold text-slate-900 text-lg">Free</h3>
                  <p className="text-slate-500 text-xs mt-1 min-h-[32px]">
                    Automate, save time, stay connected
                  </p>
                  <div className="text-3xl font-extrabold text-slate-900 mt-4">$0</div>
                  <div className="text-xs font-bold text-slate-800 mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1">
                    <span>25</span>
                    <span className="font-normal text-slate-500">Active Contacts/mo</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('Free')}
                  className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  Continue with Free
                </button>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span>• 2 channels</span>
                    <span className="flex items-center gap-0.5">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <MessengerBrandIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>• Basic automations (up to 4 active automations)</div>
                  <div className="flex items-center gap-1">
                    <span>• 1 user</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Basic unified Inbox</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Self-serve Support</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Manychat branding</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Essential */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="text-center pb-2">
                  <h3 className="font-bold text-slate-900 text-lg">Essential</h3>
                  <p className="text-slate-500 text-xs mt-1 min-h-[32px]">
                    Keep fans and community engaged
                  </p>
                  <div className="text-3xl font-extrabold text-slate-900 mt-4">$14</div>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    per month (18% off)<br />Annually at $168
                  </p>
                  <div className="text-xs font-bold text-slate-800 mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1">
                    <span>250</span>
                    <span className="font-normal text-slate-500">Active Contacts/mo</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('Essential')}
                  className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  Try free for 14 days
                </button>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span>• 2 channels</span>
                    <span className="flex items-center gap-0.5">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <MessengerBrandIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>• Unlimited custom automations</div>
                  <div className="flex items-center gap-1">
                    <span>• 2 users</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Basic Inbox + organization and reminders</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Email Support</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• No Manychat branding</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Pro + AI (Featured Card matching Screenshot 3) */}
            <div className="relative bg-white border-2 border-[#7c3aed] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-lg transform -translate-y-1">
              {/* Most popular Purple Header Pill matching Screenshot 3 */}
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="px-3.5 py-1 bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs">
                  Most popular
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="text-center pb-2">
                  <h3 className="font-extrabold text-[#7c3aed] text-lg flex items-center justify-center gap-1">
                    <span>Pro</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                      + AI
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 min-h-[32px]">
                    The &ldquo;not a side hustle anymore&rdquo; plan
                  </p>
                  <div className="text-3xl font-extrabold text-slate-900 mt-4">$29</div>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    per month (25% off)<br />Annually at $348
                  </p>
                  <div className="text-xs font-bold text-slate-800 mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1">
                    <span>2500</span>
                    <span className="font-normal text-slate-500">Active Contacts/mo</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('Pro + AI')}
                  className="w-full py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  Try free for 14 days
                </button>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span>• 3 channels</span>
                    <span className="flex items-center gap-0.5">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <MessengerBrandIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>• Advanced automations, Broadcasts and AI-driven convos</div>
                  <div className="flex items-center gap-1">
                    <span>• 3 users</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Custom Inbox labels and rules</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• AI</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Email Support</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• No Manychat branding</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Business + AI */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="text-center pb-2">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center justify-center gap-1">
                    <span>Business</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                      + AI
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 min-h-[32px]">
                    Built for business - solo creators or teams
                  </p>
                  <div className="text-3xl font-extrabold text-slate-900 mt-4">$69</div>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    per month (30% off)<br />Annually at $828
                  </p>
                  <div className="text-xs font-bold text-slate-800 mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1">
                    <span>7500</span>
                    <span className="font-normal text-slate-500">Active Contacts/mo</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('Business + AI')}
                  className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  Get started
                </button>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div>• Unlimited channels</div>
                  <div>• Advanced automations, Broadcasts and AI-driven convos</div>
                  <div className="flex items-center gap-1">
                    <span>• 5 users</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Shared team Inbox and assignments</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• AI</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Priority Support</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• No Manychat branding</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Advanced + AI */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="text-center pb-2">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center justify-center gap-1">
                    <span>Advanced</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                      + AI
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 min-h-[32px]">
                    Big boss energy, more advanced tools
                  </p>
                  <div className="text-3xl font-extrabold text-slate-900 mt-4">$139</div>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    per month (30% off)<br />Annually at $1,668
                  </p>
                  <div className="text-xs font-bold text-slate-800 mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1">
                    <span>25000</span>
                    <span className="font-normal text-slate-500">Active Contacts/mo</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('Advanced + AI')}
                  className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  Get started
                </button>

                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div>• Unlimited channels</div>
                  <div>• Advanced automations, Broadcasts and AI-driven convos</div>
                  <div className="flex items-center gap-1">
                    <span>• 10 users</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Shared team Inbox and assignments</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• AI</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• Priority Support</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>• No Manychat branding</span>
                    <HelpCircle size={11} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Link matching Screenshot 3 */}
          <div className="text-center text-xs text-slate-500">
            <span>Need a deep dive? </span>
            <button
              onClick={() => toast('Opening plan comparison table...')}
              className="text-[#0066ff] hover:underline font-semibold cursor-pointer"
            >
              View plan comparison table
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STEP 3: CONGRATULATIONS CONFETTI SCREEN (Screenshot 4)        */}
      {/* ───────────────────────────────────────────────────────────── */}
      {step === 3 && (
        <div className="relative min-h-screen w-full bg-[#fbfbfb] flex flex-col items-center justify-center p-6 overflow-hidden animate-fade-in">
          
          {/* Top Left Brand Logo matching Screenshot 4 */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20">
            <span className="text-2xl font-black text-slate-900 tracking-tight">Manychat</span>
          </div>

          {/* Falling Floating Confetti particles matching Screenshot 4 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {CONFETTI_PIECES.map((p) => (
              <div
                key={p.id}
                className="absolute animate-bounce"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: p.shape === 'rect' ? `${p.size * 2}px` : `${p.size}px`,
                  backgroundColor: p.color,
                  borderRadius: p.shape === 'circle' ? '9999px' : '2px',
                  transform: `rotate(${p.rotate})`,
                  opacity: 0.85,
                  animationDuration: `${3 + (p.id % 4)}s`,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Central Congratulations Box matching Screenshot 4 */}
          <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-6">
            
            {/* Avatar / Placeholder circle with '?' */}
            <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-3xl shadow-sm">
              <span>?</span>
            </div>

            {/* Congratulations Heading matching Screenshot 4 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Congratulations,<br />
              {connectedPageName} is connected!
            </h1>

            {/* Let's Start Blue Button matching Screenshot 4 */}
            <div className="pt-2">
              <button
                onClick={handleFinishConnection}
                className="px-8 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold rounded-lg text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Let&apos;s Start
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
