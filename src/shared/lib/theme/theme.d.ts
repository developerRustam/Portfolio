export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY: "portfolio-theme";
export function readTheme(storage?: Pick<Storage, "getItem">): Theme | null;
export function resolveTheme(
  storage?: Pick<Storage, "getItem">,
  prefersDark?: boolean,
): Theme;
export function applyTheme(
  theme: Theme,
  documentLike?: Pick<Document, "documentElement" | "querySelector">,
): void;
export function saveTheme(theme: Theme, storage?: Pick<Storage, "setItem">): boolean;
