// components/ui/ChannelIllustrations.jsx
// High-fidelity vector illustrations matching Manychat / OmniConnect Settings screenshots

import React from 'react';

/**
 * 1. Instagram Illustration (Screenshot 1)
 * Features: Soft teal pill base, explosive pink/magenta starburst, checkered torus (navy & mustard), pink speech bubble
 */
export function InstagramIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Soft teal pill background */}
        <filter id="ig-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0ea5e9" floodOpacity="0.1" />
        </filter>
        {/* Clip path for the torus donut */}
        <clipPath id="torus-clip">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M160 50 C204 50 240 86 240 130 C240 174 204 210 160 210 C116 210 80 174 80 130 C80 86 116 50 160 50 Z M160 90 C182 90 200 108 200 130 C200 152 182 170 160 170 C138 170 120 152 120 130 C120 108 138 90 160 90 Z"
          />
        </clipPath>
      </defs>

      {/* 1. Organic Teal/Cyan Background Blob */}
      <path
        d="M120 70 C190 40 260 75 255 145 C250 205 185 240 125 225 C65 210 50 140 75 95 C90 75 105 75 120 70 Z"
        fill="#8cd2d4"
      />

      {/* 2. Magenta / Hot Pink Explosive Star Burst (pointing top right) */}
      <path
        d="M210 140 L238 92 L206 82 L245 42 L198 64 L185 30 L168 70 L140 46 L148 85 L110 75 L135 110 L95 125 L135 148 L110 185 L148 175 L160 215 L178 175 L215 200 L200 160 Z"
        fill="#ff00a0"
      />

      {/* 3. Hot Pink Chat Bubble (lower right) */}
      <path
        d="M205 160 C235 160 255 178 255 202 C255 218 245 232 230 238 L240 252 L215 244 C208 245 202 245 195 244 C190 235 190 215 195 195 C198 175 202 165 205 160 Z"
        fill="#ff00b8"
      />

      {/* 4. Checkered Torus Donut (Lifesaver) */}
      <g clipPath="url(#torus-clip)">
        {/* Navy base */}
        <rect x="75" y="45" width="170" height="170" fill="#1e3a8a" />
        
        {/* Mustard yellow / ochre checkerboard grid pattern */}
        <rect x="80" y="50" width="40" height="40" fill="#d97706" />
        <rect x="160" y="50" width="40" height="40" fill="#d97706" />
        <rect x="120" y="90" width="40" height="40" fill="#d97706" />
        <rect x="200" y="90" width="40" height="40" fill="#d97706" />
        <rect x="80" y="130" width="40" height="40" fill="#d97706" />
        <rect x="160" y="130" width="40" height="40" fill="#d97706" />
        <rect x="120" y="170" width="40" height="40" fill="#d97706" />
        <rect x="200" y="170" width="40" height="40" fill="#d97706" />

        {/* Diagonal and accent checkered highlights for depth */}
        <rect x="140" y="70" width="20" height="20" fill="#2563eb" />
        <rect x="180" y="110" width="20" height="20" fill="#b45309" />
        <rect x="100" y="150" width="20" height="20" fill="#2563eb" />
      </g>

      {/* Torus 3D Inner ring border for crisp edge */}
      <circle cx="160" cy="130" r="80" stroke="#172554" strokeWidth="3" fill="none" opacity="0.4" />
      <circle cx="160" cy="130" r="40" stroke="#172554" strokeWidth="3" fill="none" opacity="0.4" />
    </svg>
  );
}

/**
 * 2. TikTok Illustration (Screenshot 2)
 * Features: Soft teal speech bubble outline, magenta & cyan checkered grid, black glossy TikTok badge
 */
