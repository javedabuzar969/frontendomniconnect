// pages/SettingsPage.jsx — Exact match to Manychat Settings Screenshots
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  X,
  Check,
  ExternalLink,
  HelpCircle,
  Copy,
  Plus,
  Trash2,
  Lock,
  Search,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppBrandIcon,
  MessengerBrandIcon,
  TelegramBrandIcon,
} from '../components/ui/Icons';
import {
  InstagramIllustration,
  TikTokIllustration,
  WhatsAppIllustration,
  MessengerIllustration,
  SMSIllustration,
  EmailIllustration,
  TelegramIllustration,
  GroupsIllustration,
  LogsIllustration,
  FieldsIllustration,
  TagsIllustration,
  AppsIllustration,
  TemplatesRabbitIllustration,
} from '../components/ui/ChannelIllustrations';
import ConnectInstagramModal from '../components/integrations/ConnectInstagramModal';
import ConnectFacebookPageModal from '../components/integrations/ConnectFacebookPageModal';
import toast from 'react-hot-toast';

function Switch({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0066ff]"></div>
      </div>
      {label && <span className="text-xs text-slate-700 font-normal">{label}</span>}
    </label>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'notifications';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sub-tabs for Team Members and Logs
  const [teamSubTab, setTeamSubTab] = useState('members'); // 'members' | 'groups'
  const [logsSubTab, setLogsSubTab] = useState('general'); // 'general' | 'restrictions'

  // General Settings Form states
  const [urlShortener, setUrlShortener] = useState('My.Many.Chat');
  const [timeZone, setTimeZone] = useState('(UTC-07:00) - Pacific Time - Los Angeles');

  // Notifications State (Screenshot 1)
  const [notifyAssignees, setNotifyAssignees] = useState({
    messenger: true,
    sms: false,
    email: true,
    mobilePush: true,
    telegram: false,
  });

  const [inboxDesktopNotifs, setInboxDesktopNotifs] = useState({
    newMessage: false,
    unassignedFolder: false,
    conversationAssigned: false,
  });

  const [inboxChannelNotifs, setInboxChannelNotifs] = useState({
    conversationAssigned: true,
  });

  const userEmail = user?.email || 'javedabuzar969@gmail.com';
  const [notifEmail, setNotifEmail] = useState(userEmail);
  const [notifPhone, setNotifPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);

  // 1. Display Settings (Screenshot 1)
  const [displaySettings, setDisplaySettings] = useState({
    showKeywords: false,
    showRules: false,
    showTemplatesModal: true,
    showOnlySubscribedContacts: false,
  });

  // 2. Subscriptions Settings (Screenshot 2)
  const [contactsSlider, setContactsSlider] = useState(0);

  // 3. Inbox Behavior Settings (Screenshot 3)
  const [inboxBehavior, setInboxBehavior] = useState({
    type: 'any', // 'any' | 'explicit'
    pauseDuration: '30 minutes',
    assignToSameAgent: true,
    grantAccessToAllAgents: false,
    allowSoundAlerts: true,
  });

  // 4. Auto-Assignment Mode (Screenshot 4)
  const [autoAssignmentMode, setAutoAssignmentMode] = useState('off'); // 'off' | 'basic' | 'advanced'

  // 5. Automation: Fields & Tags
  const [customFields, setCustomFields] = useState([
    { id: 1, name: 'lead_score', type: 'Number', description: 'Calculated lead score from funnel' },
    { id: 2, name: 'customer_tier', type: 'Text', description: 'VIP, Standard, or Enterprise' },
  ]);
  const [tagsList, setTagsList] = useState([
    { id: 1, name: 'New Lead', count: 0 },
    { id: 2, name: 'Qualified', count: 0 },
    { id: 3, name: 'Customer', count: 0 },
  ]);
  const [fieldsSubTab, setFieldsSubTab] = useState('user'); // 'user' | 'bot'
  const [fieldsSearch, setFieldsSearch] = useState('');

  // Integrations state
  const [integrationsInputs, setIntegrationsInputs] = useState({
    chatgpt: '',
    claude: '',
    deepseek: '',
    klaviyoPublic: '',
    klaviyoPrivate: '',
    activeCampaignUrl: '',
    activeCampaignKey: '',
    kitSecret: '',
  });

  // Payments State
  const [paymentSettings, setPaymentSettings] = useState({
    sandboxClientId: '',
    sandboxWebhookId: '',
    liveClientId: '',
    liveWebhookId: '',
    currency: 'US Dollar',
    notifyMessenger: false,
    notifyEmail: false,
    sendReceipt: false,
  });

  // Modals
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [connectModal, setConnectModal] = useState({ open: false, channelId: null, accountInput: '' });
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [showFacebookModal, setShowFacebookModal] = useState(false);

  // Channel Connection States (for all 7 channels)
  const [channelStatus, setChannelStatus] = useState(() => {
    const isIgConnected = localStorage.getItem('omni_instagram_connected') === 'true';
    const igAcc = localStorage.getItem('omni_instagram_account') || '@omniconnect_official';
    return {
      instagram: { connected: isIgConnected, account: igAcc, name: 'Instagram' },
      tiktok: { connected: false, account: '@omniconnect_tiktok', name: 'TikTok' },
      whatsapp: { connected: false, account: '+1 555 123 4567', name: 'WhatsApp for your business' },
      messenger: { connected: false, account: 'OmniConnect Global Page', name: 'Facebook Messenger chatbot #1' },
      sms: { connected: false, account: '+1 800 555 0199', name: 'SMS Channel' },
      email: { connected: false, account: 'support@omniconnect.com', name: 'Email Channel' },
      telegram: { connected: false, account: '@OmniConnectBot', name: 'Telegram Channel' },
    };
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleOpenConnectModal = (channelId) => {
    if (channelId === 'instagram') {
      setShowInstagramModal(true);
      return;
    }
    if (channelId === 'messenger') {
      setShowFacebookModal(true);
      return;
    }

    const defaultPlaceholder =
      channelId === 'tiktok'
        ? '@brand_tiktok'
        : channelId === 'whatsapp'
        ? '+1 555 019 2834'
        : channelId === 'sms'
        ? '+1 800 555 0199'
        : channelId === 'email'
        ? 'support@mybusiness.com'
        : '@MyBrandBot';

    setConnectModal({ open: true, channelId, accountInput: defaultPlaceholder });
  };

  const handleConfirmConnect = () => {
    const { channelId, accountInput } = connectModal;
    if (!channelId) return;

    setChannelStatus((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        connected: true,
        account: accountInput.trim() || prev[channelId].account,
      },
    }));

    toast.success(`${channelStatus[channelId]?.name || 'Channel'} connected successfully! 🎉`);
    setConnectModal({ open: false, channelId: null, accountInput: '' });
  };

  const handleDisconnect = (channelId) => {
    setChannelStatus((prev) => ({
      ...prev,
      [channelId]: { ...prev[channelId], connected: false },
    }));
    toast(`${channelStatus[channelId]?.name || 'Channel'} disconnected`, { icon: '🔌' });
  };

  // Channels List matching Screenshots
  const channelsList = [
    {
      id: 'instagram',
      label: 'Instagram',
      title: 'Instagram Channel',
      subtitle: 'Start communicating with your customers via Instagram messages',
      hasLearnMore: false,
      activeColor: 'text-[#e1306c]',
      icon: (
        <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5 text-white shrink-0">
          <InstagramIcon className="w-3 h-3" />
        </div>
      ),
      illustration: <InstagramIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      title: 'TikTok',
      subtitle: "Elevate your marketing with TikTok's seamless automation.",
      hasLearnMore: false,
      activeColor: 'text-black',
      icon: (
        <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white shrink-0">
          <TikTokIcon className="w-2.5 h-2.5" />
        </div>
      ),
      illustration: <TikTokIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      title: 'WhatsApp for your business',
      subtitle: 'Reach a global audience on WhatsApp with broadcasts, automation, and replies in Inbox.',
      hasLearnMore: true,
      activeColor: 'text-[#00a86b]',
      icon: (
        <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
          <WhatsAppBrandIcon className="w-2.5 h-2.5 text-white" />
        </div>
      ),
      illustration: <WhatsAppIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
    {
      id: 'messenger',
      label: 'Messenger',
      title: 'Facebook Messenger chatbot #1',
      subtitle:
        "Sell products, book appointments, nurture leads, capture contact info, and build relationships all through Messenger with OmniConnect's built for mobile chatbot tools.",
      hasLearnMore: true,
      activeColor: 'text-[#0084ff]',
      icon: (
        <div className="w-4 h-4 rounded-full bg-[#0084ff] flex items-center justify-center text-white shrink-0">
          <MessengerBrandIcon className="w-2.5 h-2.5 text-white" />
        </div>
      ),
      illustration: <MessengerIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
    {
      id: 'sms',
      label: 'SMS',
      title: 'SMS Channel',
      subtitle: 'Reach your customers directly on their phones with fast, high-open-rate text messages.',
      hasLearnMore: true,
      activeColor: 'text-[#00c08b]',
      icon: (
        <div className="w-4 h-4 rounded-full bg-[#00c08b] flex items-center justify-center text-white text-[7.5px] font-black shrink-0 tracking-tighter">
          SMS
        </div>
      ),
      illustration: <SMSIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
    {
      id: 'email',
      label: 'Email',
      title: 'Email Channel',
      subtitle: 'Create high-converting email sequences, newsletters, and automated transactional messages.',
      hasLearnMore: true,
      activeColor: 'text-[#8b5cf6]',
      icon: (
        <div className="w-4 h-4 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white text-[8px] font-black shrink-0">
          @
        </div>
      ),
      illustration: <EmailIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      title: 'Telegram Channel',
      subtitle: 'Engage your audience on Telegram with 24/7 automated bots and broadcast channels.',
      hasLearnMore: true,
      activeColor: 'text-[#229ED9]',
      icon: (
        <div className="w-4 h-4 rounded-full bg-[#229ED9] flex items-center justify-center text-white shrink-0">
          <TelegramBrandIcon className="w-2.5 h-2.5 text-white" />
        </div>
      ),
      illustration: <TelegramIllustration className="w-56 h-56 sm:w-64 sm:h-64 animate-fade-in" />,
    },
  ];

  const currentChannel = channelsList.find((ch) => ch.id === activeTab);

  // Sub-sidebar navigation sections
  const mainNavItems = [
    { id: 'general', label: 'General' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'team-members', label: 'Team Members' },
    { id: 'logs', label: 'Logs' },
    { id: 'display', label: 'Display' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#fbfbfb] overflow-hidden text-slate-800 font-sans">
      {/* Mobile Tab Navigation (< lg) */}
      <div className="lg:hidden bg-white border-b border-[#eef0f3] px-3 py-2 shrink-0 space-y-2">
        {/* Quick Section Dropdown for Mobile */}
        <div className="flex items-center gap-2">
          <label htmlFor="settings-tab-select" className="text-xs font-semibold text-slate-500 shrink-0">
            Section:
          </label>
          <select
            id="settings-tab-select"
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
          >
            <optgroup label="Main">
              {mainNavItems.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </optgroup>
            <optgroup label="Billing">
              <option value="subscriptions">Subscriptions</option>
            </optgroup>
            <optgroup label="Inbox">
              <option value="inbox-behavior">Inbox Behavior</option>
              <option value="auto-assignment">Auto-Assignment</option>
            </optgroup>
            <optgroup label="Channels">
              {channelsList.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </optgroup>
            <optgroup label="Automation">
              <option value="fields">Fields</option>
              <option value="tags">Tags</option>
            </optgroup>
            <optgroup label="Extensions">
              <option value="api">API</option>
              <option value="apps">Apps</option>
              <option value="integrations">Integrations</option>
              <option value="payments">Payments</option>
              <option value="installed-templates">Installed Templates</option>
            </optgroup>
          </select>
        </div>

        {/* Quick Horizontal Scroll Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5" style={{ WebkitOverflowScrolling: 'touch' }}>
          {[
            ...mainNavItems,
            { id: 'subscriptions', label: 'Subscriptions' },
            { id: 'inbox-behavior', label: 'Inbox' },
            { id: 'auto-assignment', label: 'Auto-Assign' },
            ...channelsList,
            { id: 'fields', label: 'Fields' },
            { id: 'tags', label: 'Tags' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'payments', label: 'Payments' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeTab === item.id
                  ? 'bg-emerald-100 text-[#00a86b] font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Sidebar matching Manychat exact layout */}
      <aside className="hidden lg:block w-56 xl:w-60 shrink-0 border-r border-[#ececec] overflow-y-auto py-5 px-5 select-none bg-white">
        {/* Header: Settings */}
        <div className="pb-3">
          <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Settings</h2>
        </div>

        {/* Section: Main */}
        <div className="mb-5">
          <div className="pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Main</div>
          <div className="space-y-0.5">
            {mainNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                    isActive ? 'font-bold text-[#00a86b]' : 'text-slate-600 hover:text-slate-900 font-normal'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Billing */}
        <div className="mb-5">
          <div className="pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Billing</div>
          <div className="space-y-0.5">
            <button
              onClick={() => handleTabChange('subscriptions')}
              className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                activeTab === 'subscriptions'
                  ? 'font-bold text-[#00a86b]'
                  : 'text-slate-600 hover:text-slate-900 font-normal'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>

        {/* Section: Inbox */}
        <div className="mb-5">
          <div className="pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inbox</div>
          <div className="space-y-0.5">
            <button
              onClick={() => handleTabChange('inbox-behavior')}
              className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                activeTab === 'inbox-behavior'
                  ? 'font-bold text-[#00a86b]'
                  : 'text-slate-600 hover:text-slate-900 font-normal'
              }`}
            >
              Inbox Behavior
            </button>
            <button
              onClick={() => handleTabChange('auto-assignment')}
              className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                activeTab === 'auto-assignment'
                  ? 'font-bold text-[#00a86b]'
                  : 'text-slate-600 hover:text-slate-900 font-normal'
              }`}
            >
              Auto-Assignment
            </button>
          </div>
        </div>

        {/* Section: Channels */}
        <div className="mb-5">
          <div className="pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Channels</div>
          <div className="space-y-1">
            {channelsList.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-2.5 py-1 text-[13.5px] transition-colors cursor-pointer text-left ${
                    isActive
                      ? `${item.activeColor} font-bold`
                      : 'text-slate-600 hover:text-slate-900 font-normal'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Automation */}
        <div className="mb-5">
          <div className="pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Automation</div>
          <div className="space-y-0.5">
            <button
              onClick={() => handleTabChange('fields')}
              className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                activeTab === 'fields'
                  ? 'font-bold text-[#00a86b]'
                  : 'text-slate-600 hover:text-slate-900 font-normal'
              }`}
            >
              Fields
            </button>
            <button
              onClick={() => handleTabChange('tags')}
              className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                activeTab === 'tags'
                  ? 'font-bold text-[#00a86b]'
                  : 'text-slate-600 hover:text-slate-900 font-normal'
              }`}
            >
              Tags
            </button>
          </div>
        </div>

        {/* Section: Extensions */}
        <div className="mb-5">
          <div className="pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Extensions</div>
          <div className="space-y-0.5">
            {['API', 'Apps', 'Integrations', 'Payments', 'Installed Templates'].map((name) => {
              const id = name.toLowerCase().replace(/\s+/g, '-');
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className={`w-full text-left py-1 text-[13.5px] transition-colors cursor-pointer block ${
                    isActive ? 'font-bold text-[#00a86b]' : 'text-slate-600 hover:text-slate-900 font-normal'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0 bg-[#fbfbfb]">
        {/* ==================================================================== */}
        {/* 1. SCREENSHOT 1: NOTIFICATIONS VIEW                                  */}
        {/* ==================================================================== */}
        {activeTab === 'notifications' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            {/* Card 1: 'Notify Assignees' Action [PRO] */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">'Notify Assignees' Action</span>
                    <span className="px-1.5 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">
                      PRO
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifyAssignees.messenger}
                      onChange={(e) => setNotifyAssignees({ ...notifyAssignees, messenger: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Messenger</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifyAssignees.sms}
                      onChange={(e) => setNotifyAssignees({ ...notifyAssignees, sms: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifyAssignees.email}
                      onChange={(e) => setNotifyAssignees({ ...notifyAssignees, email: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifyAssignees.mobilePush}
                      onChange={(e) => setNotifyAssignees({ ...notifyAssignees, mobilePush: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Mobile push notification</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifyAssignees.telegram}
                      onChange={(e) => setNotifyAssignees({ ...notifyAssignees, telegram: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Telegram</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </label>
                </div>

                <div className="md:col-span-5 text-xs text-slate-500 space-y-3 leading-relaxed">
                  <p>
                    Enable to let OmniConnect send you notifications when a contact performs a specific action in your
                    broadcasts, welcome messages, opt-in messages, etc.
                  </p>
                  <p>Download OmniConnect application to receive push notifications and stay informed.</p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toast('Opening Apple App Store')}
                      className="px-2.5 py-1 bg-black text-white text-[10px] font-semibold rounded flex items-center gap-1.5 hover:bg-neutral-800 cursor-pointer"
                    >
                      <span> App Store</span>
                    </button>
                    <button
                      onClick={() => toast('Opening Google Play Store')}
                      className="px-2.5 py-1 bg-black text-white text-[10px] font-semibold rounded flex items-center gap-1.5 hover:bg-neutral-800 cursor-pointer"
                    >
                      <span>▶ Google Play</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Inbox Desktop Notifications */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-sm">Inbox Desktop Notifications</span>
                </div>

                <div className="md:col-span-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-600 mb-1">Notify me when</div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={inboxDesktopNotifs.newMessage}
                      onChange={(e) =>
                        setInboxDesktopNotifs({ ...inboxDesktopNotifs, newMessage: e.target.checked })
                      }
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>I get a new message from a conversation assigned to me</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={inboxDesktopNotifs.unassignedFolder}
                      onChange={(e) =>
                        setInboxDesktopNotifs({ ...inboxDesktopNotifs, unassignedFolder: e.target.checked })
                      }
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>There is a new conversation in unassigned folder</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={inboxDesktopNotifs.conversationAssigned}
                      onChange={(e) =>
                        setInboxDesktopNotifs({ ...inboxDesktopNotifs, conversationAssigned: e.target.checked })
                      }
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>A conversation is assigned to me</span>
                  </label>
                </div>

                <div className="md:col-span-5 text-xs text-slate-500 leading-relaxed">
                  <p>
                    Enable instant popup notifications on your desktop about new messages and assigned
                    conversations. If you don't see the notifications, check your system settings if notifications
                    are on.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Inbox Channel Notifications */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-sm">Inbox Channel Notifications</span>
                </div>

                <div className="md:col-span-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-600 mb-1">Notify me when</div>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={inboxChannelNotifs.conversationAssigned}
                      onChange={(e) =>
                        setInboxChannelNotifs({ ...inboxChannelNotifs, conversationAssigned: e.target.checked })
                      }
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>A conversation is assigned to me</span>
                  </label>
                </div>

                <div className="md:col-span-5 text-xs text-slate-500 leading-relaxed">
                  <p>
                    Inbox notifications help you support your audience and track leads across the connected
                    channels below, like Email, SMS, and Telegram.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: My Telegram for Notifications */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-sm">My Telegram for Notifications</span>
                </div>

                <div className="md:col-span-5">
                  <button
                    onClick={() => toast.success('Redirecting to Telegram Bot...')}
                    className="w-full sm:w-auto px-7 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-medium text-xs transition-colors cursor-pointer"
                  >
                    Subscribe With Telegram
                  </button>
                </div>

                <div className="md:col-span-4 text-xs text-slate-500">
                  Opt-in to our bot to be able to receive bot notifications in Telegram
                </div>
              </div>
            </div>

            {/* Card 5: My Email for Notifications */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-sm">My Email for Notifications</span>
                </div>

                <div className="md:col-span-5 flex items-center gap-2">
                  <input
                    type="email"
                    value={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded focus:border-blue-500 focus:outline-none bg-white text-slate-800"
                  />
                  <button
                    onClick={() => toast.success('Notification email updated!')}
                    className="px-5 py-1.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-medium text-xs transition-colors cursor-pointer shrink-0"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6: My Phone Number for Notifications */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-sm">My Phone Number for Notifications</span>
                </div>

                <div className="md:col-span-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={notifPhone}
                      onChange={(e) => setNotifPhone(e.target.value)}
                      placeholder="Enter phone"
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded focus:border-blue-500 focus:outline-none bg-white text-slate-800"
                    />
                    <button
                      disabled={!notifPhone.trim() || !smsConsent}
                      onClick={() => toast.success('Phone number saved!')}
                      className={`px-6 py-1.5 rounded font-medium text-xs transition-colors shrink-0 ${
                        notifPhone.trim() && smsConsent
                          ? 'bg-[#0066ff] hover:bg-[#0052cc] text-white cursor-pointer'
                          : 'bg-blue-200 text-white cursor-not-allowed'
                      }`}
                    >
                      Save
                    </button>
                  </div>
                  <label className="flex items-start gap-2 text-[11px] text-slate-500 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0 mt-0.5 cursor-pointer"
                    />
                    <span>
                      I confirm that the phone number is owned by me and I give permission to send me SMS notifications.
                    </span>
                  </label>
                </div>

                <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                  Add your phone number to receive SMS notifications. Please note that you will be charged for every SMS
                  notification.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 2. SCREENSHOT 2: GENERAL VIEW                                        */}
        {/* ==================================================================== */}
        {activeTab === 'general' && (
          <div className="max-w-6xl w-full mx-auto animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
              {/* Row 1: Card URL Shortener */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 font-semibold text-slate-900 text-sm">Card URL Shortener</div>
                <div className="md:col-span-5">
                  <input
                    type="text"
                    value={urlShortener}
                    onChange={(e) => setUrlShortener(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs text-center border border-slate-200 rounded focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                  If you disable link shortening, we won't be able to provide the Click-Through Rate (CTR) data
                </div>
              </div>

              {/* Row 2: Account Time Zone */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 font-semibold text-slate-900 text-sm">Account Time Zone</div>
                <div className="md:col-span-5">
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded focus:border-blue-500 focus:outline-none cursor-pointer bg-white"
                  >
                    <option value="(UTC-07:00) - Pacific Time - Los Angeles">
                      (UTC-07:00) - Pacific Time - Los Angeles
                    </option>
                    <option value="(UTC-05:00) - Eastern Time - New York">
                      (UTC-05:00) - Eastern Time - New York
                    </option>
                    <option value="(UTC+00:00) - UTC / London">(UTC+00:00) - UTC / London</option>
                    <option value="(UTC+05:00) - Pakistan Standard Time - Karachi">
                      (UTC+05:00) - Pakistan Standard Time - Karachi
                    </option>
                  </select>
                </div>
                <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                  All the data in OmniConnect will be displayed and exported according to this timezone.{' '}
                  <a href="#learn-more" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                    Learn more
                  </a>
                </div>
              </div>

              {/* Row 3: Clone to Another Account */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 font-semibold text-slate-900 text-sm">Clone to Another Account</div>
                <div className="md:col-span-5">
                  <button
                    onClick={() => toast.success('Account cloned successfully!')}
                    className="px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-medium text-xs transition-colors cursor-pointer"
                  >
                    Clone This Account
                  </button>
                </div>
                <div className="md:col-span-4 text-xs text-slate-500">Copy all content to another account</div>
              </div>

              {/* Row 4: Use as Template */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 font-semibold text-slate-900 text-sm">Use as Template</div>
                <div className="md:col-span-5">
                  <button
                    onClick={() => toast.success('Template link generated!')}
                    className="px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-medium text-xs transition-colors cursor-pointer"
                  >
                    Create Account Template
                  </button>
                </div>
                <div className="md:col-span-4 text-xs text-slate-500">
                  Create a snapshot of this account and share it via link
                </div>
              </div>

              {/* Row 5: Leave Account */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 font-semibold text-slate-900 text-sm">Leave Account</div>
                <div className="md:col-span-5">
                  <button
                    onClick={() => toast('Transfer ownership first')}
                    className="px-6 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded text-xs font-medium cursor-pointer"
                  >
                    Leave
                  </button>
                </div>
                <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                  <a href="#transfer" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                    Transfer
                  </a>{' '}
                  your ownership to another team member if you want to leave this account
                </div>
              </div>

              {/* Row 6: Delete Account */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 font-semibold text-slate-900 text-sm">Delete Account</div>
                <div className="md:col-span-5">
                  <button
                    onClick={() => toast.error('Account deletion requested')}
                    className="px-6 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded text-xs font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="md:col-span-4 text-xs text-slate-500">Continue to account deletion</div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 3. SCREENSHOT 3 & 4: TEAM MEMBERS (MEMBERS + GROUPS)                  */}
        {/* ==================================================================== */}
        {activeTab === 'team-members' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            {/* Top Sub-Tabs (Team members | Groups) */}
            <div className="flex items-center gap-6 border-b border-slate-200 px-2 pb-0">
              <button
                onClick={() => setTeamSubTab('members')}
                className={`pb-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                  teamSubTab === 'members'
                    ? 'border-[#0066ff] text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                Team members
              </button>
              <button
                onClick={() => setTeamSubTab('groups')}
                className={`pb-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                  teamSubTab === 'groups'
                    ? 'border-[#0066ff] text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                Groups
              </button>
            </div>

            {/* Sub-Tab 1: Team members list (Screenshot 3) */}
            {teamSubTab === 'members' && (
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Team members for {user?.workspace || 'new WhatsApp account'}
                  </h3>
                  <button
                    onClick={() => setInviteModalOpen(true)}
                    className="px-4 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-semibold text-xs transition-colors cursor-pointer shrink-0"
                  >
                    + Invite New Member
                  </button>
                </div>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="font-bold text-slate-700">Owner</div>
                  <p className="leading-relaxed">
                    Owner controls contact roles management. Owner can also disable and clone the bot, share its
                    contents, create and install templates, manage billing and payments. There is only one owner
                    role per account.
                  </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold text-center">Inbox seat ⓘ</th>
                        <th className="pb-3 font-semibold text-center">Billing ⓘ</th>
                        <th className="pb-3 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center text-[10px] font-bold">
                              {(user?.name || 'A')[0].toUpperCase()}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-800">
                                {user?.email?.split('@')[0] || 'javedabuzar969'}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-full">
                                It's me
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <Check size={14} className="mx-auto text-slate-500 stroke-[2.5]" />
                        </td>
                        <td className="py-4 text-center">
                          <Check size={14} className="mx-auto text-slate-500 stroke-[2.5]" />
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => toast('Owner permissions are fixed')}
                            className="text-blue-600 hover:underline font-medium cursor-pointer"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Groups (Screenshot 4) */}
            {teamSubTab === 'groups' && (
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs min-h-[500px] flex flex-col items-center justify-center text-center p-8 sm:p-12">
                <div className="transform transition-transform hover:scale-105 duration-300">
                  <GroupsIllustration className="w-64 h-64" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-4">
                  Create your first Group
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-2 leading-relaxed">
                  Group team members based on skill, experience, support-level etc. Use groups to organize your team
                  work and assign Inbox conversations.{' '}
                  <a href="#learn-more" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                    Learn more
                  </a>
                </p>
                <button
                  onClick={() => setGroupModalOpen(true)}
                  className="mt-6 px-6 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  + Group
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* 4. SCREENSHOT 5: LOGS VIEW                                           */}
        {/* ==================================================================== */}
        {activeTab === 'logs' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            {/* Top Sub-Tabs (General | Facebook page restrictions) */}
            <div className="flex items-center gap-6 border-b border-slate-200 px-2 pb-0">
              <button
                onClick={() => setLogsSubTab('general')}
                className={`pb-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                  logsSubTab === 'general'
                    ? 'border-[#0066ff] text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setLogsSubTab('restrictions')}
                className={`pb-2.5 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                  logsSubTab === 'restrictions'
                    ? 'border-[#0066ff] text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                Facebook page restrictions
              </button>
            </div>

            {/* Meditating Yogi Illustration + Empty Logs State */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs min-h-[500px] flex flex-col items-center justify-center text-center p-8 sm:p-12">
              <div className="transform transition-transform hover:scale-105 duration-300">
                <LogsIllustration className="w-56 h-56" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-4">
                No error or warning logs!
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-2 leading-relaxed">
                Everything is OK right now. You'll see error and warning logs here if something happens with Dynamic
                Block requests.
              </p>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 5. CHANNELS VIEW (Instagram, TikTok, WhatsApp, Messenger, etc.)      */}
        {/* ==================================================================== */}
        {currentChannel && (
          <div className="max-w-5xl w-full mx-auto animate-fade-in pb-16">
            <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs min-h-[540px] sm:min-h-[590px] flex flex-col items-center justify-center text-center p-6 sm:p-12 transition-all">
              {/* Vector Illustration */}
              <div className="mb-2 transform transition-transform hover:scale-105 duration-300">
                {currentChannel.illustration}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-[27px] font-extrabold text-slate-900 tracking-tight mt-6 sm:mt-7">
                {currentChannel.title}
              </h2>

              {/* Subtitle */}
              <p className="text-slate-500 text-sm sm:text-[15px] max-w-lg mt-3 leading-relaxed">
                {currentChannel.subtitle}{' '}
                {currentChannel.hasLearnMore && (
                  <a
                    href="#learn-more"
                    onClick={(e) => {
                      e.preventDefault();
                      toast('OmniConnect documentation for ' + currentChannel.label);
                    }}
                    className="text-[#0066ff] hover:underline font-normal cursor-pointer"
                  >
                    Learn more
                  </a>
                )}
              </p>

              {/* Connect Button or Connected Info */}
              <div className="mt-7 sm:mt-8 flex flex-col items-center gap-3">
                {channelStatus[activeTab]?.connected ? (
                  <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Connected to {channelStatus[activeTab].account}</span>
                    </div>
                    <button
                      onClick={() => handleDisconnect(activeTab)}
                      className="px-5 py-2 bg-white border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenConnectModal(activeTab)}
                    className="px-8 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-sm rounded-lg transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 6. DISPLAY VIEW (Screenshot 1)                                       */}
        {/* ==================================================================== */}
        {activeTab === 'display' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
              {/* Row 1: Automation additional tabs */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Automation additional tabs</span>
                </div>
                <div className="md:col-span-4 space-y-3">
                  <Switch
                    checked={displaySettings.showKeywords}
                    onChange={(checked) => setDisplaySettings({ ...displaySettings, showKeywords: checked })}
                    label="Show Keywords section"
                  />
                  <div>
                    <Switch
                      checked={displaySettings.showRules}
                      onChange={(checked) => setDisplaySettings({ ...displaySettings, showRules: checked })}
                      label="Show Rules section"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Show a list view of Keywords or Rules in the Automation section.
                </div>
              </div>

              {/* Row 2: Ready-to-Go Templates */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Ready-to-Go Templates</span>
                </div>
                <div className="md:col-span-4">
                  <Switch
                    checked={displaySettings.showTemplatesModal}
                    onChange={(checked) => setDisplaySettings({ ...displaySettings, showTemplatesModal: checked })}
                    label="Show Templates modal"
                  />
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Show the "Ready-to-Go Templates" modal when creating the Automation.
                </div>
              </div>

              {/* Row 3: Contacts */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Contacts</span>
                </div>
                <div className="md:col-span-4">
                  <Switch
                    checked={displaySettings.showOnlySubscribedContacts}
                    onChange={(checked) => setDisplaySettings({ ...displaySettings, showOnlySubscribedContacts: checked })}
                    label="Show only subscribed contacts"
                  />
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Hide all unsubscribed contacts and visitors.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 7. SUBSCRIPTIONS VIEW (Screenshot 2)                                 */}
        {/* ==================================================================== */}
        {activeTab === 'subscriptions' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Subscriptions</h2>

            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
              {/* Top Section: Your Plan Free + Activate Trial */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Your plan</div>
                  <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-0.5">Free</div>
                </div>
                <button
                  onClick={() => toast.success('14-Day Free Trial activated! 🚀')}
                  className="bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors shadow-2xs cursor-pointer"
                >
                  Activate Trial
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 pt-6">
                <div className="text-sm font-bold text-slate-900">Contacts</div>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                  The price of your plan is based on the number of contacts in your OmniConnect account, set a contact limit to control how your list scales and the amount you pay.
                </p>

                {/* Slider Scale */}
                <div className="mt-8 max-w-3xl">
                  {/* Pin Indicator */}
                  <div className="flex flex-col items-start pl-0.5">
                    <span className="text-[11px] font-bold text-slate-900">0</span>
                    <span className="text-[10px] text-slate-400 font-medium">Your Active contacts</span>
                    <span className="text-[#0066ff] text-[9px] -mt-0.5">▼</span>
                  </div>

                  {/* Range Slider Track */}
                  <div className="relative mt-1 mb-1">
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={contactsSlider}
                      onChange={(e) => setContactsSlider(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
                    />
                  </div>

                  {/* Bound Labels */}
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>0</span>
                    <span>25</span>
                  </div>

                  {/* Metrics 3 Columns */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 mt-6 max-w-xl">
                    <div>
                      <div className="text-xs text-slate-400">Inbox Seats</div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5">1/1</div>
                    </div>
                    <div className="border-l border-slate-100 pl-6">
                      <div className="text-xs text-slate-400">Price</div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5">$0</div>
                    </div>
                    <div className="border-l border-slate-100 pl-6">
                      <div className="text-xs text-slate-400">Contacts</div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5">{contactsSlider}/25</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 8. INBOX BEHAVIOR VIEW (Screenshot 3)                                */}
        {/* ==================================================================== */}
        {activeTab === 'inbox-behavior' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
              {/* Row 1: Inbox Behavior */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Inbox Behavior</span>
                </div>
                <div className="md:col-span-4 space-y-2.5">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="inboxBehaviorType"
                      value="any"
                      checked={inboxBehavior.type === 'any'}
                      onChange={() => setInboxBehavior({ ...inboxBehavior, type: 'any' })}
                      className="accent-[#0066ff] w-4 h-4 cursor-pointer"
                    />
                    <span>Any message starts a conversation</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="inboxBehaviorType"
                      value="explicit"
                      checked={inboxBehavior.type === 'explicit'}
                      onChange={() => setInboxBehavior({ ...inboxBehavior, type: 'explicit' })}
                      className="accent-[#0066ff] w-4 h-4 cursor-pointer"
                    />
                    <span>Conversation should be opened explicitly</span>
                  </label>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Open a new chat in Inbox with any message from a contact and mark it "Unassigned". This setting excludes automated conversations located in the "Closed" folder.
                </div>
              </div>

              {/* Row 2: Close all assigned conversations */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Close all assigned conversations</span>
                </div>
                <div className="md:col-span-4">
                  <button
                    onClick={() => toast.success('All assigned conversations have been closed.')}
                    className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    Close All
                  </button>
                </div>
                <div className="md:col-span-5"></div>
              </div>

              {/* Row 3: Pause automations during conversations */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Pause automations during conversations</span>
                </div>
                <div className="md:col-span-4">
                  <select
                    value={inboxBehavior.pauseDuration}
                    onChange={(e) => setInboxBehavior({ ...inboxBehavior, pauseDuration: e.target.value })}
                    className="w-full max-w-[220px] px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-[#0066ff] cursor-pointer"
                  >
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="24 hours">24 hours</option>
                    <option value="Until closed manually">Until closed manually</option>
                  </select>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  During a chat conversation with an Inbox Agent, all Automations associated with a contact will be temporarily paused for a selected duration.
                </div>
              </div>

              {/* Row 4: Re-opened conversations */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Re-opened conversations</span>
                </div>
                <div className="md:col-span-4">
                  <Switch
                    checked={inboxBehavior.assignToSameAgent}
                    onChange={(checked) => setInboxBehavior({ ...inboxBehavior, assignToSameAgent: checked })}
                    label="Assign to the same agent"
                  />
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  When contact re-opens a closed conversation you can assign it to the same agent that previously worked on it. Either way conversation will be moved to the Unassigned folder.
                </div>
              </div>

              {/* Row 5: Conversations visibility */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Conversations visibility</span>
                </div>
                <div className="md:col-span-4">
                  <Switch
                    checked={inboxBehavior.grantAccessToAllAgents}
                    onChange={(checked) => setInboxBehavior({ ...inboxBehavior, grantAccessToAllAgents: checked })}
                    label="Grant access to all conversations for all Agents"
                  />
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Disable this option, if you want Inbox agents to have access only to new conversations and conversations that are assigned to them.
                </div>
              </div>

              {/* Row 6: Sound notifications */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Sound notifications</span>
                </div>
                <div className="md:col-span-4">
                  <Switch
                    checked={inboxBehavior.allowSoundAlerts}
                    onChange={(checked) => setInboxBehavior({ ...inboxBehavior, allowSoundAlerts: checked })}
                    label="Allow in-app sound alerts"
                  />
                </div>
                <div className="md:col-span-5"></div>
              </div>

              {/* Row 7: Canned Response [UPGRADE] */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Canned Response</span>
                  <HelpCircle size={13} className="text-slate-400" />
                  <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">
                    UPGRADE
                  </span>
                </div>
                <div className="md:col-span-4"></div>
                <div className="md:col-span-5 flex justify-end">
                  <button
                    onClick={() => toast.success('Free Trial started for Canned Responses')}
                    className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 9. AUTO-ASSIGNMENT VIEW (Screenshot 4)                               */}
        {/* ==================================================================== */}
        {activeTab === 'auto-assignment' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-5">
              {/* Header Title & Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Auto-Assignment</h2>
                <span className="px-2.5 py-0.5 bg-[#fef3c7] text-[#b45309] text-[11px] font-semibold rounded-md">
                  Upgrade your plan to enable
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1 max-w-3xl">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Use Auto-Assignment to distribute conversations among agents. System automatically assigns chats to team members. Go to the team member's profile to set up their conversations limits.
                </p>
                <a
                  href="#learn-more"
                  onClick={(e) => {
                    e.preventDefault();
                    toast('OmniConnect documentation for Auto-Assignment');
                  }}
                  className="text-[#0066ff] hover:underline text-xs font-medium inline-block cursor-pointer"
                >
                  Learn more
                </a>
              </div>

              {/* 3 Option Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                {/* Card 1: Off (Selected) */}
                <div
                  onClick={() => setAutoAssignmentMode('off')}
                  className={`border rounded-xl p-4 transition-all cursor-pointer ${
                    autoAssignmentMode === 'off'
                      ? 'border-blue-500 ring-1 ring-blue-500/20 bg-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="assignmentMode"
                      checked={autoAssignmentMode === 'off'}
                      onChange={() => setAutoAssignmentMode('off')}
                      className="accent-[#0066ff] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-900">Off</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed pl-6.5">
                    Team members pick conversations manually from Unassigned folder.
                  </p>
                </div>

                {/* Card 2: Basic [UPGRADE] */}
                <div
                  onClick={() => setAutoAssignmentMode('basic')}
                  className={`border rounded-xl p-4 transition-all cursor-pointer ${
                    autoAssignmentMode === 'basic'
                      ? 'border-blue-500 ring-1 ring-blue-500/20 bg-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="assignmentMode"
                        checked={autoAssignmentMode === 'basic'}
                        onChange={() => setAutoAssignmentMode('basic')}
                        className="accent-[#0066ff] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">Basic</span>
                    </div>
                    <span className="px-1.5 py-0.5 border border-[#0066ff] text-[#0066ff] text-[10px] font-bold rounded">
                      UPGRADE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed pl-6.5">
                    Distribute conversations among all your available team members.
                  </p>
                </div>

                {/* Card 3: Advanced [UPGRADE] */}
                <div
                  onClick={() => setAutoAssignmentMode('advanced')}
                  className={`border rounded-xl p-4 transition-all cursor-pointer ${
                    autoAssignmentMode === 'advanced'
                      ? 'border-blue-500 ring-1 ring-blue-500/20 bg-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="assignmentMode"
                        checked={autoAssignmentMode === 'advanced'}
                        onChange={() => setAutoAssignmentMode('advanced')}
                        className="accent-[#0066ff] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">Advanced</span>
                    </div>
                    <span className="px-1.5 py-0.5 border border-[#0066ff] text-[#0066ff] text-[10px] font-bold rounded">
                      UPGRADE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed pl-6.5">
                    Assign conversations to Groups or team members with Rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 10. AUTOMATION: FIELDS & TAGS                                       */}
        {/* ==================================================================== */}
        {/* ==================================================================== */}
        {/* 10. AUTOMATION: FIELDS VIEW (Screenshot 1)                          */}
        {/* ==================================================================== */}
        {activeTab === 'fields' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            {/* Top Sub-Navigation Bar: User Fields | Bot Fields + Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-6 border-b border-transparent">
                <button
                  onClick={() => setFieldsSubTab('user')}
                  className={`pb-2 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                    fieldsSubTab === 'user'
                      ? 'border-[#0066ff] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                  }`}
                >
                  User Fields
                </button>
                <button
                  onClick={() => setFieldsSubTab('bot')}
                  className={`pb-2 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                    fieldsSubTab === 'bot'
                      ? 'border-[#0066ff] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                  }`}
                >
                  Bot Fields
                </button>
              </div>

              {/* Search by User Field name */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={fieldsSearch}
                  onChange={(e) => setFieldsSearch(e.target.value)}
                  placeholder="Search by User Field name"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0066ff] shadow-2xs"
                />
              </div>
            </div>

            {/* Empty State Card with Fields Illustration */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs min-h-[460px] flex flex-col items-center justify-center text-center p-8 sm:p-12">
              <div className="transform transition-transform hover:scale-105 duration-300 mb-2">
                <FieldsIllustration className="w-56 h-56" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-3">
                No User Fields
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Create your first User Field!
              </p>

              <button
                onClick={() => {
                  const name = prompt('Field name:');
                  if (name) toast.success(`Field "${name}" created!`);
                }}
                className="mt-5 px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
              >
                + New User Field
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 11. AUTOMATION: TAGS VIEW (Screenshot 2)                            */}
        {/* ==================================================================== */}
        {activeTab === 'tags' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            {/* Empty State Card with Tags Illustration */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs min-h-[500px] flex flex-col items-center justify-center text-center p-8 sm:p-12">
              <div className="transform transition-transform hover:scale-105 duration-300 mb-2">
                <TagsIllustration className="w-56 h-56" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-3">
                No Tags
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Create your first Tag!
              </p>

              <button
                onClick={() => {
                  const name = prompt('Tag name:');
                  if (name) toast.success(`Tag "${name}" created!`);
                }}
                className="mt-5 px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
              >
                + New Tag
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 12. EXTENSIONS: API VIEW (Screenshot 3)                             */}
        {/* ==================================================================== */}
        {activeTab === 'api' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Col 1: Get API Key + UPGRADE badge */}
                <div className="md:col-span-3 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 text-sm">Get API Key</span>
                  <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">
                    UPGRADE
                  </span>
                </div>

                {/* Col 2: Input + Generate Button */}
                <div className="md:col-span-5 space-y-3">
                  <input
                    type="text"
                    placeholder="Your API Key"
                    disabled
                    className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-md text-slate-400 focus:outline-none cursor-not-allowed select-none"
                  />
                  <div>
                    <button
                      onClick={() => toast('Upgrade to Pro to generate your API Key', { icon: '🔒' })}
                      className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      Generate Your API Key
                    </button>
                  </div>
                </div>

                {/* Col 3: Swagger and Help links */}
                <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                  <p>OmniConnect API is a Pro feature.</p>
                  <p className="mt-1">
                    Here is the{' '}
                    <a
                      href="#swagger"
                      onClick={(e) => {
                        e.preventDefault();
                        toast('Opening Swagger API documentation...');
                      }}
                      className="text-[#0066ff] hover:underline cursor-pointer"
                    >
                      link
                    </a>{' '}
                    to Swagger where you can try our API. Help article is available{' '}
                    <a
                      href="#help"
                      onClick={(e) => {
                        e.preventDefault();
                        toast('Opening API Help center...');
                      }}
                      className="text-[#0066ff] hover:underline cursor-pointer"
                    >
                      here
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 13. EXTENSIONS: INSTALLED APPS (Screenshot 4)                       */}
        {/* ==================================================================== */}
        {activeTab === 'apps' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
              {/* Header inside card matching Screenshot 4 */}
              <h3 className="text-[15px] font-bold text-slate-900 pb-3 border-b border-slate-200">
                Installed Apps
              </h3>

              {/* Empty Apps state */}
              <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center">
                <div className="transform transition-transform hover:scale-105 duration-300 mb-2">
                  <AppsIllustration className="w-56 h-56" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-3">
                  You have no installed Apps.
                </h3>
                <p className="text-slate-600 text-xs font-medium mt-1">
                  Get started with one of our apps.
                </p>

                <button
                  onClick={() => toast('Browsing OmniConnect App Store...')}
                  className="mt-5 px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  Visit App Store
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 14. EXTENSIONS: INTEGRATIONS VIEW (Screenshots 1-4)                 */}
        {/* ==================================================================== */}
        {activeTab === 'integrations' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            {/* 1. GDPR Info Alert Banner */}
            <div className="bg-[#f0f7ff] border border-[#bae0ff] rounded-xl p-3.5 sm:p-4 flex items-start gap-3 text-xs text-[#0050b3] leading-relaxed shadow-2xs">
              <span className="text-sm font-bold shrink-0 mt-0.5">ⓘ</span>
              <span>
                If you or your contacts are located in the European Economic Area (EEA), please be sure to obtain contacts' consent to transferring their data to any 3rd party you are integrating with in order to comply with GDPR.
              </span>
            </div>

            {/* 2. Top Action: Can't find what you need? Ask Us For It */}
            <div className="flex justify-end items-center gap-3 py-1">
              <span className="text-xs text-slate-500">Can't find what you need?</span>
              <button
                onClick={() => toast.success('Feedback received! Thank you for your request.')}
                className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <span>📄</span>
                <span>Ask Us For It</span>
              </button>
            </div>

            {/* 3. Integration Cards List (All 12 Integrations) */}
            <div className="space-y-4">
              {/* Card 1: TikTok Ads */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect TikTok Ads Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                    <span className="px-1 py-0.2 bg-[#10b981] text-white text-[9px] font-extrabold rounded">BETA</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                        <TikTokIcon className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">TikTok Ads</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">Step 1</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Authorize via TikTok. On the next screen, click "Confirm" without changing permissions.
                    </p>

                    <button
                      onClick={() => toast.success('Connecting TikTok Ads Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect TikTok Ads Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>Optimize your ad targeting with seamless OmniConnect integration.</p>
                    <p>Use clicks in TikTok Instant Messaging Ads as a trigger to start automation in WhatsApp or Facebook Messenger.</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Flodesk */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect Flodesk Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                    <span className="px-1 py-0.2 bg-[#10b981] text-white text-[9px] font-extrabold rounded">BETA</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center font-serif italic font-black text-black text-base shrink-0">
                        f
                      </div>
                      <span className="text-xs font-bold text-slate-900">Flodesk</span>
                    </div>

                    <button
                      onClick={() => toast.success('Connecting Flodesk Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect Flodesk Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    The integration provides you with an ability to save customers data from OmniConnect to Flodesk. Create a contact if it doesn't exist in Flodesk already, or update it with Contact's Custom Fields if it does.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening Flodesk guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Google Sheets */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect Google Sheets Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded bg-[#0f9d58] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        ⊞
                      </div>
                      <span className="text-xs font-bold text-slate-900">Google Sheets</span>
                    </div>

                    <button
                      onClick={() => toast.success('Connecting Google Sheets Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect Google Sheets Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    The integration provides you with an ability to save customers data from OmniConnect bot to Google Sheets.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening Google Sheets guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Hotmart */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect Hotmart Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">🔥</span>
                      <span className="text-xs font-bold text-slate-900">Hotmart</span>
                    </div>

                    <button
                      onClick={() => toast.success('Connecting Hotmart Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect Hotmart Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    Hotmart empowers digital entrepreneurs with a leading online platform for selling and promoting digital products.
                  </div>
                </div>
              </div>

              {/* Card 5: ChatGPT */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect ChatGPT Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                        ✦
                      </div>
                      <span className="text-xs font-bold text-slate-900">ChatGPT</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">Step 1</div>
                    <div className="text-xs text-slate-500">Connect ChatGPT Account</div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-medium text-slate-700 flex items-center gap-1">
                        API Secret <span className="text-slate-400">ⓘ</span>
                      </div>
                      <input
                        type="password"
                        value={integrationsInputs.chatgpt}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, chatgpt: e.target.value })}
                        placeholder="Enter ChatGPT API Secret"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('ChatGPT API Secret saved!')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect ChatGPT Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    ChatGPT integration enables individuals to accomplish a wide range of tasks. The flexibility and intelligence allow handling various types of requests and offering personalized support.
                  </div>
                </div>
              </div>

              {/* Card 6: Claude */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect Claude Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                    <span className="px-1 py-0.2 bg-[#10b981] text-white text-[9px] font-extrabold rounded">BETA</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#d97706] text-white flex items-center justify-center text-[11px] shrink-0 font-bold">
                        ✳
                      </div>
                      <span className="text-xs font-bold text-slate-900">Claude</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-medium text-slate-700 flex items-center gap-1">
                        API Secret <span className="text-slate-400">ⓘ</span>
                      </div>
                      <input
                        type="password"
                        value={integrationsInputs.claude}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, claude: e.target.value })}
                        placeholder="Enter Claude API Secret"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('Claude API Secret saved!')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect Claude Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    Claude integration enables individuals to accomplish a wide range of tasks. The flexibility and intelligence allow handling various types of requests and offering personalized support.
                  </div>
                </div>
              </div>

              {/* Card 7: DeepSeek */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect DeepSeek Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                    <span className="px-1 py-0.2 bg-[#10b981] text-white text-[9px] font-extrabold rounded">BETA</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                        🐋
                      </div>
                      <span className="text-xs font-bold text-slate-900">DeepSeek</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-medium text-slate-700 flex items-center gap-1">
                        API Secret <span className="text-slate-400">ⓘ</span>
                      </div>
                      <input
                        type="password"
                        value={integrationsInputs.deepseek}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, deepseek: e.target.value })}
                        placeholder="Enter DeepSeek API Secret"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('DeepSeek API Secret saved!')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect DeepSeek Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    DeepSeek integration enables individuals to accomplish a wide range of tasks. The flexibility and intelligence allow handling various types of requests and offering personalized support.
                  </div>
                </div>
              </div>

              {/* Card 8: Klaviyo */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect Klaviyo Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                    <span className="px-1 py-0.2 bg-[#10b981] text-white text-[9px] font-extrabold rounded">BETA</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-4 bg-black rounded-xs shrink-0"></div>
                      <span className="text-xs font-bold text-slate-900">Klaviyo</span>
                    </div>

                    <div className="text-xs text-slate-500">Connect Klaviyo Account</div>

                    {/* Public API Key */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          Public API Key <span className="text-slate-400">ⓘ</span>
                        </span>
                        <a href="#help" onClick={(e) => { e.preventDefault(); toast('Opening Klaviyo API key guide'); }} className="text-[#0066ff] hover:underline">
                          How to get?
                        </a>
                      </div>
                      <input
                        type="text"
                        value={integrationsInputs.klaviyoPublic}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, klaviyoPublic: e.target.value })}
                        placeholder="Enter Klaviyo Public API Key"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    {/* Private API Key */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          Private API Key <span className="text-slate-400">ⓘ</span>
                        </span>
                        <a href="#help" onClick={(e) => { e.preventDefault(); toast('Opening Klaviyo API key guide'); }} className="text-[#0066ff] hover:underline">
                          How to get?
                        </a>
                      </div>
                      <input
                        type="password"
                        value={integrationsInputs.klaviyoPrivate}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, klaviyoPrivate: e.target.value })}
                        placeholder="Enter Klaviyo Private API Key"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('Connecting Klaviyo Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect Klaviyo Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    The integration provides you with an ability to save customers data from OmniConnect to Klaviyo. Create a contact if it doesn't exist in Klaviyo already, or update it with Contact's Custom Fields if it does.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening Klaviyo guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 9: ActiveCampaign */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect ActiveCampaign Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 text-[#004cff] font-bold text-sm leading-none shrink-0">
                        ≫
                      </div>
                      <span className="text-xs font-bold text-slate-900">ActiveCampaign</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">Step 1</div>
                    <div className="text-xs text-slate-500">Connect ActiveCampaign Account</div>

                    {/* API URL */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          API URL <span className="text-slate-400">ⓘ</span>
                        </span>
                        <a href="#help" onClick={(e) => { e.preventDefault(); toast('Opening ActiveCampaign URL guide'); }} className="text-[#0066ff] hover:underline">
                          How to get?
                        </a>
                      </div>
                      <input
                        type="text"
                        value={integrationsInputs.activeCampaignUrl}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, activeCampaignUrl: e.target.value })}
                        placeholder="Enter ActiveCampaign API URL"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    {/* API Key */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          API Key <span className="text-slate-400">ⓘ</span>
                        </span>
                        <a href="#help" onClick={(e) => { e.preventDefault(); toast('Opening ActiveCampaign Key guide'); }} className="text-[#0066ff] hover:underline">
                          How to get?
                        </a>
                      </div>
                      <input
                        type="password"
                        value={integrationsInputs.activeCampaignKey}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, activeCampaignKey: e.target.value })}
                        placeholder="Enter ActiveCampaign API Key"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('Connecting ActiveCampaign Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect ActiveCampaign Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    ActiveCampaign is an email marketing, marketing automation, sales automation, and CRM software platform for small-to-mid-sized businesses.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening ActiveCampaign guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 10: MailChimp */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect MailChimp Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">🐵</span>
                      <span className="text-xs font-bold text-slate-900">MailChimp</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">Step 1</div>
                    <div className="text-xs text-slate-500">Connect MailChimp Account</div>

                    <button
                      onClick={() => toast.success('Connecting MailChimp Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect MailChimp Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    The integration provides you with an ability to save customers contacts from OmniConnect to MailChimp.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening MailChimp guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 11: HubSpot CRM */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect HubSpot Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#ff7a59] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        ⚙
                      </div>
                      <span className="text-xs font-bold text-slate-900">HubSpot CRM</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">Step 1</div>
                    <div className="text-xs text-slate-500">Connect HubSpot Account</div>

                    <button
                      onClick={() => toast.success('Connecting HubSpot Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect HubSpot Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    HubSpot CRM is everything you need to organize, track, and nurture your leads and customers. It's 100% free, forever.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening HubSpot guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 12: Kit */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">Connect Kit Account</span>
                    <span className="px-1 py-0.2 bg-[#0066ff] text-white text-[9px] font-extrabold rounded">UPGRADE</span>
                  </div>

                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="px-1.5 py-0.5 bg-black text-white text-[10px] font-black rounded shrink-0">
                        Kit
                      </div>
                      <span className="text-xs font-bold text-slate-900">Kit</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">Step 1</div>
                    <div className="text-xs text-slate-500">Connect Kit Account</div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          API Secret <span className="text-slate-400">ⓘ</span>
                        </span>
                        <a href="#help" onClick={(e) => { e.preventDefault(); toast('Opening Kit API Secret guide'); }} className="text-[#0066ff] hover:underline">
                          My API Secret
                        </a>
                      </div>
                      <input
                        type="password"
                        value={integrationsInputs.kitSecret}
                        onChange={(e) => setIntegrationsInputs({ ...integrationsInputs, kitSecret: e.target.value })}
                        placeholder="Enter Kit API Secret"
                        className="w-full px-3.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('Connecting Kit Account...')}
                      className="w-full py-1.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Connect Kit Account
                    </button>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    Kit is an email marketing platform for professional bloggers. You'll need to get API Secret from your Kit account to setup integration.{' '}
                    <a href="#learn" onClick={(e) => { e.preventDefault(); toast('Opening Kit guide'); }} className="text-[#0066ff] hover:underline cursor-pointer">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Bottom Banner: Explore Manychat App Store (Screenshot 4) */}
            <div className="bg-[#2b4cdd] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#facc15] flex items-center justify-center text-slate-900 text-lg shadow-sm shrink-0">
                  🛍️
                </div>
                <div>
                  <div className="text-sm sm:text-[15px] font-bold">Explore OmniConnect App Store</div>
                  <div className="text-xs text-blue-100 mt-0.5">
                    Improve the capabilities of your Automations by discovering additional Integrations from other OmniConnect users.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => toast('Redirecting to OmniConnect App Store...')}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Visit App Store →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 15. EXTENSIONS: PAYMENTS VIEW (Screenshot 1)                         */}
        {/* ==================================================================== */}
        {activeTab === 'payments' && (
          <div className="max-w-6xl w-full mx-auto space-y-6 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
              {/* Row 1: Stripe Account */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Stripe Account</span>
                </div>
                <div className="md:col-span-4">
                  <button
                    onClick={() => toast.success('Connecting Stripe Account...')}
                    className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    Connect Stripe Account
                  </button>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  You can accept payments via Messenger and Instagram. You need to connect an existing Stripe account or create a new one to access Buy Button in your Automations. Buy Button can be used with Card, Gallery, List or Media Template elements.{' '}
                  <a
                    href="#learn"
                    onClick={(e) => {
                      e.preventDefault();
                      toast('Opening Stripe payments guide');
                    }}
                    className="text-[#0066ff] hover:underline cursor-pointer"
                  >
                    Learn more
                  </a>
                </div>
              </div>

              {/* Row 2: PayPal Account */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">PayPal Account</span>
                </div>
                <div className="md:col-span-4 space-y-2.5">
                  <a
                    href="#paypal-help"
                    onClick={(e) => {
                      e.preventDefault();
                      toast('Opening PayPal Client ID guide');
                    }}
                    className="text-[#0066ff] text-xs hover:underline block font-medium"
                  >
                    How can I find needed Client ID and Webhook ID?
                  </a>

                  <input
                    type="text"
                    value={paymentSettings.sandboxClientId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, sandboxClientId: e.target.value })}
                    placeholder="Sandbox Client ID"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0066ff]"
                  />
                  <input
                    type="text"
                    value={paymentSettings.sandboxWebhookId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, sandboxWebhookId: e.target.value })}
                    placeholder="Sandbox Webhook ID"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0066ff]"
                  />
                  <input
                    type="text"
                    value={paymentSettings.liveClientId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, liveClientId: e.target.value })}
                    placeholder="Live Client ID"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0066ff]"
                  />
                  <input
                    type="text"
                    value={paymentSettings.liveWebhookId}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, liveWebhookId: e.target.value })}
                    placeholder="Live Webhook ID"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0066ff]"
                  />

                  <button
                    onClick={() => toast.success('Connecting PayPal Account...')}
                    className="w-full sm:w-auto px-4 py-2 bg-[#e6f4ff] hover:bg-[#bae0ff] text-[#0066ff] font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    Connect PayPal Account
                  </button>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  You can accept PayPal payments via Messenger and Instagram. You need to connect an existing PayPal Business account to access Buy Button in your Automation.
                </div>
              </div>

              {/* Row 3: Currency */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Currency</span>
                </div>
                <div className="md:col-span-4">
                  <select
                    value={paymentSettings.currency}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                    className="w-full max-w-[280px] px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#0066ff] cursor-pointer"
                  >
                    <option value="US Dollar">US Dollar</option>
                    <option value="Euro">Euro</option>
                    <option value="British Pound">British Pound</option>
                    <option value="Australian Dollar">Australian Dollar</option>
                    <option value="Canadian Dollar">Canadian Dollar</option>
                  </select>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Select currency type.
                </div>
              </div>

              {/* Row 4: Notify Assignees About New Orders */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Notify Assignees About New Orders</span>
                </div>
                <div className="md:col-span-4 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={paymentSettings.notifyMessenger}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, notifyMessenger: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Messenger</span>
                    <span className="text-slate-400 text-[11px]">ⓘ</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={paymentSettings.notifyEmail}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, notifyEmail: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Email</span>
                  </label>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  Notify Assignees when a new payment received.
                </div>
              </div>

              {/* Row 5: Send To Contact Successful Charge Receipt */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">Send To Contact Successful Charge Receipt</span>
                </div>
                <div className="md:col-span-4">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={paymentSettings.sendReceipt}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, sendReceipt: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Email</span>
                  </label>
                </div>
                <div className="md:col-span-5 text-xs text-slate-400 leading-relaxed">
                  To notify a user about successful payment by e-mail, you have to tick the box in OmniConnect Payments and set this option up in your Stripe account by following{' '}
                  <a
                    href="#stripe-receipt"
                    onClick={(e) => {
                      e.preventDefault();
                      toast('Opening Stripe receipt settings link');
                    }}
                    className="text-[#0066ff] hover:underline cursor-pointer"
                  >
                    this link
                  </a>
                </div>
              </div>
            </div>

            {/* Total Orders Stat Box */}
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-1.5">Total Orders</div>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 w-full sm:w-56 text-center">
                <div className="text-xl font-bold text-[#00a86b]">0</div>
              </div>
            </div>

            {/* Purchase History Table */}
            <div>
              <div className="text-xs font-semibold text-slate-800 mb-2">Purchase History</div>
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
                      <tr>
                        <th className="px-4 py-3 whitespace-nowrap">Avatar</th>
                        <th className="px-4 py-3 whitespace-nowrap">Name</th>
                        <th className="px-4 py-3 whitespace-nowrap">Date</th>
                        <th className="px-4 py-3 whitespace-nowrap">Order ID</th>
                        <th className="px-4 py-3 whitespace-nowrap">Item Price</th>
                        <th className="px-4 py-3 whitespace-nowrap">Status</th>
                        <th className="px-4 py-3 whitespace-nowrap">Item Name</th>
                        <th className="px-4 py-3 whitespace-nowrap">Additional Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-xs text-slate-400 font-normal">
                          No orders yet
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 16. EXTENSIONS: INSTALLED TEMPLATES (Screenshot 2)                  */}
        {/* ==================================================================== */}
        {activeTab === 'installed-templates' && (
          <div className="max-w-6xl w-full mx-auto space-y-4 animate-fade-in pb-16">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs min-h-[520px] flex flex-col items-center justify-center text-center p-8 sm:p-12">
              <div className="transform transition-transform hover:scale-105 duration-300 mb-2">
                <TemplatesRabbitIllustration className="w-64 h-64" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mt-4">
                You haven't installed any templates yet
              </h3>

              <button
                onClick={() => toast('Opening OmniConnect Template Library...')}
                className="mt-4 px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
              >
                Install Your First Template
              </button>
            </div>
          </div>
        )}

        {/* Fallback for other settings tabs */}
        {!['notifications', 'general', 'team-members', 'logs', 'display', 'subscriptions', 'inbox-behavior', 'auto-assignment', 'fields', 'tags', 'api', 'apps', 'integrations', 'payments', 'installed-templates'].includes(activeTab) && !currentChannel && (
          <div className="max-w-5xl w-full mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-sm text-slate-500">Settings and preferences for {activeTab}.</p>
          </div>
        )}
      </main>

      {/* Invite Member Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Invite New Member</h3>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-slate-500">Enter email address of the team member you would like to invite.</p>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success(`Invite sent to ${inviteEmail}!`);
                  setInviteModalOpen(false);
                  setInviteEmail('');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] rounded-xl cursor-pointer shadow-xs"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {groupModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Create New Group</h3>
              <button
                onClick={() => setGroupModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name (e.g. Sales, Support)"
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setGroupModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success(`Group "${groupName}" created!`);
                  setGroupModalOpen(false);
                  setGroupName('');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] rounded-xl cursor-pointer shadow-xs"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connect Account Modal */}
      {connectModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Connect {channelStatus[connectModal.channelId]?.name || 'Channel'}
              </h3>
              <button
                onClick={() => setConnectModal({ open: false, channelId: null, accountInput: '' })}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed">
              Enter your account username, business phone, or channel identifier to link with OmniConnect automation.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Account Identifier</label>
              <input
                type="text"
                value={connectModal.accountInput}
                onChange={(e) => setConnectModal({ ...connectModal, accountInput: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 shadow-2xs font-medium"
                placeholder="Enter handle or account ID"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConnectModal({ open: false, channelId: null, accountInput: '' })}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConnect}
                className="px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Connect Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Connection Modal (Screenshots 1 & 2) */}
      <ConnectInstagramModal
        isOpen={showInstagramModal}
        onClose={() => setShowInstagramModal(false)}
        onSuccess={() => {
          const igAccount = localStorage.getItem('omni_instagram_account') || '@omniconnect_official';
          setChannelStatus((prev) => ({
            ...prev,
            instagram: { ...prev.instagram, connected: true, account: igAccount },
          }));
          setShowInstagramModal(false);
          toast.success('🎉 Instagram connected successfully!');
        }}
      />

      {/* Facebook Page Connection Modal */}
      <ConnectFacebookPageModal
        isOpen={showFacebookModal}
        onClose={() => setShowFacebookModal(false)}
        onPageConnected={(page) => {
          setChannelStatus((prev) => ({
            ...prev,
            messenger: { ...prev.messenger, connected: true, account: page.name },
          }));
          setShowFacebookModal(false);
          toast.success(`🎉 ${page.name} connected to Facebook Messenger!`);
        }}
      />
    </div>
  );
}
