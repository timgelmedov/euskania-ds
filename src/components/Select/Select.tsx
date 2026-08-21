import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';
import { Icon } from '../Icon';
import { ArrowDownGlyph } from '../Icon/glyphs';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Etiqueta sobre el campo. Sin ella, `aria-label` es obligatorio. */
  label?: string;
  /** Ayuda o mensaje de error bajo el campo. */
  hint?: string;
  /** Marca el campo como inválido: cambia el borde y la ayuda, y activa `aria-invalid`. */
  invalid?: boolean;
  /** Altura y tipografía del control: 32 / 40 / 48 px. */
  size?: SelectSize;
}

// Типографіка — стилі body/*, спільні з Input
const SIZE: Record<SelectSize, string> = {
  sm: `h-8 pl-3 pr-8 ${text.bodySm}`,
  md: `h-10 pl-3 pr-8 ${text.bodyMd}`,
  lg: `h-12 pl-3 pr-8 ${text.bodyLg}`,
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, invalid, size = 'md', className, id, children, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={fieldId} className={cn('text-input-label', text.labelSm)}>
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={invalid || undefined}
          aria-describedby={hintId}
          className={cn(
            'w-full appearance-none rounded-md border bg-input-bg text-input-text',
            'transition-colors outline-none',
            invalid ? 'border-input-border-error' : 'border-input-border hover:border-input-border-hover',
            'focus-visible:border-input-border-focus focus-visible:border-2',
            'disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:cursor-not-allowed',
            SIZE[size],
            className,
          )}
          {...props}
        >
          {children}
        </select>

        {/* іконка, а не текстовий гліф — так само, як у Figma.
            Без aria-label, бо сам select уже озвучується скрінрідером */}
        <Icon
          size="md"
          className="text-input-placeholder pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        >
          <ArrowDownGlyph />
        </Icon>
      </div>

      {hint && (
        <span id={hintId} className={cn(text.bodyXs, invalid ? 'text-input-hint-error' : 'text-input-hint')}>
          {hint}
        </span>
      )}
    </div>
  );
});