export function TikTokIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="tt-bubble-clip">
          <path d="M100 40 C170 40 230 75 230 135 C230 160 218 182 198 198 L212 245 L165 226 C145 231 123 230 100 225 C45 210 35 150 45 105 C55 60 75 40 100 40 Z" />
        </clipPath>
      </defs>

      {/* 1. Teal/Cyan Speech Bubble Base */}
      <path
        d="M105 38 C175 38 235 72 235 133 C235 160 220 185 200 200 L215 250 L165 230 C145 235 125 234 105 229 C45 212 35 150 45 105 C55 58 75 38 105 38 Z"
        fill="#8cd2d4"
      />

      {/* 2. Checkered Grid Pattern (Hot Pink / Magenta and Bright Cyan) */}
      <g clipPath="url(#tt-bubble-clip)">
        {/* Magenta base */}
        <rect x="30" y="30" width="220" height="230" fill="#f000d8" />
        
        {/* Cyan squares */}
        <rect x="35" y="35" width="45" height="45" fill="#38bdf8" />
        <rect x="125" y="35" width="45" height="45" fill="#38bdf8" />
        <rect x="215" y="35" width="45" height="45" fill="#38bdf8" />
        <rect x="80" y="80" width="45" height="45" fill="#38bdf8" />
        <rect x="170" y="80" width="45" height="45" fill="#38bdf8" />
        <rect x="35" y="125" width="45" height="45" fill="#38bdf8" />
        <rect x="125" y="125" width="45" height="45" fill="#38bdf8" />
        <rect x="80" y="170" width="45" height="45" fill="#38bdf8" />
        <rect x="170" y="170" width="45" height="45" fill="#38bdf8" />
      </g>

      {/* 3. Hot Pink Accent Tail */}
      <path
        d="M205 205 L215 250 L180 230 Z"
        fill="#ff0099"
      />

      {/* 4. Glossy Black Rounded Badge (Center-Left) */}
      <rect
        x="95"
        y="65"
        width="130"
        height="130"
        rx="36"
        fill="#000000"
        filter="drop-shadow(0 10px 15px rgba(0,0,0,0.25))"
      />

      {/* 5. TikTok Musical Note Icon with Red/Cyan Chromatic Aberration */}
      {/* Cyan offset */}
      <path
        d="M172 90 C175 102 184 112 196 114 L196 127 C186 127 178 122 172 116 L172 148 C172 168 156 183 136 183 C118 183 103 170 101 152 C106 156 113 159 120 159 C134 159 146 148 146 134 L146 90 L172 90 Z"
        fill="#00f2fe"
        opacity="0.9"
        transform="translate(-3, -2)"
      />
      {/* Red/Magenta offset */}
      <path
        d="M172 90 C175 102 184 112 196 114 L196 127 C186 127 178 122 172 116 L172 148 C172 168 156 183 136 183 C118 183 103 170 101 152 C106 156 113 159 120 159 C134 159 146 148 146 134 L146 90 L172 90 Z"
        fill="#fe0979"
        opacity="0.9"
        transform="translate(3, 2)"
      />
      {/* Pure White Foreground Note */}
      <path
        d="M170 92 C173 103 182 112 194 114 L194 126 C184 126 176 121 170 115 L170 146 C170 165 154 180 135 180 C116 180 101 165 101 146 C101 127 116 112 135 112 C138 112 141 113 144 114 L144 129 C141 127 138 126 135 126 C124 126 115 135 115 146 C115 157 124 166 135 166 C146 166 155 157 155 146 L155 92 L170 92 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * 3. WhatsApp Illustration (Screenshot 3)
 * Features: Yellow checkered floral/sunburst backdrop, vivid green WhatsApp speech bubble, white phone handset
 */
