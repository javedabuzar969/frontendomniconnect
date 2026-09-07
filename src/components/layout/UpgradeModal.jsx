// components/layout/UpgradeModal.jsx
import React from 'react';
import { X, Check, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#191919] text-white p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            <X size={20} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a86b]/20 border border-[#00a86b]/40 text-[#10b981] text-xs font-bold mb-2.5">
            <Zap size={14} />
            <span>14-Day Free Trial</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Upgrade to Pro</h3>
          <p className="text-sm text-neutral-300 mt-1.5 leading-relaxed">
            Unlock unlimited contacts, advanced automations, WhatsApp API, and OmniConnect AI.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-7 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold">Monthly plan</div>
              <div className="text-3xl font-black text-slate-900 mt-0.5">
                $15<span className="text-sm font-normal text-slate-500"> / month</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#00a86b] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                0% fees for 14 days
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center gap-2.5">
              <Check size={18} className="text-[#00a86b] shrink-0" strokeWidth={2.5} />
              <span>Unlimited Active Contacts & Subscribers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check size={18} className="text-[#00a86b] shrink-0" strokeWidth={2.5} />
              <span>All 7 Channels (WhatsApp, Instagram, TikTok, Messenger, SMS, Email, Telegram)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check size={18} className="text-[#00a86b] shrink-0" strokeWidth={2.5} />
              <span>OmniConnect AI Automated Replies & Goal-Based Agents</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check size={18} className="text-[#00a86b] shrink-0" strokeWidth={2.5} />
              <span>Advanced Broadcast Scheduling & Analytics</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check size={18} className="text-[#00a86b] shrink-0" strokeWidth={2.5} />
              <span>Remove OmniConnect branding from all messages</span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                toast.success('14-Day Free Trial activated successfully!');
                onClose();
              }}
              className="flex-1 py-3 bg-[#007aff] hover:bg-[#0069db] text-white font-semibold rounded-xl text-sm transition-colors shadow-xs cursor-pointer"
            >
              Start 14-Day Free Trial
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
