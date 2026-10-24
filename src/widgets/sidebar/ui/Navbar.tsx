import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { applyTheme, readTheme, resolveTheme, saveTheme, type Theme } from "shared/lib/theme/theme";
import { NavLink } from "shared/ui/navLink/NavLink";
import "./navbar.scss";

function SwitchLanguage() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";

  return (
    <button
      className="navbar-control"
      type="button"
      aria-label={
        language === "ru" ? "RU — Switch to English" : "EN — Переключить на русский"
      }
      onClick={() => i18n.changeLanguage(language === "ru" ? "en" : "ru")}
    >
      {language.toUpperCase()}
    </button>
  );
}

export function Navbar() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(() =>
    resolveTheme(window.localStorage, window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
  const [hasExplicitTheme, setHasExplicitTheme] = useState(
    () => readTheme(window.localStorage) !== null,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (hasExplicitTheme) return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemTheme = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleSystemTheme);
    return () => media.removeEventListener("change", handleSystemTheme);
  }, [hasExplicitTheme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    saveTheme(nextTheme, window.localStorage);
    setHasExplicitTheme(true);
    setTheme(nextTheme);
  };

  return (
    <nav className="navbar" aria-label={t("Основная навигация")}>
      <a className="logo" href="#top" aria-label={`RG Frontend — ${t("В начало")}`}>
        <span className="logo__mark">RG</span>
        <span className="logo__label">Frontend</span>
      </a>

      <div className="navbar__menu">
        <ul className="navbar__items">
          <li className="navbar-item">
            <NavLink selector="navbar-item__link" href="#portfolio" text={t("Портфолио")} />
          </li>
          <li className="navbar-item">
            <NavLink selector="navbar-item__link" href="#experiences" text={t("Опыт работы")} />
          </li>
          <li className="navbar-item">
            <NavLink selector="navbar-item__link" href="#about" text={t("Обо мне")} />
          </li>
          <li className="navbar-item">
            <NavLink selector="navbar-item__link" href="#skills" text={t("Навыки")} />
          </li>
          <li className="navbar-item">
            <NavLink selector="navbar-item__link" href="#footer" text={t("Связаться")} />
          </li>
        </ul>
      </div>

      <div className="navbar__controls">
        <SwitchLanguage />
        <button
          className="navbar-control navbar-control--theme"
          type="button"
          aria-label={theme === "light" ? t("Тёмная") : t("Светлая")}
          title={theme === "light" ? t("Включить тёмную тему") : t("Включить светлую тему")}
          onClick={toggleTheme}
        >
          <span className="navbar-control__dot" aria-hidden="true" />
          {theme === "light" ? t("Тёмная") : t("Светлая")}
        </button>
      </div>
    </nav>
  );
}