export function WhatsAppIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="wa-sun-clip">
          <path d="M190 50 C235 40 270 75 265 125 C275 165 245 210 205 215 C165 220 140 205 130 185 L120 210 L115 160 C90 140 90 90 120 65 C145 45 165 55 190 50 Z" />
        </clipPath>
      </defs>

      {/* 1. Yellow & Light Teal Checkered Backdrop */}
      <g clipPath="url(#wa-sun-clip)">
        {/* Warm Golden Yellow Base */}
        <rect x="90" y="30" width="190" height="190" fill="#facc15" />
        
        {/* Soft Teal / Cyan checkered tiles */}
        <rect x="90" y="30" width="40" height="40" fill="#99f6e4" />
        <rect x="170" y="30" width="40" height="40" fill="#99f6e4" />
        <rect x="250" y="30" width="40" height="40" fill="#99f6e4" />
        <rect x="130" y="70" width="40" height="40" fill="#99f6e4" />
        <rect x="210" y="70" width="40" height="40" fill="#99f6e4" />
        <rect x="90" y="110" width="40" height="40" fill="#c084fc" opacity="0.3" />
        <rect x="170" y="110" width="40" height="40" fill="#99f6e4" />
        <rect x="130" y="150" width="40" height="40" fill="#99f6e4" />
        <rect x="210" y="150" width="40" height="40" fill="#99f6e4" />

        {/* Mustard ochre accent tiles */}
        <rect x="170" y="70" width="40" height="40" fill="#d97706" opacity="0.4" />
        <rect x="210" y="110" width="40" height="40" fill="#d97706" opacity="0.4" />
      </g>

      {/* Sunburst yellow petal flares */}
      <path d="M220 185 C240 205 240 220 230 225 C220 230 205 215 195 200 Z" fill="#eab308" />
      <path d="M210 50 C230 40 245 45 240 55 C235 65 220 65 210 50 Z" fill="#eab308" />

      {/* 2. Large Emerald Green WhatsApp Chat Bubble */}
      <path
        d="M135 70 C182 70 220 102 220 142 C220 162 208 180 190 193 L194 220 L166 211 C156 213 145 214 135 214 C88 214 50 182 50 142 C50 102 88 70 135 70 Z"
        fill="#00c853"
        filter="drop-shadow(0 8px 16px rgba(0, 200, 83, 0.25))"
      />

      {/* Darker green bubble shadow tail */}
      <path d="M78 186 C65 198 52 205 48 202 C44 199 48 185 58 172 Z" fill="#00a844" />

      {/* 3. White Telephone Handset Icon */}
      <g transform="translate(90, 98) scale(1.15)">
        <path
          d="M34.5 27.2 C33.8 27.2 33.1 27.0 32.5 26.6 C31.7 26.0 29.5 24.3 27.1 23.4 C26.3 23.1 25.4 23.2 24.8 23.7 L23.0 25.3 C22.4 25.8 21.6 25.8 21.0 25.4 C17.8 23.6 15.2 21.0 13.4 17.8 C13.0 17.2 13.0 16.4 13.5 15.8 L15.1 14.0 C15.6 13.4 15.7 12.5 15.4 11.7 C14.5 9.3 12.8 7.1 12.2 6.3 C11.8 5.7 11.2 5.3 10.4 5.3 C9.6 5.3 8.9 5.7 8.5 6.2 L6.6 8.3 C5.8 9.2 5.3 10.5 5.3 11.9 C5.5 16.5 8.7 22.8 14.2 28.3 C19.7 33.8 26.0 37.0 30.6 37.2 C32.0 37.2 33.3 36.7 34.2 35.9 L36.3 34.0 C36.8 33.6 37.2 32.9 37.2 32.1 C37.2 31.3 36.8 30.7 36.2 30.3 C35.4 29.7 33.2 28.0 32.4 27.2 Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

/**
 * 4. Facebook Messenger Illustration (Screenshot 4)
 * Features: Grid board with ochre, lavender & white squares, purple & blue circles, royal blue Messenger bubble with white lightning bolt
 */
export function MessengerIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 1. Purple/Indigo Top Circle Backdrop */}
      <circle cx="215" cy="95" r="50" fill="#3b49df" opacity="0.9" />

      {/* 2. Deep Blue Left Circle Backdrop */}
      <circle cx="100" cy="165" r="32" fill="#2d37a8" />

      {/* 3. Grid Canvas (Checkerboard Grid Card with fine black border lines) */}
      <g transform="translate(100, 115)">
        {/* Canvas base */}
        <rect x="0" y="0" width="110" height="90" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
        
        {/* Grid inner lines */}
        <line x1="36" y1="0" x2="36" y2="90" stroke="#18181b" strokeWidth="2" />
        <line x1="73" y1="0" x2="73" y2="90" stroke="#18181b" strokeWidth="2" />
        <line x1="0" y1="30" x2="110" y2="30" stroke="#18181b" strokeWidth="2" />
        <line x1="0" y1="60" x2="110" y2="60" stroke="#18181b" strokeWidth="2" />

        {/* Checkered Tiles inside the grid */}
        {/* Row 1 */}
        <rect x="2" y="2" width="32" height="26" fill="#c084fc" opacity="0.75" />
        <rect x="38" y="2" width="33" height="26" fill="#d97706" />
        {/* Row 2 */}
        <rect x="2" y="32" width="32" height="26" fill="#e9d5ff" />
        <rect x="75" y="32" width="33" height="26" fill="#d97706" />
        {/* Row 3 */}
        <rect x="38" y="62" width="33" height="26" fill="#ca8a04" />
        <rect x="75" y="62" width="33" height="26" fill="#c084fc" opacity="0.75" />
      </g>

      {/* Bottom circular highlight */}
      <circle cx="185" cy="205" r="16" fill="#1e3a8a" opacity="0.6" />

      {/* 4. Foreground: Royal Blue Messenger Speech Bubble */}
      <g filter="drop-shadow(0 10px 20px rgba(0, 102, 255, 0.3))">
        <path
          d="M195 55 C238 55 270 85 270 120 C270 138 260 155 244 167 L248 190 L224 182 C214 184 205 185 195 185 C152 185 120 155 120 120 C120 85 152 55 195 55 Z"
          fill="#0084ff"
        />

        {/* 5. Clean White Messenger Lightning Bolt */}
        <path
          d="M174 133 L194 105 L210 118 L232 105 L212 133 L196 120 L174 133 Z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

