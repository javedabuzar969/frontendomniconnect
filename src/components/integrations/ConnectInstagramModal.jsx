// components/integrations/ConnectInstagramModal.jsx — Manychat-style Meta Instagram Connection Modal
import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Loader2,
  AlertCircle,
  Users,
  ChevronDown,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { InstagramIllustration } from '../ui/ChannelIllustrations';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

// ─── Official Meta Blue Infinity Loop Logo ──────────────────────────────────
export function MetaInfinityLogo({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <path
        d="M20.2 13.4C18.6 11 16.3 9.6 13.7 9.6C9.4 9.6 6 13.3 6 18C6 22.7 9.4 26.4 13.7 26.4C16.3 26.4 18.6 25 20.2 22.6C21.8 25 24.1 26.4 26.7 26.4C31 26.4 34.4 22.7 34.4 18C34.4 13.3 31 9.6 26.7 9.6C24.1 9.6 21.8 11 20.2 13.4ZM13.7 23.3C10.9 23.3 8.7 20.9 8.7 18C8.7 15.1 10.9 12.7 13.7 12.7C15.6 12.7 17.3 13.8 18.5 15.6C18.1 16.3 17.6 17.1 17 17.9C16.1 19.1 15.1 20.4 14.2 21.7C14 22 13.9 22.4 13.7 22.8C13.7 23 13.7 23.1 13.7 23.3ZM26.7 23.3C23.9 23.3 21.7 20.9 21.7 18C21.7 15.1 23.9 12.7 26.7 12.7C29.5 12.7 31.7 15.1 31.7 18C31.7 20.9 29.5 23.3 26.7 23.3Z"
        fill="#0064E0"
      />
    </svg>
  );
}

