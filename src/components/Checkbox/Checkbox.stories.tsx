import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Casilla de verificación. El input nativo permanece en el DOM y recibe el foco; ' +
          'el aspecto lo dibuja un span contiguo, así la marca sigue siendo un glifo de texto.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Texto junto a la casilla.' },
    indeterminate: {
      control: 'boolean',
      description: 'Estado parcial, para selecciones incompletas dentro de un grupo.',
    },
    disabled: { control: 'boolean', description: 'Desactiva el control.' },
    defaultChecked: { control: 'boolean', description: 'Estado inicial sin controlar.' },
  },
  args: { label: 'Acepto las condiciones' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

/** Para un grupo donde solo parte de las opciones está marcada. */
export const Indeterminate: Story = { args: { indeterminate: true } };

export const Disabled: Story = { args: { disabled: true } };

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Checkbox {...args} label="Sin marcar" />
      <Checkbox {...args} label="Marcado" defaultChecked />
      <Checkbox {...args} label="Parcial" indeterminate />
      <Checkbox {...args} label="Desactivado" disabled />
      <Checkbox {...args} label="Desactivado y marcado" disabled defaultChecked />
    </div>
  ),
};
