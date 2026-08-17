import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Intención del estado. Nunca sustituye al texto: el color no puede ser el único indicador. */
  tone?: BadgeTone;
}

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-badge-neutral-bg text-badge-neutral-text',
  brand: 'bg-badge-brand-bg text-badge-brand-text',
  success: 'bg-badge-success-bg text-badge-success-text',
  error: 'bg-badge-error-bg text-badge-error-text',
};

/**
 * Etiqueta de estado. El color nunca es el único indicador: el texto dentro es
 * obligatorio. Es un requisito de WCAG 1.4.1 y la razón de que Badge no tenga
 * una variante de solo punto.
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
