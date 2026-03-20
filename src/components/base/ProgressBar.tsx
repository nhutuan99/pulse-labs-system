// ============================================
// ProgressBar — Horizontal progress indicator
// ============================================
// Usage:
//   <ProgressBar value={88} />
//   <ProgressBar value={72} colorScheme="blue" size="md" showLabel />
// ============================================

interface ProgressBarProps {
  /** Value between 0 and 100 */
  value: number;
  colorScheme?: 'green' | 'blue' | 'red' | 'yellow';
  size?: 'xs' | 'sm' | 'md';
  /** Show percentage label */
  showLabel?: boolean;
  /** Track background class override */
  trackClassName?: string;
  className?: string;
}

const COLOR_MAP = {
  green: 'bg-primary',
  blue: 'bg-accent-blue',
  red: 'bg-accent-red',
  yellow: 'bg-accent-yellow',
} as const;

const HEIGHT_MAP = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
} as const;

export default function ProgressBar({
  value,
  colorScheme = 'green',
  size = 'sm',
  showLabel = false,
  trackClassName,
  className = '',
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-[10px]">
          <span className="text-text-secondary font-bold tracking-widest uppercase">Progress</span>
          <span className="text-primary font-extrabold">{clampedValue}%</span>
        </div>
      )}
      <div
        className={`${HEIGHT_MAP[size]} w-full overflow-hidden rounded-full ${
          trackClassName || 'bg-white/5'
        }`}
      >
        <div
          className={`${COLOR_MAP[colorScheme]} h-full rounded-full transition-all duration-700`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
