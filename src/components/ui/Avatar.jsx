// components/ui/Avatar.jsx
import { getInitials, cn } from '../../utils/helpers';

export default function Avatar({ name = '', size = 'md', className = '' }) {
  const sizes = {
    xs:  'w-6 h-6 text-xs',
    sm:  'w-8 h-8 text-xs',
    md:  'w-10 h-10 text-sm',
    lg:  'w-12 h-12 text-base',
    xl:  'w-16 h-16 text-xl',
  };

  // Generate a consistent color from the name
  const colors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-orange-500 to-amber-600',
    'from-pink-500 to-rose-600',
    'from-teal-500 to-green-600',
  ];
  const colorIndex =
    name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br shrink-0',
        colors[colorIndex],
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
