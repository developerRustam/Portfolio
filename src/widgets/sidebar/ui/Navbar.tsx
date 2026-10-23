import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "shared/ui/navLink/NavLink";
import "./navbar.scss";

function SwitchLanguage() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";

  return (
    <button
      className="btn-switchLng"
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
    <nav className="navbar" aria-label="Primary navigation">
      <div className="logo">
        <span className="logo__text">{t("Резюме")}</span>
      </div>
      <ul className="navbar__items">
        <li className="navbar-item">
          <NavLink selector="navbar-item__link" href="#about" text={t("Обо мне")} />
        </li>
        <li className="navbar-item">
          <NavLink selector="navbar-item__link" href="#skills" text={t("Навыки")} />
        </li>
        <li className="navbar-item">
          <NavLink selector="navbar-item__link" href="#experiences" text={t("Опыт работы")} />
        </li>
        <li className="navbar-item">
          <NavLink selector="navbar-item__link" href="#portfolio" text={t("Портфолио")} />
        </li>
        <li className="navbar-item">
          <NavLink selector="navbar-item__link" href="#footer" text={t("Связаться")} />
        </li>
        <li className="navbar-item">
          <SwitchLanguage />
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item__switch"
            type="button"
            aria-label={theme === "light" ? "Enable dark theme" : "Enable light theme"}
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
