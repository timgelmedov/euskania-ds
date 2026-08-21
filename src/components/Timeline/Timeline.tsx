import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export interface TimelineItem {
  /** Fecha del evento. Se muestra sobre el título. */
  date: string;
  /** Título del evento. */
  title: string;
  /** Descripción del evento. */
  description?: string;
  /** Acción opcional bajo el texto, normalmente un Button. */
  action?: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  /** Eventos en orden cronológico. */
  items: TimelineItem[];
}

/**
 * Cronología de eventos. La línea vertical y los puntos son decorativos:
 * el orden lo comunica la lista `<ol>`, no el dibujo, así el lector de
 * pantalla recibe la misma secuencia que se ve.
 */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { items, className, ...props },
  ref,
) {
  return (
    <ol ref={ref} className={cn('border-border-subtle flex flex-col gap-10 border-l', className)} {...props}>
      {items.map((item, i) => (
        <li key={i} className="relative flex flex-col gap-5 pl-5">
          {/*
            Точка «протикає» лінію: кільце кольору фону перекриває її.
            У Figma діаметр 9px — токена такого немає, беремо 8px (spacing/2),
            різниця в 1px непомітна, зате значення лишається в системі.
          */}
          <span
            aria-hidden
            className="bg-border-subtle ring-surface-base absolute top-1.5 -left-1 size-2 rounded-full ring-2"
          />

          <div className="flex flex-col gap-1">
            <time className={cn('text-text-muted', text.labelSm)}>{item.date}</time>
            <h3 className={cn('text-text-primary', text.headingLg)}>{item.title}</h3>
            {item.description && (
              <p className={cn('text-text-secondary', text.bodySm)}>{item.description}</p>
            )}
          </div>

          {item.action}
        </li>
      ))}
    </ol>
  );
});
