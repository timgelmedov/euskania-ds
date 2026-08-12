import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/** Використовується всередині групи з однаковим `name` — вибір лише один. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, id, disabled, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <label
      htmlFor={fieldId}
      className={cn(
        'font-base inline-flex items-center gap-2 text-md',
        disabled ? 'text-text-disabled cursor-not-allowed' : 'text-text-primary cursor-pointer',
        className,
      )}
    >
      <input ref={ref} id={fieldId} type="radio" disabled={disabled} className="peer sr-only" {...props} />

      <span
        aria-hidden
        className={cn(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          'border-control-border bg-control-bg',
          // колір крапки їде через currentColor: peer-* не дістає до вкладених вузлів
          'text-transparent peer-checked:text-control-bg-checked',
          'peer-checked:border-control-border-checked',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus',
          'peer-disabled:border-control-border peer-disabled:bg-control-bg-disabled',
        )}
      >
        {/* внутрішня крапка — чиста геометрія, як і у Figma */}
        <span className="size-2 rounded-full bg-current transition-colors" />
      </span>

      {label}
    </label>
  );
});
