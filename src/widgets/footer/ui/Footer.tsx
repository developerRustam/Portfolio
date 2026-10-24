import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import "./footer.scss";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer" id="footer" aria-labelledby="contact-title">
      <div className="container">
        <div className="footer__eyebrow">05 — {t("Контакты")}</div>
        <div className="footer__lead">
          <div>
            <h2 id="contact-title">{t("Заинтересованы в работе?")}</h2>
            <p>{t("Напишите мне, я всегда на связи")}</p>
          </div>
          <a className="footer__primary-link" href={`mailto:${profile.contacts.email}`}>
            {profile.contacts.email}
          </a>
        </div>

        <nav className="footer__contacts" aria-label={t("Контакты")}>
          <a href={profile.contacts.telegram} target="_blank" rel="noreferrer">
            Telegram <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.contacts.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.contacts.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="footer__meta">
          <span>© {new Date().getFullYear()} Rustam Ganiev</span>
          <a href="#top">{t("В начало")} ↑</a>
        </div>
      </div>
    </footer>
  );
}
