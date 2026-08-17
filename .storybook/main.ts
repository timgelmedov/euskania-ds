import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Патерн *.mdx прибрано: MDX-документації поки немає, і Storybook
  // попереджав про нього при кожному старті. Повернути, коли зʼявиться.
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite"
};
export default config;