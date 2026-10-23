import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import HeaderLogo from "shared/assets/AdobeStock_107797389-2560x1200.jpg";
import "./footer.scss";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="footer" style={{ backgroundImage: `url(${HeaderLogo})` }}>
      <div className="container">
        <div className="footer">
          <h2 className="footer__header">{t("Заинтересованы в работе?")}</h2>
          <p className="footer__text">{t("Напишите мне, я всегда на связи")}</p>
          <a
            href={profile.contacts.telegram}
            className="btn"
            target="_blank"
            rel="noreferrer"
          >
            {t("Связаться")}
          </a>
          <a className="footer__email" href={`mailto:${profile.contacts.email}`}>
            {profile.contacts.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
