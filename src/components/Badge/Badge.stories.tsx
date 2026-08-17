import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Etiqueta de estado. El color nunca es el único indicador: el texto dentro ' +
          'es obligatorio (WCAG 1.4.1). Por eso no existe una variante de solo punto.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'brand', 'success', 'error'],
      description: 'Intención del estado. No sustituye al texto.',
    },
    children: { control: 'text', description: 'Texto de la etiqueta.' },
  },
  args: { children: 'Etiqueta', tone: 'neutral' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge {...args} tone="neutral">Borrador</Badge>
      <Badge {...args} tone="brand">Nuevo</Badge>
      <Badge {...args} tone="success">Activo</Badge>
      <Badge {...args} tone="error">Caducado</Badge>
    </div>
  ),
};
