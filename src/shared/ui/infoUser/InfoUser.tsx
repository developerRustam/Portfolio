import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import User from "shared/assets/photo_2023-05-15_18-07-31.jpg";
import "./infoUser.scss";

const externalLinkProps = {
  target: "_blank",
  rel: "noreferrer",
} as const;

export default function InfoUser() {
  const { t } = useTranslation();

  return (
    <div className="infoUser">
      <div className="infoUser__container">
        <div className="info">
          <div className="infoUser__hello">{t("Привет я")}</div>
          <h1 className="info__header">{t("Ганиев Рустам")}</h1>
          <h2 className="info__position">{t("Фронтенд Разработчик")}</h2>

          <div className="info__contacts" aria-label={t("Контакты")}>
            <div className="contact">
              <span className="contact__icon" aria-hidden="true">@</span>
              <a href={`mailto:${profile.contacts.email}`} className="contact__text">
                {profile.contacts.email}
              </a>
            </div>
            <div className="contact">
              <span className="contact__icon" aria-hidden="true">⌖</span>
              <span className="contact__text">{t("Санкт-Петербург")}</span>
            </div>
            <div className="contact">
              <span className="contact__icon" aria-hidden="true">✈</span>
              <a href={profile.contacts.telegram} className="contact__text" {...externalLinkProps}>
                @rustam_develop
              </a>
            </div>
          </div>

          <div className="social" aria-label={t("Профессиональные профили")}>
            <a href={profile.contacts.github} className="social__icon" aria-label="GitHub" {...externalLinkProps}>
              GitHub
            </a>
            <a href={profile.contacts.linkedin} className="social__icon" aria-label="LinkedIn" {...externalLinkProps}>
              LinkedIn
            </a>
          </div>
        </div>

        <img className="infoUser__img" src={User} alt={t("Фото Рустама Ганиева")} />
      </div>
    </div>
  );
}
