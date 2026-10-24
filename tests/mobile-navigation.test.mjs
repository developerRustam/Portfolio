import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navbarUrl = new URL("../src/widgets/sidebar/ui/Navbar.tsx", import.meta.url);
const navbarStylesUrl = new URL("../src/widgets/sidebar/ui/navbar.scss", import.meta.url);
const heroStylesUrl = new URL("../src/shared/ui/infoUser/infoUser.scss", import.meta.url);

test("mobile navigation exposes a scroll affordance and keeps Contact reachable", async () => {
  const [component, styles, heroStyles] = await Promise.all([
    readFile(navbarUrl, "utf8"),
    readFile(navbarStylesUrl, "utf8"),
    readFile(heroStylesUrl, "utf8"),
  ]);

  assert.match(component, /navbar__menu/);
  assert.match(styles, /&__menu[\s\S]*linear-gradient/);
  assert.doesNotMatch(styles, /@media \(max-width: 920px\)[\s\S]*\.navbar-item:last-child\s*\{[\s\S]*display:\s*none/);
  assert.match(styles, /\.logo\s*\{[^}]*min-width:\s*44px/);
  assert.match(heroStyles, /&__details[\s\S]*a[\s\S]*min-height:\s*44px/);
});
