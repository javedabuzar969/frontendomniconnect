// components/layout/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Zap } from 'lucide-react';
import TopBanner from './TopBanner';
import Sidebar from './Sidebar';
import UpgradeModal from './UpgradeModal';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-[#fafafa]">
      {/* Top Banner */}
      <TopBanner onUpgradeClick={() => setUpgradeModalOpen(true)} />

      {/* Mobile Top Navigation Header (< lg) */}
      <header className="lg:hidden h-14 bg-white border-b border-slate-200 px-3 sm:px-4 flex items-center justify-between shrink-0 z-30 select-none">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Open Menu"
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>
          <span className="text-[20px] font-black text-slate-900 tracking-tight font-sans">
            OmniConnect
          </span>
        </div>

        <button
          onClick={() => setUpgradeModalOpen(true)}
          className="px-3 py-1.5 bg-[#00a86b] hover:bg-[#008f5b] text-white rounded-lg font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Zap size={13} className="fill-white" />
          <span>Upgrade</span>
        </button>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Desktop Left Sidebar (lg+) */}
        <div className="hidden lg:flex h-full shrink-0">
          <Sidebar onUpgradeClick={() => setUpgradeModalOpen(true)} />
        </div>

        {/* Mobile Slide-Over Drawer (< lg) */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Sidebar Content Drawer */}
            <div className="relative z-50 h-full w-[265px] max-w-[85vw] bg-white shadow-2xl flex flex-col">
              <Sidebar
                isMobile
                onUpgradeClick={() => {
                  setMobileSidebarOpen(false);
                  setUpgradeModalOpen(true);
                }}
                onCloseMobile={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-white flex flex-col">
          <Outlet context={{ onUpgradeClick: () => setUpgradeModalOpen(true) }} />
        </main>
      </div>

      {/* Upgrade / Pricing Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#ffffff',
            border: '1px solid #27272a',
            borderRadius: '10px',
            fontSize: '13px',
          },
        }}
      />
    </div>
  );
}
