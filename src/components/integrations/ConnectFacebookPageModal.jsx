// components/integrations/ConnectFacebookPageModal.jsx
// Real Meta/Facebook OAuth & Page Connection Flow (Strictly Real Data Only)
import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Check,
  RefreshCw,
  ExternalLink,
  X,
  AlertCircle,
  ShieldCheck,
  CheckSquare,
  Square,
} from 'lucide-react';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

export default function ConnectFacebookPageModal({
  isOpen,
  onClose,
  onBack,
  onPageConnected,
  isFullScreen = false,
}) {
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [oauthState, setOauthState] = useState(null);
  const [metaAppId, setMetaAppId] = useState('4662451487410242');

  // Real pages from Meta
  const [availablePages, setAvailablePages] = useState([]);
  const [connectedPages, setConnectedPages] = useState([]);
  const [selectedPageIds, setSelectedPageIds] = useState(new Set());
  const [hasAuthorized, setHasAuthorized] = useState(false);

  // Load config and existing connected pages
  useEffect(() => {
    if (isOpen || isFullScreen) {
      loadInitialData();
    }
  }, [isOpen, isFullScreen]);

  // Listen for Meta OAuth popup message
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data?.type === 'META_AUTH_SUCCESS') {
        const state = event.data.state;
        if (state) {
          setOauthState(state);
          toast.success('🎉 Meta Account linked! Fetching your Facebook Pages...');
          await fetchPagesForState(state);
        }
      } else if (event.data?.type === 'META_AUTH_ERROR') {
        toast.error('Meta authorization was cancelled or denied.');
        setLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // 1. Fetch public config
      const cfgRes = await apiClient.get('/api/integrations/facebook/config');
      if (cfgRes.data?.data?.appId) {
        setMetaAppId(cfgRes.data.data.appId);
      }

      // 2. Fetch existing connected pages from database
      const pagesRes = await apiClient.get('/api/integrations/facebook/pages');
      if (pagesRes.data?.success) {
        const connected = pagesRes.data.connectedPages || [];
        setConnectedPages(connected);

        // Check if there was an active OAuth session state in URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlState = urlParams.get('state');
        if (urlState) {
          setOauthState(urlState);
          await fetchPagesForState(urlState);
          return;
        }
      }
    } catch (err) {
      console.warn('Initial Facebook data load:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPagesForState = async (state) => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/integrations/facebook/pages', {
        params: { state },
      });

      if (res.data?.success) {
        const available = res.data.availablePages || [];
        const connected = res.data.connectedPages || [];
        setAvailablePages(available);
        setConnectedPages(connected);
        setHasAuthorized(true);

        // Pre-select available unconnected pages
        const unconnectedIds = new Set(
          available.filter((p) => !p.connected).map((p) => p.id)
        );
        setSelectedPageIds(unconnectedIds);

        if (available.length === 0) {
          toast('No Facebook Pages found in this Meta account.', { icon: 'ℹ️' });
        } else {
          toast.success(`Found ${available.length} Facebook Page(s) from Meta!`);
        }
      }
    } catch (err) {
      toast.error('Failed to load pages from Meta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Launch official Meta OAuth Flow
  const handleLaunchMetaOAuth = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/integrations/facebook/oauth/start', {
        params: { format: 'json' },
      });

      const oauthUrl = res.data?.oauthUrl;
      const state = res.data?.state;

      if (!oauthUrl) {
        throw new Error('Failed to generate Meta OAuth URL');
      }

      setOauthState(state);

      const width = 640;
      const height = 760;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        oauthUrl,
        'MetaOAuthPopup',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
      );

      if (!popup || popup.closed) {
        // Fallback to direct redirect if popup blocked
        window.location.href = oauthUrl;
      }
    } catch (err) {
      toast.error('Could not start Meta OAuth: ' + err.message);
      setLoading(false);
    }
  };

  // Toggle selection of a real page
  const togglePageSelection = (pageId) => {
    setSelectedPageIds((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) {
        next.delete(pageId);
      } else {
        next.add(pageId);
      }
      return next;
    });
  };

  // Connect Selected Real Pages
  const handleConnectSelectedPages = async () => {
    if (selectedPageIds.size === 0) {
      toast.error('Please select at least one Facebook Page to connect.');
      return;
    }

    setConnecting(true);
    let successCount = 0;

    for (const pageId of selectedPageIds) {
      try {
        const res = await apiClient.post('/api/integrations/facebook/connect-page', {
          pageId,
          state: oauthState,
        });

        if (res.data?.success) {
          successCount++;
          if (onPageConnected) {
            onPageConnected(res.data.page);
          }
        }
      } catch (err) {
        toast.error(`Failed to connect page: ${err.response?.data?.error || err.message}`);
      }
    }

    setConnecting(false);

    if (successCount > 0) {
      toast.success(`🎉 ${successCount} Facebook Page(s) connected and subscribed to Messenger webhooks!`);
      // Reload connected pages
      await loadInitialData();
      if (onClose) onClose();
    }
  };

  // Disconnect a Page
  const handleDisconnect = async (pageId, pageName) => {
    if (!window.confirm(`Are you sure you want to disconnect "${pageName}"?`)) return;

    try {
      const res = await apiClient.post('/api/integrations/facebook/disconnect-page', { pageId });
      if (res.data?.success) {
        toast.success(`Page "${pageName}" disconnected.`);
        setConnectedPages((prev) => prev.filter((p) => p.id !== pageId && p.pageId !== pageId));
        setAvailablePages((prev) =>
          prev.map((p) => (p.id === pageId ? { ...p, connected: false } : p))
        );
      }
    } catch (err) {
      toast.error('Failed to disconnect: ' + err.message);
    }
  };

  if (!isOpen && !isFullScreen) return null;

  return (
    <div
      className={
        isFullScreen
          ? 'w-full h-full bg-white flex flex-col'
          : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200'
      }
    >
      <div
        className={
          isFullScreen
            ? 'w-full h-full flex flex-col'
            : 'bg-white rounded-2xl shadow-2xl w-full max-w-[880px] max-h-[92vh] overflow-hidden flex flex-col border border-slate-200 select-none animate-in zoom-in-95 duration-200'
        }
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Back"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Connect Facebook Page</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                  Official Meta API
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your real Facebook Pages and Messenger conversations with end-to-end webhook delivery.
              </p>
            </div>
          </div>

          {!isFullScreen && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* STEP 1: Not yet authorized with Meta */}
          {!hasAuthorized && (
            <div className="max-w-xl mx-auto text-center py-6 sm:py-10 space-y-6">
              {/* Meta Brand Card */}
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Connect Facebook
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Connect your Meta/Facebook account to manage your Facebook Pages and Messenger conversations.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs text-slate-600 space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                  <span>Secure Meta Authorization</span>
                </div>
                <p>
                  You will log in directly on Meta’s official authorization screen. We only request permissions needed for Pages and Messenger.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleLaunchMetaOAuth}
                  disabled={loading}
                  className="px-6 py-3 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                  )}
                  <span>Connect with Meta</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Authorized with Meta — Zero Pages Found State */}
          {hasAuthorized && availablePages.length === 0 && (
            <div className="max-w-md mx-auto text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Facebook Pages found.</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your Meta account does not currently have an accessible Facebook Page.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleLaunchMetaOAuth}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Connect another Meta account
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Authorized with Meta — Real Pages Selection List */}
          {hasAuthorized && availablePages.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Select Facebook Pages</h3>
                  <p className="text-xs text-slate-500">
                    Choose which Facebook Pages to connect to OmniConnect Inbox.
                  </p>
                </div>
                <button
                  onClick={handleLaunchMetaOAuth}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw size={12} />
                  <span>Switch Account</span>
                </button>
              </div>

              {/* Pages Grid/List */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {availablePages.map((page) => {
                  const isSelected = selectedPageIds.has(page.id);
                  const isAlreadyConnected = page.connected || connectedPages.some((cp) => cp.pageId === page.id || cp.id === page.id);

                  return (
                    <div
                      key={page.id}
                      onClick={() => !isAlreadyConnected && togglePageSelection(page.id)}
                      className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                        isAlreadyConnected
                          ? 'bg-slate-50/70'
                          : isSelected
                          ? 'bg-blue-50/50 cursor-pointer'
                          : 'hover:bg-slate-50/60 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Checkbox */}
                        {!isAlreadyConnected ? (
                          <div className="text-blue-600 shrink-0">
                            {isSelected ? <CheckSquare size={18} /> : <Square size={18} className="text-slate-300" />}
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}

                        {/* Picture */}
                        {page.picture ? (
                          <img
                            src={page.picture}
                            alt={page.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm">
                            {page.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        {/* Page Info */}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{page.name}</h4>
                          <p className="text-xs text-slate-500 truncate">
                            ID: {page.id} • {page.category || 'Business'}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        {isAlreadyConnected ? (
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200/80">
                            Connected
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">
                            {isSelected ? 'Selected' : 'Ready'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConnectSelectedPages}
                  disabled={connecting || selectedPageIds.size === 0}
                  className="px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {connecting ? <RefreshCw size={14} className="animate-spin" /> : null}
                  <span>Connect Selected Pages ({selectedPageIds.size})</span>
                </button>
              </div>
            </div>
          )}

          {/* Currently Connected Pages Section */}
          {connectedPages.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Connected Facebook Pages ({connectedPages.length})
              </h3>
              <div className="space-y-2">
                {connectedPages.map((cp) => (
                  <div
                    key={cp.id || cp.pageId}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {cp.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-slate-900 block truncate">{cp.name}</span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          Page ID: {cp.id || cp.pageId} • Webhook: {cp.webhookStatus || 'subscribed'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDisconnect(cp.id || cp.pageId, cp.name)}
                      className="px-3 py-1 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Disconnect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
