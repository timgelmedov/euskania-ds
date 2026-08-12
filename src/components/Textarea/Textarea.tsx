import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, invalid, className, id, rows = 4, ...props },
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

      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className={cn(
          'font-base w-full rounded-md border bg-input-bg p-3 text-md text-input-text',
          'placeholder:text-input-placeholder',
          'transition-colors outline-none',
          invalid ? 'border-input-border-error' : 'border-input-border hover:border-input-border-hover',
          'focus-visible:border-input-border-focus focus-visible:border-2',
          'disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:cursor-not-allowed',
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
