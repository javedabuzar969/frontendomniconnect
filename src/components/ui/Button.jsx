// components/ui/Button.jsx
import { cn } from '../../utils/helpers';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 shadow-glow',
    secondary: 'bg-surface-800 text-surface-100 hover:bg-surface-700 border border-surface-700',
    ghost:     'text-surface-400 hover:text-surface-100 hover:bg-surface-800/60',
    danger:    'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
    outline:   'border border-brand-500/50 text-brand-400 hover:bg-brand-500/10',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
    icon: 'p-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
