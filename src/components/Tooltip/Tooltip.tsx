import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TooltipProps {
  /** Текст підказки. Тільки допоміжна інформація — не критична для розуміння. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Підказка зʼявляється і на наведення, і на фокус — інакше вона недоступна
 * з клавіатури. Позиціювання просте (зверху по центру): для складних випадків
 * потрібна бібліотека, і це буде окреме рішення.
 */
export function Tooltip({ label, children, className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>

      {open && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'font-base absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2',
            'rounded-sm bg-tooltip-bg px-2 py-1 text-sm whitespace-nowrap text-tooltip-text',
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