/**
 * 5. SMS Illustration
 * Features: Emerald/cyan checkerboard, SMS speech bubble, phone signal
 */
export function SMSIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="130" cy="110" r="65" fill="#a7f3d0" />
      <g transform="translate(140, 90)">
        <rect x="0" y="0" width="100" height="90" fill="#ffffff" stroke="#0f766e" strokeWidth="2.5" />
        <line x1="33" y1="0" x2="33" y2="90" stroke="#0f766e" strokeWidth="2" />
        <line x1="66" y1="0" x2="66" y2="90" stroke="#0f766e" strokeWidth="2" />
        <line x1="0" y1="30" x2="100" y2="30" stroke="#0f766e" strokeWidth="2" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="#0f766e" strokeWidth="2" />
        <rect x="2" y="2" width="29" height="26" fill="#10b981" />
        <rect x="35" y="32" width="29" height="26" fill="#14b8a6" />
        <rect x="68" y="62" width="30" height="26" fill="#059669" />
      </g>
      <path
        d="M100 80 C140 80 170 105 170 135 C170 152 160 167 145 177 L150 198 L128 190 C119 192 110 193 100 193 C60 193 30 168 30 135 C30 102 60 80 100 80 Z"
        fill="#10b981"
        filter="drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3))"
      />
      {/* 3 Message dots */}
      <circle cx="75" cy="135" r="7" fill="#ffffff" />
      <circle cx="100" cy="135" r="7" fill="#ffffff" />
      <circle cx="125" cy="135" r="7" fill="#ffffff" />
    </svg>
  );
}

/**
 * 6. Email Illustration
 * Features: Purple/violet checkerboard, mail envelope, send wings
 */
export function EmailIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="190" cy="100" r="60" fill="#e9d5ff" />
      <g transform="translate(80, 110)">
        <rect x="0" y="0" width="100" height="80" fill="#ffffff" stroke="#6b21a8" strokeWidth="2.5" />
        <line x1="33" y1="0" x2="33" y2="80" stroke="#6b21a8" strokeWidth="2" />
        <line x1="66" y1="0" x2="66" y2="80" stroke="#6b21a8" strokeWidth="2" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#6b21a8" strokeWidth="2" />
        <rect x="2" y="2" width="29" height="36" fill="#8b5cf6" />
        <rect x="35" y="42" width="29" height="36" fill="#a855f7" />
        <rect x="68" y="2" width="30" height="36" fill="#c084fc" />
      </g>
      <g filter="drop-shadow(0 10px 20px rgba(124, 58, 237, 0.3))">
        <rect x="110" y="85" width="130" height="90" rx="16" fill="#7c3aed" />
        <path d="M110 95 L175 140 L240 95" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * 7. Telegram Illustration
 * Features: Sky blue checkerboard, paper airplane
 */
export function TelegramIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="130" cy="120" r="65" fill="#bae6fd" />
      <g transform="translate(150, 95)">
        <rect x="0" y="0" width="95" height="85" fill="#ffffff" stroke="#0369a1" strokeWidth="2.5" />
        <line x1="31" y1="0" x2="31" y2="85" stroke="#0369a1" strokeWidth="2" />
        <line x1="63" y1="0" x2="63" y2="85" stroke="#0369a1" strokeWidth="2" />
        <line x1="0" y1="42" x2="95" y2="42" stroke="#0369a1" strokeWidth="2" />
        <rect x="2" y="2" width="27" height="38" fill="#0ea5e9" />
        <rect x="33" y="44" width="28" height="39" fill="#38bdf8" />
        <rect x="65" y="2" width="28" height="38" fill="#0284c7" />
      </g>
      <circle cx="145" cy="140" r="55" fill="#0284c7" filter="drop-shadow(0 10px 20px rgba(2, 132, 199, 0.3))" />
      {/* Paper Plane */}
      <path
        d="M118 138 L175 115 L160 165 L144 148 L142 162 L133 145 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * 8. Groups Illustration (Screenshot 4)
 * Features: Stylized orange/red dancing figures in a circle atop a green & white checkered dome
 */
