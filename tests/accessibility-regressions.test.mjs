import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appStylesUrl = new URL("../src/app/app.scss", import.meta.url);
const footerStylesUrl = new URL("../src/widgets/footer/ui/footer.scss", import.meta.url);
const navbarUrl = new URL("../src/widgets/sidebar/ui/Navbar.tsx", import.meta.url);

const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test("footer accent text and interaction states meet WCAG AA", async () => {
  const [appStyles, footerStyles] = await Promise.all([
    readFile(appStylesUrl, "utf8"),
    readFile(footerStylesUrl, "utf8"),
  ]);

  assert.match(appStyles, /--footer-accent:\s*#b6f09c/);
  assert.match(footerStyles, /color:\s*var\(--footer-accent\)/);
  assert.match(footerStyles, /background:\s*var\(--footer-accent\)/);
  assert.ok(contrast("#b6f09c", "#111715") >= 4.5);
  assert.ok(contrast("#132313", "#b6f09c") >= 4.5);
});

test("logo accessible name contains its visible mark", async () => {
  const source = await readFile(navbarUrl, "utf8");

  assert.match(source, /aria-label=\{`RG Frontend — \$\{t\("В начало"\)\}`\}/);
});

test("theme button accessible name contains its visible label", async () => {
  const source = await readFile(navbarUrl, "utf8");

  assert.match(source, /aria-label=\{theme === "light" \? t\("Тёмная"\) : t\("Светлая"\)\}/);
  assert.match(source, /title=\{theme === "light" \? t\("Включить тёмную тему"\) : t\("Включить светлую тему"\)\}/);
});
