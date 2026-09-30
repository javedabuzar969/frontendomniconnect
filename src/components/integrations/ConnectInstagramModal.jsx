// components/integrations/ConnectInstagramModal.jsx — Proper Meta OAuth for Instagram DM
import React, { useState, useEffect } from 'react';
import { X, Lock, RotateCw, ChevronDown, Check, Loader2, AlertCircle, Users } from 'lucide-react';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

// Official Instagram Camera Icon with gradient
export function InstagramCameraIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-pill-grad" cx="20%" cy="100%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-pill-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

// Official Meta Blue Infinity Loop Logo
export function MetaInfinityLogo({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <path
        d="M20.2 13.4C18.6 11 16.3 9.6 13.7 9.6C9.4 9.6 6 13.3 6 18C6 22.7 9.4 26.4 13.7 26.4C16.3 26.4 18.6 25 20.2 22.6C21.8 25 24.1 26.4 26.7 26.4C31 26.4 34.4 22.7 34.4 18C34.4 13.3 31 9.6 26.7 9.6C24.1 9.6 21.8 11 20.2 13.4ZM13.7 23.3C10.9 23.3 8.7 20.9 8.7 18C8.7 15.1 10.9 12.7 13.7 12.7C15.6 12.7 17.3 13.8 18.5 15.6C18.1 16.3 17.6 17.1 17 17.9C16.1 19.1 15.1 20.4 14.2 21.7C14 22 13.9 22.4 13.7 22.8C13.7 23 13.7 23.1 13.7 23.3ZM26.7 23.3C23.9 23.3 21.7 20.9 21.7 18C21.7 15.1 23.9 12.7 26.7 12.7C29.5 12.7 31.7 15.1 31.7 18C31.7 20.9 29.5 23.3 26.7 23.3Z"
        fill="#0064E0"
      />
    </svg>
  );
}

// Instagram Cursive Script Logo
export function InstagramScriptWordmark({ className = 'h-11' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        style={{
          fontFamily: "'Brush Script MT', 'Grand Hotel', 'Billabong', cursive, sans-serif",
          fontSize: '44px',
          fontWeight: '500',
          letterSpacing: '-1px',
          color: '#262626',
        }}
      >
        Instagram
      </span>
    </div>
  );
}

// ── STEPS ───────────────────────────────────────────────────────────────────
// 'intro'      → Step 1: Show "Connect with Instagram" button
// 'waiting'    → Step 2: OAuth popup open, waiting for postMessage
// 'accounts'   → Step 3: Show found Instagram accounts, user selects one
// 'connecting' → Step 4: Connecting selected account
// 'success'    → Step 5: Connected!
// 'error'      → Error state

