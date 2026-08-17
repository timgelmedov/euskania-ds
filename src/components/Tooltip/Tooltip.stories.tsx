import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Pista contextual. Aparece al pasar el ratón y también al enfocar con teclado, ' +
          'de lo contrario sería inaccesible. Solo para información complementaria: ' +
          'nunca para contenido imprescindible.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Texto de la pista.' },
    children: { control: false, description: 'Elemento que dispara la pista.' },
  },
  // children обовʼязковий у типі; кожна сторі задає його через render
  args: { label: 'Se muestra al pasar el ratón y al enfocar con teclado', children: null },
  decorators: [
    // підказка розкривається вгору — потрібен запас місця, інакше її обріже
    (Story) => (
      <div className="pt-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Pasa el ratón</Button>
    </Tooltip>
  ),
};

/** Accesible con teclado: al enfocar el botón la pista también aparece. */
export const KeyboardAccessible: Story = {
  render: (args) => (
    <Tooltip {...args} label="Aparece también con Tab">
      <Button variant="ghost">Enfócame con Tab</Button>
    </Tooltip>
  ),
};
