import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Texto junto a la casilla. */
  label?: string;
  /** Estado parcial, para selecciones incompletas dentro de un grupo. */
  indeterminate?: boolean;
}

/**
 * Casilla de verificación. El input nativo permanece en el DOM y recibe el foco,
 * pero está oculto visualmente: el aspecto lo dibuja un span contiguo. Así la
 * marca sigue siendo un glifo de texto, como en Figma, y el componente no
 * arrastra ningún set de iconos.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate = false, className, id, disabled, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const inner = useRef<HTMLInputElement>(null);

  // indeterminate існує лише як властивість DOM — HTML-атрибута для нього немає
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      htmlFor={fieldId}
      className={cn(
        'inline-flex items-center gap-2',
        text.bodyMd,
        disabled ? 'text-text-disabled cursor-not-allowed' : 'text-text-primary cursor-pointer',
        className,
      )}
    >
      <input
        ref={(node) => {
          inner.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        id={fieldId}
        type="checkbox"
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />

      {/*
        Позначка присутня завжди, але прозора — інакше довелося б знати стан
        checked у React, а він може бути неконтрольованим. peer-* працює лише
        на сусідніх елементах, тому колір перемикається саме тут.
      */}
      <span
        aria-hidden
        className={cn(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors',
          'border-control-border bg-control-bg text-transparent',
          text.labelXs,
          'peer-checked:border-control-border-checked peer-checked:bg-control-bg-checked peer-checked:text-control-mark',
          'peer-indeterminate:border-control-border-checked peer-indeterminate:bg-control-bg-checked peer-indeterminate:text-control-mark',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus',
          'peer-disabled:border-control-border peer-disabled:bg-control-bg-disabled',
        )}
      >
        {indeterminate ? '–' : '✓'}
      </span>

      {label}
    </label>
  );
});
