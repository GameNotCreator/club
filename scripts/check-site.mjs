import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import assert from "node:assert/strict";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const context = { window: {} };
runInNewContext(
  readFileSync(resolve(root, "assets/js/translations.js"), "utf8"),
  context,
);
const dictionaries = context.window.LGF_TRANSLATIONS;
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, "HTML IDs must be unique");
let localFiles = 0;
for (const [, attribute, value] of html.matchAll(
  /\b(src|href|aria-controls|aria-labelledby)="([^"]+)"/g,
)) {
  if (/^https?:|^mailto:/.test(value)) continue;
  if (value.startsWith("#"))
    assert(ids.includes(value.slice(1)), `Missing anchor: ${value}`);
  else if (attribute.startsWith("aria-"))
    value
      .split(" ")
      .forEach((id) => assert(ids.includes(id), `Missing ARIA target: ${id}`));
  else {
    assert(existsSync(resolve(root, value)), `Missing local file: ${value}`);
    localFiles++;
  }
}
for (const [, set] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
  for (const candidate of set.split(","))
    assert(
      existsSync(resolve(root, candidate.trim().split(/\s+/)[0])),
      `Missing responsive image: ${candidate}`,
    );
}
const keys = [
  ...html.matchAll(/data-(?:i18n(?:-aria|-alt)?|caption-key)="([^"]+)"/g),
].map((match) => match[1]);
for (const language of ["fr", "en"]) {
  for (const key of keys)
    assert(
      dictionaries[language][key]?.trim(),
      `Missing ${language} translation: ${key}`,
    );
  assert(
    dictionaries[language].pageTitle && dictionaries[language].pageDescription,
    `Missing ${language} page metadata`,
  );
}
assert.deepEqual(
  Object.keys(dictionaries.fr).sort(),
  Object.keys(dictionaries.en).sort(),
  "Languages must contain the same keys",
);
for (const project of ["gustave", "abot", "bubble"]) {
  assert(
    html.includes(`data-project-tab="${project}"`),
    `Missing ${project} tab`,
  );
  assert(ids.includes(`panel-${project}`), `Missing ${project} panel`);
}
assert(!html.includes('href="#0"'), "Placeholder links must not ship");
assert(!html.includes("jquery"), "Legacy runtime must not load");
console.log(
  `Site checks passed: ${new Set(keys).size} translated keys, ${localFiles} local references, 3 project panels, valid anchors and ARIA targets.`,
);
