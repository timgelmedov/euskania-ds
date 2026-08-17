/**
 * figma-variables.json  →  tokens.json (W3C DTCG)
 *
 * Іменування підпорядковане контракту з NAMING.md: шлях DTCG-токена
 * напряму дає ім'я CSS-змінної, тому Tailwind бачить її як частину теми.
 *
 * Два винятки, продиктовані неймспейсами Tailwind v4:
 *   font/size/*   → text.*   (щоб вийшло --text-lg, а не --font-size-lg)
 *   font/family/* → font.*   (щоб вийшло --font-base)
 *
 * Запуск: npm run tokens:export
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const IN = join(root, "figma-variables.json");
const OUT = join(root, "tokens.json");

/**
 * Накреслення в Figma зберігаються як назви стилів ("Medium", "Semi Bold"),
 * бо цього вимагає Plugin API. У CSS вони не мають сенсу — там потрібні числа,
 * а Tailwind і так дає font-medium / font-semibold. Тому не експортуються.
 */
const SKIP = /^font\/weight\//;

/** Ім'я Figma → шлях DTCG, з поправкою на неймспейси Tailwind */
function toPath(figmaName) {
  const parts = figmaName.split("/");
  if (parts[0] === "font" && parts[1] === "size") return ["text", ...parts.slice(2)];
  if (parts[0] === "font" && parts[1] === "family") return ["font", ...parts.slice(2)];
  // Tailwind тримає інтерліньяж у неймспейсі --leading-*, не --font-line-height-*
  if (parts[0] === "font" && parts[1] === "line-height") return ["leading", ...parts.slice(2)];
  return parts;
}

const toReference = (figmaName) => `{${toPath(figmaName).join(".")}}`;

function dtcgType(figmaName, figmaType) {
  if (figmaType === "COLOR") return "color";
  if (figmaType === "STRING") return "fontFamily";
  return "dimension";
}

function dtcgValue(raw, type) {
  if (raw && typeof raw === "object" && "alias" in raw) return toReference(raw.alias);
  if (type === "dimension") return `${raw}px`;
  return raw;
}

function setDeep(tree, path, token) {
  let node = tree;
  for (const segment of path.slice(0, -1)) {
    node[segment] ??= {};
    node = node[segment];
  }
  node[path.at(-1)] = token;
}

const collections = JSON.parse(readFileSync(IN, "utf8"));
const tokens = {};
let count = 0;

for (const collection of collections) {
  const defaultMode = collection.modes[0];

  for (const variable of collection.variables) {
    if (SKIP.test(variable.name)) continue;
    const type = dtcgType(variable.name, variable.type);
    setDeep(tokens, toPath(variable.name), {
      $type: type,
      $value: dtcgValue(variable.values[defaultMode], type),
      $description: `Figma: ${collection.collection} → ${variable.name}`,
    });
    count++;
  }
}

writeFileSync(OUT, JSON.stringify(tokens, null, 2) + "\n", "utf8");
console.log(`✔︎ tokens.json — ${count} токенів із Figma`);
