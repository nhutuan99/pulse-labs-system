// ============================================
// Button — Variant-based reusable button
// ============================================
// Usage:
//   <Button>Click me</Button>
//   <Button variant="primary" size="lg" fullWidth>Submit</Button>
//   <Button variant="ghost" leftIcon={<HiSearch />}>Search</Button>
// ============================================

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const VARIANT_MAP: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white font-bold hover:brightness-110 hover:shadow-card-hover',
  secondary:
    'border border-border-glass bg-bg-elevated text-text-primary font-medium hover:border-border-glass-hover hover:shadow-card-hover',
  ghost: 'text-text-secondary font-medium hover:text-text-primary hover:bg-white/5',
  outline: 'border border-white/10 bg-white/5 text-text-primary font-medium hover:border-white/20',
  danger: 'bg-accent-red text-white font-bold hover:brightness-110',
};

const SIZE_MAP: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-[10px] rounded-lg gap-1',
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-5 py-3 text-sm rounded-xl gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center transition-all',
          VARIANT_MAP[variant],
          SIZE_MAP[size],
          fullWidth ? 'w-full' : '',
          isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
