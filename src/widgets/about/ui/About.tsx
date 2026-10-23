import { useTranslation } from "react-i18next";
import AboutImg from "shared/assets/about.png";
import "./about.scss";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-wrapper">
          <img
            className="about__img"
            src={AboutImg}
            alt={t("Иллюстрация рабочего места frontend-разработчика")}
            width="1568"
            height="961"
            loading="lazy"
          />
          <div className="about-me">
            <h2 className="about-me__header">{t("Обо мне")}</h2>
            <p className="about-me__text">{t("Обо мне дескрипшен")}</p>
            <div className="skills" aria-label={t("Технические навыки")}>
              <span className="skills__skill">HTML</span>
              <span className="skills__skill">CSS / SCSS</span>
              <span className="skills__skill">React</span>
              <span className="skills__skill">JavaScript</span>
              <span className="skills__skill">TypeScript</span>
              <span className="skills__skill">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
