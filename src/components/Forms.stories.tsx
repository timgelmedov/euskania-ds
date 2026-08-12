import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { Switch } from './Switch';

/** Форм-контроли, що ділять токени шару `input` та `control`. */
const meta = {
  title: 'Components/Form controls',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextareaStates: Story = {
  name: 'Textarea',
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Textarea label="Mensaje" placeholder="Escribe tu mensaje" />
      <Textarea label="Con error" invalid hint="El mensaje es obligatorio." />
      <Textarea label="Deshabilitado" disabled placeholder="No editable" />
    </div>
  ),
};

export const SelectStates: Story = {
  name: 'Select',
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Select label="Provincia" defaultValue="">
        <option value="" disabled>Selecciona una opción</option>
        <option value="bi">Bizkaia</option>
        <option value="ss">Gipuzkoa</option>
        <option value="vi">Araba</option>
      </Select>
      <Select label="Con error" invalid hint="Selecciona una provincia.">
        <option>Selecciona una opción</option>
      </Select>
      <Select label="Deshabilitado" disabled>
        <option>Selecciona una opción</option>
      </Select>
    </div>
  ),
};

export const Selection: Story = {
  name: 'Checkbox / Radio / Switch',
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Checkbox label="Acepto las condiciones" />
        <Checkbox label="Seleccionado" defaultChecked />
        <Checkbox label="Parcial" indeterminate />
        <Checkbox label="Deshabilitado" disabled />
      </div>

      <div className="flex flex-col gap-2">
        <Radio name="plan" label="Plan básico" defaultChecked />
        <Radio name="plan" label="Plan completo" />
        <Radio name="plan" label="No disponible" disabled />
      </div>

      <div className="flex flex-col gap-2">
        <Switch label="Notificaciones" />
        <Switch label="Activado" defaultChecked />
        <Switch label="Deshabilitado" disabled />
      </div>
    </div>
  ),
};
