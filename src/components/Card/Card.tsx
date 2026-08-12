import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type CardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Контейнер контенту. Відділяється від фону межею, а не тінню —
 * у системі немає шару elevation, це свідоме рішення.
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
