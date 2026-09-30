// pages/ConnectFacebookPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectFacebookPageModal from '../components/integrations/ConnectFacebookPageModal';

export default function ConnectFacebookPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-2 sm:p-6">
      <ConnectFacebookPageModal
        isOpen={true}
        isFullScreen={false}
        onClose={() => navigate('/inbox')}
        onBack={() => navigate('/inbox')}
        onPageConnected={(page) => {
          navigate('/inbox');
        }}
      />
    </div>
  );
}
