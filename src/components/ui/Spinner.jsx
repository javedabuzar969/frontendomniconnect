// components/ui/Spinner.jsx
import { cn } from '../../utils/helpers';

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-[3px]',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={cn(
        'rounded-full border-brand-500/30 border-t-brand-500 animate-spin',
        sizes[size],
        className
      )}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" />
        <p className="text-surface-400 text-sm animate-pulse-soft">Loading…</p>
      </div>
    </div>
  );
}
