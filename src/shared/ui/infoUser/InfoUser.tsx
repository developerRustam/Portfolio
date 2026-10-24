import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import User from "shared/assets/photo_2023-05-15_18-07-31.jpg";
import "./infoUser.scss";

const externalLinkProps = {
  target: "_blank",
  rel: "noreferrer",
} as const;

type Language = "ru" | "en";

export default function InfoUser() {
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";

  return (
    <section className="infoUser" aria-labelledby="hero-title">
      <div className="infoUser__container">
        <div className="info">
          <p className="info__eyebrow">{t("Фронтенд Разработчик")} · React / TypeScript</p>
          <h1 className="info__header" id="hero-title">
            {t("Ганиев Рустам")}
          </h1>
          <p className="info__summary">{profile.seo[language].description}</p>

          <div className="info__actions">
            <a className="hero-action hero-action--primary" href="#portfolio">
              {t("Смотреть проекты")}
            </a>
            <a
              className="hero-action hero-action--secondary"
              href={`mailto:${profile.contacts.email}`}
            >
              {t("Связаться")}
            </a>
          </div>

          <div className="info__details" aria-label={t("Контакты")}>
            <span>{t("Санкт-Петербург")}</span>
            <a href={`mailto:${profile.contacts.email}`}>{profile.contacts.email}</a>
            <a href={profile.contacts.telegram} {...externalLinkProps}>
              @rustam_develop
            </a>
          </div>

          <div className="social" aria-label={t("Профессиональные профили")}>
            <a href={profile.contacts.github} {...externalLinkProps}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.contacts.linkedin} {...externalLinkProps}>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <figure className="infoUser__portrait">
          <img
            className="infoUser__img"
            src={User}
            alt={t("Фото Рустама Ганиева")}
            width="360"
            height="440"
          />
          <figcaption>{t("Более 4 лет коммерческого опыта")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
