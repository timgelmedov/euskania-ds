import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Interruptor. A diferencia de Checkbox, aplica el cambio de inmediato. ' +
          'Si la acción necesita guardarse o confirmarse, usa Checkbox.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Texto junto al interruptor.' },
    disabled: { control: 'boolean', description: 'Desactiva el control.' },
    defaultChecked: { control: 'boolean', description: 'Estado inicial sin controlar.' },
  },
  args: { label: 'Notificaciones' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Switch {...args} label="Apagado" />
      <Switch {...args} label="Encendido" defaultChecked />
      <Switch {...args} label="Desactivado" disabled />
      <Switch {...args} label="Desactivado y encendido" disabled defaultChecked />
    </div>
  ),
};