export function GroupsIllustration({ className = 'w-64 h-64' }) {
  return (
    <svg viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="dome-clip">
          <ellipse cx="170" cy="225" rx="95" ry="40" />
        </clipPath>
      </defs>

      {/* 1. Green & White Checkered Dome */}
      <ellipse cx="170" cy="225" rx="95" ry="40" fill="#16a34a" />
      <g clipPath="url(#dome-clip)">
        <rect x="75" y="185" width="190" height="80" fill="#15803d" />
        {/* Checkered green tiles */}
        <rect x="75" y="185" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="125" y="185" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="175" y="185" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="225" y="185" width="25" height="20" fill="#ffffff" opacity="0.9" />

        <rect x="100" y="205" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="150" y="205" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="200" y="205" width="25" height="20" fill="#ffffff" opacity="0.9" />

        <rect x="75" y="225" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="125" y="225" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="175" y="225" width="25" height="20" fill="#ffffff" opacity="0.9" />
        <rect x="225" y="225" width="25" height="20" fill="#ffffff" opacity="0.9" />
      </g>

      {/* 2. Stylized Orange/Red Dancing Acrobat Figures in Circle */}
      {/* Figure 1 (Left - arching) */}
      <path
        d="M105 175 C100 150 110 130 120 120 C125 115 135 118 135 125 C135 140 120 160 125 185 C125 195 115 200 108 195 C102 190 105 180 105 175 Z"
        fill="#ea580c"
      />
      <circle cx="125" cy="115" r="7" fill="#ea580c" />

      {/* Figure 2 (Top Left - dancing) */}
      <path
        d="M135 140 C145 110 155 90 165 90 C175 90 180 105 175 120 C165 140 155 160 148 180 C142 185 135 175 135 165 Z"
        fill="#f97316"
      />
      <circle cx="165" cy="82" r="7" fill="#f97316" />

      {/* Figure 3 (Top Right - leaping) */}
      <path
        d="M175 110 C190 95 210 95 220 105 C225 110 220 120 210 125 C195 135 185 155 195 175 C198 185 185 190 180 180 C175 160 170 130 175 110 Z"
        fill="#ea580c"
      />
      <circle cx="218" cy="98" r="7" fill="#ea580c" />

      {/* Figure 4 (Right - bending forward) */}
      <path
        d="M210 145 C225 140 238 150 235 165 C232 180 215 185 205 190 C198 195 195 185 200 178 C205 170 205 160 210 145 Z"
        fill="#f97316"
      />
      <circle cx="236" cy="158" r="6.5" fill="#f97316" />

      {/* Figure 5 (Center/Floor - connecting hands/base) */}
      <path
        d="M130 180 C150 165 180 160 205 180 C210 185 200 195 190 190 C170 180 150 180 135 190 C128 192 125 185 130 180 Z"
        fill="#c2410c"
      />
    </svg>
  );
}

/**
 * 9. Logs Meditation Illustration (Screenshot 5)
 * Features: Golden yellow meditating figure in lotus yoga pose with orange clouds and checkerboard mat
 */
export function LogsIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 1. Base Checked Mat / Ground */}
      <ellipse cx="160" cy="220" rx="80" ry="18" fill="#e0f2fe" />
      <g clipPath="url(#log-mat-clip)">
        <ellipse cx="160" cy="220" rx="75" ry="15" fill="#38bdf8" opacity="0.3" />
      </g>
      <ellipse cx="160" cy="220" rx="60" ry="10" fill="#fef08a" opacity="0.6" />

      {/* 2. Floating Orange Clouds */}
      {/* Left cloud */}
      <path
        d="M100 165 C92 165 85 168 85 174 C85 180 92 183 100 183 L120 183 C126 183 130 180 130 175 C130 170 125 165 118 165 C118 160 112 156 106 156 C102 156 98 159 97 163 Z"
        fill="#f97316"
      />
      {/* Right top cloud */}
      <path
        d="M205 135 C198 135 192 138 192 143 C192 148 198 151 205 151 L220 151 C225 151 228 148 228 144 C228 140 224 136 218 136 C218 132 213 128 208 128 C204 128 201 130 200 134 Z"
        fill="#f97316"
      />

      {/* 3. Golden Yellow Meditating Figure (Yogi in Padmasana) */}
      <g transform="translate(10, 0)">
        {/* Head */}
        <circle cx="150" cy="130" r="14" fill="#eab308" />
        {/* Headband / third-eye styling */}
        <path d="M140 128 C145 125 155 125 160 128 L160 132 L140 132 Z" fill="#0284c7" />

        {/* Torso */}
        <path
          d="M150 144 C138 148 135 162 138 180 L162 180 C165 162 162 148 150 144 Z"
          fill="#ca8a04"
        />

        {/* Arms folded / mudra */}
        <path
          d="M136 150 C125 158 120 170 122 185 C124 195 135 195 140 185 L145 170"
          stroke="#eab308"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M164 150 C175 158 180 170 178 185 C176 195 165 195 160 185 L155 170"
          stroke="#eab308"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Crossed Legs (Lotus pose) */}
        <ellipse cx="150" cy="200" rx="38" ry="12" fill="#eab308" />
        <ellipse cx="125" cy="198" rx="14" ry="9" fill="#ca8a04" />
        <ellipse cx="175" cy="198" rx="14" ry="9" fill="#ca8a04" />
      </g>
    </svg>
  );
}

