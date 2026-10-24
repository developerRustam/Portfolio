import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readSource = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("skills renders a compact profile-driven capability index", async () => {
  const [component, styles] = await Promise.all([
    readSource("src/widgets/skills/ui/Skills.tsx"),
    readSource("src/widgets/skills/ui/skills.scss"),
  ]);

  assert.match(component, /profile\.skills\.frontend/);
  assert.match(component, /profile\.skills\.quality/);
  assert.match(component, /profile\.skills\.engineering/);
  assert.match(component, /skills-index/);
  assert.doesNotMatch(component, /skills-card/);
  assert.doesNotMatch(styles, /box-shadow/);
});
