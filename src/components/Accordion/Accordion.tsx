import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';
import { Icon } from '../Icon';
import { ChevronDownGlyph, ChevronUpGlyph } from '../Icon/glyphs';

export interface AccordionItem {
  /** Pregunta o encabezado de la sección. */
  question: string;
  /** Contenido que se despliega. */
  answer: ReactNode;
  /** Icono opcional antes de la pregunta. */
  icon?: ReactNode;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Secciones desplegables, en orden. */
  items: AccordionItem[];
  /** Índices abiertos al montar. */
  defaultOpen?: number[];
  /** Si es `false`, abrir una sección cierra las demás. */
  multiple?: boolean;
  /** Nivel de encabezado que envuelve cada pregunta, para encajar en la jerarquía de la página. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/**
 * Secciones desplegables. Sigue el patrón de disclosure de WAI-ARIA: cada
 * pregunta es un `<button>` dentro de un encabezado, con `aria-expanded` y
 * `aria-controls`, y el panel enlaza de vuelta con `aria-labelledby`.
 *
 * El panel permanece en el DOM y se oculta con `hidden`: si se desmontara,
 * `aria-controls` apuntaría a un elemento inexistente.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { items, defaultOpen = [], multiple = true, headingLevel = 3, className, ...props },
  ref,
) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const Heading = `h${headingLevel}` as const;

  const toggle = (index: number) => {
    setOpen((current) => {
      if (current.includes(index)) return current.filter((i) => i !== index);
      return multiple ? [...current, index] : [index];
    });
  };

  return (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const buttonId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={i} className="border-border-subtle border-b">
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={cn(
                  // 24px іконка + py-4 з обох боків = 56px, як у Figma.
                  // Фіксована висота не годиться: 56 немає у шкалі spacing.
                  'flex w-full cursor-pointer items-center gap-2 py-4 text-left',
                  'text-text-primary transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
                  text.labelLg,
                )}
              >
                {item.icon && <Icon size="lg">{item.icon}</Icon>}
                <span className="flex-1">{item.question}</span>
                {/* стрілка декоративна: стан уже озвучено через aria-expanded */}
                <Icon size="lg">{isOpen ? <ChevronUpGlyph /> : <ChevronDownGlyph />}</Icon>
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn('text-text-muted flex flex-col gap-1 pb-4', text.bodyMd)}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
});
