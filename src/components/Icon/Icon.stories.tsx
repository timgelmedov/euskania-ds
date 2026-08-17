import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

/** Приклад ззовні — система свого набору гліфів не містить. */
const SearchGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'Envoltorio de tamaño y color para cualquier SVG. La biblioteca no incluye ' +
          'un set propio de iconos a propósito: dibujarlos desde cero da un conjunto ' +
          'incoherente. Conecta un set existente (Lucide, Phosphor) y pasa sus iconos ' +
          'como children. El color se hereda vía currentColor.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Lado del icono: 16 / 20 / 24 px.' },
    label: {
      control: 'text',
      description: 'Nombre accesible. Sin él el icono se marca como decorativo y se oculta al lector de pantalla.',
    },
    children: { control: false, description: 'Nodo SVG del set de iconos elegido.' },
  },
  args: { size: 'md', label: 'Buscar', children: <SearchGlyph /> },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="text-text-primary flex items-center gap-4">
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
    </div>
  ),
};

/** El color viene de currentColor: basta con cambiar el color del contenedor. */
export const InheritsColor: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <span className="text-text-primary"><Icon {...args} /></span>
      <span className="text-text-brand"><Icon {...args} /></span>
      <span className="text-text-error"><Icon {...args} /></span>
    </div>
  ),
};

/** Sin `label` el icono es decorativo: aria-hidden y sin rol. */
export const Decorative: Story = {
  args: { label: undefined },
};
