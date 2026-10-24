import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readSource = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("leads with selected work and verified experience", async () => {
  const source = await readSource("src/app/App.tsx");
  const portfolio = source.indexOf("<Portfolio />");
  const experience = source.indexOf("<Experience />");
  const about = source.indexOf("<About />");
  const skills = source.indexOf("<Skills />");
  const capabilities = source.indexOf("<WhatIDo />");

  assert.ok(portfolio > -1);
  assert.ok(portfolio < experience);
  assert.ok(experience < about);
  assert.ok(about < skills);
  assert.ok(skills < capabilities);
});

test("hero exposes a factual summary and direct project action", async () => {
  const source = await readSource("src/shared/ui/infoUser/InfoUser.tsx");

  assert.match(source, /profile\.seo\[language\]\.description/);
  assert.match(source, /href="#portfolio"/);
  assert.match(source, /href={`mailto:\$\{profile\.contacts\.email\}`}/);
});

test("hero header no longer depends on a decorative stock background", async () => {
  const source = await readSource("src/widgets/sidebar/header/ui/Header.tsx");

  assert.doesNotMatch(source, /AdobeStock|backgroundImage/);
});
