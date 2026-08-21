import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';
import { Icon } from '../Icon';
import { TickCircleGlyph } from '../Icon/glyphs';

export interface StepperStep {
  /** Etiqueta corta, p. ej. «Paso 1». */
  label: string;
  /** Descripción del paso. */
  title: string;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  /** Pasos en orden. */
  steps: StepperStep[];
  /** Índice del paso actual. Los anteriores se marcan como completados. */
  current: number;
}

/**
 * Progreso por pasos. El paso actual lleva `aria-current="step"`, así el lector
 * de pantalla sabe dónde está el usuario sin depender del color.
 *
 * El indicador circular se dibuja aquí y no reutiliza Badge: Badge es una
 * etiqueta de estado con texto, no un contador numerado.
 */
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps, current, className, ...props },
  ref,
) {
  // за межами діапазону жоден крок не був би позначений як поточний — мовчки і непомітно
  const activeIndex = Math.min(Math.max(current, 0), steps.length - 1);

  return (
    <ol ref={ref} className={cn('flex items-center gap-4', className)} {...props}>
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        const tone = done || active ? 'text-text-brand' : 'text-text-muted';
        const isLast = i === steps.length - 1;

        return (
          // без display:contents — він прибирає семантику list-item
          // з дерева доступності в частині зв'язок браузер + скрінрідер
          <li key={i} className={cn('flex items-center gap-4', !isLast && 'flex-1')}>
            <div className="flex items-center gap-2" aria-current={active ? 'step' : undefined}>
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full',
                  tone,
                  !done && 'border-current border',
                  text.labelXs,
                )}
              >
                {done ? (
                  <Icon size="md" label="Completado">
                    <TickCircleGlyph />
                  </Icon>
                ) : (
                  i + 1
                )}
              </span>

              <span className="flex flex-col">
                <span className={cn(tone, text.labelSm)}>{step.label}</span>
                <span className={cn(tone, text.labelMd)}>{step.title}</span>
              </span>
            </div>

            {/* лінія забарвлена, лише якщо крок перед нею вже пройдено */}
            {!isLast && (
              <span
                aria-hidden
                className={cn('h-px min-w-4 flex-1', done ? 'bg-border-brand' : 'bg-border-subtle')}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
});
