// components/layout/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBanner from './TopBanner';
import Sidebar from './Sidebar';
import UpgradeModal from './UpgradeModal';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-[#fafafa]">
      {/* Top Banner (Screenshot 1-5) */}
      <TopBanner onUpgradeClick={() => setUpgradeModalOpen(true)} />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <Sidebar onUpgradeClick={() => setUpgradeModalOpen(true)} />

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
