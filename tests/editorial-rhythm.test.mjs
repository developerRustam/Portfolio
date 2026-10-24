import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (relativePath) => readFile(new URL(relativePath, root), "utf8");

test("content sections share one editorial heading and spacing system", async () => {
  const [appStyles, portfolio, portfolioStyles, experienceStyles, aboutStyles, skillsStyles] =
    await Promise.all([
      read("src/app/app.scss"),
      read("src/widgets/portfolio/ui/Portfolio.tsx"),
      read("src/widgets/portfolio/ui/portfolio.scss"),
      read("src/widgets/experience/ui/experience.scss"),
      read("src/widgets/about/ui/about.scss"),
      read("src/widgets/skills/ui/skills.scss"),
    ]);

  assert.match(appStyles, /\.section-heading\s*\{/);
  assert.match(appStyles, /--section-space:\s*64px/);
  for (const styles of [portfolioStyles, experienceStyles, aboutStyles, skillsStyles]) {
    assert.match(styles, /padding:\s*var\(--section-space\) 0/);
  }
  assert.match(portfolio, /section-heading__eyebrow/);
  assert.match(portfolio, /01 —/);
});
