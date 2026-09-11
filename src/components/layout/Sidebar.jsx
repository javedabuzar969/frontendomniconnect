// components/layout/Sidebar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  MessageSquare,
  Send,
  Settings,
  ChevronDown,
  HelpCircle,
  Pencil,
  Building2,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
} from 'lucide-react';
import {
  FacebookBrandIcon,
  GoogleBrandIcon,
  AppleBrandIcon,
} from '../ui/Icons';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { to: '/broadcasts', icon: Send, label: 'Broadcasts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onUpgradeClick }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState('Omifdgfgf');
  const [language, setLanguage] = useState('English');

  const profileRef = useRef(null);
  const workspaceRef = useRef(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (workspaceRef.current && !workspaceRef.current.contains(event.target)) {
        setShowWorkspaceMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfileMenu(false);
    toast.success('Logged out successfully');
    sessionStorage.removeItem('__ag_jwt');
    navigate('/login');
  };

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-[245px]'
      } shrink-0 h-full flex flex-col bg-white border-r border-[#e5e7eb] select-none transition-all duration-200 relative z-30`}
    >
      {/* Top Brand Name: OmniConnect */}
      {!collapsed ? (
        <div className="px-5 pt-4 pb-2 select-none flex items-center justify-between">
          <span className="text-[24px] font-black text-slate-900 tracking-tight font-sans">
            OmniConnect
          </span>
        </div>
      ) : (
        <div className="py-3.5 flex justify-center">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
            OC
          </div>
        </div>
      )}

      {/* Top: Workspace Switcher */}
      <div className="px-3 py-2 border-b border-[#f3f4f6] relative" ref={workspaceRef}>
        <button
          onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
          className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
          title={currentWorkspace}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Workspace Avatar with FREE badge */}
            <div className="relative shrink-0">
              <div className="w-7 h-7 rounded-full bg-slate-300 border border-slate-300 overflow-hidden flex items-center justify-center">
                <Users size={15} className="text-slate-500" />
              </div>
              <span className="absolute -bottom-1 -left-1 px-1 py-0 bg-neutral-900 text-white text-[8px] font-extrabold rounded leading-none shadow-xs">
                FREE
              </span>
            </div>

            {!collapsed && (
              <span className="text-sm font-bold text-slate-800 truncate max-w-[140px]">
                {currentWorkspace}
              </span>
            )}
          </div>

          {!collapsed && (
            <ChevronDown size={15} className="text-slate-400 shrink-0" />
          )}
        </button>

        {/* Workspace Dropdown */}
        {showWorkspaceMenu && (
          <div className="absolute left-3 top-13 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-sm animate-fade-in">
            <div className="px-3.5 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Accounts
            </div>
            <button
              onClick={() => {
                setCurrentWorkspace('Omifdgfgf');
                setShowWorkspaceMenu(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 text-left hover:bg-slate-50 font-semibold text-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  O
                </div>
                <span>Omifdgfgf</span>
              </div>
              {currentWorkspace === 'Omifdgfgf' && <Check size={16} className="text-blue-600" />}
            </button>

            <div className="my-1.5 border-t border-slate-100" />
            <button
              onClick={() => {
                setShowWorkspaceMenu(false);
                navigate('/settings');
              }}
              className="w-full px-3.5 py-2 text-left text-blue-600 hover:bg-blue-50 font-semibold text-xs sm:text-sm cursor-pointer"
            >
              + Create or connect account
            </button>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon, label }) => {
          const isAIIcon = icon === 'AI';
          const Icon = isAIIcon ? null : icon;

          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#e5e7eb] text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={label}
            >
              {isAIIcon ? (
                <div className="w-4.5 h-4.5 rounded border border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                  AI
                </div>
              ) : (
                <Icon size={18} className="shrink-0 text-slate-600" />
              )}
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );
        })}

        {/* Collapse Toggle Button */}
        <div className="pt-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer ${
              collapsed ? 'justify-center px-2' : ''
            }`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className="w-4.5 h-4.5 shrink-0 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="4" x2="3" y2="20" />
              <line x1="19" y1="12" x2="7" y2="12" />
              <polyline points="12 7 7 12 12 17" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Bottom Controls Area */}
      <div className="p-3 border-t border-[#f3f4f6] space-y-1 relative" ref={profileRef}>
        {/* User Profile Button */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-red-700 border border-red-800 text-white flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=JA&background=b91c1c&color=fff';
                }}
              />
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold text-slate-700">My Profile</span>
            )}
          </button>

          {/* User Profile Flyout (Screenshot 1 matching popover) */}
          {showProfileMenu && (
            <div className="absolute left-0 sm:left-full bottom-0 sm:bottom-[-8px] ml-0 sm:ml-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 text-xs animate-fade-in divide-y divide-slate-100">
              {/* User Identity Header */}
              <div className="px-4 pb-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-700 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                    alt="javedabuzar969"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=JA&background=b91c1c&color=fff';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">
                    javedabuzar969
                  </h4>
                  <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <span className="truncate text-[11px]">
                      javedabuzar969@gmail.com
                    </span>
                    <Pencil size={11} className="shrink-0 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Account Management links */}
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-normal transition-colors"
                >
                  <Building2 size={15} className="text-slate-500" />
                  <span>Manage Accounts</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    toast('Message reports generated');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-normal transition-colors"
                >
                  <FileText size={15} className="text-slate-500" />
                  <span>Message reports</span>
                </button>
              </div>

              {/* Advanced Features */}
              <div className="py-2">
                <div className="px-4 py-1 text-[11px] font-semibold text-slate-400">
                  Advanced features
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/automation');
                  }}
                  className="w-full text-left px-4 py-1.5 text-slate-700 hover:bg-slate-50 font-normal"
                >
                  My Templates
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings?tab=api');
                  }}
                  className="w-full text-left px-4 py-1.5 text-slate-700 hover:bg-slate-50 font-normal"
                >
                  API Settings
                </button>
              </div>

              {/* Language Selector */}
              <div className="px-4 py-2.5 flex items-center justify-between">
                <span className="text-slate-600 text-[11px]">Language</span>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    toast.success(`Language set to ${e.target.value}`);
                  }}
                  className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                  <option value="Português">Português</option>
                  <option value="Urdu">اردو (Urdu)</option>
                </select>
              </div>

              {/* Sign-in options */}
              <div className="px-4 py-2.5 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Add sign-in options</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toast.success('Connected with Facebook')}
                    className="p-1 rounded hover:bg-slate-100 text-blue-600"
                    title="Connect Facebook"
                  >
                    <FacebookBrandIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toast.success('Connected with Google')}
                    className="p-1 rounded hover:bg-slate-100"
                    title="Connect Google"
                  >
                    <GoogleBrandIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toast.success('Connected with Apple')}
                    className="p-1 rounded hover:bg-slate-100 text-slate-800"
                    title="Connect Apple"
                  >
                    <AppleBrandIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Log out */}
              <div className="pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 font-normal transition-colors"
                >
                  <LogOut size={14} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          onClick={() => toast('Help & Documentation center')}
          className={`w-full flex items-center gap-2.5 p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Help"
        >
          <HelpCircle size={17} className="text-slate-400" />
          {!collapsed && <span className="text-xs font-medium">Help</span>}
        </button>

        {/* Free contacts limit gauge */}
        {!collapsed && (
          <div className="pt-2 pb-1">
            <div className="flex items-center gap-2 px-1 mb-2">
              <div className="relative w-5 h-5">
                <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#00a86b]"
                    strokeDasharray="0, 100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-slate-500">Free contacts limit</div>
                <div className="text-[11px] font-bold text-slate-700">0/25</div>
              </div>
            </div>

            <button
              onClick={onUpgradeClick}
              className="w-full py-2 px-3 bg-[#00a86b] hover:bg-[#008f5b] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              Try 14 Days For Free
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
