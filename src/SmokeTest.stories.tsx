/**
 * ⚠️ ТИМЧАСОВА СТОРІ — наскрізний зріз (крок B).
 *
 * Доводить, що токени з Figma доходять до Tailwind-утиліт, включно з
 * ланцюгом «семантика → примітив». Видаляється з появою першого компонента.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

function SmokeTest() {
  return (
    <div className="bg-surface-base p-6">
      <div
        data-testid="semantic"
        className="bg-surface-brand text-text-on-brand rounded-md p-4 text-lg"
      >
        surface-brand · text-on-brand · rounded-md · p-4 · text-lg
      </div>

      <div
        data-testid="bordered"
        className="border-border-default mt-4 rounded-lg border p-4"
      >
        border-border-default (neutral-500, 3:1)
      </div>

      <div data-testid="primitive" className="bg-brand-600 mt-4 p-4 text-white">
        bg-brand-600 (примітив)
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
