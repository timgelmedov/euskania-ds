# Контракт іменування — Euskania Design System

Цей документ — інтерфейс між Figma і кодом. Він має пріоритет над зручністю:
якщо ім'я незручне в коді, змінюємо його **у Figma**, а не в обхід.

## Правило №1

**Код ніколи не оголошує колір, відступ, радіус чи розмір шрифту.**
Якщо значення немає в токенах — воно спершу з'являється у Figma, потім експортується.
Виняток лише один: геометрія, яка не є токеном (наприклад, `1px` межа).

## Ланцюг імен

Ім'я Figma-змінної визначає CSS-змінну, а та — Tailwind-клас. Проміжних
перейменувань немає: якщо клас незручний, перейменовуємо змінну у Figma.

| Figma variable | CSS (`@theme`) | Tailwind |
|---|---|---|
| `color/brand/600` | `--color-brand-600` | `bg-brand-600`, `text-brand-600` |
| `color/neutral/500` | `--color-neutral-500` | `bg-neutral-500` |
| `color/surface/base` | `--color-surface-base` | `bg-surface-base` |
| `color/text/primary` | `--color-text-primary` | `text-text-primary` |
| `color/border/default` | `--color-border-default` | `border-border-default` |
| `color/success/600` | `--color-success-600` | `bg-success-600` |
| `color/error/600` | `--color-error-600` | `bg-error-600` |
| `spacing/4` | `--spacing-4` | `p-4`, `gap-4`, `m-4` |
| `radius/md` | `--radius-md` | `rounded-md` |
| `font/size/lg` | `--text-lg` | `text-lg` |
| `font/family/base` | `--font-base` | `font-base` |

Слеш у Figma стає дефісом у CSS. Більше жодних перетворень.

### Неймспейси Tailwind v4

Префікс CSS-змінної не довільний — Tailwind генерує утиліти лише з відомих
неймспейсів. Тому перший сегмент імені у Figma фіксований:

| Неймспейс | Для чого |
|---|---|
| `--color-*` | усі кольори |
| `--spacing-*` | відступи, розміри |
| `--radius-*` | заокруглення |
| `--text-*` | розміри шрифту |
| `--font-*` | сімейства шрифтів |

## Шкала відступів

Нумерація копіює дефолт Tailwind, щоб `p-4` означало 16px, як у будь-якому
іншому проєкті. Довільна шкала тут — джерело постійних помилок.

```
spacing/1  = 4px     spacing/6  = 24px
spacing/2  = 8px     spacing/8  = 32px
spacing/3  = 12px    spacing/10 = 40px
spacing/4  = 16px    spacing/12 = 48px
spacing/5  = 20px    spacing/16 = 64px
```

## Радіуси

```
radius/sm = 4px    radius/lg = 12px    radius/full = 9999px
radius/md = 8px    radius/xl = 16px
```

## Тришарова структура

Навіть при одній лише світлій темі шари не змішуються — це дозволяє додати
темну тему як новий режим, а не як переписування всіх токенів.

```
Primitives   сира палітра, режимів немає       color/brand/600 = #014db1
    ↓ аліас
Semantic     призначення, не зовнішній вигляд   color/surface/base → color/neutral/50
    ↓ аліас
Component    прив'язка до компонента            color/button/primary-bg → color/brand/600
```

Компоненти в коді споживають **семантичний і компонентний** шари.
Примітиви напряму — не можна: `bg-brand-600` у компоненті це помилка,
має бути `bg-button-primary-bg`.

## API компонентів

Імена варіантів у Figma = імена пропів у коді.

| Figma variant property | React prop |
|---|---|
| `variant` | `variant` |
| `size` | `size` |
| `state` | псевдокласи CSS + `data-state` для сторі |

### Заборонені імена пропів

`type` — конфліктує з нативним атрибутом `<button type>`; кнопка мовчки стає
`submit` і сабмітить форму. Використовуй `variant`.

Також заборонені: `key`, `ref`, `className`, `children` — як імена варіантів.

## Доступність

- Текст: контраст **≥ 4.5:1** (WCAG AA)
- Межі, що є єдиним індикатором контролу: **≥ 3:1** (WCAG 1.4.11)
- Через це межі полів вводу беруть `color/neutral/500`, а не `300`:
  світліші кроки не проходять поріг
