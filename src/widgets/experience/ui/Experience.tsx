import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import "./experience.scss";

type Language = "ru" | "en";

const visibleResults = 3;

export default function Experience() {
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";

  return (
    <section className="experience" id="experiences" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-heading experience__heading">
          <p className="section-heading__eyebrow">02 — {t("Опыт")}</p>
          <h2 className="section-heading__title" id="experience-title">
            {t("Опыт работы")}
          </h2>
        </header>

        <ol className="experience-timeline">
          {profile.experience.map((job, index) => {
            const responsibilities = job.responsibilities[language];
            const remainingResults = responsibilities.slice(visibleResults);

            return (
              <li className="experience-timeline__item" key={`${job.company}-${job.period.ru}`}>
                <div className="experience-timeline__meta">
                  <span className="experience-timeline__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="experience-timeline__period">{job.period[language]}</span>
                  <span className="experience-timeline__company">{job.company}</span>
                </div>

                <article className="experience-timeline__content">
                  <h3>{job.role[language]}</h3>
                  <p className="experience-timeline__label">{t("Ключевые результаты")}</p>
                  <ul className="respons">
                    {responsibilities.slice(0, visibleResults).map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>

                  {remainingResults.length > 0 && (
                    <details className="experience-results">
                      <summary>
                        {t("Показать остальные результаты", { count: remainingResults.length })}
                      </summary>
                      <ul className="respons respons--remaining">
                        {responsibilities.slice(visibleResults).map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