// ─── Instagram Camera Icon with Gradient ────────────────────────────────────
export function InstagramCameraIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-cam-grad" cx="20%" cy="100%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-cam-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

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
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Listen for popup postMessage from Meta OAuth callback
  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.type === 'IG_AUTH_SUCCESS' || event.data?.type === 'META_AUTH_SUCCESS') {
        const receivedState = event.data.state;
        if (receivedState) {
          setOauthState(receivedState);
          fetchInstagramAccounts(receivedState);
        }
      } else if (event.data?.type === 'IG_AUTH_ERROR' || event.data?.type === 'META_AUTH_ERROR') {
        setError(`Meta authorization failed: ${event.data.error || 'cancelled'}`);
        setStep('error');
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!isOpen && !isFullScreen) return null;

  // Launch Meta OAuth popup (Connect Via Meta)
  const handleStartOAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/oauth/start', {
        params: { format: 'json' },
      });

      const { oauthUrl, state } = res.data || {};
      if (!oauthUrl) throw new Error('No OAuth URL returned');

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
        window.location.href = oauthUrl;
        return;
      }

      setStep('waiting');

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setStep((currentStep) => {
            if (currentStep === 'waiting') {
              const savedState = sessionStorage.getItem('ig_oauth_state');
              if (savedState) fetchInstagramAccounts(savedState);
              return 'intro';
            }
            return currentStep;
          });
        }
      }, 900);
    } catch (err) {
      setError('Failed to start Meta authorization: ' + (err.response?.data?.error || err.message));
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Instagram accounts from Meta
  const fetchInstagramAccounts = async (state) => {
    setStep('waiting');
    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/accounts', {
        params: { state },
      });

      const accounts = res.data?.igAccounts || [];
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

  // Connect selected Instagram account
  const handleConnectAccount = async (accountToConnect) => {
    const acc = accountToConnect || selectedAccount;
    if (!acc) return;

    setLoading(true);
    setStep('connecting');
    setError(null);

    try {
      const res = await apiClient.post('/api/integrations/facebook/instagram/connect-account', {
        igUserId: acc.igUserId,
        state: oauthState,
      });

      const connected = res.data?.account || acc;
      setConnectedAccount(connected);

      // Re-fetch status from API
      try {
        await apiClient.get('/api/integrations/facebook/pages');
      } catch {}

      toast.success(`🎉 Instagram @${acc.igUsername} connected!`);
      setStep('success');
    } catch (err) {
      setError('Failed to connect: ' + (err.response?.data?.error || err.message));
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
          : 'rounded-2xl shadow-2xl w-full max-w-[500px] min-h-[520px]'
      } overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200 select-none relative p-6 sm:p-8`}
    >
      {/* Clean Close Button in Top-Right */}
      {!isFullScreen && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer z-10"
          title="Close"
        >
          <X size={18} />
        </button>
      )}

      {/* ── INTRO STEP: Exact Match to Manychat Reference ── */}
      {step === 'intro' && (
        <div className="flex-1 flex flex-col justify-between space-y-6 animate-fade-in">
          {/* Top Graphic + Heading */}
          <div className="text-center pt-2">
            <div className="flex justify-center mb-3 transform hover:scale-105 transition-transform duration-300">
              <InstagramIllustration className="w-28 h-28" />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Connect Instagram
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Use your Instagram account to connect to OmniConnect.
            </p>
          </div>

          {/* Action Box: "A few steps in" + "Connect Via Meta" */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                A few steps in
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We'll take you to Meta to connect. Just set your permissions, and your Instagram account will be linked to OmniConnect.
              </p>
            </div>

            <button
              onClick={handleStartOAuth}
              disabled={loading}
              className="w-full py-3 bg-[#0066ff] hover:bg-[#0052cc] active:bg-[#0047b3] text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
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

            {/* Meta Business Partner Trust Badge (Exact Manychat styling) */}
            <div className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
              <div className="text-[11px] text-slate-600 font-medium max-w-[200px] leading-snug">
                OmniConnect is a trusted Meta Business Partner
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <MetaInfinityLogo className="w-5 h-5 text-[#0064E0]" />
                <div className="text-left">
                  <span className="block font-bold text-[11px] leading-none text-slate-900">Meta</span>
                  <span className="text-[9px] text-slate-500 font-medium tracking-tight">Business Partner</span>
                </div>
              </div>
            </div>

            {/* See More Options Toggle */}
            <div className="pt-1 text-center">
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
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 space-y-1.5 animate-fade-in">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#0066ff]" />
                    <span>Requirements for Instagram:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500 leading-relaxed">
                    <li>Must be an Instagram <b>Business or Creator</b> account.</li>
                    <li>Connected to a <b>Facebook Page</b> you manage.</li>
                    <li>In Instagram app: <i>Settings &rarr; Privacy &rarr; Messages &rarr; Allow Access</i>.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── WAITING STEP ── */}
      {step === 'waiting' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-5 animate-fade-in">
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

          <div className="flex gap-2 w-full pt-2">
            <button
              onClick={handleStartOAuth}
              className="flex-1 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Re-open Meta Window
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── ACCOUNTS STEP ── */}
      {step === 'accounts' && (
        <div className="flex-1 flex flex-col justify-between space-y-4 animate-fade-in">
          <div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wide">
              Meta Authorized
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1.5">
              Select Instagram Account
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose the Instagram account you want to connect to OmniConnect:
            </p>
          </div>

          <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
            {igAccounts.map((acc) => (
              <div
                key={acc.igUserId}
                onClick={() => setSelectedAccount(acc)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  selectedAccount?.igUserId === acc.igUserId
                    ? 'border-[#0066ff] bg-[#f0f6ff] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {acc.profilePic ? (
                    <img
                      src={acc.profilePic}
                      alt={acc.igUsername}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#fdf497] via-[#fd5949] to-[#d6249f] flex items-center justify-center text-white shrink-0">
                      <InstagramCameraIcon className="w-5 h-5" />
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
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnectAccount(acc);
                  }}
                  disabled={loading}
                  className="px-3 py-1.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer shadow-2xs"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleConnectAccount(selectedAccount)}
            disabled={!selectedAccount || loading}
            className="w-full py-2.5 bg-[#0066ff] hover:bg-[#0052cc] disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
          >
            Connect @{selectedAccount?.igUsername || 'Selected Account'}
          </button>
        </div>
      )}

      {/* ── CONNECTING STEP ── */}
      {step === 'connecting' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in">
          <Loader2 className="w-10 h-10 text-[#0066ff] animate-spin mx-auto" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Connecting @{selectedAccount?.igUsername}...
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Subscribing DM webhooks and configuring unified inbox...
            </p>
          </div>
        </div>
      )}

      {/* ── SUCCESS STEP ── */}
      {step === 'success' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in">
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
              is now live in OmniConnect.
            </p>
          </div>

          <div className="w-full flex gap-2 pt-2">
            <button
              onClick={() => {
                onSuccess?.();
                onClose?.();
              }}
              className="w-full py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── ERROR STEP ── */}
      {step === 'error' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Connection Failed</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed whitespace-pre-line">
              {error}
            </p>
          </div>

          <div className="w-full flex gap-2 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
            >
              Try Again
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isFullScreen) return modalBody;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      {modalBody}
    </div>
  );
}
