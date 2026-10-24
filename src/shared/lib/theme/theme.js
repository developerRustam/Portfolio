export const THEME_STORAGE_KEY = "portfolio-theme";

export function readTheme(storage = globalThis.localStorage) {
  try {
    const theme = storage?.getItem(THEME_STORAGE_KEY);
    return theme === "light" || theme === "dark" ? theme : null;
  } catch {
    return null;
  }
}

export function resolveTheme(storage = globalThis.localStorage, prefersDark = false) {
  return readTheme(storage) ?? (prefersDark ? "dark" : "light");
}

export function applyTheme(theme, documentLike = globalThis.document) {
  documentLike.documentElement.dataset.theme = theme;
  documentLike
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#101412" : "#fbfcfb");
}

export function saveTheme(theme, storage = globalThis.localStorage) {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}
