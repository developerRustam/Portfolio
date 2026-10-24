import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readSource = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("about merges factual capabilities without stock artwork or duplicate skill badges", async () => {
  const [app, about] = await Promise.all([
    readSource("src/app/App.tsx"),
    readSource("src/widgets/about/ui/About.tsx"),
  ]);

  assert.doesNotMatch(app, /WhatIDo/);
  assert.doesNotMatch(about, /AboutImg|about\.png|Node\.js|skills__skill/);
  assert.match(about, /Разработка приложений/);
  assert.match(about, /Веб разработка/);
  assert.match(about, /Тестирование/);
  assert.match(about, /about-capabilities/);
});
