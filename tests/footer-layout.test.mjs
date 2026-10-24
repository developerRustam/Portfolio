import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readSource = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("footer closes with every verified contact and accessible targets", async () => {
  const [component, styles] = await Promise.all([
    readSource("src/widgets/footer/ui/Footer.tsx"),
    readSource("src/widgets/footer/ui/footer.scss"),
  ]);

  assert.doesNotMatch(component, /AdobeStock|backgroundImage/);
  for (const contact of ["email", "telegram", "github", "linkedin"]) {
    assert.match(component, new RegExp(`profile\\.contacts\\.${contact}`));
  }
  assert.match(component, /rel="noreferrer"/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /overflow-wrap:\s*anywhere/);
});
