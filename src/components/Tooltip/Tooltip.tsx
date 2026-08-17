import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export interface TooltipProps {
  /** Texto de la pista. Solo información complementaria: nunca contenido imprescindible. */
  label: string;
  /** Elemento que dispara la pista. */
  children: ReactNode;
  /** Clases extra para el contenedor. */
  className?: string;
}

/**
 * Pista contextual. Aparece al pasar el ratón y también al enfocar con teclado,
 * de lo contrario sería inaccesible. El posicionamiento es simple (arriba,
 * centrado): para casos complejos hace falta una librería, y eso será una
 * decisión aparte.
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
            'absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2',
            'rounded-sm bg-tooltip-bg px-2 py-1 whitespace-nowrap text-tooltip-text',
            text.bodySm,
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
