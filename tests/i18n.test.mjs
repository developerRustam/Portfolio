import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function collectTsxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectTsxFiles(entryPath);
      return entry.name.endsWith(".tsx") ? [entryPath] : [];
    }),
  );
  return files.flat();
}

test("every translation key used by components exists in both locales", async () => {
  const [ru, en, files] = await Promise.all([
    readFile(path.join(root, "src/shared/config/i18n/locales/ru/translation.json"), "utf8").then(JSON.parse),
    readFile(path.join(root, "src/shared/config/i18n/locales/en/translation.json"), "utf8").then(JSON.parse),
    collectTsxFiles(path.join(root, "src")),
  ]);

  const keyPattern = /\bt\(\s*["']([^"']+)["']\s*\)/g;
  const usedKeys = new Set();
  for (const file of files) {
    const source = await readFile(file, "utf8");
    for (const match of source.matchAll(keyPattern)) usedKeys.add(match[1]);
  }

  const missingRu = [...usedKeys].filter((key) => !(key in ru));
  const missingEn = [...usedKeys].filter((key) => !(key in en));
  assert.deepEqual({ missingRu, missingEn }, { missingRu: [], missingEn: [] });
});

test("defines localized page metadata", async () => {
  const profile = JSON.parse(
    await readFile(path.join(root, "src/shared/config/profile/profile.json"), "utf8"),
  );

  assert.ok(profile.seo.ru.title.includes("Рустам Ганиев"));
  assert.ok(profile.seo.en.title.includes("Rustam Ganiev"));
  assert.ok(profile.seo.ru.description.length > 80);
  assert.ok(profile.seo.en.description.length > 80);
});
