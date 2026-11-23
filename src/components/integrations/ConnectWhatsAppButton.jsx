// components/integrations/ConnectWhatsAppButton.jsx
import { useState } from 'react';
import { Plus, Wifi } from 'lucide-react';
import ConnectViaMetaModal from './ConnectViaMetaModal';

export default function ConnectWhatsAppButton({ workspaceId, onSuccess }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-sm
                   bg-gradient-to-r from-brand-500 to-emerald-400 text-white
                   hover:from-brand-600 hover:to-emerald-500
                   transition-all duration-200 active:scale-95
                   shadow-glow hover:shadow-[0_0_32px_rgba(37,211,102,0.4)] cursor-pointer"
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 rounded-2xl overflow-hidden">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </span>

        <Plus size={18} />
        <span>+ Connect WhatsApp</span>
        <Wifi size={16} className="opacity-70" />
      </button>

      <ConnectViaMetaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        channelName="WhatsApp"
        onSuccess={(connection) => {
          setModalOpen(false);
          onSuccess?.(connection);
        }}
      />
    </>
  );
}
