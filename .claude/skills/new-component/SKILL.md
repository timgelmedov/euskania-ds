---
name: new-component
description: Створює новий компонент дизайн-системи Euskania з Figma-фрейма. Читає дизайн через Figma MCP (усі варіанти, стани і прив'язані variables), пише src/components/[Name]/[Name].tsx та [Name].stories.tsx виключно на токенах системи, піднімає Storybook і зупиняється на перевірку; після підтвердження робить commit, PR і публікацію в Chromatic. Викликати як /new-component <Figma URL з node-id>.
---

# Новий компонент із Figma

Аргумент — посилання на Figma-фрейм із `node-id`. Без `node-id` не починай:
попроси посилання на конкретний вузол, не на файл.

Репозиторій: `D:\work\Design Engineering\euskania-ds`

## Крок 1. Прочитати дизайн

`fileKey` і `nodeId` беруться з URL:
`figma.com/design/<fileKey>/<name>?node-id=1-2` → `nodeId` = `1:2`.

1. `get_metadata` — структура вузла, перелік варіантів і їх іменування.
2. `get_variable_defs` — які змінні прив'язані. **Це головне джерело правди
   про кольори**: те, що тут повернулось, і є токени, якими можна користуватись.
3. `get_design_context` на кожен характерний варіант — розміри, відступи,
   типографіка. Для матриці варіантів достатньо кількох показових, не всіх.

**Не використовуй `get_screenshot`.** Потрібні структуровані дані, а не картинка.

Якщо `get_variable_defs` показує голі hex замість змінних — дизайн ще не
прив'язаний до токенів. Скажи про це і зупинись: генерувати компонент із
захардкоджених кольорів не можна.

## Крок 2. Компонент

Створи `src/components/[Name]/[Name].tsx` і `src/components/[Name]/index.ts`,
далі додай експорт у `src/index.ts` (список тримається за абеткою).

### Стилі — тільки з токенів

Дозволені класи Tailwind — ті, що згенеровані з `src/styles/tokens.css`
(`bg-*`, `text-*`, `border-*`, `p-*`, `rounded-*`, `leading-*`).

Заборонено: `bg-[#014db1]`, `p-[13px]`, `text-blue-600` та будь-яке значення,
якого немає в токенах.

**Якщо потрібного токена немає — зупинись і спитай.** Не бери «схожий»
і не вигадуй значення. Створення нового токена — це окреме рішення, воно
починається у Figma, а не в компоненті.

Компонентні токени (`color/[name]/*`) мають посилатись на семантичні, а не
на примітиви напряму. Якщо для нового компонента такого шару ще немає —
скажи, що спершу треба додати токени у Figma.

### Типографіка

Тільки з `src/lib/typography.ts` — це кодовий відповідник текстових стилів Figma:

```tsx
import { text } from '../../lib/typography';
// text.labelSm, text.bodyMd, text.headingLg …
```

Не збирай `text-sm font-medium` вручну: розмір і інтерліньяж не виводяться
один з одного (`body/lg` має leading 28, `label/lg` — 24).

### Правила API

- Клас склеюй хелпером `cn` із `src/lib/cn.ts`.
- `forwardRef` на кореневий DOM-вузол.
- `className` мерджиться, а не затирається — спред `{...props}` після нього.
- Імена варіантів беруться з Figma один в один: `variant`, `size`, `state`.
- **Заборонені імена пропів:** `type` (конфліктує з нативним атрибутом і робить
  кнопку `submit`), а також `key`, `ref`, `children` як назви варіантів.
- Стани hover/active — псевдокласи; дублюй їх через `data-[state=…]`, щоб стан
  можна було показати у сторі статично. При `disabled` скидай `data-state`,
  інакше forced-стан переб'є disabled — специфічність селекторів однакова.
- `disabled` — нативний атрибут, не проп-варіант.

### Доступність

- Інтерактивний елемент має видиме `focus-visible` кільце на `border-focus`.
- Контроль без тексту потребує `aria-label`; додай dev-попередження, якщо його
  немає (`import.meta.env.DEV`).
- Поля вводу: `label` + `aria-describedby` на підказку, `aria-invalid` на помилку.

### Пастка з `peer-*`

`peer-checked:` та подібні працюють **лише на сусідніх елементах**, не на
вкладених. Для вкладеного вузла керуй через `currentColor` на батьку
(`text-transparent peer-checked:text-…` + `bg-current` на дитині) або через
`::after` на самому сусіді.

## Крок 3. Сторі

`src/components/[Name]/[Name].stories.tsx`:

- `tags: ['autodocs']`
- `argTypes` на **кожен** проп: `control`, `options`, короткий `description`
- окрема стори на кожен стан із Figma, плюс `Playground`
- для матриці варіант × стан — одна стори з таблицею
- тексти прикладів **іспанською**, як і решта дизайн-системи

Для пропа, що форсує стан, використовуй `mapping`, а не `undefined` в `options`:

```ts
state: {
  control: 'inline-radio',
  options: ['default', 'hover', 'active'],
  mapping: { default: undefined, hover: 'hover', active: 'active' },
}
```

## Крок 4. Storybook і ЗУПИНКА

Не запускай сервер через Bash. Використай `preview_start` з конфігурацією
**`euskania-ds-storybook`** (вона вже є в `.claude/launch.json`, порт 6006).

Перед показом перевір:

1. `npm run build` — типи і збірка (шлях: `export PATH="$PATH:/c/Program Files/nodejs"`)
2. `read_console_messages` — помилок немає
3. `javascript_tool` — computed styles збігаються зі значеннями з Figma
   (колір, розмір, радіус, інтерліньяж)

Дай URL стори і **зупинись**. Чекай на явне «ОК» від користувача.
До підтвердження нічого не комітити.

## Крок 5. Коміт і PR — тільки після «ОК»

Гілка `main` захищена: прямий push відхиляється, потрібен PR.

```
export PATH="$PATH:/c/Program Files/nodejs:/c/Program Files/GitHub CLI"
git checkout -b add-[name]-component
git add src/components/[Name] src/index.ts
git commit -m "feat: add [Name]"
git push -u origin add-[name]-component
gh pr create --fill
```

`gh` і `node` не в PATH за замовчуванням — префікс обов'язковий.

Якщо в процесі додавались токени у Figma — спершу онови `figma-variables.json`
і виконай `npm run tokens`, інакше CI впаде на перевірці дрейфу токенів.

## Крок 6. Chromatic

Дочекайся перевірки в PR (`gh pr checks <N> --watch`) — Chromatic запускається
автоматично на push. Окремий `npx chromatic` потрібен лише щоб отримати URL
збірки поза CI:

```
CHROMATIC_PROJECT_TOKEN=<з секрету> npx chromatic --ci
```

Поверни користувачу посилання на збірку для рев'ю візуальних змін.

Май на увазі: типовий поріг Chromatic пропускає тонкі зсуви кольору на дрібному
тексті. Якщо змінювався саме колір тексту — скажи, що автоматична перевірка
могла його не побачити.

## Чого не робити

- Не малювати іконки — система свого набору не має, іконка приходить ззовні
  через компонент `Icon`.
- Не додавати токени самому в обхід Figma.
- Не пушити в `main`.
- Не комітити до підтвердження.
