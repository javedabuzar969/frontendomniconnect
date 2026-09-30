// pages/ConnectInstagramPage.jsx — Fullscreen Meta for Business / Instagram Login flow
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectInstagramModal from '../components/integrations/ConnectInstagramModal';

export default function ConnectInstagramPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-[620px]">
        <ConnectInstagramModal
          isOpen={true}
          isFullScreen={false}
          onClose={() => navigate('/settings?tab=instagram')}
          onSuccess={() => navigate('/inbox')}
        />
      </div>
    </div>
  );
}
