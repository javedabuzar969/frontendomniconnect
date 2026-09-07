// components/inbox/ConversationThread.jsx
import { useState, useRef, useEffect } from 'react';
import { Send, Phone, MoreVertical, Paperclip } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import MessageBubble from './MessageBubble';
import Spinner from '../ui/Spinner';
import { cn } from '../../utils/helpers';
import { sendMessage } from '../../api/conversations';
import toast from 'react-hot-toast';

export default function ConversationThread({
  conversation,
  messages,
  loadingMessages,
  onMessageSent,
}) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      const newMsg = await sendMessage(conversation.id, { content: trimmed, type: 'text' });
      setText('');
      onMessageSent?.(newMsg);
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50">
        <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-slate-300">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <h3 className="text-slate-800 font-bold mb-1 text-sm">Select a conversation</h3>
        <p className="text-slate-500 text-xs">
          Choose a conversation from the left to start messaging
        </p>
      </div>
    );
  }

  const customer = conversation.customer;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
      {/* Thread Header */}
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-slate-200 bg-white shrink-0 shadow-sm">
        <Avatar name={customer?.name || 'User'} size="sm" />
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-slate-900 truncate">
            {customer?.name || 'Unknown Contact'}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-slate-500 truncate">{customer?.phone || ''}</p>
            <Badge variant={conversation.status === 'open' ? 'green' : 'gray'}>
              {conversation.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
            <Phone size={16} />
          </button>
          <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
        {loadingMessages ? (
          <div className="flex justify-center py-12">
            <Spinner size="md" />
          </div>
        ) : messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-slate-400 text-sm">No messages yet. Say hello! 👋</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message Input Bar */}
      <div className="shrink-0 px-6 py-3.5 border-t border-slate-200 bg-white shadow-sm">
        <div className="flex items-end gap-3">
          <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0 mb-0.5">
            <Paperclip size={18} />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a WhatsApp message… (Enter to send)"
              rows={1}
              className={cn(
                'w-full resize-none rounded-2xl bg-slate-50 border border-slate-200',
                'px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400',
                'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white',
                'transition-all duration-150 max-h-32 overflow-y-auto'
              )}
              style={{ height: 'auto' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            className={cn(
              'shrink-0 mb-0.5 w-11 h-11 rounded-xl flex items-center justify-center',
              'transition-all duration-150 active:scale-95',
              text.trim() && !sending
                ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-glow cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            {sending ? (
              <Spinner size="sm" className="border-white/30 border-t-white" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
