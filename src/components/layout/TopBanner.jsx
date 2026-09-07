// components/layout/TopBanner.jsx
import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

export default function TopBanner({ onUpgradeClick }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="h-[42px] bg-[#1a1a1a] text-white flex items-center justify-between px-6 text-sm border-b border-neutral-800 z-50 shrink-0 select-none">
      {/* Left / Center Banner Content matching Screenshot 1 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00a86b] flex items-center justify-center text-white shrink-0 shadow-xs">
            <DollarSign size={13} strokeWidth={2.8} />
          </div>
          <span className="text-white text-xs sm:text-[13.5px] font-normal">
            Upgrade to get more Active Contacts and boost engagement
          </span>
        </div>

        <button
          onClick={onUpgradeClick}
          className="px-3.5 py-1 bg-[#00a86b] hover:bg-[#008f5b] text-white rounded font-bold text-xs transition-colors cursor-pointer ml-1"
        >
          Try 14 Days For Free
        </button>

        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            onUpgradeClick?.();
          }}
          className="text-neutral-300 hover:text-white underline ml-1 cursor-pointer text-xs font-medium"
        >
          View pricing
        </a>
      </div>

      {/* Right Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer rounded"
        title="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}
