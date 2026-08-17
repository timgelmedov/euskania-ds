import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Nombre completo. De él salen las iniciales y el nombre accesible del avatar. */
  name: string;
  /** Imagen opcional. Si falta, se muestran las iniciales. */
  src?: string;
  /** Diámetro: 32 / 40 / 48 px, igual que las alturas de Button. */
  size?: AvatarSize;
}

// Діаметри збігаються з висотами Button: 32 / 40 / 48
const SIZE: Record<AvatarSize, string> = {
  sm: `size-8 ${text.labelSm}`,
  md: `size-10 ${text.labelSm}`,
  lg: `size-12 ${text.labelMd}`,
};

/** Перші літери перших двох слів: «Euskania Solar» → «ES». */
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? '')
    .join('')
    .toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, src, size = 'md', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-avatar-bg text-avatar-text',
        SIZE[size],
        className,
      )}
      {...props}
    >
      {src ? (
        // alt порожній: доступний підпис уже дає aria-label на обгортці
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
});
