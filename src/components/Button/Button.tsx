import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { text } from '../../lib/typography';

/**
 * Стани взаємодії.
 *
 * У реальному використанні їх дають псевдокласи (:hover, :active). Проп `state`
 * потрібен лише щоб Storybook міг показати стан статично — інакше документація
 * зводиться до «наведи мишку і повір».
 */
type ButtonState = 'hover' | 'active';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Jerarquía visual: primary una por pantalla, secondary para acciones no críticas, ghost sin peso visual. */
  variant?: ButtonVariant;
  /** Altura y tipografía del botón: 32 / 40 / 48 px. */
  size?: ButtonSize;
  /** Icono antes del texto. Cualquier nodo: Button no depende de un set de iconos concreto. */
  startIcon?: ReactNode;
  /** Icono después del texto. */
  endIcon?: ReactNode;
  /** Solo para documentación: fuerza un estado visual. En producción usa las pseudoclases. */
  state?: ButtonState;
  /**
   * Atributo nativo `<button type>`. Por defecto `button`, no `submit`:
   * de lo contrario el botón enviaría el formulario que lo contiene en cada clic.
   */
  type?: 'button' | 'submit' | 'reset';
}

const BASE = [
  'inline-flex items-center justify-center',
  'rounded-md whitespace-nowrap',
  'border border-transparent',
  'transition-colors duration-150',
  'cursor-pointer select-none',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-focus-ring',
  'disabled:cursor-not-allowed disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:border-transparent',
].join(' ');

// Кожен стан дублюється: псевдоклас для реальної взаємодії,
// data-state — щоб той самий вигляд можна було зафіксувати у сторі.
const VARIANT: Record<ButtonVariant, string> = {
  primary: [
    'bg-button-primary-bg text-button-primary-text',
    'hover:bg-button-primary-bg-hover data-[state=hover]:bg-button-primary-bg-hover',
    'active:bg-button-primary-bg-active data-[state=active]:bg-button-primary-bg-active',
  ].join(' '),
  secondary: [
    'bg-button-secondary-bg text-button-secondary-text border-button-secondary-border',
    'hover:bg-button-secondary-bg-hover data-[state=hover]:bg-button-secondary-bg-hover',
    'active:bg-button-secondary-bg-active data-[state=active]:bg-button-secondary-bg-active',
  ].join(' '),
  ghost: [
    'bg-transparent text-button-ghost-text',
    'hover:bg-button-ghost-bg-hover data-[state=hover]:bg-button-ghost-bg-hover',
    'active:bg-button-ghost-bg-active data-[state=active]:bg-button-ghost-bg-active',
  ].join(' '),
};

// Висоти беруться зі шкали spacing: h-8 = 32px, h-10 = 40px, h-12 = 48px.
// Типографіка — стилі label/*, ті самі, що у Figma.
const SIZE: Record<ButtonSize, string> = {
  sm: `h-8 gap-2 px-3 ${text.labelSm}`,
  md: `h-10 gap-2 px-4 ${text.labelMd}`,
  lg: `h-12 gap-2 px-6 ${text.labelLg}`,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    type = 'button',
    startIcon,
    endIcon,
    state,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const classes = [BASE, VARIANT[variant], SIZE[size], className].filter(Boolean).join(' ');

  if (import.meta.env.DEV && !children && !props['aria-label'] && !props['aria-labelledby']) {
    // Кнопка лише з іконкою не має доступного імені — скрінрідер прочитає її як «button»
    console.warn('Button: кнопка без тексту потребує aria-label або aria-labelledby.');
  }

  return (
    <button
      ref={ref}
      type={type}
      // disabled має пріоритет: інакше forced-стан зі сторі переміг би
      // disabled-стилі, бо специфічність селекторів однакова
      data-state={disabled ? undefined : state}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
});
