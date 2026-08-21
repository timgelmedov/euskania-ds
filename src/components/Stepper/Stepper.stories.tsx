import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';

const steps = [
  { label: 'Paso 1', title: 'Datos de contacto' },
  { label: 'Paso 2', title: 'Detalles del tejado' },
  { label: 'Paso 3', title: 'Presupuesto' },
];

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component:
          'Progreso por pasos. El paso actual lleva `aria-current="step"`, de modo que el ' +
          'lector de pantalla sabe dónde está el usuario sin depender del color. ' +
          'El indicador circular no reutiliza Badge: Badge es una etiqueta de estado con ' +
          'texto, no un contador numerado.',
      },
    },
  },
  argTypes: {
    steps: { control: 'object', description: 'Pasos en orden.' },
    current: {
      control: { type: 'number', min: 0, max: 2 },
      description: 'Índice del paso actual. Los anteriores se marcan como completados.',
    },
  },
  args: { steps, current: 1 },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstStep: Story = { args: { current: 0 } };

export const LastStep: Story = { args: { current: 2 } };

/** Los tres estados a la vez: completado, actual y pendiente. */
export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <Stepper {...args} current={0} />
      <Stepper {...args} current={1} />
      <Stepper {...args} current={2} />
    </div>
  ),
};
