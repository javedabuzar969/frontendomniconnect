// pages/InboxPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConnectChannelModal from '../components/ui/ConnectChannelModal';
import ProUpgradeModal from '../components/ui/ProUpgradeModal';
import {
  Search,
  Settings,
  MessageSquare,
  Clock,
  Heart,
  Plus,
  ArrowUpDown,
  Send,
  Paperclip,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  CheckSquare,
  ListChecks,
} from 'lucide-react';
import {
  InboxIllustration,
  FacebookBrandIcon,
  WhatsAppBrandIcon,
  InstagramIcon,
  TikTokIcon,
  TelegramBrandIcon,
} from '../components/ui/Icons';
import toast from 'react-hot-toast';

const INITIAL_CONVERSATIONS = [];

export default function InboxPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState(null);
  const [activeFolder, setActiveFolder] = useState('all');
  const [labelsOpen, setLabelsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('open');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Dropdown open states
  const [openChatsMenu, setOpenChatsMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [channelMenu, setChannelMenu] = useState(false);

  const [showConnectModal, setShowConnectModal] = useState(() => {
    return searchParams.get('connectChannel') === 'true';
  });
  const [showProModal, setShowProModal] = useState(() => {
    return searchParams.get('proTrial') === 'true';
  });

  useEffect(() => {
    if (searchParams.get('connectChannel') === 'true') {
      setShowConnectModal(true);
    }
    if (searchParams.get('proTrial') === 'true') {
      setShowProModal(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setShowConnectModal(false);
    if (searchParams.get('connectChannel')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('connectChannel');
      setSearchParams(nextParams, { replace: true });
    }
  };

  const handleCloseProModal = () => {
    setShowProModal(false);
    if (searchParams.get('proTrial')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('proTrial');
      setSearchParams(nextParams, { replace: true });
    }
  };

  const selectedConv = conversations.find((c) => c.id === selectedId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConv) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'agent',
      text: replyText,
      time: 'Just now',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              lastMessage: replyText,
              time: 'Just now',
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );
    setReplyText('');
    toast.success('Message sent!');
  };

  const handleSimulateIncoming = (channel = 'whatsapp') => {
    const newConv = {
      id: `conv_${Date.now()}`,
      name: channel === 'whatsapp' ? 'Jessica Taylor' : 'Alex Rivera',
      channel,
      lastMessage: 'Hey! I would like to try out your bot services.',
      time: 'Just now',
      unread: true,
      status: 'open',
      assigned: 'all',
      isFavorite: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
      messages: [
        { id: `m_${Date.now()}`, sender: 'customer', text: 'Hey! I would like to try out your bot services.', time: 'Just now' },
      ],
    };
    setConversations([newConv, ...conversations]);
    setSelectedId(newConv.id);
    toast.success('Incoming test message received in Inbox!');
  };

  const filteredConversations = conversations.filter((c) => {
    if (activeFolder === 'reminders' && !c.hasReminder) return false;
    if (activeFolder === 'favorites' && !c.isFavorite) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (unreadOnly && !c.unread) return false;
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-white text-slate-800 overflow-hidden select-none">
      {/* ── Top Header matching Screenshot ─────────────────────── */}
      <div className="h-16 px-4 sm:px-6 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0 bg-white z-10">
        {/* Left: Title */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight shrink-0">
          Inbox
        </h1>

        {/* Center: Search through Inbox conversations */}
        <div className="relative w-full max-w-[440px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search through Inbox conversations"
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-[13px] bg-white border border-slate-200/90 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 shadow-2xs transition-all"
          />
        </div>

        {/* Right: Settings gear button */}
        <button
          onClick={() => navigate('/settings?tab=inbox-behavior')}
          className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
          title="Inbox settings"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* ── Three Column Workspace Layout ──────────────────────── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* ── Column 1: Sub-navigation Folders & Labels (Left) ── */}
        <div className="hidden lg:block w-[230px] shrink-0 border-r border-slate-200 bg-white py-4 px-3 space-y-4 overflow-y-auto">
          {/* Main folders */}
          <div className="space-y-1">
            {/* All chats (active capsule in screenshot) */}
            <button
              onClick={() => setActiveFolder('all')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer ${
                activeFolder === 'all'
                  ? 'bg-[#e5e7eb] text-slate-900 shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ListChecks size={16} className="text-slate-600" />
                <span>All chats</span>
              </div>
              <span className="text-xs text-slate-500 font-bold">{conversations.length}</span>
            </button>

            {/* Reminders */}
            <button
              onClick={() => {
                setActiveFolder('reminders');
                toast('Reminders folder');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors cursor-pointer ${
                activeFolder === 'reminders'
                  ? 'bg-[#e5e7eb] text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Clock size={16} className="text-slate-500" />
              <span>Reminders</span>
            </button>
          </div>

          {/* Labels Section with ^ and + */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-3 pb-1.5 text-xs text-slate-400 font-semibold">
              <button
                onClick={() => setLabelsOpen(!labelsOpen)}
                className="flex items-center gap-1.5 hover:text-slate-600 cursor-pointer"
              >
                {labelsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>Labels</span>
              </button>
              <button
                onClick={() => toast.success('Add label')}
                className="hover:text-slate-700 cursor-pointer p-0.5"
                title="Add label"
              >
                <Plus size={14} />
              </button>
            </div>

            {labelsOpen && (
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => {
                    setActiveFolder('favorites');
                    toast('Showing favorites');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] transition-colors cursor-pointer ${
                    activeFolder === 'favorites'
                      ? 'bg-[#e5e7eb] text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Heart size={14} className="text-red-500 fill-red-500 shrink-0" />
                  <span>Favorites</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Column 2: Conversation List & Filter Bar (Middle) ── */}
        <div
          className={`w-full md:w-[340px] lg:w-[360px] shrink-0 border-r border-slate-200 flex flex-col bg-white overflow-hidden ${
            selectedId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Top Filter Bar matching Screenshot */}
          <div className="px-3 py-2 border-b border-slate-200 flex items-center gap-1.5 bg-white text-xs overflow-x-auto no-scrollbar select-none relative">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer shrink-0"
              title="Select all"
            />

            {/* Open Chats ▾ */}
            <div className="relative shrink-0">
              <button
                onClick={() => setOpenChatsMenu(!openChatsMenu)}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-md text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <MessageSquare size={13} className="text-slate-500" />
                <span>Open Chats</span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              {openChatsMenu && (
                <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 text-xs">
                  <button
                    onClick={() => { setStatusFilter('open'); setOpenChatsMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium"
                  >
                    Open Chats
                  </button>
                  <button
                    onClick={() => { setStatusFilter('closed'); setOpenChatsMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600"
                  >
                    Closed Chats
                  </button>
                  <button
                    onClick={() => { setStatusFilter('all'); setOpenChatsMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600"
                  >
                    All Chats
                  </button>
                </div>
              )}
            </div>

            {/* Unread */}
            <button
              onClick={() => setUnreadOnly(!unreadOnly)}
              className={`px-2.5 py-1 border rounded-md text-xs font-medium cursor-pointer whitespace-nowrap transition-colors shadow-2xs shrink-0 ${
                unreadOnly
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              Unread
            </button>

            {/* Sort: Newest ▾ */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSortMenu(!sortMenu)}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-md text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <ArrowUpDown size={12} className="text-slate-400" />
                <span>Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              {sortMenu && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 text-xs">
                  <button
                    onClick={() => { setSortOrder('newest'); setSortMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium"
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => { setSortOrder('oldest'); setSortMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600"
                  >
                    Oldest
                  </button>
                </div>
              )}
            </div>

            {/* All Channels ▾ */}
            <div className="relative shrink-0">
              <button
                onClick={() => setChannelMenu(!channelMenu)}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-md text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <span>{channelFilter === 'all' ? 'All Channels' : channelFilter}</span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              {channelMenu && (
                <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 text-xs">
                  <button
                    onClick={() => { setChannelFilter('all'); setChannelMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium"
                  >
                    All Channels
                  </button>
                  <button
                    onClick={() => { setChannelFilter('whatsapp'); setChannelMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => { setChannelFilter('instagram'); setChannelMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600"
                  >
                    Instagram
                  </button>
                  <button
                    onClick={() => { setChannelFilter('facebook'); setChannelMenu(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600"
                  >
                    Facebook
                  </button>
                </div>
              )}
            </div>

            {/* + Filter */}
            <button
              onClick={() => toast('Filter options')}
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-md text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap shadow-2xs shrink-0"
            >
              <Plus size={12} className="text-slate-500" />
              <span>Filter</span>
            </button>
          </div>

          {/* Conversations Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 flex flex-col">
            {filteredConversations.length === 0 ? (
              /* Empty state matching middle column in screenshot */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none">
                <span className="text-slate-800 font-bold text-sm">
                  No opened conversations
                </span>
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="mt-4 px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Connect Channels
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex items-start gap-3.5 ${
                    selectedId === conv.id
                      ? 'bg-blue-50/70 border-l-3 border-blue-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {conv.channel === 'whatsapp' ? (
                        <WhatsAppBrandIcon className="w-4 h-4" />
                      ) : conv.channel === 'instagram' ? (
                        <InstagramIcon className="w-4 h-4" />
                      ) : conv.channel === 'tiktok' ? (
                        <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white">
                          <TikTokIcon className="w-2.5 h-2.5" />
                        </div>
                      ) : conv.channel === 'telegram' ? (
                        <TelegramBrandIcon className="w-4 h-4" />
                      ) : (
                        <FacebookBrandIcon className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{conv.name}</h4>
                      <span className="text-xs text-slate-400 font-medium shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-slate-500 text-xs truncate mt-1 leading-snug">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Column 3: Message / Detail View (Right) ─────────── */}
        <div
          className={`flex-1 flex flex-col bg-white overflow-hidden ${
            selectedId ? 'flex' : 'hidden md:flex'
          }`}
        >
          {selectedConv ? (
            /* Active Conversation View */
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="h-16 px-4 sm:px-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
                    title="Back to conversations"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <img
                    src={selectedConv.avatar}
                    alt={selectedConv.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                      {selectedConv.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">Online on {selectedConv.channel.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedId(null);
                      toast('Conversation closed');
                    }}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
                  >
                    Close Chat
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                {selectedConv.messages.map((m) => {
                  const isAgent = m.sender === 'agent' || m.sender === 'bot';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                          isAgent
                            ? 'bg-[#007aff] text-white rounded-tr-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-xs text-slate-400 mt-1 px-1 font-medium">{m.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2.5"
              >
                <button
                  type="button"
                  onClick={() => toast('Attach file')}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message or '/' for canned replies..."
                  className="flex-1 px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50/70"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-[#007aff] hover:bg-[#0069db] disabled:opacity-40 text-white rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5 font-semibold text-xs"
                >
                  <span>Send</span>
                  <Send size={14} />
                </button>
              </form>
            </div>
          ) : (
            /* ── Empty State matching Screenshot ─────────────────── */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none bg-white">
              {/* Stylized Artwork Illustration */}
              <div className="mb-2">
                <InboxIllustration className="w-64 h-52" />
              </div>

              {/* Title */}
              <h2 className="text-base sm:text-[17px] font-bold text-slate-900 max-w-[380px] leading-snug mt-2 mb-2">
                This is a place to chat to your contacts in all of the connected channels
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-[13px] text-slate-500 max-w-[340px] leading-relaxed mb-5">
                Every time somebody sends you a message, it will appear here. You can change this and more in Inbox Settings.
              </p>

              {/* Button */}
              <button
                onClick={() => navigate('/settings?tab=inbox-behavior')}
                className="bg-[#0055d4] hover:bg-[#0046b3] text-white text-xs sm:text-[13px] font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Go To Inbox Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Connect Channel Modal */}
      <ConnectChannelModal
        isOpen={showConnectModal}
        onClose={() => {
          handleCloseModal();
          setShowProModal(true);
        }}
        onConnect={(ch) => {
          toast.success(`${ch.name} connection initiated!`);
          handleCloseModal();
          setShowProModal(true);
        }}
      />

      {/* Pro Upgrade Modal */}
      <ProUpgradeModal
        isOpen={showProModal}
        initialStep="pitch"
        onClose={handleCloseProModal}
        onComplete={() => {
          toast.success('🎉 Pro activated!');
        }}
      />
    </div>
  );
}