/**
 * 10. Fields Illustration (Screenshot: Automation -> Fields -> No User Fields)
 * Features: Green checkerboard mound, stylized red/orange 4-petal flowers, clover leaf, tall grass blades
 */
export function FieldsIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Tall wheat / grass blades */}
      <path d="M128 170 C128 110 135 70 138 60 C140 70 144 115 142 170" fill="#d99b45" />
      <path d="M115 170 C116 120 125 90 130 80 C128 95 125 130 120 170" fill="#f59e0b" />
      <path d="M145 170 C146 125 155 95 162 82 C158 98 152 135 148 170" fill="#eab308" />
      <path d="M102 170 C106 135 118 105 125 95 C120 110 112 140 108 170" fill="#ca8a04" />
      <path d="M152 170 C155 138 168 112 176 102 C170 118 160 145 155 170" fill="#f59e0b" />

      {/* Clover leaf (dark emerald green) */}
      <g transform="translate(132, 58)">
        <circle cx="-10" cy="0" r="11" fill="#047857" />
        <circle cx="10" cy="0" r="11" fill="#047857" />
        <circle cx="0" cy="-10" r="11" fill="#059669" />
        <circle cx="0" cy="8" r="10" fill="#047857" />
      </g>

      {/* Big Orange/Red 4-Petal Flower (Top Right) */}
      <g transform="translate(186, 52)">
        <ellipse cx="-11" cy="0" rx="10" ry="7" fill="#ea580c" transform="rotate(-20 -11 0)" />
        <ellipse cx="11" cy="0" rx="10" ry="7" fill="#ea580c" transform="rotate(20 11 0)" />
        <ellipse cx="0" cy="-11" rx="7" ry="10" fill="#f97316" />
        <ellipse cx="0" cy="11" rx="7" ry="10" fill="#ea580c" />
        <circle cx="0" cy="0" r="4.5" fill="#c2410c" />
      </g>

      {/* Small Orange Flower (Left) */}
      <g transform="translate(90, 80)">
        <ellipse cx="-8" cy="0" rx="8" ry="5.5" fill="#f97316" />
        <ellipse cx="8" cy="0" rx="8" ry="5.5" fill="#f97316" />
        <ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="#fb923c" />
        <ellipse cx="0" cy="8" rx="5.5" ry="8" fill="#ea580c" />
        <circle cx="0" cy="0" r="3.5" fill="#c2410c" />
      </g>

      {/* Green Checkerboard Platform */}
      <g transform="translate(85, 140)">
        {/* Row 1 */}
        <rect x="0" y="0" width="18" height="15" fill="#34d399" />
        <rect x="18" y="0" width="18" height="15" fill="#059669" />
        <rect x="36" y="0" width="18" height="15" fill="#34d399" />
        <rect x="54" y="0" width="18" height="15" fill="#059669" />
        <rect x="72" y="0" width="18" height="15" fill="#34d399" />

        {/* Row 2 */}
        <rect x="0" y="15" width="18" height="15" fill="#059669" />
        <rect x="18" y="15" width="18" height="15" fill="#10b981" />
        <rect x="36" y="15" width="18" height="15" fill="#059669" />
        <rect x="54" y="15" width="18" height="15" fill="#10b981" />
        <rect x="72" y="15" width="18" height="15" fill="#059669" />

        {/* Row 3 */}
        <rect x="0" y="30" width="18" height="15" fill="#10b981" />
        <rect x="18" y="30" width="18" height="15" fill="#047857" />
        <rect x="36" y="30" width="18" height="15" fill="#10b981" />
        <rect x="54" y="30" width="18" height="15" fill="#047857" />
        <rect x="72" y="30" width="18" height="15" fill="#10b981" />

        {/* Diagonal cut extension */}
        <path d="M90 30 L108 45 L90 45 Z" fill="#047857" />
      </g>

      {/* Flower at base left of checkerboard */}
      <g transform="translate(100, 160)">
        <ellipse cx="-7" cy="0" rx="7" ry="5" fill="#ef4444" />
        <ellipse cx="7" cy="0" rx="7" ry="5" fill="#ef4444" />
        <ellipse cx="0" cy="-7" rx="5" ry="7" fill="#f87171" />
        <ellipse cx="0" cy="7" rx="5" ry="7" fill="#dc2626" />
        <circle cx="0" cy="0" r="3" fill="#b91c1c" />
      </g>
    </svg>
  );
}

