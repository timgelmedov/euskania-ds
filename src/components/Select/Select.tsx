import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  invalid?: boolean;
  size?: SelectSize;
}

const SIZE: Record<SelectSize, string> = {
  sm: 'h-8 pl-3 pr-8 text-sm',
  md: 'h-10 pl-3 pr-8 text-md',
  lg: 'h-12 pl-3 pr-8 text-lg',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, invalid, size = 'md', className, id, children, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={fieldId} className="text-input-label font-base text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={invalid || undefined}
          aria-describedby={hintId}
          className={cn(
            'font-base w-full appearance-none rounded-md border bg-input-bg text-input-text',
            'transition-colors outline-none',
            invalid ? 'border-input-border-error' : 'border-input-border hover:border-input-border-hover',
            'focus-visible:border-input-border-focus focus-visible:border-2',
            'disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:cursor-not-allowed',
            SIZE[size],
            className,
          )}
          {...props}
        >
          {children}
        </select>

        {/* стрілка — текстовий гліф, як і у Figma; aria-hidden, бо select уже озвучується */}
        <span
          aria-hidden
          className="text-input-placeholder pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        >
          ▾
        </span>
      </div>

      {hint && (
        <span id={hintId} className={cn('font-base text-xs', invalid ? 'text-input-hint-error' : 'text-input-hint')}>
          {hint}
        </span>
      )}
    </div>
  );
});
