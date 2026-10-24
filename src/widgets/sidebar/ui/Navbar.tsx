import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <nav className="navbar" aria-label={t("Основная навигация")}>
      <a className="logo" href="#top" aria-label={t("В начало")}>
        <span className="logo__mark">RG</span>
        <span className="logo__label">Frontend</span>
      </a>

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

      <div className="navbar__controls">
        <SwitchLanguage />
        <button
          className="navbar-control navbar-control--theme"
          type="button"
          aria-label={theme === "light" ? t("Включить тёмную тему") : t("Включить светлую тему")}
          onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
        >
          <span className="navbar-control__dot" aria-hidden="true" />
          {theme === "light" ? t("Тёмная") : t("Светлая")}
        </button>
      </div>
    </nav>
  );
}