export default function ConnectInstagramModal({
  isOpen,
  onClose,
  onSuccess,
  isFullScreen = false,
}) {
  const [step, setStep] = useState('intro');
  const [oauthState, setOauthState] = useState(null);
  const [igAccounts, setIgAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Listen for popup postMessage from OAuth callback
  useEffect(() => {
    function handleMessage(event) {
      // Accept messages from backend origin or same origin
      if (event.data?.type === 'IG_AUTH_SUCCESS') {
        const { state: receivedState, igCount } = event.data;
        console.log('[Instagram OAuth] Popup success:', receivedState, 'accounts:', igCount);
        setOauthState(receivedState);
        fetchInstagramAccounts(receivedState);
      } else if (event.data?.type === 'IG_AUTH_ERROR') {
        setError(`Instagram authorization failed: ${event.data.error || 'cancelled'}`);
        setStep('error');
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Also handle URL params when redirected (non-popup fallback)
  useEffect(() => {
    if (!isOpen && !isFullScreen) return;
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const oauth = params.get('oauth');
    if (state && oauth === 'success') {
      setOauthState(state);
      fetchInstagramAccounts(state);
    }
  }, [isOpen, isFullScreen]);

  if (!isOpen && !isFullScreen) return null;

  // Step 1: Start Instagram OAuth via backend
  const handleStartOAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get OAuth URL from backend
      const res = await apiClient.get('/api/integrations/facebook/instagram/oauth/start', {
        params: { format: 'json' },
      });

      const { oauthUrl, state } = res.data;
      setOauthState(state);

      // Open OAuth popup
      const width = 600;
      const height = 750;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        oauthUrl,
        'InstagramMetaOAuth',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
      );

      if (!popup) {
        // Popup blocked — redirect instead
        window.location.href = oauthUrl;
        return;
      }

      setStep('waiting');
    } catch (err) {
      setError('Failed to start Instagram OAuth: ' + (err.response?.data?.error || err.message));
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  // Step 2→3: Fetch Instagram accounts after OAuth
  const fetchInstagramAccounts = async (state) => {
    setStep('waiting');
    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/accounts', {
        params: { state },
      });

      const accounts = res.data.igAccounts || [];

      if (accounts.length === 0) {
        setError(
          'No Instagram Professional accounts found linked to your Facebook Pages.\n\n' +
          'Make sure your Instagram account is:\n• A Business or Creator account\n• Linked to a Facebook Page'
        );
        setStep('error');
        return;
      }

      setIgAccounts(accounts);
      setSelectedAccount(accounts[0]);
      setStep('accounts');
    } catch (err) {
      setError('Failed to load Instagram accounts: ' + (err.response?.data?.error || err.message));
      setStep('error');
    }
  };

  // Step 3→4: Connect selected Instagram account
  const handleConnectAccount = async () => {
    if (!selectedAccount) return;
    setLoading(true);
    setStep('connecting');
    setError(null);

    try {
      const res = await apiClient.post('/api/integrations/facebook/instagram/connect-account', {
        igUserId: selectedAccount.igUserId,
        state: oauthState,
      });

      setConnectedAccount(res.data.account);
      localStorage.setItem('omni_instagram_connected', 'true');
      localStorage.setItem('omni_instagram_account', `@${selectedAccount.igUsername}`);
      toast.success(`🎉 Instagram @${selectedAccount.igUsername} connected!`);
      setStep('success');
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      setError('Failed to connect: ' + msg);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('intro');
    setError(null);
    setOauthState(null);
    setIgAccounts([]);
    setSelectedAccount(null);
  };

  const modalBody = (
    <div
      className={`bg-white ${
        isFullScreen
          ? 'min-h-screen w-full'
          : 'rounded-2xl shadow-2xl w-full max-w-[540px] sm:max-w-[580px] min-h-[580px]'
      } overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200 select-none relative`}
    >
      {/* ── Chrome Window Header ── */}
      <div className="bg-[#dee1e6] border-b border-[#c8ccd3] px-3 pt-2 pb-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-[85%]">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-t-lg text-[11px] text-slate-700 font-medium shadow-2xs truncate">
              <InstagramCameraIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {step === 'success'
                  ? 'Instagram Connected ✓'
                  : step === 'accounts'
                  ? `Instagram — ${igAccounts.length} account(s) found`
                  : '(4) Instagram — Google Chrome'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isFullScreen && onClose && (
              <button
                onClick={onClose}
                className="w-5 h-5 rounded-full hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-black transition-colors cursor-pointer"
                title="Close"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-[#c1c5cd] text-xs text-slate-600 shadow-2xs">
          <Lock size={12} className="text-emerald-600 shrink-0" />
          <span className="truncate flex-1 font-mono text-[11px] text-slate-700 select-text">
            instagram.com/oauth/oidc/?redirect_uri=https%3A%2F%2Fbusiness.facebook.com...
          </span>
          <RotateCw size={12} className="text-slate-400 shrink-0" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* INTRO STEP */}
        {step === 'intro' && (
          <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-14 bg-white text-center">
            <div className="w-full max-w-[380px] flex flex-col items-center">
              <h1 className="text-xl sm:text-[23px] font-bold text-[#1c2b33] tracking-tight leading-snug mb-3">
                Connect Instagram DMs
              </h1>
              <p className="text-sm text-slate-500 mb-9 max-w-[300px] leading-relaxed">
                Receive and reply to Instagram Direct Messages from your inbox. Requires a Business or Creator account linked to a Facebook Page.
              </p>

              <button
                onClick={handleStartOAuth}
                disabled={loading}
                className="w-full py-2.5 px-6 bg-white hover:bg-slate-50 active:bg-slate-100 border border-[#dadde1] hover:border-slate-400 text-[#1c1e21] font-semibold text-sm rounded-full transition-all shadow-2xs flex items-center justify-center gap-3 cursor-pointer group hover:shadow-xs active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <InstagramCameraIcon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
                )}
                <span className="tracking-tight">Continue with Instagram</span>
              </button>

              <div className="mt-7 flex items-center justify-center gap-1.5 text-[#1c2b33] font-bold text-sm">
                <MetaInfinityLogo className="w-5 h-5" />
                <span className="tracking-tight">Meta</span>
              </div>

              <p className="text-[11px] text-slate-400 mt-10 max-w-[280px] leading-relaxed">
                You'll be redirected to Meta's official login. OmniConnect never stores your Instagram password.
              </p>
            </div>
          </div>
        )}

        {/* WAITING STEP */}
        {step === 'waiting' && (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Waiting for Instagram authorization...</h3>
              <p className="text-sm text-slate-500">Complete the login in the popup window that opened.</p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer mt-2"
            >
              Cancel and try again
            </button>
          </div>
        )}

        {/* ACCOUNTS STEP */}
        {step === 'accounts' && (
          <div className="flex-1 flex flex-col p-6 sm:p-8 bg-white">
            <div className="w-full max-w-[400px] mx-auto">
              <div className="mb-6 text-center">
                <InstagramScriptWordmark />
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Select Instagram Account
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {igAccounts.length} account{igAccounts.length !== 1 ? 's' : ''} found linked to your Facebook Pages
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {igAccounts.map((acc) => (
                  <button
                    key={acc.igUserId}
                    onClick={() => setSelectedAccount(acc)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                      selectedAccount?.igUserId === acc.igUserId
                        ? 'border-[#E1306C] bg-pink-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {acc.igProfilePicture ? (
                      <img
                        src={acc.igProfilePicture}
                        alt={acc.igUsername}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">
                          {(acc.igUsername || '?')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">@{acc.igUsername}</p>
                      <p className="text-xs text-slate-500 truncate">
                        Linked to: {acc.linkedPageName}
                      </p>
                      {acc.igFollowers > 0 && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Users size={10} />
                          {acc.igFollowers.toLocaleString()} followers
                        </p>
                      )}
                    </div>
                    {selectedAccount?.igUserId === acc.igUserId && (
                      <Check className="w-5 h-5 text-[#E1306C] shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handleConnectAccount}
                disabled={!selectedAccount || loading}
                className="w-full py-2.5 px-4 bg-[#E1306C] hover:bg-[#c1265c] active:bg-[#a81f4e] text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <InstagramCameraIcon className="w-4 h-4" />
                    Connect @{selectedAccount?.igUsername || 'account'}
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="w-full mt-2.5 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* CONNECTING STEP */}
        {step === 'connecting' && (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Connecting Instagram...</h3>
              <p className="text-sm text-slate-500">Subscribing to DM webhooks and saving account.</p>
            </div>
          </div>
        )}

        {/* SUCCESS STEP */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Instagram Connected! 🎉</h3>
              <p className="text-sm text-slate-500">
                @{connectedAccount?.igUsername || selectedAccount?.igUsername} is now connected.
                <br />You'll receive DMs in your inbox.
              </p>
            </div>
            <button
              onClick={() => { onSuccess?.(); onClose?.(); }}
              className="px-6 py-2.5 bg-[#E1306C] hover:bg-[#c1265c] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Go to Inbox
            </button>
          </div>
        )}

        {/* ERROR STEP */}
        {step === 'error' && (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Connection Failed</h3>
              <p className="text-sm text-slate-500 whitespace-pre-line max-w-[320px] leading-relaxed">
                {error}
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-[#E1306C] hover:bg-[#c1265c] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {['Meta', 'About', 'Blog', 'Help', 'API', 'Privacy', 'Terms', 'Instagram Lite', 'Meta Verified'].map((link) => (
              <span key={link} className="hover:underline cursor-pointer">{link}</span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-1.5 text-slate-300">
            <span className="flex items-center gap-1 cursor-pointer">English <ChevronDown size={9} /></span>
            <span>© 2026 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullScreen) return modalBody;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
    >
      {modalBody}
    </div>
  );
}
