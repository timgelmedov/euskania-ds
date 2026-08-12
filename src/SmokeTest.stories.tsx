/**
 * ⚠️ ТИМЧАСОВА СТОРІ — наскрізний зріз (крок B).
 *
 * Єдина мета: довести, що токен, оголошений у @theme, перетворюється
 * на робочу Tailwind-утиліту всередині Storybook. Видаляється, щойно
 * зʼявиться перший справжній компонент.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

function SmokeTest() {
  return (
    <div className="bg-surface-base p-4">
      <div data-testid="chip" className="bg-brand-600 p-4 text-white">
        bg-brand-600 + p-4
      </div>
    </div>
  );
}

const meta = {
  title: 'Internal/Smoke test',
  component: SmokeTest,
} satisfies Meta<typeof SmokeTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TokensReachTailwind: Story = {};
