import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar con iniciales o imagen. Los diámetros coinciden con las alturas de Button ' +
          '(32 / 40 / 48), para que ambos se alineen en una misma fila.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nombre completo. De él salen las iniciales y el nombre accesible.',
    },
    src: { control: 'text', description: 'Imagen opcional. Si falta, se muestran las iniciales.' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'Diámetro: 32 / 40 / 48 px.' },
  },
  args: { name: 'Euskania Solar', size: 'md' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};

/** Con una sola palabra, las iniciales se reducen a una letra. */
export const SingleWord: Story = {
  args: { name: 'Euskania' },
};
