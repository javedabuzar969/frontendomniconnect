// components/layout/TopBanner.jsx
import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

export default function TopBanner({ onUpgradeClick }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="min-h-[42px] h-auto py-2 sm:py-0 sm:h-[42px] bg-[#1a1a1a] text-white flex items-center justify-between px-3 sm:px-6 border-b border-neutral-800 z-50 shrink-0 select-none gap-2">
      {/* Left / Center Banner Content */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="w-5 h-5 rounded-full bg-[#00a86b] flex items-center justify-center text-white shrink-0 shadow-xs">
          <DollarSign size={13} strokeWidth={2.8} />
        </div>
        <span className="text-white text-[11px] sm:text-[13px] font-normal leading-tight truncate">
          <span className="hidden sm:inline">Upgrade to get more Active Contacts and boost engagement</span>
          <span className="sm:hidden">Upgrade for more Active Contacts</span>
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onUpgradeClick}
            className="px-2.5 sm:px-3.5 py-1 bg-[#00a86b] hover:bg-[#008f5b] text-white rounded font-bold text-[10px] sm:text-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="hidden sm:inline">Try 14 Days For Free</span>
            <span className="sm:hidden">Try Free</span>
          </button>

          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              onUpgradeClick?.();
            }}
            className="text-neutral-300 hover:text-white underline cursor-pointer text-xs font-medium hidden sm:inline"
          >
            View pricing
          </a>
        </div>
      </div>

      {/* Right Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer rounded shrink-0 ml-2"
        title="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}
