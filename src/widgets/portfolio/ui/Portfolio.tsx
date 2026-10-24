import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import "./portfolio.scss";

type Language = "ru" | "en";
type LocalizedText = Record<Language, string>;

type ProjectMedia = {
  chat: {
    desktop: string;
    mobile: string;
    alt: LocalizedText;
  };
  auth: {
    desktop: string;
    alt: LocalizedText;
  };
};

type Project = {
  id: string;
  name: string;
  category: string;
  description: LocalizedText;
  stack: string[];
  repository: string;
  live: string;
  media?: ProjectMedia;
};

const projects = profile.projects as Project[];
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";
  const featuredProject = projects.find((project) => project.media);
  const supportingProjects = projects.filter((project) => project.id !== featuredProject?.id);

  return (
    <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title">
      <div className="container">
        <header className="portfolio-section__intro">
          <p className="portfolio-section__eyebrow">{t("Практические проекты")}</p>
          <h2 id="portfolio-title" className="portfolio-section__title">
            {t("Избранные проекты")}
          </h2>
          <p className="portfolio-section__lead">
            {t("Интерфейсы, которые можно открыть и проверить")}
          </p>
        </header>

        {featuredProject?.media && (
          <article className="portfolio-feature">
            <div className="portfolio-feature__copy">
              <p className="portfolio__category">{t(featuredProject.category)}</p>
              <h3 className="portfolio-feature__title">{featuredProject.name}</h3>
              <p className="portfolio-feature__description">
                {featuredProject.description[language]}
              </p>
              <ul className="portfolio__stack" aria-label={t("Стек технологий")}>
                {featuredProject.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="portfolio__links">
                <a
                  href={featuredProject.live}
                  className="project-link project-link--primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Открыть проект")}
                </a>
                <a
                  href={featuredProject.repository}
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Исходный код")}
                </a>
              </div>
            </div>

            <div className="portfolio-feature__media">
              <figure className="project-frame project-frame--workspace">
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet={assetUrl(featuredProject.media.chat.mobile)}
                  />
                  <img
                    src={assetUrl(featuredProject.media.chat.desktop)}
                    alt={featuredProject.media.chat.alt[language]}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <figcaption>{t("Экран командной работы")}</figcaption>
              </figure>

              <figure className="project-frame project-frame--phone" aria-hidden="true">
                <img
                  src={assetUrl(featuredProject.media.chat.mobile)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <figure className="project-frame project-frame--auth">
                <img
                  src={assetUrl(featuredProject.media.auth.desktop)}
                  alt={featuredProject.media.auth.alt[language]}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{t("Экран входа")}</figcaption>
              </figure>
            </div>
          </article>
        )}

        <div className="portfolio-index" role="list">
          {supportingProjects.map((project) => (
            <article className="portfolio-index__item" key={project.id} role="listitem">
              <div className="portfolio-index__heading">
                <p className="portfolio__category">{t(project.category)}</p>
                <h3 className="portfolio-index__title">{project.name}</h3>
              </div>
              <div className="portfolio-index__content">
                <p className="portfolio-index__description">{project.description[language]}</p>
                <ul className="portfolio__stack" aria-label={t("Стек технологий")}>
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <div className="portfolio__links portfolio-index__links">
                {project.live && (
                  <a
                    href={project.live}
                    className="project-link project-link--primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("Открыть проект")}
                  </a>
                )}
                <a
                  href={project.repository}
                  className="project-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
