// pages/MetaCallbackPage.jsx — Handles Meta OAuth redirect in popup
import React, { useEffect } from 'react';

export default function MetaCallbackPage() {
  useEffect(() => {
    // Extract token from URL hash (e.g. #access_token=...) or query string (?code=...)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash || window.location.search);
    const accessToken = params.get('access_token');
    const code = params.get('code');

    if (accessToken || code) {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'META_AUTH_SUCCESS',
            accessToken: accessToken,
            code: code,
          },
          window.location.origin
        );
        window.close();
      } else {
        window.location.href = '/inbox';
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mb-4" />
      <h3 className="text-base font-bold text-slate-800">Connecting to Meta...</h3>
      <p className="text-xs text-slate-500 mt-1">Please wait while we complete your authentication.</p>
    </div>
  );
}
