import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readSource = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("experience uses an editorial timeline with accessible result disclosure", async () => {
  const source = await readSource("src/widgets/experience/ui/Experience.tsx");

  assert.doesNotMatch(source, /AdobeStock|backgroundImage/);
  assert.match(source, /experience-timeline/);
  assert.match(source, /<details/);
  assert.match(source, /<summary/);
  assert.match(source, /responsibilities\.slice\(0, visibleResults\)/);
  assert.match(source, /responsibilities\.slice\(visibleResults\)/);
});
