import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Correo electrónico', placeholder: 'nombre@euskania.es' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      <Input {...args} size="sm" label="Pequeño" />
      <Input {...args} size="md" label="Mediano" />
      <Input {...args} size="lg" label="Grande" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      <Input {...args} label="Normal" hint="Usaremos este correo para avisos." />
      <Input {...args} label="Con error" invalid hint="El correo no es válido." defaultValue="no-es-un-correo" />
      <Input {...args} label="Deshabilitado" disabled />
    </div>
  ),
};
