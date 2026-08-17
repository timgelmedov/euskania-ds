import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/**
 * На відміну від Checkbox, застосовує зміну одразу — без кнопки підтвердження.
 * Якщо дія потребує збереження, правильніший вибір Checkbox.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, id, disabled, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <label
      htmlFor={fieldId}
      className={cn(
        'inline-flex items-center gap-2',
        text.bodyMd,
        disabled ? 'text-text-disabled cursor-not-allowed' : 'text-text-primary cursor-pointer',
        className,
      )}
    >
      <input ref={ref} id={fieldId} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" {...props} />

      <span
        aria-hidden
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          'bg-control-track-off',
          'peer-checked:bg-control-bg-checked',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus',
          'peer-disabled:bg-control-bg-disabled',
          // повзунок зміщується через сам трек — вкладений вузол peer-* не дістає
          'after:absolute after:left-0.5 after:size-5 after:rounded-full after:bg-control-bg after:transition-transform',
          'peer-checked:after:translate-x-5',
        )}
      />

      {label}
    </label>
  );
});
