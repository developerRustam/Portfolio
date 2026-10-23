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
    <section className="section-skills" id="skills">
      <div className="container">
        <h2 className="skills__header what__header">{t("Технические навыки")}</h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skills-card" key={group.title}>
              <h3 className="skills-card__title">{t(group.title)}</h3>
              <ul className="skills-card__list">
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
