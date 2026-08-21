import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { HelpGlyph } from '../Icon/glyphs';

const items = [
  {
    question: '¿Cuánto tarda la instalación?',
    answer: 'Entre uno y dos días, según el número de módulos y el tipo de tejado.',
  },
  {
    question: '¿Necesito permiso del ayuntamiento?',
    answer: 'En la mayoría de municipios sí. Nos encargamos del trámite completo.',
  },
  {
    question: '¿Qué mantenimiento requieren los paneles?',
    answer: 'Una limpieza al año es suficiente en la mayoría de instalaciones.',
  },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'Secciones desplegables. Cada pregunta es un `<button>` con `aria-expanded` y ' +
          '`aria-controls`; el panel enlaza de vuelta con `aria-labelledby`. Funciona con ' +
          'teclado sin código extra, porque el botón nativo ya responde a Enter y Espacio.',
      },
    },
  },
  argTypes: {
    items: { control: 'object', description: 'Secciones desplegables, en orden.' },
    multiple: { control: 'boolean', description: 'Si es false, abrir una sección cierra las demás.' },
    defaultOpen: { control: 'object', description: 'Índices abiertos al montar.' },
  },
  args: { items, multiple: true },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstOpen: Story = { args: { defaultOpen: [0] } };

/** Con `multiple: false` solo puede haber una sección abierta a la vez. */
export const SingleOpen: Story = { args: { multiple: false, defaultOpen: [0] } };

/** Cada sección admite un icono antes de la pregunta. */
export const WithIcons: Story = {
  args: {
    items: items.map((item) => ({ ...item, icon: <HelpGlyph /> })),
    defaultOpen: [0],
  },
};
