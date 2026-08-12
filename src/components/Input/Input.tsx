import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Підпис над полем. Без нього обовʼязковий aria-label. */
  label?: string;
  /** Підказка або текст помилки під полем. */
  hint?: string;
  /** Помилка змінює колір межі та підказки і вмикає aria-invalid. */
  invalid?: boolean;
  size?: InputSize;
}

const SIZE: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-md',
  lg: 'h-12 px-3 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, invalid, size = 'md', className, id, disabled, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-input-label font-base text-sm font-medium">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className={cn(
          'font-base w-full rounded-md border bg-input-bg text-input-text',
          'placeholder:text-input-placeholder',
          'transition-colors outline-none',
          invalid ? 'border-input-border-error' : 'border-input-border hover:border-input-border-hover',
          'focus-visible:border-input-border-focus focus-visible:border-2',
          'disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:cursor-not-allowed',
          SIZE[size],
          className,
        )}
        {...props}
      />

      {hint && (
        <span id={hintId} className={cn('font-base text-xs', invalid ? 'text-input-hint-error' : 'text-input-hint')}>
          {hint}
        </span>
      )}
    </div>
  );
});
