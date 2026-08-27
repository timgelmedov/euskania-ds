import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { text } from '../../lib/typography';

export type DropdownItemKind = 'simple' | 'checkbox' | 'radio';

export interface DropdownItem {
  /** Texto de la opción. */
  label: string;
  /**
   * Forma de la opción: acción simple, casilla o botón de opción.
   * Se llama `kind` y no `type` porque `type` está reservado en el contrato.
   */
  kind?: DropdownItemKind;
  /** Estado marcado, solo para `checkbox` y `radio`. */
  checked?: boolean;
  /** Desactiva la opción: no recibe foco ni se puede seleccionar. */
  disabled?: boolean;
}

export interface DropdownProps {
  /** Contenido del botón que abre el menú. */
  trigger: ReactNode;
  /** Opciones del menú. */
  items: DropdownItem[];
  /** Se llama con el índice de la opción elegida. */
  onSelect?: (index: number) => void;
  className?: string;
}

/** `menuitemcheckbox` y `menuitemradio` comunican el estado; `menuitem` no lo tiene. */
const ROLE: Record<DropdownItemKind, string> = {
  simple: 'menuitem',
  checkbox: 'menuitemcheckbox',
  radio: 'menuitemradio',
};

/**
 * Menú desplegable con navegación por teclado completa: flechas, Home, End,
 * Escape y Tab. Usa tabindex móvil — una sola opción es enfocable a la vez y
 * las flechas mueven ese foco, tal como espera el patrón de menú.
 *
 * La casilla y el punto son decorativos: el estado lo lleva `aria-checked` en
 * la propia opción. Anidar un control interactivo dentro de un `menuitem`
 * rompería la semántica.
 */
export function Dropdown({ trigger, items, onSelect, className }: DropdownProps) {
  const baseId = useId();
  const menuId = `${baseId}-menu`;
  const triggerId = `${baseId}-trigger`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabled = items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  /**
   * Фокус на активний пункт. Якщо доступних пунктів немає, фокус іде на сам
   * контейнер меню — інакше обробник клавіш на ньому не спрацює й Escape
   * перестане закривати меню.
   */
  useEffect(() => {
    if (!open) return;
    const item = itemRefs.current[active];
    if (item && !item.disabled) item.focus();
    else menuRef.current?.focus();
  }, [open, active]);

  // список міг скоротитися ззовні, поки меню відкрите
  useEffect(() => {
    if (active >= items.length) setActive(enabled[0] ?? 0);
  }, [items.length, active, enabled]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const move = (delta: number) => {
    if (enabled.length === 0) return; // інакше ділення на нуль дасть NaN
    const position = enabled.indexOf(active);
    setActive(enabled[(position + delta + enabled.length) % enabled.length]);
  };

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); move(1); break;
      case 'ArrowUp': event.preventDefault(); move(-1); break;
      case 'Home': event.preventDefault(); if (enabled.length) setActive(enabled[0]); break;
      case 'End': event.preventDefault(); if (enabled.length) setActive(enabled[enabled.length - 1]); break;
      case 'Escape': event.preventDefault(); close(); break;
      case 'Tab':
        // без preventDefault браузер шукає наступний елемент, поки меню ще
        // в DOM, і фокус стрибає всередину нього
        event.preventDefault();
        close();
        break;
    }
  };

  const openMenu = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : openMenu(enabled[0] ?? 0))}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') { event.preventDefault(); openMenu(enabled[0] ?? 0); }
          if (event.key === 'ArrowUp') { event.preventDefault(); openMenu(enabled.at(-1) ?? 0); }
        }}
        className={cn(
          'border-input-border bg-input-bg text-input-text flex cursor-pointer items-center gap-2',
          'rounded-md border px-3 py-2 transition-colors',
          'hover:border-input-border-hover',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
          text.labelMd,
        )}
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          className={cn(
            // 240px — ширина з Figma; шкала spacing не покриває ширини контейнерів
            'absolute top-full left-0 z-10 mt-1 min-w-[240px] py-1 outline-none',
            // без тіні: у системі немає шару elevation, і меню, як і Card,
            // відділяється від фону межею
            'bg-surface-base border-border-subtle rounded-md border',
          )}
        >
          {items.map((item, i) => {
            const kind = item.kind ?? 'simple';
            const isCheckable = kind !== 'simple';

            return (
              <button
                key={i}
                ref={(node) => { itemRefs.current[i] = node; }}
                type="button"
                role={ROLE[kind]}
                aria-checked={isCheckable ? !!item.checked : undefined}
                tabIndex={i === active ? 0 : -1}
                disabled={item.disabled}
                onClick={() => { onSelect?.(i); close(); }}
                onMouseEnter={() => !item.disabled && setActive(i)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-1 px-4 py-3 text-left transition-colors',
                  'hover:bg-surface-active focus-visible:bg-surface-active focus-visible:outline-none',
                  item.disabled ? 'text-text-muted cursor-not-allowed' : 'text-text-primary',
                  text.labelMd,
                )}
              >
                {isCheckable && (
                  // декоративний індикатор: стан несе aria-checked на самій опції
                  <span
                    aria-hidden
                    className={cn(
                      'mr-1 flex size-5 shrink-0 items-center justify-center border-2 transition-colors',
                      kind === 'radio' ? 'rounded-full' : 'rounded-sm',
                      item.checked
                        ? 'border-control-border-checked bg-control-bg-checked text-control-mark'
                        : 'border-control-border bg-control-bg text-transparent',
                      text.labelXs,
                    )}
                  >
                    {kind === 'checkbox' ? '✓' : <span className="size-2 rounded-full bg-current" />}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
