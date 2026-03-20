// ============================================
// Avatar — Icon/initials circle
// ============================================
// Usage:
//   <Avatar initials="P" />
//   <Avatar initials="CK" size="lg" colorScheme="green" />
// ============================================

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarColorScheme = 'green' | 'blue' | 'red' | 'purple' | 'neutral';

interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  colorScheme?: AvatarColorScheme;
  className?: string;
}

const SIZE_MAP: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-10 h-10 text-sm',
};

const COLOR_MAP: Record<AvatarColorScheme, string> = {
  green: 'bg-primary/10 border-primary/20 text-primary',
  blue: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
  red: 'bg-accent-red/10 border-accent-red/20 text-accent-red',
  purple: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple',
  neutral: 'bg-text-muted/20 border-white/10 text-text-secondary',
};

export default function Avatar({
  initials,
  size = 'md',
  colorScheme = 'green',
  className = '',
}: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border font-bold ${SIZE_MAP[size]} ${COLOR_MAP[colorScheme]} ${className}`}
    >
      {initials}
    </div>
  );
}
