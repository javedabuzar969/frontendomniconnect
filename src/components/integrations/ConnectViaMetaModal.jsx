// components/integrations/ConnectViaMetaModal.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, X, Loader2, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

// Official Instagram Camera Icon
function InstagramColoredIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad-btn" cx="20%" cy="100%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad-btn)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

export default function ConnectViaMetaModal({
  isOpen,
  onClose,
  onBack,
  onSuccess,
  channelName = 'Instagram',
  isFullScreen = false,
}) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [step, setStep] = useState('connect'); // 'connect' | 'select' | 'success'
  const [oauthState, setOauthState] = useState(null);

  const isInstagram = channelName.toLowerCase().includes('instagram') || channelName.toLowerCase().includes('insta');

  // Listen for popup OAuth callback message
  useEffect(() => {
    async function handleMessage(event) {
      const type = event.data?.type;
      const state = event.data?.state;

      if (type === 'IG_AUTH_SUCCESS' || (type === 'META_AUTH_SUCCESS' && isInstagram)) {
        if (!state) return;
        setOauthState(state);
        await handleInstagramAuthSuccess(state);
      } else if (type === 'META_AUTH_SUCCESS') {
        if (!state) return;
        setOauthState(state);
        await handleFacebookAuthSuccess(state);
      } else if (type === 'IG_AUTH_ERROR' || type === 'META_AUTH_ERROR') {
        toast.error(`Authorization error: ${event.data?.error || 'cancelled'}`);
        setLoading(false);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isInstagram]);

  const handleInstagramAuthSuccess = async (state) => {
    setLoading(true);
    setLoadingText('Loading Instagram accounts...');
    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/accounts', {
        params: { state },
      });
      const accounts = res.data?.igAccounts || [];
      if (accounts.length === 0) {
        toast.error('No Instagram Professional account found. Make sure your account is Business/Creator and linked to a Facebook Page.');
        setLoading(false);
        return;
      }

      setAccountsList(accounts);
      setSelectedItem(accounts[0]);
      setStep('select');
    } catch (err) {
      toast.error('Failed to load accounts: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookAuthSuccess = async (state) => {
    setLoading(true);
    setLoadingText('Loading Facebook Pages...');
    try {
      const res = await apiClient.get('/api/integrations/facebook/pages', {
        params: { state },
      });
      const pages = res.data?.availablePages || res.data?.pages || [];
      if (pages.length === 0) {
        toast.error('No accessible Facebook Pages found for this account.');
        setLoading(false);
        return;
      }

      setAccountsList(pages);
      setSelectedItem(pages[0]);
      setStep('select');
    } catch (err) {
      toast.error('Failed to load Facebook Pages: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmConnection = async () => {
    if (!selectedItem) return;
    setLoading(true);
    setLoadingText('Connecting channel...');

    try {
      if (isInstagram) {
        const igUserId = selectedItem.igUserId || selectedItem.id;
        await apiClient.post('/api/integrations/facebook/instagram/connect-account', {
          igUserId,
          state: oauthState,
        });
        toast.success(`🎉 Instagram @${selectedItem.igUsername || selectedItem.name} connected!`);
      } else {
        const pageId = selectedItem.id || selectedItem.pageId;
        await apiClient.post('/api/integrations/facebook/connect-page', {
          pageId,
          state: oauthState,
        });
        toast.success(`🎉 Facebook Page "${selectedItem.name}" connected!`);
      }

      setStep('success');
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1200);
    } catch (err) {
      toast.error('Connection failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Launch official Instagram DM OAuth flow
  const handleLaunchInstagramPopup = async () => {
    setLoading(true);
    setLoadingText('Opening Instagram authorization...');
    try {
      const res = await apiClient.get('/api/integrations/facebook/instagram/oauth/start', {
        params: { format: 'json' },
      });
      const oauthUrl = res.data?.oauthUrl;
      const state = res.data?.state;
      if (!oauthUrl) throw new Error('Could not get Instagram authorization URL');

      if (state) setOauthState(state);

      const width = 640;
      const height = 760;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        oauthUrl,
        'InstagramLoginPopup',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = oauthUrl;
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          // If popup closed and still on connect step, check accounts
          if (step === 'connect' && state) {
            handleInstagramAuthSuccess(state);
          }
        }
      }, 1000);
    } catch (err) {
      toast.error('Failed to start Instagram Login: ' + err.message);
      setLoading(false);
    }
  };

  // Launch Facebook / Meta OAuth dialog
  const handleLaunchMetaPopup = async () => {
    setLoading(true);
    setLoadingText('Opening Meta authorization...');
    try {
      const res = await apiClient.get('/api/integrations/facebook/oauth/start', {
        params: { format: 'json' },
      });
      const oauthUrl = res.data?.oauthUrl;
      const state = res.data?.state;
      if (!oauthUrl) throw new Error('Could not get Meta authorization URL');

      if (state) setOauthState(state);

      const width = 640;
      const height = 760;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        oauthUrl,
        'MetaLoginPopup',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = oauthUrl;
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          if (step === 'connect' && state) {
            if (isInstagram) handleInstagramAuthSuccess(state);
            else handleFacebookAuthSuccess(state);
          }
        }
      }, 1000);
    } catch (err) {
      toast.error('Failed to start Meta OAuth: ' + err.message);
      setLoading(false);
    }
  };

  if (!isOpen && !isFullScreen) return null;

  const content = (
    <div
      className={`bg-white ${
        isFullScreen
          ? 'min-h-screen w-full'
          : 'rounded-3xl shadow-2xl w-full max-w-[960px] min-h-[520px] sm:min-h-[560px]'
      } overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200 border border-slate-100 select-none`}
    >
      {!isFullScreen && onClose && (
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X size={20} />
        </button>
      )}

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-full">
        {/* Left Column */}
        <div className="md:col-span-5 bg-[#fafafa] border-b md:border-b-0 md:border-r border-slate-100 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">
                OmniConnect
              </span>
            </div>

            <div className="relative w-28 h-28 my-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-300 via-rose-300 to-fuchsia-400 p-1 flex items-center justify-center shadow-md relative overflow-hidden">
                <div className="w-16 h-16 rounded-full border-4 border-amber-300 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-blue-500/20">
                  <div className="bg-blue-600 rounded-sm"></div>
                  <div className="bg-amber-400 rounded-sm"></div>
                  <div className="bg-amber-300 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mt-6">
              Connect {isInstagram ? 'Instagram' : channelName}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              Use your official Meta account to connect {isInstagram ? 'Instagram Direct Messages' : channelName} to OmniConnect.
            </p>
          </div>

          <div className="pt-8">
            <button
              onClick={onBack || onClose}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 p-8 sm:p-14 flex flex-col justify-center bg-white">
          <div className="max-w-[420px] mx-auto w-full text-center sm:text-left">
            {step === 'connect' && (
              <>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  Log in to Business Tools from Meta
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-6">
                  Authorize OmniConnect to manage messages and sync historical conversations.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleLaunchInstagramPopup}
                    disabled={loading}
                    className="w-full py-3 px-5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-sm rounded-full transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
                    ) : (
                      <InstagramColoredIcon className="w-5 h-5 shrink-0" />
                    )}
                    <span>{loading ? loadingText : 'Continue with Instagram'}</span>
                  </button>

                  {!isInstagram && (
                    <button
                      onClick={handleLaunchMetaPopup}
                      disabled={loading}
                      className="w-full py-3 px-5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-sm rounded-full transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#0081FB] text-white flex items-center justify-center font-bold text-xs">
                        f
                      </div>
                      <span>Continue with Facebook</span>
                    </button>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-slate-700 text-sm font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M20.2 13.4C18.6 11 16.3 9.6 13.7 9.6C9.4 9.6 6 13.3 6 18C6 22.7 9.4 26.4 13.7 26.4C16.3 26.4 18.6 25 20.2 22.6C21.8 25 24.1 26.4 26.7 26.4C31 26.4 34.4 22.7 34.4 18C34.4 13.3 31 9.6 26.7 9.6C24.1 9.6 21.8 11 20.2 13.4ZM13.7 23.3C10.9 23.3 8.7 20.9 8.7 18C8.7 15.1 10.9 12.7 13.7 12.7C15.6 12.7 17.3 13.8 18.5 15.6C18.1 16.3 17.6 17.1 17 17.9C16.1 19.1 15.1 20.4 14.2 21.7C14 22 13.9 22.4 13.7 22.8C13.7 23 13.7 23.1 13.7 23.3ZM26.7 23.3C23.9 23.3 21.7 20.9 21.7 18C21.7 15.1 23.9 12.7 26.7 12.7C29.5 12.7 31.7 15.1 31.7 18C31.7 20.9 29.5 23.3 26.7 23.3Z"
                      fill="#0064E0"
                    />
                  </svg>
                  <span>Meta Verified Integration</span>
                </div>
              </>
            )}

            {step === 'select' && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Select {isInstagram ? 'Instagram Account' : 'Facebook Page'}
                </h3>
                <p className="text-xs text-slate-500">
                  Found {accountsList.length} account(s). Choose the one you want to connect to OmniConnect:
                </p>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {accountsList.map((acc) => {
                    const id = acc.igUserId || acc.id;
                    const name = acc.igUsername ? `@${acc.igUsername}` : acc.name;
                    const isSelected = selectedItem && (selectedItem.igUserId === id || selectedItem.id === id);

                    return (
                      <div
                        key={id}
                        onClick={() => setSelectedItem(acc)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          {acc.igProfilePicture || acc.picture ? (
                            <img
                              src={acc.igProfilePicture || acc.picture}
                              alt={name}
                              className="w-9 h-9 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                              {name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="truncate">
                            <div className="text-sm font-semibold text-slate-900 truncate">{name}</div>
                            {acc.linkedPageName && (
                              <div className="text-[11px] text-slate-500 truncate">Page: {acc.linkedPageName}</div>
                            )}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleConfirmConnection}
                  disabled={loading || !selectedItem}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{loading ? loadingText : 'Confirm & Connect'}</span>
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Connected Successfully!</h3>
                <p className="text-xs text-slate-500">Your account is connected and chats are syncing to your inbox.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullScreen) return content;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/55 backdrop-blur-[3px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      {content}
    </div>
  );
}
