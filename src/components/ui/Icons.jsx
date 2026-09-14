// components/ui/Icons.jsx
import React from 'react';

export function OmniConnectLogo({ className = 'w-5 h-5 text-white' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.51.657 4.87 1.808 6.918L2.12 28.788a1 1 0 001.092 1.092l5.87-1.688A13.914 13.914 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 4a10 10 0 110 20 9.94 9.94 0 01-5.088-1.39l-.49-.293-3.664 1.052 1.052-3.664-.293-.49A9.94 9.94 0 016 16c0-5.523 4.477-10 10-10z" />
      <path d="M11 12a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zm-8.5 7.5a1 1 0 011.414 0c.84.84 2.14 1.5 3.086 1.5s2.246-.66 3.086-1.5a1 1 0 111.414 1.414c-1.22 1.22-3.003 2.086-4.5 2.086s-3.28-.866-4.5-2.086a1 1 0 010-1.414z" />
    </svg>
  );
}

export const ManychatLogo = OmniConnectLogo;
export const OmniConnectLogoAlias = OmniConnectLogo;

export function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad" cx="20%" cy="100%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  );
}

export function TikTokIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743 2.895 2.895 0 012.313-4.637c.306 0 .602.049.882.138V9.38a6.34 6.34 0 00-.882-.062C5.97 9.318 3 12.288 3 15.807 3 19.325 5.97 22.296 9.487 22.296c3.518 0 6.406-2.85 6.488-6.331V8.423a8.163 8.163 0 004.912 1.636V6.614a4.84 4.84 0 01-1.298.072z" />
    </svg>
  );
}

export function WhatsAppBrandIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M17.5 14.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8c0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.1-.8 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.3-.6-.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function MessengerBrandIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#0084FF" />
      <path
        d="M12 4.5C7.9 4.5 4.5 7.6 4.5 11.5c0 2.2 1.1 4.2 2.8 5.5v2.8l2.6-1.4c.7.2 1.4.3 2.1.3 4.1 0 7.5-3.1 7.5-7s-3.4-7.2-7.5-7.2zm1 9.7l-2.4-2.6-4.6 2.6 5.1-5.4 2.4 2.6 4.6-2.6-5.1 5.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function TelegramBrandIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#2AABEE" />
      <path
        d="M17.5 7.5l-2.2 10.3c-.2.7-.6.9-1.2.5l-3.3-2.4-1.6 1.5c-.2.2-.3.3-.7.3l.2-3.4 6.2-5.6c.3-.2-.1-.4-.4-.2l-7.7 4.8-3.3-1c-.7-.2-.7-.7.1-1l13-5c.6-.2 1.1.1.9.9z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function FacebookBrandIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function GoogleBrandIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.6 0 13s.6 4.7 1.6 6.6l3.7-2.9z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.8 7.4 23 12 23z"
      />
    </svg>
  );
}

export function AppleBrandIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73 1.01.08 2.02-.48 2.64-1.23z" />
    </svg>
  );
}

// Custom Broadcast Illustration (Bell with flame & checkered crest - Screenshot 3)
export function BroadcastIllustration({ className = 'w-44 h-44' }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-md">
        {/* Purple Bell Body */}
        <path
          d="M100 40c-25 0-45 20-45 45v35l-12 18h114l-12-18V85c0-25-20-45-45-45z"
          fill="#7C3AED"
        />
        {/* Bell Clapper */}
        <circle cx="100" cy="148" r="14" fill="#6D28D9" />
        <path d="M78 138h44v6a22 22 0 01-44 0v-6z" fill="#5B21B6" />

        {/* Checkered badge on top */}
        <g transform="translate(100, 32)">
          <circle cx="15" cy="15" r="28" fill="#10B981" />
          <path d="M2 2h26v26H2z" fill="#047857" opacity="0.3" />
          <circle cx="15" cy="15" r="28" stroke="#ffffff" strokeWidth="3" fill="none" />
        </g>

        {/* Fiery flame burst */}
        <path
          d="M115 15c0 0 18-5 18 18 0 10-6 16-12 19 8-1 16-7 16-16 0-14-14-25-14-25s-2 8-8 12c-4-8 0-18 0-18z"
          fill="#EA580C"
        />
        <path
          d="M117 22c0 0 10-2 10 11 0 6-3 10-7 12 5-.6 10-4 10-10 0-9-9-16-9-16s-1 5-5 8c-2-5 1-11 1-11z"
          fill="#F59E0B"
        />
      </svg>
    </div>
  );
}

