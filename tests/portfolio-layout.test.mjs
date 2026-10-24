import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const portfolioUrl = new URL("../src/widgets/portfolio/ui/Portfolio.tsx", import.meta.url);

test("every supporting project renders its configured visual evidence", async () => {
  const source = await readFile(portfolioUrl, "utf8");

  assert.match(source, /Object\.values\(project\.media/);
  assert.match(source, /portfolio-index__media/);
  assert.match(source, /media\.caption\?\.\[language\]/);
  assert.match(source, /assetUrl\(media\.desktop\)/);
});
