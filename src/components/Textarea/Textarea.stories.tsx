import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          'Área de texto multilínea. Comparte los tokens de color con Input, ' +
          'por lo que sus estados se ven y se comportan igual.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta sobre el campo.' },
    hint: { control: 'text', description: 'Ayuda o mensaje de error bajo el campo.' },
    invalid: { control: 'boolean', description: 'Marca el campo como inválido y activa aria-invalid.' },
    disabled: { control: 'boolean', description: 'Desactiva el campo.' },
    rows: { control: { type: 'number', min: 2, max: 12 }, description: 'Altura en líneas.' },
  },
  args: { label: 'Mensaje', placeholder: 'Escribe tu mensaje' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Máximo 500 caracteres.' },
};

export const Invalid: Story = {
  args: { invalid: true, hint: 'El mensaje es obligatorio.' },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'No editable' },
};
