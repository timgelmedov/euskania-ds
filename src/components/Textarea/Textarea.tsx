import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Etiqueta sobre el campo. Sin ella, `aria-label` es obligatorio. */
  label?: string;
  /** Ayuda o mensaje de error bajo el campo. */
  hint?: string;
  /** Marca el campo como inválido: cambia el borde y la ayuda, y activa `aria-invalid`. */
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, invalid, className, id, rows = 4, ...props },
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

      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className={cn(
          'w-full rounded-md border bg-input-bg p-3 text-input-text',
          text.bodyMd,
          'placeholder:text-input-placeholder',
          'transition-colors outline-none',
          invalid ? 'border-input-border-error' : 'border-input-border hover:border-input-border-hover',
          'focus-visible:border-input-border-focus focus-visible:border-2',
          'disabled:bg-input-bg-disabled disabled:text-input-text-disabled disabled:cursor-not-allowed',
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
