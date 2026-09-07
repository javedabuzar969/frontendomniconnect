// pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bell,
  Users,
  FileText,
  Monitor,
  CreditCard,
  MessageSquare,
  UserPlus,
  Tag,
  Code,
  Grid,
  Plug,
  DollarSign,
  Layers,
  ExternalLink,
  Check,
  X,
  Copy,
  Plus,
  Radio,
  Power,
  RefreshCw,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppBrandIcon,
  MessengerBrandIcon,
  TelegramBrandIcon,
} from '../components/ui/Icons';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'general';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Form states
  const [urlShortener, setUrlShortener] = useState('My.Many.Chat');
  const [timeZone, setTimeZone] = useState('(UTC-07:00) - Pacific Time - Los Angeles');

  // Channel Connection States (for all 7 channels)
  const [channelStatus, setChannelStatus] = useState({
    instagram: {
      connected: true,
      account: '@omniconnect_official',
      name: 'Instagram Direct & Comments',
      desc: 'Meta Business Suite linked',
      features: ['Auto-reply to Comments', 'Story Mentions', 'Welcome DM', 'Keyword DMs'],
    },
    tiktok: {
      connected: false,
      account: '@omniconnect_tiktok',
      name: 'TikTok Direct Messages',
      desc: 'TikTok for Business Account',
      features: ['Lead Generation DMs', 'Video Comment Auto-Reply'],
    },
    whatsapp: {
      connected: true,
      account: '+1 555 123 4567',
      name: 'WhatsApp Business Cloud API',
      desc: 'WABA ID: 1234567890123456 • Phone ID: 9876543210987654',
      features: ['Template Messages', 'Instant Auto-replies', 'Session Messaging'],
    },
    messenger: {
      connected: true,
      account: 'Omni Connect Global Page',
      name: 'Facebook Messenger',
      desc: 'Facebook Page ID: 1084920491823',
      features: ['Click-to-Messenger Ads', 'Page Messenger', 'Canned Replies'],
    },
    sms: {
      connected: false,
      account: '+1 800 555 0199',
      name: 'SMS Marketing Gateway',
      desc: 'Twilio / Vonage SMS Service',
      features: ['Bulk SMS Campaigns', '2-Way Texting'],
    },
    email: {
      connected: false,
      account: 'support@omniconnect.com',
      name: 'Email Marketing & Broadcasts',
      desc: 'Send branded HTML emails, welcome sequences, and receipts',
      features: ['Transactional Emails', 'Email Sequences'],
    },
    telegram: {
      connected: false,
      account: '@OmniConnectBot',
      name: 'Telegram Bot Channel',
      desc: 'Telegram BotFather API',
      features: ['Telegram Bot Commands', 'Group Announcements'],
    },
  });

  // Modals
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cloneTarget, setCloneTarget] = useState('');

  // Input states for connecting channels
  const [inputs, setInputs] = useState({
    telegramToken: '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ',
    whatsappPhone: '+1 555 123 4567',
    instagramUser: '@omniconnect_official',
    tiktokUser: '@omniconnect_tiktok',
    smsPhone: '+1 800 555 0199',
    emailAddress: 'support@omniconnect.com',
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleToggleChannel = (channelId, targetState = null) => {
    setChannelStatus((prev) => {
      const current = prev[channelId];
      const isConnecting = targetState !== null ? targetState : !current.connected;
      const updated = {
        ...prev,
        [channelId]: {
          ...current,
          connected: isConnecting,
        },
      };
      if (isConnecting) {
        toast.success(`${current.name} connected successfully!`);
      } else {
        toast(`${current.name} disconnected`, { icon: '🔌' });
      }
      return updated;
    });
  };

  const channelsList = [
    { id: 'channels-overview', label: 'All Channels', icon: <Radio className="w-4 h-4 text-blue-600" /> },
    { id: 'instagram', label: 'Instagram', icon: <InstagramIcon className="w-4 h-4" /> },
    { id: 'tiktok', label: 'TikTok', icon: <TikTokIcon className="w-4 h-4 text-slate-900" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppBrandIcon className="w-4 h-4" /> },
    { id: 'messenger', label: 'Messenger', icon: <MessengerBrandIcon className="w-4 h-4" /> },
    {
      id: 'sms',
      label: 'SMS',
      icon: <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] font-bold text-white">S</div>,
    },
    {
      id: 'email',
      label: 'Email',
      icon: <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">@</div>,
    },
    { id: 'telegram', label: 'Telegram', icon: <TelegramBrandIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-full bg-[#fbfbfb] overflow-hidden text-slate-800">
      {/* Settings Sub-Sidebar matching HomePage scale */}
      <aside className="w-64 shrink-0 border-r border-[#eef0f3] overflow-y-auto py-7 px-4 select-none bg-white">
        {/* Main Section */}
        <div className="mb-6">
          <div className="px-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Main</div>
          <div className="space-y-1">
            {[
              { id: 'general', label: 'General' },
              { id: 'notifications', label: 'Notifications' },
              { id: 'team', label: 'Team Members' },
              { id: 'logs', label: 'Logs' },
              { id: 'display', label: 'Display' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-[#00a86b] font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Billing Section */}
        <div className="mb-6">
          <div className="px-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Billing</div>
          <div className="space-y-1">
            <button
              onClick={() => handleTabChange('subscriptions')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'subscriptions'
                  ? 'bg-emerald-50 text-[#00a86b] font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>

        {/* Inbox Section */}
        <div className="mb-6">
          <div className="px-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Inbox</div>
          <div className="space-y-1">
            <button
              onClick={() => handleTabChange('inbox-behavior')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'inbox-behavior'
                  ? 'bg-emerald-50 text-[#00a86b] font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              Inbox Behavior
            </button>
            <button
              onClick={() => handleTabChange('auto-assignment')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'auto-assignment'
                  ? 'bg-emerald-50 text-[#00a86b] font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              Auto-Assignment
            </button>
          </div>
        </div>

        {/* Channels Section with Status Indicator */}
        <div className="mb-6">
          <div className="px-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Channels</span>
            <span className="text-xs text-emerald-600 font-bold">
              {Object.values(channelStatus).filter((c) => c.connected).length}/7 Active
            </span>
          </div>
          <div className="space-y-1">
            {channelsList.map((item) => {
              const isOverview = item.id === 'channels-overview';
              const isConnected = channelStatus[item.id]?.connected;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-emerald-50 text-[#00a86b] font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {!isOverview && (
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isConnected ? 'bg-emerald-500 shadow-xs' : 'bg-slate-300'
                      }`}
                      title={isConnected ? 'Connected' : 'Disconnected'}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Automation Section */}
        <div className="mb-6">
          <div className="px-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Automation</div>
          <div className="space-y-1">
            <button
              onClick={() => handleTabChange('fields')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'fields'
                  ? 'bg-emerald-50 text-[#00a86b] font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              Fields
            </button>
            <button
              onClick={() => handleTabChange('tags')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'tags'
                  ? 'bg-emerald-50 text-[#00a86b] font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              Tags
            </button>
          </div>
        </div>

        {/* Extensions Section */}
        <div className="mb-6">
          <div className="px-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Extensions</div>
          <div className="space-y-1">
            {[
              { id: 'api', label: 'API' },
              { id: 'apps', label: 'Apps' },
              { id: 'integrations', label: 'Integrations' },
              { id: 'payments', label: 'Payments' },
              { id: 'templates', label: 'Installed Templates' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-[#00a86b] font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area matching Home Page scale */}
      <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-8 min-w-0 bg-[#fbfbfb]">
        <div className="max-w-[1200px] w-full space-y-8 pb-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>

          {/* TAB 1: General Settings */}
          {activeTab === 'general' && (
            <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs divide-y divide-slate-200/90">
              {/* Row 1: Card URL Shortener */}
              <div className="flex flex-col md:flex-row md:items-center px-8 py-6 gap-6 hover:bg-slate-50/40 transition-colors">
                <div className="w-64 shrink-0 font-semibold text-slate-900 text-base">
                  Card URL Shortener
                </div>
                <div className="w-72 shrink-0">
                  <input
                    type="text"
                    value={urlShortener}
                    onChange={(e) => setUrlShortener(e.target.value)}
                    className="w-72 px-4 py-2.5 text-sm border border-slate-200 rounded-xl text-slate-800 bg-white text-center shadow-2xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                  If you disable link shortening, we won't be able to provide the Click-Through Rate (CTR) data
                </div>
              </div>

              {/* Row 2: Account Time Zone */}
              <div className="flex flex-col md:flex-row md:items-center px-8 py-6 gap-6 hover:bg-slate-50/40 transition-colors">
                <div className="w-64 shrink-0 font-semibold text-slate-900 text-base">
                  Account Time Zone
                </div>
                <div className="w-72 shrink-0">
                  <select
                    value={timeZone}
                    onChange={(e) => {
                      setTimeZone(e.target.value);
                      toast.success('Time zone updated');
                    }}
                    className="w-72 px-4 py-2.5 text-sm border border-slate-200 rounded-xl text-slate-800 bg-white shadow-2xs focus:border-blue-500 focus:outline-none truncate cursor-pointer font-medium"
                  >
                    <option value="(UTC-07:00) - Pacific Time - Los Angeles">
                      (UTC-07:00) - Pacific Time - Los Angeles
                    </option>
                    <option value="(UTC-05:00) - Eastern Time - New York">
                      (UTC-05:00) - Eastern Time - New York
                    </option>
                    <option value="(UTC+00:00) - UTC / London">
                      (UTC+00:00) - UTC / London
                    </option>
                    <option value="(UTC+05:00) - Pakistan Standard Time - Karachi">
                      (UTC+05:00) - Pakistan Standard Time - Karachi
                    </option>
                  </select>
                </div>
                <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                  All the data in OmniConnect will be displayed and exported according to this timezone.{' '}
                  <a href="#learn-more" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline font-medium">
                    Learn more
                  </a>
                </div>
              </div>

              {/* Row 3: Clone to Another Account */}
              <div className="flex flex-col md:flex-row md:items-center px-8 py-6 gap-6 hover:bg-slate-50/40 transition-colors">
                <div className="w-64 shrink-0 font-semibold text-slate-900 text-base">
                  Clone to Another Account
                </div>
                <div className="w-72 shrink-0">
                  <button
                    onClick={() => setCloneModalOpen(true)}
                    className="px-6 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm transition-colors shadow-xs cursor-pointer"
                  >
                    Clone This Account
                  </button>
                </div>
                <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                  Copy all content to another account
                </div>
              </div>

              {/* Row 4: Use as Template */}
              <div className="flex flex-col md:flex-row md:items-center px-8 py-6 gap-6 hover:bg-slate-50/40 transition-colors">
                <div className="w-64 shrink-0 font-semibold text-slate-900 text-base">
                  Use as Template
                </div>
                <div className="w-72 shrink-0">
                  <button
                    onClick={() => setTemplateModalOpen(true)}
                    className="px-6 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm transition-colors shadow-xs cursor-pointer"
                  >
                    Create Account Template
                  </button>
                </div>
                <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                  Create a snapshot of this account and share it via link
                </div>
              </div>

              {/* Row 5: Leave Account */}
              <div className="flex flex-col md:flex-row md:items-center px-8 py-6 gap-6 hover:bg-slate-50/40 transition-colors">
                <div className="w-64 shrink-0 font-semibold text-slate-900 text-base">
                  Leave Account
                </div>
                <div className="w-72 shrink-0">
                  <button
                    onClick={() => toast('Transfer ownership required before leaving')}
                    className="px-8 py-2.5 bg-[#f4f5f7] hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Leave
                  </button>
                </div>
                <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                  <a href="#transfer" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline font-medium">
                    Transfer
                  </a>{' '}
                  your ownership to another team member if you want to leave this account
                </div>
              </div>

              {/* Row 6: Delete Account */}
              <div className="flex flex-col md:flex-row md:items-center px-8 py-6 gap-6 hover:bg-slate-50/40 transition-colors">
                <div className="w-64 shrink-0 font-semibold text-slate-900 text-base">
                  Delete Account
                </div>
                <div className="w-72 shrink-0">
                  <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="px-8 py-2.5 bg-white hover:bg-red-50 border border-slate-300 text-red-600 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                  Continue to account deletion
                </div>
              </div>
            </div>
          )}

          {/* TAB: ALL CHANNELS OVERVIEW */}
          {activeTab === 'channels-overview' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Omnichannel Hub</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Connect individual channels or activate all of them to power your unified Inbox.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      Object.keys(channelStatus).forEach((k) => handleToggleChannel(k, true));
                    }}
                    className="px-5 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm transition-colors shadow-xs cursor-pointer"
                  >
                    Connect All
                  </button>
                  <button
                    onClick={() => {
                      Object.keys(channelStatus).forEach((k) => handleToggleChannel(k, false));
                    }}
                    className="px-5 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Disconnect All
                  </button>
                </div>
              </div>

              {/* Channels List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {Object.entries(channelStatus).map(([chKey, ch]) => {
                  const chMeta = channelsList.find((c) => c.id === chKey);
                  return (
                    <div
                      key={chKey}
                      className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                        ch.connected
                          ? 'border-emerald-200 bg-emerald-50/30 shadow-2xs'
                          : 'border-slate-200/90 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                          {chMeta?.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm truncate">{ch.name.split(' ')[0]}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                ch.connected
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {ch.connected ? 'Active' : 'Off'}
                            </span>
                          </div>
                          <div className="text-slate-500 text-xs sm:text-[13px] truncate max-w-[160px] mt-0.5">
                            {ch.connected ? ch.account : 'Not linked'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {ch.connected ? (
                          <button
                            onClick={() => handleToggleChannel(chKey, false)}
                            className="px-3.5 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Disconnect
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleChannel(chKey, true)}
                            className="px-4 py-1.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: EMAIL */}
          {activeTab === 'email' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Email Marketing & Broadcasts</h3>
                  <p className="text-slate-500 text-sm mt-1">Send branded HTML emails, welcome sequences, and receipts</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.email.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.email.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              {channelStatus.email.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{channelStatus.email.account}</div>
                    <div className="text-slate-500 text-sm mt-0.5">Custom SMTP / SendGrid active</div>
                  </div>
                  <button
                    onClick={() => handleToggleChannel('email', false)}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Disconnect Email
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <label className="block font-semibold text-slate-700 text-sm">Sender Email Address</label>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="email"
                      value={inputs.emailAddress}
                      onChange={(e) => setInputs({ ...inputs, emailAddress: e.target.value })}
                      className="w-80 px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g. support@omniconnect.com"
                    />
                    <button
                      onClick={() => handleToggleChannel('email', true)}
                      className="px-5 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm shadow-xs shrink-0 cursor-pointer"
                    >
                      Connect Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: TELEGRAM */}
          {activeTab === 'telegram' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#2aabee] flex items-center justify-center text-white shadow-xs">
                    <TelegramBrandIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Telegram Bot Channel</h3>
                    <p className="text-slate-500 text-sm mt-1">Connect your Telegram Bot via BotFather token</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.telegram.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.telegram.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              {channelStatus.telegram.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{channelStatus.telegram.account}</div>
                    <div className="text-slate-500 text-sm mt-0.5">Telegram Bot active and listening to webhooks</div>
                  </div>
                  <button
                    onClick={() => handleToggleChannel('telegram', false)}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Disconnect Telegram
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <label className="block font-semibold text-slate-700 text-sm">BotFather Access Token</label>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="password"
                      value={inputs.telegramToken}
                      onChange={(e) => setInputs({ ...inputs, telegramToken: e.target.value })}
                      className="w-80 px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleToggleChannel('telegram', true)}
                      className="px-5 py-2.5 bg-[#2aabee] hover:bg-[#2399d8] text-white rounded-xl font-semibold text-sm shadow-xs shrink-0 cursor-pointer"
                    >
                      Connect Telegram
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Open Telegram, search for @BotFather, create a bot and paste the API token here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB: INSTAGRAM */}
          {activeTab === 'instagram' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                    <InstagramIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Instagram Direct & Comments</h3>
                    <p className="text-slate-500 text-sm mt-1">Automate Instagram DMs, Story Mentions, Reels Comments & Live reactions</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.instagram.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.instagram.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              {channelStatus.instagram.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-base">{channelStatus.instagram.account}</div>
                      <div className="text-slate-500 text-sm mt-0.5">Professional Business Account linked via Meta</div>
                    </div>
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => toast.success('Instagram refreshed')}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold cursor-pointer"
                      >
                        Refresh
                      </button>
                      <button
                        onClick={() => handleToggleChannel('instagram', false)}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                      >
                        Disconnect Instagram
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <label className="block font-semibold text-slate-700 text-sm">Instagram Handle</label>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="text"
                      value={inputs.instagramUser}
                      onChange={(e) => setInputs({ ...inputs, instagramUser: e.target.value })}
                      className="w-80 px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white"
                      placeholder="@your_handle"
                    />
                    <button
                      onClick={() => handleToggleChannel('instagram', true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-sm font-semibold shrink-0 cursor-pointer shadow-xs"
                    >
                      Connect Instagram
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: TIKTOK */}
          {activeTab === 'tiktok' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                    <TikTokIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">TikTok Direct Messages</h3>
                    <p className="text-slate-500 text-sm mt-1">Automate TikTok Direct Messages, lead generation & comment replies</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.tiktok.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.tiktok.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              {channelStatus.tiktok.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{channelStatus.tiktok.account}</div>
                    <div className="text-slate-500 text-sm mt-0.5">TikTok for Business Account linked</div>
                  </div>
                  <button
                    onClick={() => handleToggleChannel('tiktok', false)}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Disconnect TikTok
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <label className="block font-semibold text-slate-700 text-sm">TikTok Username</label>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="text"
                      value={inputs.tiktokUser}
                      onChange={(e) => setInputs({ ...inputs, tiktokUser: e.target.value })}
                      className="w-80 px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white"
                      placeholder="@your_tiktok"
                    />
                    <button
                      onClick={() => handleToggleChannel('tiktok', true)}
                      className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold shrink-0 cursor-pointer shadow-xs"
                    >
                      Connect TikTok
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                    <WhatsAppBrandIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">WhatsApp Business Cloud API</h3>
                    <p className="text-slate-500 text-sm mt-1">Official WhatsApp Cloud API connection</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.whatsapp.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.whatsapp.connected ? 'Active' : 'Disconnected'}
                </span>
              </div>

              {channelStatus.whatsapp.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{channelStatus.whatsapp.account}</div>
                    <div className="text-slate-500 text-sm mt-0.5">{channelStatus.whatsapp.desc}</div>
                  </div>
                  <button
                    onClick={() => handleToggleChannel('whatsapp', false)}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Disconnect WhatsApp
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <label className="block font-semibold text-slate-700 text-sm">Verified Business Phone</label>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="text"
                      value={inputs.whatsappPhone}
                      onChange={(e) => setInputs({ ...inputs, whatsappPhone: e.target.value })}
                      className="w-80 px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white"
                      placeholder="+1 555 123 4567"
                    />
                    <button
                      onClick={() => handleToggleChannel('whatsapp', true)}
                      className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl text-sm font-semibold shrink-0 cursor-pointer shadow-xs"
                    >
                      Connect WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: MESSENGER */}
          {activeTab === 'messenger' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#0084ff] flex items-center justify-center text-white shadow-xs">
                    <MessengerBrandIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Facebook Messenger</h3>
                    <p className="text-slate-500 text-sm mt-1">Automate Facebook Page conversations</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.messenger.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.messenger.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              {channelStatus.messenger.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{channelStatus.messenger.account}</div>
                    <div className="text-slate-500 text-sm mt-0.5">{channelStatus.messenger.desc}</div>
                  </div>
                  <button
                    onClick={() => handleToggleChannel('messenger', false)}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <button
                    onClick={() => handleToggleChannel('messenger', true)}
                    className="px-5 py-2.5 bg-[#0084ff] hover:bg-[#0073e6] text-white rounded-xl text-sm font-semibold shadow-xs cursor-pointer"
                  >
                    Connect Facebook Page
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: SMS */}
          {activeTab === 'sms' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">SMS Marketing & 2-Way Texting</h3>
                  <p className="text-slate-500 text-sm mt-1">Send 1-to-1 SMS messages, alerts, and OTP codes</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    channelStatus.sms.connected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {channelStatus.sms.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              {channelStatus.sms.connected ? (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{channelStatus.sms.account}</div>
                    <div className="text-slate-500 text-sm mt-0.5">Twilio SMS Gateway active</div>
                  </div>
                  <button
                    onClick={() => handleToggleChannel('sms', false)}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Disconnect SMS
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <label className="block font-semibold text-slate-700 text-sm">Twilio / Vonage Phone Number</label>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="text"
                      value={inputs.smsPhone}
                      onChange={(e) => setInputs({ ...inputs, smsPhone: e.target.value })}
                      className="w-80 px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white"
                      placeholder="+1 800 555 0199"
                    />
                    <button
                      onClick={() => handleToggleChannel('sms', true)}
                      className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold text-sm shadow-xs shrink-0 cursor-pointer"
                    >
                      Connect SMS
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: API */}
          {activeTab === 'api' && (
            <div className="border border-slate-200/90 rounded-2xl p-8 bg-white space-y-6 shadow-2xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900">API Settings & Access Tokens</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Use API tokens to connect external CRMs, Zapier, Webhooks, or custom backend services.
                </p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between max-w-xl">
                <code className="text-sm text-slate-900 font-mono font-bold">
                  mc_live_994a08f234bc81de72019a
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('mc_live_994a08f234bc81de72019a');
                    toast.success('API Key copied to clipboard');
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <Copy size={15} />
                  <span>Copy Token</span>
                </button>
              </div>
            </div>
          )}

          {/* Fallback for other non-channel subtabs */}
          {![
            'general',
            'channels-overview',
            'instagram',
            'tiktok',
            'whatsapp',
            'messenger',
            'telegram',
            'sms',
            'email',
            'api',
          ].includes(activeTab) && (
            <div className="border border-slate-200/90 rounded-2xl p-10 bg-white text-center space-y-4 shadow-2xs">
              <h3 className="text-xl font-bold text-slate-900 capitalize">
                {activeTab.replace('-', ' ')}
              </h3>
              <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                Settings for {activeTab.replace('-', ' ')} are ready and synchronized with Omni Connect Cloud.
              </p>
              <button
                onClick={() => toast.success('Settings saved')}
                className="px-6 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold shadow-xs text-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Clone Account Modal */}
      {cloneModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-7 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Clone To Another Account</h3>
              <button onClick={() => setCloneModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <p className="text-slate-500 text-sm">
              Select destination account to duplicate flows, automations, keywords, and tags.
            </p>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Target Account Name / ID</label>
              <input
                type="text"
                value={cloneTarget}
                onChange={(e) => setCloneTarget(e.target.value)}
                placeholder="e.g. Acme Marketing Backup"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setCloneModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('Account cloned successfully!');
                  setCloneModalOpen(false);
                }}
                className="px-5 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm cursor-pointer shadow-xs"
              >
                Clone Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {templateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-7 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Create Account Template</h3>
              <button onClick={() => setTemplateModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <p className="text-slate-500 text-sm">
              Your template link will include all automation flows and settings so others can install it with one click.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="text-slate-700 font-mono text-xs sm:text-sm truncate">
                https://omniconnect.com/template/share/omni-connect-74892
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText('https://omniconnect.com/template/share/omni-connect-74892');
                  toast.success('Template link copied!');
                }}
                className="text-blue-600 hover:underline font-semibold ml-3 shrink-0 text-sm cursor-pointer"
              >
                Copy
              </button>
            </div>
            <div className="flex justify-end pt-3">
              <button
                onClick={() => setTemplateModalOpen(false)}
                className="px-6 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-semibold text-sm cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-7 border border-slate-200 space-y-5">
            <h3 className="text-xl font-bold text-red-600">Delete Account</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Are you sure you want to delete this account? All automations, contacts, broadcasts, and historical data will be permanently removed.
            </p>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.error('Account deletion requested');
                  setDeleteModalOpen(false);
                }}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm cursor-pointer shadow-xs"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
