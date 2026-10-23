import { useTranslation } from "react-i18next";
import Ido from "shared/ui/ido/Ido";
import ApplicationIcon from "shared/assets/Vector (2).svg";
import InterfaceIcon from "shared/assets/Vector (3).svg";
import TestingIcon from "shared/assets/Vector (4).svg";
import "./whatIDo.scss";

export default function WhatIDo() {
  const { t } = useTranslation();

  return (
    <section className="what">
      <div className="container">
        <h2 className="what__header">{t("Что я делаю")}</h2>
        <div className="what__items">
          <Ido
            header={t("Разработка приложений")}
            text={t("Разработка на React")}
            svg={ApplicationIcon}
          />
          <Ido
            header={t("Веб разработка")}
            text={t("Веб разработка текст")}
            svg={InterfaceIcon}
          />
          <Ido
            header={t("Тестирование")}
            text={t("Тестирование дескрипшен")}
            svg={TestingIcon}
          />
        </div>
      </div>
    </section>
  );
}