- `color/text/muted` бере `neutral/550`, а не `500`. Крок 500 дає 3.44:1 —
  достатньо для межі, замало для тексту. Оскільки `input/placeholder`
  успадковує `text/muted`, це стосується і плейсхолдерів у полях вводу

## Палітра

Згенерована в OKLCH від бренд-кольору `#014DB1`, який став кроком 600.

**brand** — hue 259°
```
50  #eff8ff   100 #ddeeff   200 #c0deff   300 #9cc7ff   400 #71a9ff
500 #4988ec   600 #014db1   700 #003796   800 #002478   900 #00165a
```

**neutral** — той самий відтінок при хромі 0.022 (холодні сірі)
```
50  #f6f7f9   100 #ebedf0   200 #d9dde3   300 #c0c6cf   400 #a3aab5
500 #838b98   550 #6e7682   600 #4d5561   700 #39414c   800 #282f38   900 #1b2027
```
Крок `550` — позачерговий, доданий суто заради доступності: між `500` (3.44:1)
і `600` (7.53:1) не було значення, що проходить 4.5:1 для приглушеного тексту.

**success** — hue 150°
```
50  #effaf1   100 #ddf4e1   200 #c1e8c7   300 #9cd7a7   400 #6fbe81
500 #40a15c   600 #10863f   700 #006f2b   800 #00591d   900 #004514
```

**error** — hue 28°
```
50  #fff2ef   100 #ffe3de   200 #ffcbc2   300 #ffab9f   400 #f48477
500 #db5c50   600 #bf3b32   700 #a3231e   800 #861311   900 #690c0a
```

Крок 600 у кожній шкалі проходить AA і як текст на білому, і як фон під білим
текстом — тому саме він є робочим за замовчуванням.

## Типографіка

### Колекція Typography з режимами

Сімейство, накреслення та інтерліньяж живуть в окремій колекції **Typography**
з режимом (зараз єдиний — `Outfit`). Це зроблено саме заради заміни шрифту:
додаєш режим, задаєш у ньому інше сімейство — і воно міняється по всьому файлу,
бо всі 13 текстових стилів прив'язані до змінної, а не до конкретного шрифту.

```
font/family/base    = Outfit
font/weight/regular = Regular      font/line-height/xs = 16px
font/weight/medium  = Medium       font/line-height/sm = 20px
font/weight/semibold= SemiBold     font/line-height/md = 24px
                                   font/line-height/lg = 28px
font/size/xs = 12px  lg = 18px     font/line-height/xl = 32px
font/size/sm = 14px  xl = 20px
font/size/md = 16px  2xl = 24px
```

**Пастка при додаванні режиму:** назви накреслень різняться між сімействами.
В Outfit це `SemiBold`, в Inter — `Semi Bold` із пробілом. Тому у новому режимі
треба перевизначати не лише `font/family/base`, а й усі три `font/weight/*`,
і завантажити шрифт до присвоєння значень.

### Текстові стилі

13 стилів, кожен прив'язує чотири поля: `fontFamily`, `fontStyle`, `fontSize`,
`lineHeight`. Жоден текстовий вузол не має задавати шрифт напряму.

| Стиль | Накреслення | Розмір | Інтерліньяж |
|---|---|---|---|
| `heading/2xl` `heading/xl` `heading/lg` | SemiBold | 24 / 20 / 18 | 32 / 28 / 24 |
| `label/2xl` `label/xl` `label/lg` | Medium | 24 / 20 / 18 | 32 / 28 / 24 |
| `label/md` `label/sm` `label/xs` | Medium | 16 / 14 / 12 | 24 / 20 / 16 |
| `body/lg` `body/md` `body/sm` `body/xs` | Regular | 18 / 16 / 14 / 12 | 28 / 24 / 20 / 16 |

У коді їм відповідає `src/lib/typography.ts` — той самий набір як Tailwind-класи.
Компоненти беруть типографіку звідти, а не збирають `text-sm font-medium` вручну.

Зверни увагу: `body/lg` має інтерліньяж 28, а `label/lg` — 24 при однаковому
розмірі 18. Тому пара «розмір + інтерліньяж» задається явно, а не через
`--text-*--line-height` у Tailwind.

### Що не експортується в CSS

`font/weight/*` лишаються тільки у Figma: там вони зберігають назви накреслень
(`Medium`, `Semi Bold`), яких у CSS не існує — там потрібні числа. Tailwind і так
дає `font-medium` / `font-semibold`.
