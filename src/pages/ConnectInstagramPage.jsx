// pages/ConnectInstagramPage.jsx — Fullscreen Meta Instagram Connection Flow matching Manychat reference
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  Loader2,
  Check,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Users,
} from 'lucide-react';
import { InstagramIllustration } from '../components/ui/ChannelIllustrations';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';

// ─── Meta Blue Infinity Logo ────────────────────────────────────────────────
function MetaInfinityLogo({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <path
        d="M20.2 13.4C18.6 11 16.3 9.6 13.7 9.6C9.4 9.6 6 13.3 6 18C6 22.7 9.4 26.4 13.7 26.4C16.3 26.4 18.6 25 20.2 22.6C21.8 25 24.1 26.4 26.7 26.4C31 26.4 34.4 22.7 34.4 18C34.4 13.3 31 9.6 26.7 9.6C24.1 9.6 21.8 11 20.2 13.4ZM13.7 23.3C10.9 23.3 8.7 20.9 8.7 18C8.7 15.1 10.9 12.7 13.7 12.7C15.6 12.7 17.3 13.8 18.5 15.6C18.1 16.3 17.6 17.1 17 17.9C16.1 19.1 15.1 20.4 14.2 21.7C14 22 13.9 22.4 13.7 22.8C13.7 23 13.7 23.1 13.7 23.3ZM26.7 23.3C23.9 23.3 21.7 20.9 21.7 18C21.7 15.1 23.9 12.7 26.7 12.7C29.5 12.7 31.7 15.1 31.7 18C31.7 20.9 29.5 23.3 26.7 23.3Z"
        fill="#0064E0"
      />
    </svg>
  );
}

// ─── Instagram Official Gradient Camera Icon ────────────────────────────────
function InstagramGradientIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad-icon" cx="20%" cy="100%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad-icon)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

// ─── Confetti Particles (Manychat celebration) ──────────────────────────────
const CONFETTI = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  color: ['#0066ff', '#e1306c', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'][i % 6],
  left: `${(i * 17) % 96}%`,
  size: 6 + (i % 6) * 1.5,
  delay: `${(i % 10) * 0.2}s`,
  fallDuration: `${3 + (i % 4) * 0.6}s`,
}));

