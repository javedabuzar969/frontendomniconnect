// components/ui/Omniconnect.jsx
import React from 'react';

export default function Omniconnect({ className = 'w-40 h-40' }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Cyan Speech Bubble in Background */}
        {/* Plump rounded speech bubble with tail on right */}
        <path
          d="M102 36C52 36 22 66 22 100C22 130 46 148 84 154C93 155 106 156 122 150C134 159 146 166 158 170C155 160 153 150 152 143C168 132 176 117 176 100C176 66 144 36 102 36Z"
          fill="#00D2F3"
        />

        {/* The Checkered Hand Mascot */}
        {/* 1. Dark Blue / Indigo Wrist / Sleeve */}
        <path
          d="M74 162L69 198C69 200 70.5 202 73 202H127C129.5 202 131 200 131 198L126 162H74Z"
          fill="#273CBA"
        />

        {/* Clip path for the whole hand & fingers to keep grid crisp and cleanly bounded */}
        <defs>
          <clipPath id="handOutline">
            {/* Outline combining wrist top, palm, fingers, and thumb */}
            <path
              d="
                M74 162
                H126
                L126 130
                C126 128 127 126 128 124
                L130 102
                C130 96 124 92 119 95
                L117 97
                C116 93 112 80 107 72
                C104 68 98 69 97 74
                L95 80
                C94 72 90 57 85 54
                C80 51 75 55 75 62
                L74 72
                C73 66 69 61 63 62
                C58 63 55 69 56 76
                L58 106
                L53 103
                C48 100 42 102 38 107
                C34 112 35 119 40 124
                L58 140
                L60 150
                C60 156 63 162 74 162
                Z
              "
            />
          </clipPath>
        </defs>

        {/* Hand Body with Precise Checkerboard Pattern matching OmniConnect */}
        {/* Thumb */}
        {/* Thumb base & tip */}
        <g>
          {/* Thumb tip */}
          <path
            d="M38 107C34 113 36 121 42 125L52 134L60 122L48 112C44 107 40 105 38 107Z"
            fill="#8438EC"
          />
          {/* Thumb middle */}
          <path
            d="M48 112L60 122L66 115L54 105C50 106 48 109 48 112Z"
            fill="#1E3BB3"
          />
          {/* Thumb joint */}
          <path
            d="M52 134L62 144L72 132L60 122L52 134Z"
            fill="#D97706"
          />
        </g>

        {/* Index Finger */}
        <rect x="58" y="62" width="13" height="22" rx="6.5" fill="#1E3BB3" />
        <rect x="58" y="78" width="13" height="18" fill="#D97706" />
        <rect x="58" y="94" width="13" height="18" fill="#8438EC" />

        {/* Middle Finger (Tallest) */}
        <rect x="74" y="52" width="13" height="22" rx="6.5" fill="#1E3BB3" />
        <rect x="74" y="68" width="13" height="16" fill="#D97706" />
        <rect x="74" y="82" width="13" height="16" fill="#8438EC" />
        <rect x="74" y="96" width="13" height="16" fill="#1E3BB3" />

        {/* Ring Finger */}
        <rect x="90" y="56" width="13" height="22" rx="6.5" fill="#1E3BB3" />
        <rect x="90" y="72" width="13" height="16" fill="#8438EC" />
        <rect x="90" y="86" width="13" height="16" fill="#D97706" />
        <rect x="90" y="100" width="13" height="14" fill="#1E3BB3" />

        {/* Pinky Finger */}
        <rect x="106" y="72" width="13" height="20" rx="6.5" fill="#1E3BB3" />
        <rect x="106" y="88" width="13" height="16" fill="#8438EC" />
        <rect x="106" y="102" width="13" height="14" fill="#D97706" />

        {/* Palm Grid - Alternating vibrant blocks */}
        {/* Row 1 (y: 112 to 128) */}
        <rect x="60" y="112" width="16" height="16" fill="#1E3BB3" />
        <rect x="76" y="112" width="15" height="16" fill="#8438EC" />
        <rect x="91" y="112" width="15" height="16" fill="#D97706" />
        <rect x="106" y="112" width="16" height="16" fill="#1E3BB3" />

        {/* Row 2 (y: 128 to 144) */}
        <rect x="60" y="128" width="16" height="16" fill="#D97706" />
        <rect x="76" y="128" width="15" height="16" fill="#1E3BB3" />
        <rect x="91" y="128" width="15" height="16" fill="#8438EC" />
        <rect x="106" y="128" width="16" height="16" fill="#D97706" />

        {/* Row 3 (y: 144 to 162) */}
        <rect x="62" y="144" width="15" height="18" fill="#8438EC" />
        <rect x="77" y="144" width="15" height="18" fill="#D97706" />
        <rect x="92" y="144" width="15" height="18" fill="#1E3BB3" />
        <rect x="107" y="144" width="15" height="18" fill="#8438EC" />

        {/* Subtle separator lines between fingers for natural definition */}
        <line x1="72.5" y1="55" x2="72.5" y2="112" stroke="#00D2F3" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="88.5" y1="58" x2="88.5" y2="112" stroke="#00D2F3" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="104.5" y1="74" x2="104.5" y2="112" stroke="#00D2F3" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export { Omniconnect as OmniconnectHandIllustration, Omniconnect as OmniConnectHandIllustration };