/**
 * 11. Tags Illustration (Screenshot: Automation -> Tags -> No Tags)
 * Features: Purple/magenta ribbon tags with pink & checkered pattern, bouncing curved arrows
 */
export function TagsIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Curved Arrow 1: Loop over left and pointing down into tag */}
      <path
        d="M72 105 C70 65 95 38 120 75 C132 95 138 125 140 135"
        stroke="#d946ef"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow Head 1 */}
      <path d="M132 125 L141 142 L149 123 Z" fill="#d946ef" />

      {/* Curved Arrow 2: Launching up and right */}
      <path
        d="M172 145 C175 110 185 70 205 52"
        stroke="#be185d"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow Head 2 */}
      <path d="M192 50 L212 47 L207 68 Z" fill="#be185d" />

      {/* Hanging Ribbon Tags Container */}
      <g transform="translate(105, 95)">
        {/* Left Ribbon Tag (Magenta/Purple) */}
        <path
          d="M0 0 L32 0 L32 60 L16 48 L0 60 Z"
          fill="#c026d3"
        />

        {/* Center Checkered Tag */}
        <g transform="translate(18, 0)">
          <path d="M0 0 L32 0 L32 68 L16 54 L0 68 Z" fill="#7e22ce" />
          {/* Checkered pattern */}
          <rect x="0" y="0" width="16" height="15" fill="#e879f9" />
          <rect x="16" y="0" width="16" height="15" fill="#facc15" />
          <rect x="0" y="15" width="16" height="15" fill="#a855f7" />
          <rect x="16" y="15" width="16" height="15" fill="#f472b6" />
          <rect x="0" y="30" width="16" height="15" fill="#e879f9" />
          <rect x="16" y="30" width="16" height="15" fill="#facc15" />
        </g>

        {/* Right Ribbon Tag (Deep Crimson/Plum) */}
        <g transform="translate(42, 0)">
          <path d="M0 0 L24 0 L24 64 L12 52 L0 64 Z" fill="#9d174d" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 12. Apps Illustration (Screenshot: Extensions -> Apps -> Installed Apps)
 * Features: 4 dark green rounded square app tiles arranged 2x2 with yellow symbols, purple-gloved hand placing the 4th tile
 */
export function AppsIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 4 App Tiles (2x2 Grid) */}
      <g transform="translate(85, 30)">
        {/* Tile 1: Top-Left (Puzzle Piece) */}
        <rect x="0" y="0" width="42" height="42" rx="10" fill="#2d5a27" />
        <path
          d="M12 21 C12 17 15 15 18 15 C18 12 21 10 24 12 C27 14 26 18 24 20 L28 20 C30 20 32 23 30 26 C28 29 25 28 24 28 C23 31 20 32 17 30 C14 28 15 25 17 24 L14 24 C13 24 12 23 12 21 Z"
          fill="#eab308"
        />

        {/* Tile 2: Top-Right (Starburst / Sparkle) */}
        <rect x="48" y="0" width="42" height="42" rx="10" fill="#2d5a27" />
        <path
          d="M69 11 L71 18 L78 20 L72 23 L73 30 L68 25 L63 29 L65 22 L60 19 L66 18 Z"
          fill="#facc15"
        />

        {/* Tile 3: Bottom-Left (Speech / Pie) */}
        <rect x="0" y="48" width="42" height="42" rx="10" fill="#2d5a27" />
        <circle cx="21" cy="69" r="12" fill="#ca8a04" />
        <path d="M12 76 L8 81 L15 80 Z" fill="#ca8a04" />

        {/* Tile 4: Bottom-Right (House/Caret being placed by hand) */}
        <rect x="48" y="48" width="42" height="42" rx="10" fill="#2d5a27" />
        <path d="M69 58 L77 67 L61 67 Z M64 67 L74 67 L74 76 L64 76 Z" fill="#fef08a" />
      </g>

      {/* Purple Hand placing the bottom-right tile */}
      <g transform="translate(130, 80)">
        {/* Dark green sleeve */}
        <path d="M50 75 L68 58 L82 72 L64 88 Z" fill="#1b4317" />
        {/* Purple wrist / hand */}
        <path
          d="M38 52 C35 38 48 30 54 28 C57 32 58 40 56 46 L58 48 C63 43 66 38 68 40 C70 42 68 48 64 52 L65 54 C70 50 73 47 75 49 C77 51 74 57 70 61 L62 70 L48 60 Z"
          fill="#c026d3"
        />
        {/* Index finger pressing tile */}
        <path
          d="M38 48 C34 32 44 26 48 24 C52 26 50 36 46 45 Z"
          fill="#d946ef"
        />
      </g>
    </svg>
  );
}