export default function ConnectInstagramPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // States: 'idle' | 'waiting' | 'accounts' | 'connecting' | 'success' | 'error'
  const [step, setStep] = useState('idle');
  const [oauthState, setOauthState] = useState(null);
  const [igAccounts, setIgAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // ── 1. Listen for Meta OAuth Popup Callback ───────────────────────────────
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data?.type === 'IG_AUTH_SUCCESS' || event.data?.type === 'META_AUTH_SUCCESS') {
        const receivedState = event.data.state;
        console.log('[Instagram Connect] Received OAuth success:', receivedState);
        if (receivedState) {
          setOauthState(receivedState);
          toast.success('🎉 Meta authorization approved! Discovering Instagram accounts...');
          await fetchInstagramAccounts(receivedState);
        }
      } else if (event.data?.type === 'IG_AUTH_ERROR' || event.data?.type === 'META_AUTH_ERROR') {
        setErrorMessage(event.data.error || 'Meta authorization was cancelled or denied.');
        setStep('error');
        setLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // ── 2. Check URL searchParams on redirect fallback ─────────────────────────
  useEffect(() => {
    const stateParam = searchParams.get('state');
    const oauthParam = searchParams.get('oauth');
    if (stateParam && oauthParam === 'success') {
      setOauthState(stateParam);
      fetchInstagramAccounts(stateParam);
    }
  }, [searchParams]);

  // ── 3. Launch Meta OAuth Popup (Connect Via Meta) ──────────────────────────
  const handleLaunchMetaOAuth = async () => {
    setLoading(true);
    setErrorMessage(null);
    setStep('waiting');

    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/oauth/start', {
        params: { format: 'json' },
      });

      const { oauthUrl, state } = res.data || {};
      if (!oauthUrl) {
        throw new Error('Failed to obtain Meta OAuth URL');
      }

      setOauthState(state);
      sessionStorage.setItem('ig_oauth_state', state);

      const width = 640;
      const height = 760;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        oauthUrl,
        'MetaInstagramOAuth',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
      );

      if (!popup) {
        // Fallback: If popup is blocked by browser, redirect directly
        window.location.href = oauthUrl;
        return;
      }

      // Check if popup was closed by user
      const popupWatcher = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupWatcher);
          setLoading(false);
          // If still waiting, check session state to recover
          setStep((cur) => {
            if (cur === 'waiting') {
              const savedState = sessionStorage.getItem('ig_oauth_state');
              if (savedState) fetchInstagramAccounts(savedState);
              return 'idle';
            }
            return cur;
          });
        }
      }, 900);
    } catch (err) {
      console.error('[Instagram OAuth Error]:', err);
      setErrorMessage(err.response?.data?.error || err.message || 'Failed to start Meta authorization');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  // ── 4. Fetch Instagram accounts discovered from Meta ───────────────────────
  const fetchInstagramAccounts = async (state) => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/accounts', {
        params: { state },
      });

      const accounts = res.data?.igAccounts || [];
      if (accounts.length === 0) {
        setErrorMessage(
          'No Instagram Professional accounts found linked to your authorized Facebook Pages.'
        );
        setStep('error');
        return;
      }

      setIgAccounts(accounts);
      setSelectedAccount(accounts[0]);
      setStep('accounts');
    } catch (err) {
      console.error('[Fetch Accounts Error]:', err);
      setErrorMessage(err.response?.data?.error || err.message || 'Failed to retrieve Instagram accounts');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  // ── 5. Connect Selected Instagram Account ──────────────────────────────────
  const handleConnectSelectedAccount = async (accountToConnect) => {
    const acc = accountToConnect || selectedAccount;
    if (!acc) return;

    setLoading(true);
    setStep('connecting');
    setErrorMessage(null);

    try {
      const res = await apiClient.post('/api/integrations/facebook/instagram/connect-account', {
        igUserId: acc.igUserId,
        state: oauthState,
      });

      const connected = res.data?.account || acc;
      setConnectedAccount(connected);

      // Persist local state
      localStorage.setItem('omni_instagram_connected', 'true');
      localStorage.setItem('omni_instagram_account', `@${acc.igUsername}`);
      if (acc.pageId) localStorage.setItem('omni_instagram_page_id', acc.pageId);
      if (acc.igUserId) localStorage.setItem('omni_instagram_ig_id', acc.igUserId);

      toast.success(`🎉 Instagram @${acc.igUsername} connected successfully!`);
      setStep('success');
    } catch (err) {
      console.error('[Connect Account Error]:', err);
      setErrorMessage(err.response?.data?.error || err.message || 'Failed to connect Instagram account');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row relative overflow-hidden font-sans select-none">
      {/* Confetti Animation when Connected */}
      {step === 'success' && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {CONFETTI.map((p) => (
            <div
              key={p.id}
              className="absolute top-0 rounded-xs animate-bounce"
              style={{
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size * 1.5}px`,
                backgroundColor: p.color,
                animationDuration: p.fallDuration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* LEFT SECTION (Matching Manychat Screenshot 1)                        */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-14 lg:p-20 relative bg-white min-h-[420px] md:min-h-screen">
        {/* Top: App Brand Name */}
        <div>
          <span className="font-extrabold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
            OmniConnect
          </span>
        </div>

        {/* Center: Vector Illustration & Big Bold Title */}
        <div className="my-auto py-8">
          <div className="mb-4 transform transition-transform hover:scale-105 duration-300 inline-block">
            <InstagramIllustration className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Connect Instagram
          </h1>

          <p className="text-slate-500 text-sm sm:text-base mt-2.5 font-normal max-w-sm leading-relaxed">
            Use your Instagram account to connect to OmniConnect.
          </p>
        </div>

        {/* Bottom: Back button */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/settings?tab=instagram')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* RIGHT SECTION (Interactive Flow matching Manychat Screenshot 1 & 2)  */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 border-t md:border-t-0 md:border-l border-slate-100 bg-white">
        <div className="w-full max-w-[420px] mx-auto">
          {/* ── State 1: Idle (Initial State matching Screenshot 1) ── */}
          {step === 'idle' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  A few steps in
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                  We'll take you to Meta to connect. Just set your permissions, and your Instagram account will be linked to OmniConnect.
                </p>
              </div>

              {/* Big Blue CTA Button */}
              <button
                type="button"
                onClick={handleLaunchMetaOAuth}
                disabled={loading}
                className="w-full py-3 sm:py-3.5 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Opening Meta...</span>
                  </>
                ) : (
                  <span>Connect Via Meta</span>
                )}
              </button>

              {/* Meta Business Partner Trust Badge (Exact match to Screenshot 1) */}
              <div className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-2xs">
                <div className="text-[11px] sm:text-xs text-slate-600 font-medium max-w-[190px] leading-snug">
                  OmniConnect is a trusted Meta Business Partner
                </div>
                <div className="flex items-center gap-1.5 text-slate-800">
                  <MetaInfinityLogo className="w-5 h-5" />
                  <div className="text-left">
                    <span className="block font-bold text-[12px] leading-none text-slate-900">Meta</span>
                    <span className="text-[9px] text-slate-500 font-medium tracking-tight">Business Partner</span>
                  </div>
                </div>
              </div>

              {/* See More Options Accordion */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowMoreOptions((v) => !v)}
                  className="text-xs text-[#0066ff] hover:underline cursor-pointer inline-flex items-center gap-1 font-medium"
                >
                  <span>See More Options</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showMoreOptions ? 'rotate-180' : ''}`}
                  />
                </button>

                {showMoreOptions && (
                  <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 space-y-2.5 animate-fade-in">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#0066ff]" />
                      <span>Requirements for Instagram Connection:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-500 leading-relaxed">
                      <li>
                        Your Instagram account must be a <b>Professional (Business or Creator)</b> account.
                      </li>
                      <li>
                        It must be connected to a <b>Facebook Page</b> where you are an admin.
                      </li>
                      <li>
                        In Instagram Mobile App: Go to <i>Settings &rarr; Privacy &rarr; Messages</i> and ensure <b>"Allow Access to Messages"</b> is ON.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── State 2: Waiting for Meta Popup Authorization ── */}
          {step === 'waiting' && (
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#0066ff]/20 border-t-[#0066ff] animate-spin" />
                <MetaInfinityLogo className="w-8 h-8 text-[#0064E0]" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Connecting with Meta...</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Please complete the authorization in the Meta popup window and grant permissions to your Instagram account.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 text-left space-y-1">
                <div className="font-semibold text-slate-700">Don't see the popup window?</div>
                <p>Check if your browser blocked popups, or click the button below to re-open.</p>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={handleLaunchMetaOAuth}
                  className="flex-1 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-2xs"
                >
                  Re-open Meta Window
                </button>
                <button
                  type="button"
                  onClick={() => setStep('idle')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ── State 3: Discovered Instagram Accounts ── */}
          {step === 'accounts' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wide">
                  Meta Authorized
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1.5">
                  Select Instagram Account
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose the Instagram account you want to connect to your OmniConnect workspace:
                </p>
              </div>

              <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                {igAccounts.map((acc) => (
                  <div
                    key={acc.igUserId}
                    onClick={() => setSelectedAccount(acc)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedAccount?.igUserId === acc.igUserId
                        ? 'border-[#0066ff] bg-[#f0f6ff] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {acc.profilePic ? (
                        <img
                          src={acc.profilePic}
                          alt={acc.igUsername}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#fdf497] via-[#fd5949] to-[#d6249f] flex items-center justify-center text-white shrink-0">
                          <InstagramGradientIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          @{acc.igUsername}
                        </div>
                        {acc.pageName && (
                          <div className="text-[11px] text-slate-500 truncate">
                            Linked: {acc.pageName}
                          </div>
                        )}
                        {acc.followersCount !== undefined && (
                          <div className="text-[10px] text-slate-400">
                            {Number(acc.followersCount).toLocaleString()} followers
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnectSelectedAccount(acc);
                      }}
                      disabled={loading}
                      className="px-3.5 py-1.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors shadow-2xs"
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleConnectSelectedAccount(selectedAccount)}
                disabled={loading || !selectedAccount}
                className="w-full py-3 bg-[#0066ff] hover:bg-[#0052cc] disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>Connect @{selectedAccount?.igUsername || 'Selected'}</span>
              </button>
            </div>
          )}

          {/* ── State 4: Connecting Account ── */}
          {step === 'connecting' && (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <Loader2 className="w-10 h-10 text-[#0066ff] animate-spin mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Connecting @{selectedAccount?.igUsername}...
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Subscribing Instagram webhooks and configuring unified inbox...
                </p>
              </div>
            </div>
          )}

          {/* ── State 5: Success ── */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <Check size={28} strokeWidth={2.5} />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Instagram Connected! 🎉
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your Instagram account{' '}
                  <span className="font-bold text-slate-800">
                    @{connectedAccount?.igUsername || selectedAccount?.igUsername}
                  </span>{' '}
                  is now linked and synced with OmniConnect.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Webhooks & Direct Messaging Active</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/inbox')}
                  className="flex-1 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                >
                  Open Inbox
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/settings?tab=instagram')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Go to Settings
                </button>
              </div>
            </div>
          )}

          {/* ── State 6: Error / No Accounts ── */}
          {step === 'error' && (
            <div className="space-y-4 text-center py-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle size={24} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Unable to Connect Instagram
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  {errorMessage || 'No eligible Instagram Professional accounts found.'}
                </p>
              </div>

              {/* Troubleshooting Card */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left text-[11px] text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-800">How to fix this:</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                  <li>In Instagram mobile app: Switch to a <b>Business</b> or <b>Creator</b> account.</li>
                  <li>Link your Instagram account to a <b>Facebook Page</b> you manage.</li>
                  <li>When Meta popup opens, ensure all permissions are checked.</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleLaunchMetaOAuth}
                  className="flex-1 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                >
                  Try Again via Meta
                </button>
                <button
                  type="button"
                  onClick={() => setStep('idle')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
