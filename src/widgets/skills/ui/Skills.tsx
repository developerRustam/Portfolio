import { useTranslation } from "react-i18next";
import profile from "shared/config/profile/profile.json";
import "./skills.scss";

const skillGroups = [
  { title: "Frontend", items: profile.skills.frontend },
  { title: "Качество и тестирование", items: profile.skills.quality },
  { title: "Инженерная практика", items: profile.skills.engineering },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section className="section-skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-heading section-skills__heading">
          <p className="section-heading__eyebrow">04 — {t("Стек технологий")}</p>
          <h2 className="section-heading__title" id="skills-title">
            {t("Технические навыки")}
          </h2>
        </header>

        <div className="skills-index">
          {skillGroups.map((group, index) => (
            <section className="skills-index__row" key={group.title} aria-labelledby={`skill-${index}`}>
              <span className="skills-index__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 id={`skill-${index}`}>{t(group.title)}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
