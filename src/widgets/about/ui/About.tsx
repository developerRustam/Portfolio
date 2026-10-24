import { useTranslation } from "react-i18next";
import "./about.scss";

const capabilities = [
  { title: "Разработка приложений", description: "Разработка на React" },
  { title: "Веб разработка", description: "Веб разработка текст" },
  { title: "Тестирование", description: "Тестирование дескрипшен" },
] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <header className="section-heading about__heading">
          <p className="section-heading__eyebrow">03 — {t("Подход")}</p>
          <h2 className="section-heading__title" id="about-title">
            {t("Обо мне")}
          </h2>
        </header>

        <div className="about__layout">
          <p className="about__intro">{t("Обо мне дескрипшен")}</p>

          <div className="about-capabilities" aria-label={t("Что я делаю")}>
            {capabilities.map((capability, index) => (
              <article className="about-capabilities__item" key={capability.title}>
                <span className="about-capabilities__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{t(capability.title)}</h3>
                  <p>{t(capability.description)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
