// components/ui/ConnectChannelModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import {
  FacebookBrandIcon,
  InstagramIcon,
  WhatsAppBrandIcon,
  TelegramBrandIcon,
} from './Icons';
import toast from 'react-hot-toast';

// Custom SMS icon matching Manychat's green circle icon
function SmsChannelIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#00C26F" strokeWidth="2.4" fill="none" />
    </svg>
  );
}

// Facebook Messenger circle icon matching Manychat screenshot
function FacebookChannelIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#0084FF" />
      <path
        d="M12 5C8.134 5 5 7.91 5 11.5c0 2.05 1.026 3.882 2.63 5.087v2.413l2.308-1.267c.65.18 1.341.28 2.062.28 3.866 0 7-2.91 7-6.5S15.866 5 12 5zm.943 8.757l-2.022-2.157-3.945 2.157 4.339-4.606 2.072 2.156 3.895-2.156-4.339 4.606z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function ConnectChannelModal({ isOpen, onClose, onConnect }) {
  if (!isOpen) return null;

  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FacebookChannelIcon className="w-7 h-7" />,
      description: 'Build relationships with customers through interactive and tailored content.',
      buttonText: 'Connect Pages',
      badge: null,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <InstagramIcon className="w-7 h-7" />,
      description: 'Supercharge your Instagram marketing with messaging automation.',
      buttonText: 'Connect',
      badge: null,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <WhatsAppBrandIcon className="w-7 h-7" />,
      description: "Use the world's most popular messaging app to chat and engage your customers.",
      buttonText: 'Connect',
      badge: 'UPGRADE',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <TelegramBrandIcon className="w-7 h-7" />,
      description: 'Unleash the power of limitless Telegram messaging automation.',
      buttonText: 'Connect',
      badge: null,
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: <SmsChannelIcon className="w-7 h-7" />,
      description: 'Collect phone numbers and reengage your contacts via text.',
      buttonText: 'Connect',
      badge: 'UPGRADE',
    },
  ];

  const handleAction = (ch) => {
    if (onConnect) {
      onConnect(ch);
    } else {
      toast.success(`${ch.name} connection initiated!`);
    }
  };

  const topRow = channels.slice(0, 3);
  const bottomRow = channels.slice(3, 5);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[860px] p-8 sm:p-10 relative select-none animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 sm:right-6 sm:top-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Heading */}
        <div className="text-center mb-9 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Connect Channel
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="space-y-6">
          {/* Top Row: Facebook, Instagram, WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {topRow.map((ch) => (
              <div
                key={ch.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center justify-between shadow-2xs hover:shadow-sm transition-shadow min-h-[240px]"
              >
                {/* Icon & Title */}
                <div className="flex flex-col items-center">
                  <div className="mb-3.5 flex items-center justify-center">
                    {ch.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900">{ch.name}</h3>
                    {ch.badge && (
                      <span className="bg-[#0066ff] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider">
                        {ch.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-[210px]">
                    {ch.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 w-full flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleAction(ch)}
                    className="w-full max-w-[140px] py-2 px-4 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-800 transition-colors cursor-pointer text-center"
                  >
                    {ch.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Telegram, SMS (centered) */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-6">
            {bottomRow.map((ch) => (
              <div
                key={ch.id}
                className="w-full sm:w-[260px] bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center justify-between shadow-2xs hover:shadow-sm transition-shadow min-h-[240px]"
              >
                {/* Icon & Title */}
                <div className="flex flex-col items-center">
                  <div className="mb-3.5 flex items-center justify-center">
                    {ch.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900">{ch.name}</h3>
                    {ch.badge && (
                      <span className="bg-[#0066ff] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider">
                        {ch.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-[210px]">
                    {ch.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 w-full flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleAction(ch)}
                    className="w-full max-w-[140px] py-2 px-4 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-800 transition-colors cursor-pointer text-center"
                  >
                    {ch.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
