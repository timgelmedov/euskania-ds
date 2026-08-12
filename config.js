/**
 * Style Dictionary → Tailwind v4 @theme
 *
 * На виході один файл: src/styles/tokens.css з блоком @theme.
 * Tailwind сам генерує з нього утиліти (bg-brand-600, p-4, rounded-md…),
 * тому окремий JS-конфіг Tailwind не потрібен.
 *
 * Примітиви виводяться літералами, семантичні токени — посиланнями var(),
 * щоб ланцюг «семантика → примітив» лишався видимим у зібраному CSS.
 */

/** "{color.neutral.0}" → "var(--color-neutral-0)" */
function referenceToVar(value) {
  if (typeof value !== "string") return value;
  const match = value.match(/^\{(.+)\}$/);
  return match ? `var(--${match[1].split(".").join("-")})` : value;
}

export default {
  source: ["tokens.json"],

  hooks: {
    formats: {
      "css/tailwind-theme": ({ dictionary }) => {
        const lines = dictionary.allTokens.map(
          (t) => `  --${t.name}: ${referenceToVar(t.original.$value)};`
        );

        return [
          "/**",
          " * Згенеровано Style Dictionary — не редагувати вручну.",
          " * Джерело: tokens.json ← figma-variables.json ← Figma Variables",
          " *",
          " * @theme — це конфіг теми Tailwind v4. Кожна змінна тут стає",
          " * набором утиліт: --color-brand-600 → bg-brand-600, text-brand-600, …",
          " */",
          "",
          "@theme {",
          ...lines,
          "}",
          "",
        ].join("\n");
      },
    },
  },

  platforms: {
    tailwind: {
      // без size/rem — розміри лишаються в px, точно як у Figma
      transforms: ["attribute/cti", "name/kebab", "color/css"],
      buildPath: "src/styles/",
      files: [{ destination: "tokens.css", format: "css/tailwind-theme" }],
    },
  },
};
