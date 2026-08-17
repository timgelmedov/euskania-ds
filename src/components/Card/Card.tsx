import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type CardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Contenedor de contenido. Se separa del fondo con un borde, no con sombra:
 * el sistema no tiene capa de elevación, y es una decisión deliberada.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('rounded-lg border border-card-border bg-card-bg p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
});
