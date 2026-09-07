// components/integrations/ConnectWhatsAppButton.jsx
import { useState } from 'react';
import { Plus, Loader2, Wifi } from 'lucide-react';
import { connectWhatsApp } from '../../api/integrations';
import { launchMetaEmbeddedSignup } from '../../utils/meta';
import toast from 'react-hot-toast';

const isMock = import.meta.env.VITE_MOCK_WHATSAPP === 'true';

export default function ConnectWhatsAppButton({ workspaceId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      let code;

      if (isMock) {
        // In mock mode, skip Meta popup
        await new Promise((r) => setTimeout(r, 800));
        code = 'mock_code_' + Date.now();
      } else {
        // Launch Meta Embedded Signup popup
        const appId = import.meta.env.VITE_META_APP_ID;
        if (!appId) {
          toast.error('META_APP_ID is not configured.');
          setLoading(false);
          return;
        }
        code = await launchMetaEmbeddedSignup(appId);
      }

      // Send code to backend — backend exchanges it for access token (never in frontend)
      const connection = await connectWhatsApp({ code, workspaceId });
      toast.success('WhatsApp connected successfully! 🎉');
      onSuccess?.(connection);
    } catch (err) {
      console.error('WhatsApp connect error:', err);
      toast.error(err?.message || 'Failed to connect WhatsApp. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-sm
                 bg-gradient-to-r from-brand-500 to-emerald-400 text-white
                 hover:from-brand-600 hover:to-emerald-500
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-200 active:scale-95
                 shadow-glow hover:shadow-[0_0_32px_rgba(37,211,102,0.4)]"
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 rounded-2xl overflow-hidden">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </span>

      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Plus size={18} />
      )}
      {loading ? 'Connecting…' : '+ Connect WhatsApp'}
      {!loading && <Wifi size={16} className="opacity-70" />}
    </button>
  );
}
