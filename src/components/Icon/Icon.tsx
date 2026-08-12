import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** SVG-вузол з обраного набору іконок. Колір успадковується через currentColor. */
  children: ReactNode;
  /** Доступна назва. Без неї іконка вважається декоративною і ховається від скрінрідера. */
  label?: string;
  size?: IconSize;
}

const SIZE: Record<IconSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

/**
 * Обгортка розміру й кольору для будь-якої SVG-іконки.
 *
 * Власного набору гліфів дизайн-система не містить свідомо: малювати іконки
 * з нуля означає отримати неузгоджений набір. Підключіть готовий набір
 * (Lucide, Phosphor) і передавайте його іконки як children.
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
