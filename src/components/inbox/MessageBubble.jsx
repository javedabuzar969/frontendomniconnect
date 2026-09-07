// components/inbox/MessageBubble.jsx
import { Check, CheckCheck, Clock } from 'lucide-react';
import { cn, formatMessageTime } from '../../utils/helpers';

function StatusIcon({ status }) {
  if (status === 'pending') return <Clock size={12} className="text-slate-400" />;
  if (status === 'sent')      return <Check size={12} className="text-slate-400" />;
  if (status === 'delivered') return <CheckCheck size={12} className="text-slate-400" />;
  if (status === 'read')      return <CheckCheck size={12} className="text-sky-500" />;
  if (status === 'failed')    return <span className="text-[10px] text-red-500">Failed</span>;
  return null;
}

export default function MessageBubble({ message }) {
  const isOutbound = message.direction === 'outbound';

  return (
    <div
      className={cn(
        'flex mb-2.5 animate-fade-in',
        isOutbound ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'relative max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm',
          isOutbound
            ? 'bg-[#d9fdd3] border border-[#c2f3ba] text-slate-900 rounded-br-sm'
            : 'bg-white border border-slate-200 text-slate-900 rounded-bl-sm'
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap break-words text-sm font-normal text-slate-800">
          {message.content}
        </p>
        <div
          className={cn(
            'flex items-center gap-1.5 mt-1 select-none',
            isOutbound ? 'justify-end' : 'justify-start'
          )}
        >
          <span className="text-[11px] text-slate-400">
            {formatMessageTime(message.sentAt)}
          </span>
          {isOutbound && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  );
}
