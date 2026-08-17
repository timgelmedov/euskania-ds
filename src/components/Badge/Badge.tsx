import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-badge-neutral-bg text-badge-neutral-text',
  brand: 'bg-badge-brand-bg text-badge-brand-text',
  success: 'bg-badge-success-bg text-badge-success-text',
  error: 'bg-badge-error-bg text-badge-error-text',
};

/**
 * Колір ніколи не є єдиним індикатором стану — текст усередині обовʼязковий.
 * Це вимога WCAG 1.4.1 і причина, чому у Badge немає варіанта «лише крапка».
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1',
        text.labelXs,
        TONE[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
