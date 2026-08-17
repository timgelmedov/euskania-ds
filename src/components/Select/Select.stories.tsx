import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const provincias = (
  <>
    <option value="">Selecciona una opción</option>
    <option value="bi">Bizkaia</option>
    <option value="ss">Gipuzkoa</option>
    <option value="vi">Araba</option>
  </>
);

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Selector nativo con estilos del sistema. La flecha es un glifo de texto, ' +
          'no un icono: la biblioteca no incluye set propio de iconos.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Altura y tipografía del control.' },
    label: { control: 'text', description: 'Etiqueta sobre el campo.' },
    hint: { control: 'text', description: 'Ayuda o mensaje de error bajo el campo.' },
    invalid: { control: 'boolean', description: 'Marca el campo como inválido.' },
    disabled: { control: 'boolean', description: 'Desactiva el campo.' },
  },
  args: { label: 'Provincia', children: provincias },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      <Select {...args} size="sm" label="Pequeño" />
      <Select {...args} size="md" label="Mediano" />
      <Select {...args} size="lg" label="Grande" />
    </div>
  ),
};

export const Invalid: Story = {
  args: { invalid: true, hint: 'Selecciona una provincia.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
