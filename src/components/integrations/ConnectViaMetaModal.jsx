// components/integrations/ConnectViaMetaModal.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, X, ExternalLink } from 'lucide-react';
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
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [savingToken, setSavingToken] = useState(false);

  const META_APP_ID = import.meta.env.VITE_META_APP_ID || '4662451487410242';
  const isInstagram = channelName.toLowerCase().includes('instagram') || channelName.toLowerCase().includes('insta');

  // Listen for popup OAuth callback message
  useEffect(() => {
    function handleMessage(event) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'META_AUTH_SUCCESS') {
        const token = event.data.accessToken || event.data.code;
        if (token) {
          handleTokenReceived(token);
        }
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleTokenReceived = async (token) => {
    setLoading(true);
    try {
      await apiClient.post('/api/integrations/facebook/update-token', { token });
      await apiClient.post('/api/integrations/facebook/connect-page', {
        pageName: isInstagram ? 'Instagram Business' : 'Meta Account',
      });
      toast.success(`🎉 Connected to ${isInstagram ? 'Instagram' : 'Meta'} successfully!`);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      toast.error('Failed to link account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Launch direct Instagram login popup matching Screenshot 2 & 3
  const handleLaunchInstagramPopup = () => {
    setLoading(true);
    const redirectUri = window.location.origin + '/meta-callback';

    // Official Instagram login & auth endpoint
    const instagramLoginUrl = `https://www.instagram.com/accounts/login/?force_authentication=1&platform_app_id=${META_APP_ID}&next=${encodeURIComponent(
      `/oauth/authorize?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=user_profile,user_media,instagram_manage_messages&response_type=code`
    )}`;

    const width = 620;
    const height = 750;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      instagramLoginUrl,
      'InstagramLoginPopup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
    );

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      toast.error('Popup was blocked by your browser. Please allow popups.');
      setLoading(false);
      return;
    }

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setLoading(false);
      }
    }, 1000);
  };

  // Launch Facebook / Meta OAuth dialog
  const handleLaunchMetaPopup = () => {
    setLoading(true);
    const redirectUri = window.location.origin + '/meta-callback';
    const scopes = [
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_metadata',
      'pages_messaging',
      'instagram_basic',
      'instagram_manage_messages',
      'whatsapp_business_management',
      'whatsapp_business_messaging',
    ].join(',');

    const oauthUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}&response_type=token`;

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
      toast.error('Popup was blocked by your browser. Please allow popups.');
      setLoading(false);
      return;
    }

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setLoading(false);
      }
    }, 1000);
  };

  const handleSaveManualToken = async (e) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    setSavingToken(true);
    try {
      await apiClient.post('/api/integrations/facebook/update-token', {
        token: manualToken.trim(),
      });
      await apiClient.post('/api/integrations/facebook/connect-page', {
        pageName: isInstagram ? 'Instagram Account' : 'Creative Logo Master',
      });
      toast.success('🎉 Token updated and synced!');
      setManualToken('');
      setShowMoreOptions(false);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      toast.error('Error updating token: ' + err.message);
    } finally {
      setSavingToken(false);
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
      {/* Close button top right */}
      {!isFullScreen && onClose && (
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X size={20} />
        </button>
      )}

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-full">
        {/* ── Left Column: Brand & Graphic matching Screenshot ── */}
        <div className="md:col-span-5 bg-[#fafafa] border-b md:border-b-0 md:border-r border-slate-100 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-sans">
                Manychat
              </span>
            </div>

            {/* Illustration matching Screenshot */}
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
              Use your {isInstagram ? 'Instagram' : channelName} account to connect to Manychat.
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

        {/* ── Right Column: Log in to Business Tools from Meta (Screenshot 2 & 3) ── */}
        <div className="md:col-span-7 p-8 sm:p-14 flex flex-col justify-center bg-white">
          <div className="max-w-[420px] mx-auto w-full text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Log in to Business Tools from Meta
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-6">
              Connect with your Instagram profile to manage direct messages and automations in OmniConnect.
            </p>

            {/* Option 1: Continue with Instagram (Matching Screenshot 2) */}
            <div className="space-y-3">
              <button
                onClick={handleLaunchInstagramPopup}
                disabled={loading}
                className="w-full py-3 px-5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-sm rounded-full transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <InstagramColoredIcon className="w-5 h-5 shrink-0" />
                <span>Continue with Instagram</span>
              </button>

              {/* Only show Facebook if not purely Instagram channel */}
              {!isInstagram && (
                <button
                  onClick={handleLaunchMetaPopup}
                  disabled={loading}
                  className="w-full py-3 px-5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-sm rounded-full transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0081FB] text-white flex items-center justify-center font-bold text-xs">
                    f
                  </div>
                  <span>Continue with Facebook</span>
                </button>
              )}
            </div>

            {/* Meta Logo Footer matching Screenshot 2 */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-slate-700 text-sm font-bold">
              <svg className="w-5 h-5" viewBox="0 0 36 36" fill="none">
                <path
                  d="M20.2 13.4C18.6 11 16.3 9.6 13.7 9.6C9.4 9.6 6 13.3 6 18C6 22.7 9.4 26.4 13.7 26.4C16.3 26.4 18.6 25 20.2 22.6C21.8 25 24.1 26.4 26.7 26.4C31 26.4 34.4 22.7 34.4 18C34.4 13.3 31 9.6 26.7 9.6C24.1 9.6 21.8 11 20.2 13.4ZM13.7 23.3C10.9 23.3 8.7 20.9 8.7 18C8.7 15.1 10.9 12.7 13.7 12.7C15.6 12.7 17.3 13.8 18.5 15.6C18.1 16.3 17.6 17.1 17 17.9C16.1 19.1 15.1 20.4 14.2 21.7C14 22 13.9 22.4 13.7 22.8C13.7 23 13.7 23.1 13.7 23.3ZM26.7 23.3C23.9 23.3 21.7 20.9 21.7 18C21.7 15.1 23.9 12.7 26.7 12.7C29.5 12.7 31.7 15.1 31.7 18C31.7 20.9 29.5 23.3 26.7 23.3Z"
                  fill="#0064E0"
                />
              </svg>
              <span>Meta</span>
            </div>

            {/* Meta Business Partner Trust Card */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-medium leading-snug">
                Manychat is a trusted<br />Meta Business Partner
              </span>
              <div className="flex items-center gap-1.5 text-slate-800 shrink-0 font-bold text-sm">
                <svg className="w-5 h-5 fill-[#0081FB]" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
                <div className="leading-tight text-left">
                  <span className="font-extrabold text-xs block text-slate-900 tracking-tight">Meta</span>
                  <span className="text-[9px] text-slate-400 block font-normal -mt-0.5">Business Partner</span>
                </div>
              </div>
            </div>

            {/* See More Options Toggle */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>See More Options</span>
                {showMoreOptions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Expanded Options */}
            {showMoreOptions && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 animate-in fade-in duration-150 text-left">
                <div className="mb-2 font-semibold text-slate-900">
                  Direct Instagram / Meta Token
                </div>
                <form onSubmit={handleSaveManualToken} className="space-y-2">
                  <input
                    type="text"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder="Paste Access Token (IGQ... or EABCQ...)"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={savingToken}
                    className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {savingToken ? 'Updating...' : 'Save Token & Link Instagram'}
                  </button>
                </form>
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
