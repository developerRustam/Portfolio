import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (relativePath) => readFile(new URL(relativePath, root), "utf8");

test("theme initializes before paint and follows the system until the user chooses", async () => {
  const [html, navbar, appStyles, portfolioStyles] = await Promise.all([
    read("index.html"),
    read("src/widgets/sidebar/ui/Navbar.tsx"),
    read("src/app/app.scss"),
    read("src/widgets/portfolio/ui/portfolio.scss"),
  ]);

  assert.match(html, /portfolio-theme/);
  assert.match(html, /matchMedia\("\(prefers-color-scheme: dark\)"\)/);
  assert.match(html, /documentElement\.dataset\.theme/);
  assert.ok(html.indexOf("portfolio-theme") < html.indexOf('<div id="root">'));

  assert.match(navbar, /readTheme|resolveTheme/);
  assert.match(navbar, /applyTheme/);
  assert.match(navbar, /saveTheme/);
  assert.match(navbar, /addEventListener\("change"/);
  assert.match(navbar, /removeEventListener\("change"/);

  assert.match(appStyles, /:root\[data-theme="dark"\]/);
  assert.doesNotMatch(appStyles, /#root\.dark/);
  assert.match(portfolioStyles, /:root\[data-theme="dark"\]/);
  assert.doesNotMatch(portfolioStyles, /\.dark \.portfolio-section/);
});
