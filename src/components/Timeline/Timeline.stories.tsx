import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';
import { Button } from '../Button';

const items = [
  {
    date: 'Jul 21, 2025',
    title: 'Instalación completada',
    description:
      'Los paneles quedaron instalados y conectados a la red. La producción empieza a contabilizarse desde hoy.',
  },
  {
    date: 'Jul 14, 2025',
    title: 'Visita técnica',
    description: 'Revisión del tejado y medición de la superficie disponible para los módulos.',
  },
  {
    date: 'Jul 2, 2025',
    title: 'Presupuesto aceptado',
    description: 'Se firmó el presupuesto y se reservó la fecha de instalación.',
  },
];

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    docs: {
      description: {
        component:
          'Cronología de eventos. La línea y los puntos son decorativos: el orden lo comunica ' +
          'la lista `<ol>`, de modo que el lector de pantalla recibe la misma secuencia que se ve.',
      },
    },
  },
  argTypes: {
    items: { control: 'object', description: 'Eventos en orden cronológico.' },
  },
  args: { items },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Cada evento puede llevar una acción propia bajo el texto. */
export const WithActions: Story = {
  args: {
    items: items.map((item, i) => ({
      ...item,
      action: i === 0 ? <Button variant="secondary" size="md">Ver detalles</Button> : undefined,
    })),
  },
};

/** Sin descripción el evento se reduce a fecha y título. */
export const TitlesOnly: Story = {
  args: { items: items.map(({ date, title }) => ({ date, title })) },
};
