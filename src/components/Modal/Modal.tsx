import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';
import { Icon } from '../Icon';
import { CloseGlyph } from '../Icon/glyphs';

export interface ModalProps {
  /** Si el diálogo está abierto. */
  open: boolean;
  /** Se llama al cerrar: con Escape, con la X o al pulsar fuera. */
  onClose: () => void;
  /** Encabezado del diálogo. Da nombre accesible al diálogo. */
  title: string;
  /** Texto explicativo bajo el encabezado. */
  description?: ReactNode;
  /** Icono decorativo sobre el texto. */
  icon?: ReactNode;
  /** Contenido adicional: campos de formulario, por ejemplo. */
  children?: ReactNode;
  /** Acciones al pie, normalmente uno o dos Button. */
  actions?: ReactNode;
  className?: string;
}

/**
 * Diálogo modal construido sobre el `<dialog>` nativo.
 *
 * Es una decisión deliberada: `showModal()` ya aporta trampa de foco, cierre
 * con Escape, fondo inerte y `::backdrop`. Reimplementar eso a mano es
 * justamente donde suele romperse la accesibilidad.
 *
 * Lo único que el navegador no hace es bloquear el scroll de fondo, así que
 * eso se añade aquí.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  actions,
  className,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // фон не має прокручуватись, поки діалог відкритий — це єдине,
  // чого нативний <dialog> не робить сам
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // клік поза вмістом: ціль події — сам <dialog>, а не його нащадки
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        // 480px не має токена: шкала spacing закінчується на 64px і не
        // призначена для ширин контейнерів
        'w-full max-w-[480px] p-0',
        'bg-surface-base border-border-subtle rounded-lg border',
        'backdrop:bg-neutral-1000/50',
        className,
      )}
    >
      <div className="relative flex flex-col gap-8 px-8 py-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className={cn(
            // flex, а не inline: інакше іконка сідає на текстовий базлайн
            // і кнопка перестає бути квадратною
            'flex items-center justify-center',
            // 48px замість 44px із Figma: 44 не збирається зі шкали,
            // а більша ціль дотику вимогам не суперечить
            'text-text-primary absolute top-3 right-3 cursor-pointer rounded-md p-3',
            'hover:bg-surface-hover transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
          )}
        >
          <Icon size="lg">
            <CloseGlyph />
          </Icon>
        </button>

        {icon && <span className="text-border-focus">{icon}</span>}

        <div className="flex flex-col gap-2">
          <h2 id={titleId} className={cn('text-text-primary', text.heading2xl)}>
            {title}
          </h2>
          {description && <p className={cn('text-text-secondary', text.bodyMd)}>{description}</p>}
        </div>

        {children}

        {actions && <div className="flex gap-3">{actions}</div>}
      </div>
    </dialog>
  );
}
