// pages/InboxPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Settings,
  MessageSquare,
  UserCheck,
  User,
  Clock,
  Heart,
  Users,
  Plus,
  Filter,
  ArrowUpDown,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  CheckCheck,
  ChevronDown,
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

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv_1',
    name: 'Sarah Jenkins',
    channel: 'facebook',
    lastMessage: 'Hi, what are your business hours this weekend?',
    time: '12:45 PM',
    unread: false,
    status: 'open',
    assigned: 'me',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hello! I saw your ad on Facebook.', time: '12:40 PM' },
      { id: 'm2', sender: 'bot', text: 'Hi Sarah! Thanks for reaching out. How can we help you today?', time: '12:41 PM' },
      { id: 'm3', sender: 'customer', text: 'Hi, what are your business hours this weekend?', time: '12:45 PM' },
    ],
  },
  {
    id: 'conv_2',
    name: 'Michael Chen',
    channel: 'whatsapp',
    lastMessage: 'Can you please confirm my appointment tomorrow at 3pm?',
    time: 'Yesterday',
    unread: true,
    status: 'open',
    assigned: 'unassigned',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hi, I received your reminder.', time: 'Yesterday 4:12 PM' },
      { id: 'm2', sender: 'customer', text: 'Can you please confirm my appointment tomorrow at 3pm?', time: 'Yesterday 4:13 PM' },
    ],
  },
  {
    id: 'conv_3',
    name: 'Zack Walker',
    channel: 'tiktok',
    lastMessage: 'Yo! Loved your video. How can I order this product?',
    time: '10:15 AM',
    unread: true,
    status: 'open',
    assigned: 'unassigned',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Yo! Loved your video. How can I order this product?', time: '10:15 AM' },
    ],
  },
  {
    id: 'conv_4',
    name: 'Elena Rostova',
    channel: 'instagram',
    lastMessage: 'Sent you a DM from your story link! ❤️',
    time: '2 hours ago',
    unread: false,
    status: 'open',
    assigned: 'me',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Sent you a DM from your story link! ❤️', time: '2 hours ago' },
      { id: 'm2', sender: 'bot', text: 'Thanks Elena! Here is your private discount code: VIP10', time: '2 hours ago' },
    ],
  },
];

export default function InboxPage() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState(null);
  const [activeFolder, setActiveFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [replyText, setReplyText] = useState('');

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

  const handleSimulateIncoming = (channel = 'facebook') => {
    const newConv = {
      id: `conv_${Date.now()}`,
      name: channel === 'facebook' ? 'Jessica Taylor' : 'Alex Rivera',
      channel,
      lastMessage: 'Hey! I would like to try out your bot services.',
      time: 'Just now',
      unread: true,
      status: 'open',
      assigned: 'unassigned',
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
    if (activeFolder === 'unassigned' && c.assigned !== 'unassigned') return false;
    if (activeFolder === 'me' && c.assigned !== 'me') return false;
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800 overflow-hidden">
      {/* Top Header matching Home Page scale */}
      <div className="h-16 px-8 border-b border-slate-200/90 flex items-center justify-between shrink-0 bg-white">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inbox</h1>

        {/* Search through Inbox conversations */}
        <div className="relative w-96 max-w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search through Inbox conversations..."
            className="w-full pl-11 pr-4 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Settings gear on top right */}
        <button
          onClick={() => navigate('/settings?tab=inbox-behavior')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          title="Inbox settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Subnav Folders & Labels */}
        <div className="w-64 shrink-0 border-r border-slate-200/90 py-5 px-3.5 space-y-5 overflow-y-auto bg-white select-none">
          {/* Main folder counts */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveFolder('all')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeFolder === 'all'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={16} className="text-slate-500" />
                <span>All chats</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                {conversations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveFolder('unassigned')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeFolder === 'unassigned'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck size={16} className="text-slate-500" />
                <span>Unassigned</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                {conversations.filter((c) => c.assigned === 'unassigned').length}
              </span>
            </button>

            <button
              onClick={() => setActiveFolder('me')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeFolder === 'me'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <User size={16} className="text-slate-500" />
                <span>Assigned to me</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                {conversations.filter((c) => c.assigned === 'me').length}
              </span>
            </button>

            <button
              onClick={() => toast('Reminders folder')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
            >
              <Clock size={16} className="text-slate-500" />
              <span>Reminders</span>
            </button>
          </div>

          {/* Labels */}
          <div>
            <div className="flex items-center justify-between px-3.5 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Labels</span>
              <button
                onClick={() => toast.success('New label created')}
                className="hover:text-slate-700 cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              onClick={() => toast('Showing favorites')}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>Favorites</span>
            </button>
          </div>

          {/* Team */}
          <div>
            <div className="px-3.5 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Team</div>
            <button
              onClick={() => setActiveFolder('all')}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <Users size={16} className="text-slate-500" />
              <span>Everyone</span>
            </button>
          </div>
        </div>

        {/* Column 2: Conversation List & Filters */}
        <div className="w-88 sm:w-96 shrink-0 border-r border-slate-200/90 flex flex-col bg-white overflow-hidden">
          {/* Filter Bar */}
          <div className="p-3 border-b border-slate-200/90 flex items-center gap-2 flex-wrap bg-slate-50/60 text-xs">
            <select className="border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 bg-white font-semibold cursor-pointer">
              <option>Open Chats</option>
              <option>Closed Chats</option>
              <option>All</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 bg-white font-semibold cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 bg-white font-semibold cursor-pointer"
            >
              <option value="all">All Channels</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>

          {/* Conversation Items or Empty State */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-2">
                <span className="text-slate-600 font-semibold text-sm">No opened conversations</span>
                <button
                  onClick={() => handleSimulateIncoming('facebook')}
                  className="text-blue-600 hover:underline font-semibold text-xs cursor-pointer"
                >
                  Go To Closed Conversations
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3.5 ${
                    selectedId === conv.id
                      ? 'bg-blue-50/70 border-l-3 border-blue-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
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
                    <p className="text-slate-500 text-xs sm:text-[13px] truncate mt-1 leading-snug">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Main Thread or Empty State */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {selectedConv ? (
            /* Selected Conversation Thread */
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Thread Header */}
              <div className="h-16 px-6 border-b border-slate-200/90 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConv.avatar}
                    alt={selectedConv.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{selectedConv.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Online on {selectedConv.channel.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedId(null);
                      toast('Conversation closed');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
                  >
                    Close Chat
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer">
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
                        className={`max-w-md px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-xs ${
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

              {/* Reply Input Box */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-slate-200/90 bg-white flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => toast('Attach media')}
                  className="p-2.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message or '/' for canned replies..."
                  className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/70"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-3 bg-[#007aff] hover:bg-[#0069db] disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2 font-semibold text-sm"
                >
                  <span>Send</span>
                  <Send size={15} />
                </button>
              </form>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none bg-white">
              <div className="mb-6">
                <InboxIllustration className="w-64 h-52" />
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4">
                Send a message to your bot to try Inbox
              </h2>

              <button
                onClick={() => handleSimulateIncoming('facebook')}
                className="flex items-center gap-3 px-5 py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl shadow-2xs text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <FacebookBrandIcon className="w-5 h-5 text-blue-600" />
                <span>Facebook</span>
                <span className="text-blue-600 font-bold ml-1">Open</span>
              </button>

              <div className="mt-4">
                <button
                  onClick={() => handleSimulateIncoming('whatsapp')}
                  className="text-xs sm:text-sm text-emerald-600 hover:underline inline-flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <WhatsAppBrandIcon className="w-4 h-4" />
                  Or test with WhatsApp message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
