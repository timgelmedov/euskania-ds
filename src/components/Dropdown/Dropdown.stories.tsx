import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown, type DropdownItem } from './Dropdown';
import { Icon } from '../Icon';
import { ArrowDownGlyph } from '../Icon/glyphs';

const simple: DropdownItem[] = [
  { label: 'Ver detalles' },
  { label: 'Editar instalación' },
  { label: 'Descargar informe' },
  { label: 'Archivar', disabled: true },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component:
          'Menú desplegable con navegación completa por teclado: flechas, Home, End, Escape y Tab. ' +
          'Usa tabindex móvil, de modo que solo una opción es enfocable a la vez y las flechas ' +
          'mueven ese foco, como espera el patrón de menú. La casilla y el punto son decorativos: ' +
          'el estado lo lleva `aria-checked` en la propia opción.',
      },
    },
  },
  argTypes: {
    trigger: { control: false, description: 'Contenido del botón que abre el menú.' },
    items: { control: 'object', description: 'Opciones del menú.' },
    onSelect: { action: 'selected', description: 'Recibe el índice de la opción elegida.' },
  },
  args: {
    trigger: (
      <>
        Acciones
        <Icon size="md"><ArrowDownGlyph /></Icon>
      </>
    ),
    items: simple,
  },
  decorators: [(Story) => <div className="pb-64"><Story /></div>],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Opciones con casilla: se pueden marcar varias a la vez. */
export const WithCheckboxes: Story = {
  render: (args) => {
    const [checked, setChecked] = useState([true, false, false]);
    return (
      <Dropdown
        {...args}
        trigger="Filtrar"
        items={[
          { label: 'Instalaciones activas', kind: 'checkbox', checked: checked[0] },
          { label: 'Pendientes de visita', kind: 'checkbox', checked: checked[1] },
          { label: 'Archivadas', kind: 'checkbox', checked: checked[2] },
        ]}
        onSelect={(i) => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
      />
    );
  },
};

/** Opciones excluyentes: elegir una desmarca las demás. */
export const WithRadios: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(0);
    return (
      <Dropdown
        {...args}
        trigger="Ordenar por"
        items={['Más recientes', 'Más antiguas', 'Mayor producción'].map((label, i) => ({
          label,
          kind: 'radio' as const,
          checked: selected === i,
        }))}
        onSelect={setSelected}
      />
    );
  },
};

/**
 * Caso límite: ninguna opción seleccionable. El foco pasa al propio menú,
 * de modo que Escape sigue cerrándolo desde el teclado.
 */
export const AllDisabled: Story = {
  args: {
    items: [
      { label: 'No disponible', disabled: true },
      { label: 'Tampoco disponible', disabled: true },
    ],
  },
};

/** Las opciones desactivadas se saltan al navegar con las flechas. */
export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Ver detalles' },
      { label: 'No disponible', disabled: true },
      { label: 'Editar instalación' },
      { label: 'Tampoco disponible', disabled: true },
      { label: 'Descargar informe' },
    ],
  },
};
