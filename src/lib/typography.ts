/**
 * Кодовий відповідник текстових стилів Figma.
 *
 * Кожен ключ — це стиль із файлу (heading/2xl → heading2xl). Значення збирає
 * ті самі чотири властивості, що прив'язані у Figma: сімейство, накреслення,
 * розмір, інтерліньяж.
 *
 * Пара «розмір + інтерліньяж» не виводиться з розміру автоматично:
 * body/lg має leading-lg (28px), а label/lg — leading-md (24px). Саме тому
 * інтерліньяж заданий явно, а не через --text-*--line-height у Tailwind.
 *
 * Сімейство приходить із --font-base, який у Figma перемикається режимом
 * колекції Typography. Змінити шрифт скрізь — це змінити один токен.
 */
export const text = {
  heading2xl: 'font-base font-semibold text-2xl leading-xl',
  headingXl: 'font-base font-semibold text-xl leading-lg',
  headingLg: 'font-base font-semibold text-lg leading-md',

  label2xl: 'font-base font-medium text-2xl leading-xl',
  labelXl: 'font-base font-medium text-xl leading-lg',
  labelLg: 'font-base font-medium text-lg leading-md',
  labelMd: 'font-base font-medium text-md leading-md',
  labelSm: 'font-base font-medium text-sm leading-sm',
  labelXs: 'font-base font-medium text-xs leading-xs',

  bodyLg: 'font-base font-normal text-lg leading-lg',
  bodyMd: 'font-base font-normal text-md leading-md',
  bodySm: 'font-base font-normal text-sm leading-sm',
  bodyXs: 'font-base font-normal text-xs leading-xs',
} as const;

export type TextStyle = keyof typeof text;
