import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Botón. Todos los colores llegan desde Figma a través de la capa de tokens de ' +
          'componente: no hay ni un solo valor escrito a mano.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'active'],
      // mapping, а не literal undefined в options — інакше Storybook рендерить
      // пункт з підписом "undefined" замість дефолтного вибору
      mapping: { default: undefined, hover: 'hover', active: 'active' },
      description: 'Solo para documentación: fuerza el estado. En código usa las pseudoclases.',
    },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Botón' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

/** Матриця варіант × стан — те, заради чого існує проп `state`. */
export const States: Story = {
  render: (args) => (
    <table className="border-separate border-spacing-4">
      <thead>
        <tr className="text-text-secondary text-sm">
          <th />
          <th className="font-medium">default</th>
          <th className="font-medium">hover</th>
          <th className="font-medium">active</th>
          <th className="font-medium">disabled</th>
        </tr>
      </thead>
      <tbody>
        {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
          <tr key={variant}>
            <td className="text-text-secondary text-sm">{variant}</td>
            <td><Button {...args} variant={variant}>Botón</Button></td>
            <td><Button {...args} variant={variant} state="hover">Botón</Button></td>
            <td><Button {...args} variant={variant} state="active">Botón</Button></td>
            <td><Button {...args} variant={variant} disabled>Botón</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} startIcon={<span aria-hidden>←</span>}>Atrás</Button>
      <Button {...args} endIcon={<span aria-hidden>→</span>}>Siguiente</Button>
      {/* Кнопка без тексту зобов'язана мати aria-label — інакше Button попередить у консолі */}
      <Button {...args} aria-label="Cerrar">
        <span aria-hidden>×</span>
      </Button>
    </div>
  ),
};

/** Всередині форми кнопка не має її сабмітити — type за замовчуванням `button`. */
export const DoesNotSubmitForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Форма засабмічена — цього не мало статись');
      }}
    >
      <Button {...args}>No envía el formulario</Button>
    </form>
  ),
};
