import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import HeaderLogo from "shared/assets/AdobeStock_107797389-2560x1200.jpg";
import "./experience.scss";

type Language = "ru" | "en";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ru";

  return (
    <section
      className="experience"
      id="experiences"
      style={{ backgroundImage: `url(${HeaderLogo})` }}
    >
      <div className="container">
        <h2 className="what__header">{t("Опыт работы")}</h2>
        <div className="experience__wrap">
          {profile.experience.map((job) => (
            <article className="experience__item" key={`${job.company}-${job.period.ru}`}>
              <h3 className="experience__header">
                {job.role[language]}{" "}
                <span className="experience__header--green">{job.company}</span>
              </h3>
              <span className="experience__date">{job.period[language]}</span>
              {job.responsibilities[language].length > 0 && (
                <>
                  <p className="experience__label">{t("Ключевые результаты")}:</p>
                  <ul className="respons">
                    {job.responsibilities[language].map((responsibility) => (
                      <li className="respons__item" key={responsibility}>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
