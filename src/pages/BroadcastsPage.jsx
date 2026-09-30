// pages/BroadcastsPage.jsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  BroadcastIllustration,
  WhatsAppBrandIcon,
  InstagramIcon,
  MessengerBrandIcon,
  TelegramBrandIcon,
} from '../components/ui/Icons';
import { X, Send, Clock, Users, Sparkles, CheckCircle2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BroadcastsPage() {
  const { onUpgradeClick } = useOutletContext() || {};
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [broadcastName, setBroadcastName] = useState('Summer Promotional Blast');
  const [broadcastMessage, setBroadcastMessage] = useState('Hey {{first_name}}! 🎉 Here is your exclusive 20% discount code: VIP20');
  const [scheduleType, setScheduleType] = useState('now');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) {
      toast.error('Please enter a broadcast message');
      return;
    }
    toast.success(
      scheduleType === 'now'
        ? 'Broadcast sent to all subscribed contacts!'
        : 'Broadcast successfully scheduled!'
    );
    setComposerOpen(false);
    setBroadcastSent(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800 overflow-y-auto">
      {/* Top Header matching Home Page scale */}
      <div className="px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 bg-white">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Broadcasts</h1>
          <button
            onClick={onUpgradeClick}
            className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 font-extrabold text-xs tracking-wider border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            UPGRADE
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap self-start sm:self-auto w-full sm:w-auto">
          <button
            onClick={() => {
              setSelectedChannel('whatsapp');
              setComposerOpen(true);
            }}
            className="flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50/70 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer text-center whitespace-nowrap"
          >
            <span className="hidden sm:inline">Broadcast From Automation</span>
            <span className="sm:hidden">From Automation</span>
          </button>
          <button
            onClick={() => setComposerOpen(true)}
            className="flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New Broadcast</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1400px] px-4 sm:px-8 lg:px-12 py-6 sm:py-8 flex flex-col items-center justify-center flex-1 pb-16">
        {broadcastSent ? (
          <div className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5 font-bold text-slate-900 text-base">
                <CheckCircle2 size={20} className="text-emerald-500" />
                <span>Active Broadcasts</span>
              </div>
              <button
                onClick={() => setComposerOpen(true)}
                className="px-4 py-2 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>New Broadcast</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200/90 rounded-xl">
              <div>
                <div className="font-bold text-slate-900 text-base">{broadcastName}</div>
                <div className="text-slate-500 text-xs sm:text-sm mt-1">
                  Channel: <span className="font-semibold text-slate-700 uppercase">{selectedChannel}</span> • Sent just now to 25 contacts
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Completed
              </span>
            </div>
          </div>
        ) : (
          /* Empty State Card matching Home Page spaciousness */
          <div className="w-full max-w-4xl min-h-[420px] sm:min-h-[520px] border border-slate-200/90 rounded-2xl flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 bg-white shadow-2xs">
            {/* Notification Bell with flame illustration */}
            <div className="mb-6">
              <BroadcastIllustration className="w-44 h-44" />
            </div>

            {/* Heading & Subheading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2.5 tracking-tight text-center">
              Create your first Broadcast
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-lg text-center leading-relaxed mb-8">
              Engage your contacts by sending your Broadcasts immediately or scheduling it on a particular date and time.{' '}
              <a
                href="#learn-more"
                onClick={(e) => {
                  e.preventDefault();
                  toast('Broadcasts documentation opened');
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Learn more
              </a>
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setComposerOpen(true)}
              className="px-7 py-3 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm sm:text-base transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>New Broadcast</span>
            </button>
          </div>
        )}
      </div>

      {/* New Broadcast Composer Modal */}
      {composerOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
            <div className="px-4 sm:px-7 py-3.5 sm:py-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl">New Broadcast</h3>
              <button
                onClick={() => setComposerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="p-4 sm:p-7 space-y-4 sm:space-y-5 overflow-y-auto max-h-[80vh]">
              {/* Broadcast Name */}
              <div>
                <label className="block font-semibold text-slate-700 text-sm mb-1.5">Broadcast Name</label>
                <input
                  type="text"
                  value={broadcastName}
                  onChange={(e) => setBroadcastName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Select Channel */}
              <div>
                <label className="block font-semibold text-slate-700 text-sm mb-1.5">Select Channel</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'whatsapp', name: 'WhatsApp', icon: <WhatsAppBrandIcon className="w-5 h-5" /> },
                    { id: 'instagram', name: 'Instagram', icon: <InstagramIcon className="w-5 h-5" /> },
                    { id: 'messenger', name: 'Messenger', icon: <MessengerBrandIcon className="w-5 h-5" /> },
                    { id: 'telegram', name: 'Telegram', icon: <TelegramBrandIcon className="w-5 h-5" /> },
                  ].map((ch) => (
                    <button
                      type="button"
                      key={ch.id}
                      onClick={() => setSelectedChannel(ch.id)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                        selectedChannel === ch.id
                          ? 'border-blue-500 bg-blue-50/60 text-blue-700 shadow-2xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="mb-1.5">{ch.icon}</span>
                      <span>{ch.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700 text-sm">Message Content</label>
                  <span className="text-xs text-slate-400 font-medium">Supports variable tags</span>
                </div>
                <textarea
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl text-sm resize-none focus:border-blue-500 focus:outline-none leading-relaxed"
                  placeholder="Type your broadcast message here..."
                />
              </div>

              {/* Timing */}
              <div>
                <label className="block font-semibold text-slate-700 text-sm mb-2">Delivery Time</label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700">
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === 'now'}
                      onChange={() => setScheduleType('now')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Send immediately</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700">
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === 'later'}
                      onChange={() => setScheduleType('later')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Schedule for later</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer shadow-xs"
                >
                  {scheduleType === 'now' ? 'Send Broadcast Now' : 'Schedule Broadcast'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
