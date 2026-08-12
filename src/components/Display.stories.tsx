import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { Tooltip } from './Tooltip';
import { Icon } from './Icon';
import { Button } from './Button';

/** Компоненти відображення: Badge, Avatar, Card, Tooltip, Icon. */
const meta = {
  title: 'Components/Display',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Badges: Story = {
  name: 'Badge',
  render: () => (
    <div className="flex items-center gap-3">
      <Badge tone="neutral">Borrador</Badge>
      <Badge tone="brand">Nuevo</Badge>
      <Badge tone="success">Activo</Badge>
      <Badge tone="error">Caducado</Badge>
    </div>
  ),
};

export const Avatars: Story = {
  name: 'Avatar',
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Euskania Solar" size="sm" />
      <Avatar name="Euskania Solar" size="md" />
      <Avatar name="Euskania Solar" size="lg" />
    </div>
  ),
};

export const Cards: Story = {
  name: 'Card',
  render: () => (
    <Card className="w-72">
      <h3 className="text-text-primary font-base text-lg font-medium">Título de la tarjeta</h3>
      <p className="text-text-secondary font-base mt-1 text-md">
        La tarjeta se separa del fondo con un borde, no con sombra.
      </p>
      <div className="mt-4">
        <Button size="sm">Ver más</Button>
      </div>
    </Card>
  ),
};

export const Tooltips: Story = {
  name: 'Tooltip',
  render: () => (
    <div className="flex items-center gap-6 pt-10">
      <Tooltip label="Se muestra al pasar el ratón y al enfocar con teclado">
        <Button variant="secondary">Pasa el ratón</Button>
      </Tooltip>
    </div>
  ),
};

export const Icons: Story = {
  name: 'Icon',
  render: () => (
    <div className="text-text-primary flex items-center gap-4">
      {/* Іконка приходить ззовні — система свого набору не містить */}
      <Icon size="sm" label="Buscar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </Icon>
      <Icon size="md" label="Buscar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </Icon>
      <Icon size="lg" label="Buscar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </Icon>
    </div>
  ),
};