// Custom Inbox Illustration (Stylized checkered head with thought cloud and cyan stripes - Manychat Inbox)
export function InboxIllustration({ className = 'w-64 h-52' }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Deep Magenta Thought Cloud on upper right */}
        <g>
          {/* Cloud base lobes */}
          <path
            d="M175 35 C162 35 152 44 148 55 C142 52 135 54 130 59 C123 66 124 77 131 83 C127 89 128 98 135 103 C142 108 152 107 157 101 C163 108 174 110 182 106 C190 101 193 92 191 85 C198 81 202 72 199 64 C197 56 190 50 182 50 C182 42 179 35 175 35 Z"
            fill="#9D174D"
          />
          <circle cx="178" cy="50" r="26" fill="#9D174D" />
          <circle cx="152" cy="65" r="22" fill="#9D174D" />
          <circle cx="170" cy="85" r="24" fill="#9D174D" />
          <circle cx="145" cy="88" r="18" fill="#9D174D" />
          <circle cx="190" cy="72" r="20" fill="#9D174D" />

          {/* Three Cyan Horizontal Rounded Stripes in cloud */}
          <rect x="160" y="48" width="56" height="8" rx="4" fill="#00E5FF" />
          <rect x="160" y="64" width="60" height="8" rx="4" fill="#00E5FF" />
          <rect x="160" y="80" width="54" height="8" rx="4" fill="#00E5FF" />
        </g>

        {/* Head Profile Facing Right */}
        <g transform="translate(45, 30)">
          {/* Magenta / Pink Hair Crest on Top */}
          <path
            d="M48 20 C42 10 52 2 64 6 C74 9 80 18 80 28 C74 24 65 24 60 27 C56 22 51 21 48 20 Z"
            fill="#E11D48"
          />
          <path
            d="M58 24 C55 12 70 8 76 16 C82 23 79 32 72 35 C68 30 62 26 58 24 Z"
            fill="#FB7185"
            opacity="0.9"
          />
          <path
            d="M50 22 C40 18 36 30 44 38 C49 32 50 26 50 22 Z"
            fill="#BE185D"
          />

          {/* Checkerboard Patterned Head Profile */}
          <g>
            {/* Top Row / Forehead: Cyan left, Magenta right */}
            <path d="M40 38 H64 V62 H40 Z" fill="#00E5FF" />
            <path d="M64 38 H88 V62 H64 Z" fill="#9D174D" />

            {/* Middle Row / Nose & Eye: Magenta left, Cyan right with Nose profile */}
            <path d="M40 62 H64 V86 H40 Z" fill="#9D174D" />
            <path
              d="M64 62 H88 C94 62 100 68 100 74 L94 77 L88 77 V86 H64 Z"
              fill="#00E5FF"
            />

            {/* Bottom Row / Mouth & Chin: Cyan left, Magenta right with Lips/Chin profile */}
            <path d="M40 86 H64 V110 H40 Z" fill="#00E5FF" />
            <path
              d="M64 86 H88 C90 86 92 88 90 91 C88 93 88 95 91 97 C93 99 91 103 88 105 C85 107 88 110 84 110 H64 Z"
              fill="#9D174D"
            />

            {/* Back of Head / Ear accent */}
            <path
              d="M26 50 C26 42 32 38 40 38 V62 H28 C26 58 26 54 26 50 Z"
              fill="#BE185D"
            />
            <path
              d="M28 62 H40 V86 H32 C29 82 28 72 28 62 Z"
              fill="#00E5FF"
            />
            <path
              d="M32 86 H40 V110 H36 C34 102 33 94 32 86 Z"
              fill="#9D174D"
            />

            {/* Neck & Collar: Sloping down */}
            <path
              d="M48 110 H64 V138 C58 135 52 128 48 120 Z"
              fill="#9D174D"
            />
            <path
              d="M64 110 H80 C78 122 75 132 72 142 H56 C60 132 63 121 64 110 Z"
              fill="#00E5FF"
            />
            <path
              d="M52 136 C55 145 60 152 68 158 H46 C42 150 46 142 52 136 Z"
              fill="#E11D48"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
