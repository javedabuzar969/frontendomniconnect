// components/ui/Badge.jsx
import { cn } from '../../utils/helpers';

export default function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    green:  'bg-brand-500/15 text-brand-400 border border-brand-500/20',
    gray:   'bg-surface-700/50 text-surface-400',
    yellow: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
    red:    'bg-red-500/15 text-red-400 border border-red-500/20',
    blue:   'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
