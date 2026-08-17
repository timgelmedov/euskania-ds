import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button';
import { text } from '../../lib/typography';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Contenedor de contenido. Se separa del fondo con un borde, no con sombra: ' +
          'el sistema no tiene capa de elevación, y eso es una decisión deliberada.',
      },
    },
  },
  argTypes: {
    className: { control: 'text', description: 'Clases extra. Se combinan, no reemplazan.' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-72">
      <h3 className={`text-text-primary ${text.labelLg}`}>Título de la tarjeta</h3>
      <p className={`text-text-secondary mt-1 ${text.bodyMd}`}>
        La tarjeta se separa del fondo con un borde, no con sombra.
      </p>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-72">
      <h3 className={`text-text-primary ${text.labelLg}`}>Instalación solar</h3>
      <p className={`text-text-secondary mt-1 ${text.bodyMd}`}>
        Revisa el estado de tu instalación y la producción del mes.
      </p>
      <div className="mt-4">
        <Button size="sm">Ver más</Button>
      </div>
    </Card>
  ),
};
