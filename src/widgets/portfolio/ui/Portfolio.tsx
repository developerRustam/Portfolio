import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import "./portfolio.scss";

type Language = "ru" | "en";

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <h2 className="what__header">{t("Избранные проекты")}</h2>
        <div className="portfolio" role="list">
          {profile.projects.map((project) => (
            <article className="portfolio__card" key={project.id} role="listitem">
              <p className="portfolio__category">{project.category}</p>
              <h3 className="portfolio__title">{project.name}</h3>
              <p className="portfolio__description">{project.description[language]}</p>
              <ul className="portfolio__stack" aria-label="Technology stack">
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="portfolio__links">
                {project.live && (
                  <a href={project.live} className="btn" target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                <a href={project.repository} className="btn" target="_blank" rel="noreferrer">
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
