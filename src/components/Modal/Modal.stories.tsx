import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import { WarningGlyph } from '../Icon/glyphs';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'Diálogo modal sobre el `<dialog>` nativo. `showModal()` ya aporta trampa de foco, ' +
          'cierre con Escape y fondo inerte; reimplementar eso a mano es justo donde suele ' +
          'romperse la accesibilidad. Lo único añadido es el bloqueo del scroll de fondo.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', description: 'Si el diálogo está abierto.' },
    title: { control: 'text', description: 'Encabezado. Da nombre accesible al diálogo.' },
    description: { control: 'text', description: 'Texto explicativo bajo el encabezado.' },
    icon: { control: false, description: 'Icono decorativo sobre el texto.' },
    actions: { control: false, description: 'Acciones al pie, normalmente uno o dos Button.' },
    onClose: { action: 'closed', description: 'Se llama al cerrar: Escape, X o clic fuera.' },
  },
  args: {
    // open і onClose обовʼязкові в типі; кожна сторі задає їх через render
    open: false,
    onClose: () => {},
    title: 'Modal header goes here',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquam in hendrerit urna, ' +
      'pellentesque sit amet sapien fringilla.',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** El diálogo se abre desde un botón, como en uso real. */
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          icon={<WarningGlyph className="size-10" />}
          actions={
            <>
              <Button onClick={() => setOpen(false)}>Confirmar</Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            </>
          }
        />
      </>
    );
  },
};

/** Variante Form: los campos van entre la descripción y las acciones. */
export const WithForm: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir formulario</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Enter new password"
          description="La contraseña debe tener al menos ocho caracteres."
          actions={
            <>
              <Button onClick={() => setOpen(false)}>Guardar</Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <Input label="Contraseña" type="password" placeholder="••••••••" />
            <Select label="Recordar sesión">
              <option>Solo en este dispositivo</option>
              <option>Siempre</option>
            </Select>
          </div>
        </Modal>
      </>
    );
  },
};

/** Abierto al montar, para inspeccionar el diseño sin interacción. */
export const OpenByDefault: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        icon={<WarningGlyph className="size-10" />}
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          </>
        }
      />
    );
  },
};