/**
 * 13. Templates Rabbit Illustration (Screenshot: Extensions -> Installed Templates)
 * Features: 3 geometric rabbits (family of 3: mother rabbit with checkerboard pattern, middle bunny, small baby bunny)
 */
export function TemplatesRabbitIllustration({ className = 'w-56 h-56' }) {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 1. Large Mother Rabbit (Right) */}
      <g transform="translate(145, 40)">
        {/* Ears */}
        <path d="M42 2 C38 -12 48 -28 54 -28 C60 -28 62 -12 55 2 Z" fill="#ea580c" />
        <path d="M54 4 C50 -8 58 -22 62 -22 C66 -22 68 -8 63 4 Z" fill="#f97316" />

        {/* Head */}
        <circle cx="46" cy="18" r="16" fill="#ea580c" />
        <circle cx="42" cy="16" r="2.5" fill="#ffffff" />
        <circle cx="41" cy="16" r="1.5" fill="#7c2d12" />

        {/* Checkered Body */}
        <g transform="translate(0, 26)">
          <clipPath id="bunny-body-clip">
            <path d="M44 0 C25 2 10 22 10 48 C10 68 28 85 52 85 C70 85 84 72 84 52 C84 28 65 0 44 0 Z" />
          </clipPath>
          <g clipPath="url(#bunny-body-clip)">
            {/* Background color */}
            <rect x="0" y="0" width="90" height="90" fill="#ea580c" />
            {/* Checkerboard squares */}
            <rect x="10" y="0" width="18" height="18" fill="#facc15" />
            <rect x="46" y="0" width="18" height="18" fill="#facc15" />
            <rect x="28" y="18" width="18" height="18" fill="#facc15" />
            <rect x="64" y="18" width="18" height="18" fill="#facc15" />
            <rect x="10" y="36" width="18" height="18" fill="#facc15" />
            <rect x="46" y="36" width="18" height="18" fill="#facc15" />
            <rect x="28" y="54" width="18" height="18" fill="#facc15" />
            <rect x="64" y="54" width="18" height="18" fill="#facc15" />
            <rect x="10" y="72" width="18" height="18" fill="#facc15" />
            <rect x="46" y="72" width="18" height="18" fill="#facc15" />
          </g>
        </g>

        {/* Tail */}
        <circle cx="8" cy="80" r="8" fill="#f97316" />
        {/* Front Paw */}
        <ellipse cx="64" cy="108" rx="12" ry="6" fill="#c2410c" />
        {/* Back Leg */}
        <ellipse cx="28" cy="110" rx="16" ry="7" fill="#c2410c" />
      </g>

      {/* 2. Middle Bunny (Center) */}
      <g transform="translate(108, 92)">
        {/* Ears */}
        <path d="M22 2 C18 -8 26 -20 30 -20 C34 -20 36 -8 30 2 Z" fill="#d97706" />
        {/* Head */}
        <circle cx="24" cy="12" r="10" fill="#d97706" />
        <circle cx="21" cy="10" r="1.5" fill="#ffffff" />
        {/* Body */}
        <ellipse cx="18" cy="36" rx="16" ry="22" fill="#eab308" transform="rotate(-15 18 36)" />
        {/* Checkered spot on middle bunny */}
        <rect x="10" y="24" width="8" height="8" fill="#ca8a04" />
        <rect x="18" y="32" width="8" height="8" fill="#ca8a04" />
        {/* Feet */}
        <ellipse cx="28" cy="56" rx="7" ry="4" fill="#b45309" />
        <ellipse cx="12" cy="56" rx="8" ry="4" fill="#b45309" />
        {/* Tail */}
        <circle cx="4" cy="42" r="4.5" fill="#f59e0b" />
      </g>

      {/* 3. Small Baby Bunny (Left) */}
      <g transform="translate(80, 118)">
        {/* Ears */}
        <path d="M14 2 C12 -4 16 -12 18 -12 C20 -12 22 -4 18 2 Z" fill="#ea580c" />
        {/* Head */}
        <circle cx="15" cy="8" r="7" fill="#ea580c" />
        {/* Body */}
        <ellipse cx="12" cy="24" rx="10" ry="14" fill="#f97316" transform="rotate(-10 12 24)" />
        {/* Feet */}
        <ellipse cx="18" cy="36" rx="5" ry="3" fill="#c2410c" />
        <ellipse cx="8" cy="36" rx="5" ry="3" fill="#c2410c" />
        {/* Tail */}
        <circle cx="2" cy="28" r="3" fill="#f97316" />
      </g>
    </svg>
  );
}
