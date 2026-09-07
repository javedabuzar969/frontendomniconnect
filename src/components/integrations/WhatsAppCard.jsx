// components/integrations/WhatsAppCard.jsx
import { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  MoreVertical,
  Trash2,
  Settings2,
  Copy,
  PhoneCall,
  Check,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

const STATUS_CONFIG = {
  active:   { label: 'Connected',    icon: CheckCircle2, color: 'text-brand-600', badgeVariant: 'green'  },
  inactive: { label: 'Disconnected', icon: AlertCircle,  color: 'text-slate-400', badgeVariant: 'gray' },
  pending:  { label: 'Pending',      icon: Clock,        color: 'text-amber-500', badgeVariant: 'yellow' },
  error:    { label: 'Error',        icon: AlertCircle,  color: 'text-red-500',    badgeVariant: 'red'   },
};

function InfoRow({ label, value, copyable = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-mono text-slate-800 truncate max-w-[170px]">
          {value}
        </span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            title="Copy"
          >
            {copied ? <Check size={12} className="text-brand-600" /> : <Copy size={12} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function WhatsAppCard({ connection, onDisconnect, onManage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = STATUS_CONFIG[connection.status] || STATUS_CONFIG.inactive;

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Top accent bar */}
      <div
        className={cn(
          'h-1.5 w-full',
          connection.status === 'active'
            ? 'bg-gradient-to-r from-brand-500 to-emerald-400'
            : 'bg-slate-200'
        )}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* WhatsApp brand icon */}
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-500">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">WhatsApp</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={cn('w-2 h-2 rounded-full', {
                  'bg-brand-500 shadow-[0_0_6px_rgba(37,211,102,0.6)]': connection.status === 'active',
                  'bg-amber-400 animate-pulse': connection.status === 'pending',
                  'bg-red-500': connection.status === 'error',
                  'bg-slate-400': connection.status === 'inactive',
                })} />
                <Badge variant={status.badgeVariant}>{status.label}</Badge>
              </div>
            </div>
          </div>

          {/* 3-dot dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <MoreVertical size={16} />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 z-20 w-44 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 animate-fade-in">
                  <button
                    onClick={() => { onManage?.(connection); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Settings2 size={14} />
                    Manage
                  </button>
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    onClick={() => { onDisconnect?.(connection.id); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                    Disconnect
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Business info */}
        <div className="mb-4">
          <p className="text-base font-bold text-slate-900">{connection.businessName}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <PhoneCall size={13} className="text-slate-400" />
            <p className="text-sm font-medium text-slate-600">{connection.displayPhoneNumber}</p>
          </div>
        </div>

        {/* Details list */}
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-1 mb-5">
          <InfoRow label="WABA ID"          value={connection.wabaId}          copyable />
          <InfoRow label="Phone Number ID"  value={connection.phoneNumberId}   copyable />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => onManage?.(connection)} className="flex-1">
            <Settings2 size={14} />
            Manage
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDisconnect?.(connection.id)} className="flex-1">
            <Trash2 size={14} />
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
