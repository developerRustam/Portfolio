import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const themeUrl = new URL("../src/shared/lib/theme/theme.js", import.meta.url);

test("theme preference resolves stored choice before the system preference", async () => {
  await access(themeUrl).catch(() => assert.fail("theme preference module is missing"));
  const { readTheme, resolveTheme } = await import(`${themeUrl.href}?test=${Date.now()}`);
  const darkStorage = { getItem: () => "dark" };
  const invalidStorage = { getItem: () => "sepia" };
  const blockedStorage = { getItem: () => { throw new Error("blocked"); } };

  assert.equal(readTheme(darkStorage), "dark");
  assert.equal(readTheme(invalidStorage), null);
  assert.equal(readTheme(blockedStorage), null);
  assert.equal(resolveTheme(darkStorage, false), "dark");
  assert.equal(resolveTheme({ getItem: () => null }, true), "dark");
  assert.equal(resolveTheme({ getItem: () => null }, false), "light");
});

test("theme application updates the document before React paints", async () => {
  const { applyTheme } = await import(`${themeUrl.href}?test=${Date.now()}`);
  const attributes = new Map();
  const documentLike = {
    documentElement: { dataset: {} },
    querySelector: () => ({ setAttribute: (name, value) => attributes.set(name, value) }),
  };

  applyTheme("dark", documentLike);
  assert.equal(documentLike.documentElement.dataset.theme, "dark");
  assert.equal(attributes.get("content"), "#101412");
  applyTheme("light", documentLike);
  assert.equal(attributes.get("content"), "#fbfcfb");
});

test("theme preference persists safely", async () => {
  await access(themeUrl).catch(() => assert.fail("theme preference module is missing"));
  const { saveTheme } = await import(`${themeUrl.href}?test=${Date.now()}`);
  let value = null;
  const storage = { setItem: (_key, next) => { value = next; } };
  const blockedStorage = { setItem: () => { throw new Error("blocked"); } };

  assert.equal(saveTheme("dark", storage), true);
  assert.equal(value, "dark");
  assert.equal(saveTheme("light", blockedStorage), false);
});
