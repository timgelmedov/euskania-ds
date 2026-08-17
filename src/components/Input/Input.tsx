import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Etiqueta sobre el campo. Sin ella, `aria-label` es obligatorio. */
  label?: string;
  /** Ayuda o mensaje de error bajo el campo. */
  hint?: string;
  /** Marca el campo como inválido: cambia el borde y la ayuda, y activa `aria-invalid`. */
  invalid?: boolean;
  /** Altura y tipografía del campo: 32 / 40 / 48 px. */
  size?: InputSize;
}

// Типографіка — стилі body/*, ті самі, що у Figma
const SIZE: Record<InputSize, string> = {
  sm: `h-8 px-3 ${text.bodySm}`,
  md: `h-10 px-3 ${text.bodyMd}`,
  lg: `h-12 px-3 ${text.bodyLg}`,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, invalid, size = 'md', className, id, disabled, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className={cn('text-input-label', text.labelSm)}>
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className={cn(
          'w-full rounded-md border bg-input-bg text-input-text',
          'placeholder:text-input-placeholder',
          'transition-colors outline-none',
          invalid ? 'border-input-border-error' : 'border-input-border hover:border-input-border-hover',
          'focus-visible:border-input-border-focus focus-visible:border-2',
          'disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:cursor-not-allowed',
          SIZE[size],
          className,
        )}
        {...props}
      />

      {hint && (
        <span id={hintId} className={cn(text.bodyXs, invalid ? 'text-input-hint-error' : 'text-input-hint')}>
          {hint}
        </span>
      )}
    </div>
  );
});
