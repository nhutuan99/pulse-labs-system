// ============================================
// CircularGauge — SVG ring gauge
// ============================================
// Usage:
//   <CircularGauge value={72} />
//   <CircularGauge value={88} size={80} label="Confidence" />
// ============================================

import { type ReactNode } from 'react';

interface CircularGaugeProps {
  /** Value between 0 and 100 */
  value: number;
  /** Outer diameter in px */
  size?: number;
  /** Ring thickness */
  strokeWidth?: number;
  /** Stroke color — CSS color string or var() */
  strokeColor?: string;
  /** Track (background) stroke color */
  trackColor?: string;
  /** Label below the gauge */
  label?: string;
  /** Custom center content — overrides default value display */
  center?: ReactNode;
  className?: string;
}

export default function CircularGauge({
  value,
  size = 80,
  strokeWidth = 6,
  strokeColor = 'var(--color-accent-green)',
  trackColor = 'var(--color-border-glass)',
  label,
  center,
  className = '',
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashArray = (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          {/* Value arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashArray} ${circumference - dashArray}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {center ?? <span className="text-text-primary text-base font-bold">{value}</span>}
        </div>
      </div>
      {label && <span className="text-text-muted mt-1 text-[10px]">{label}</span>}
    </div>
  );
}
