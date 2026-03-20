'use client';

// ============================================
// Tabs — Generic tab bar
// ============================================
// Usage:
//   <Tabs items={['Tab A', 'Tab B']} activeKey="Tab A" onChange={setTab} />
//   <Tabs items={['1H','4H','24H']} activeKey={active} onChange={set} variant="pill" />
// ============================================

interface TabsProps<T extends string> {
  items: readonly T[];
  activeKey: T;
  onChange: (key: T) => void;
  /** 'underline' = border-bottom style, 'pill' = bg-highlight style */
  variant?: 'underline' | 'pill';
  className?: string;
}

export default function Tabs<T extends string>({
  items,
  activeKey,
  onChange,
  variant = 'underline',
  className = '',
}: TabsProps<T>) {
  if (variant === 'pill') {
    return (
      <div className={`flex rounded-xl border border-white/5 bg-white/5 p-1 ${className}`}>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`rounded-lg px-4 py-1.5 text-[10px] font-bold transition-all ${
              activeKey === item
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }

  // underline variant
  return (
    <div className={`flex items-center gap-6 border-b border-white/5 ${className}`}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`relative pb-3 text-sm font-medium transition-colors ${
            activeKey === item ? 'text-primary' : 'text-text-secondary hover:text-white'
          }`}
        >
          {item}
          {activeKey === item && (
            <div className="bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
