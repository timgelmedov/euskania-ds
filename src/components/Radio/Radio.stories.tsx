import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'Botón de opción. Se usa siempre dentro de un grupo con el mismo `name`, ' +
          'donde solo una opción puede estar seleccionada.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Texto junto al control.' },
    name: { control: 'text', description: 'Agrupa las opciones: mismo name, una sola selección.' },
    disabled: { control: 'boolean', description: 'Desactiva el control.' },
    defaultChecked: { control: 'boolean', description: 'Estado inicial sin controlar.' },
  },
  args: { label: 'Plan básico', name: 'plan' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

/** Uso real: varias opciones compartiendo el mismo `name`. */
export const Group: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Radio {...args} label="Plan básico" defaultChecked />
      <Radio {...args} label="Plan completo" />
      <Radio {...args} label="No disponible" disabled />
    </div>
  ),
};
