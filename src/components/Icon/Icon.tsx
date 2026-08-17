import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Nodo SVG del set de iconos elegido. El color se hereda vía `currentColor`. */
  children: ReactNode;
  /** Nombre accesible. Sin él el icono se considera decorativo y se oculta al lector de pantalla. */
  label?: string;
  /** Lado del icono: 16 / 20 / 24 px. */
  size?: IconSize;
}

const SIZE: Record<IconSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

/**
 * Envoltorio de tamaño y color para cualquier icono SVG.
 *
 * La biblioteca no incluye un set propio de glifos a propósito: dibujar iconos
 * desde cero da un conjunto incoherente. Conecta un set existente (Lucide,
 * Phosphor) y pasa sus iconos como children.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { children, label, size = 'md', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('inline-flex shrink-0 items-center justify-center [&>svg]:size-full', SIZE[size], className)}
      {...props}
    >
      {children}
    </span>
  );
});
