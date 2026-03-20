// ============================================
// Input — Styled form input with icon slot
// ============================================
// Usage:
//   <Input leftIcon={<HiOutlineMail />} placeholder="Email" />
//   <Input type="password" leftIcon={<HiOutlineLockClosed />} />
// ============================================

import { forwardRef, type ReactNode, type InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: ReactNode;
  /** Visual size variant */
  inputSize?: 'sm' | 'md';
  /** Whether to use rounded-full (pill) shape */
  pill?: boolean;
}

const SIZE_MAP = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2.5 text-sm',
} as const;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, inputSize = 'md', pill = false, className = '', ...rest }, ref) => {
    return (
      <div
        className={`border-border-glass bg-bg-elevated flex items-center gap-2 border ${
          pill ? 'rounded-full' : 'rounded-xl'
        } ${SIZE_MAP[inputSize]} focus-within:border-primary focus-within:shadow-focus transition-all ${className}`}
      >
        {leftIcon && <span className="text-text-muted shrink-0">{leftIcon}</span>}
        <input
          ref={ref}
          className="text-text-primary placeholder:text-text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
